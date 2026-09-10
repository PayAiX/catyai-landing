'use strict';

// C1 — validare URL SSRF-safe.
// Doar http/https, doar porturi 80/443, fără userinfo, fără IP-uri private
// (IPv4 + IPv6), iar pentru nume DNS se verifică FIECARE adresă rezolvată.

const dns = require('dns').promises;
const net = require('net');

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

// CIDR-uri IPv4 private/interzise (SPEC §3 C1 — 8 blocuri)
const PRIVATE_CIDRS_V4 = [
  ['10.0.0.0', 8],
  ['172.16.0.0', 12],
  ['192.168.0.0', 16],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16], // include 169.254.169.254 (metadata AWS/Azure/GCP)
  // 0.0.0.0/8 — "this network" (specul scrie 0.0.0.0/0; interpretat ca /8,
  // altfel ar bloca literal orice adresă IPv4 — vezi README, limite cunoscute)
  ['0.0.0.0', 8],
  ['100.64.0.0', 10], // CGNAT
  ['192.0.0.0', 24], // IETF protocol assignments
];

function ipv4ToLong(ip) {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => !Number.isInteger(p) || p < 0 || p > 255)) return null;
  return (((parts[0] * 256 + parts[1]) * 256 + parts[2]) * 256 + parts[3]) >>> 0;
}

function inCidr4(long, base, bits) {
  if (bits === 0) return true;
  const mask = (0xffffffff << (32 - bits)) >>> 0;
  return ((long & mask) >>> 0) === (base >>> 0);
}

// Parsare IPv6 (cu suport pentru forma comprimată "::" și IPv4 embedded ::ffff:a.b.c.d)
function ipv6ToBytes(ip) {
  let s = ip;
  const lastColon = s.lastIndexOf(':');
  if (lastColon !== -1 && net.isIP(s.slice(lastColon + 1)) === 4) {
    const p = s.slice(lastColon + 1).split('.').map(Number);
    const hi = ((p[0] << 8) | p[1]).toString(16);
    const lo = ((p[2] << 8) | p[3]).toString(16);
    s = `${s.slice(0, lastColon + 1)}${hi}:${lo}`;
  }
  const halves = s.split('::');
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(':') : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  const fill = 8 - left.length - right.length;
  if (fill < 0) return null;
  const groups = [...left, ...Array(fill).fill('0'), ...right];
  if (groups.length !== 8) return null;
  const bytes = Buffer.alloc(16);
  for (let i = 0; i < 8; i++) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(groups[i])) return null;
    bytes.writeUInt16BE(parseInt(groups[i], 16), i * 2);
  }
  return bytes;
}

function isPrivateIp(ip) {
  const v4 = ipv4ToLong(ip);
  if (v4 !== null) {
    return PRIVATE_CIDRS_V4.some(([base, bits]) => inCidr4(v4, ipv4ToLong(base), bits));
  }
  const bytes = ipv6ToBytes(ip);
  if (!bytes) return true; // nu putem parsa → prudent, tratam ca privat
  // ::1/128
  if (bytes.slice(0, 15).equals(Buffer.alloc(15)) && bytes[15] === 1) return true;
  // fc00::/7
  if ((bytes[0] & 0xfe) === 0xfc) return true;
  // fe80::/10
  if (bytes[0] === 0xfe && (bytes[1] & 0xc0) === 0x80) return true;
  // ::ffff:a.b.c.d (IPv4-mapped) — verificăm adresa embedded
  if (bytes.slice(0, 10).equals(Buffer.alloc(10)) && bytes[10] === 0xff && bytes[11] === 0xff) {
    return PRIVATE_CIDRS_V4.some(([base, bits]) =>
      inCidr4((bytes[12] * 16777216 + bytes[13] * 65536 + bytes[14] * 256 + bytes[15]) >>> 0, ipv4ToLong(base), bits)
    );
  }
  return false;
}

// Returnează instanța URL normalizată sau aruncă HttpError(400).
async function validateSafeUrl(urlString) {
  if (typeof urlString !== 'string' || !urlString.trim()) {
    throw new HttpError(400, 'Câmpul url lipsește sau e gol');
  }
  let u;
  try {
    u = new URL(urlString);
  } catch {
    throw new HttpError(400, 'URL invalid: nu poate fi parsat');
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new HttpError(400, `Protocol neacceptat "${u.protocol.replace(':', '')}" — doar http/https`);
  }
  if (u.username || u.password) {
    throw new HttpError(400, 'URL-ul nu poate conține userinfo (user:pass@host)');
  }
  if (u.port && u.port !== '80' && u.port !== '443') {
    throw new HttpError(400, `Port neacceptat ${u.port} — doar 80/443`);
  }
  // WHATWG URL păstrează brackets la hostname IPv6: "[::1]" → "::1"
  const host = u.hostname.replace(/^\[|\]$/g, '');
  if (!host) {
    throw new HttpError(400, 'URL invalid: host lipsă');
  }
  const ipType = net.isIP(host);
  if (ipType === 4 || ipType === 6) {
    if (isPrivateIp(host)) {
      throw new HttpError(400, `Adresa IP ${host} e în spațiul privat — accesul e respins`);
    }
    return u;
  }
  let addrs;
  try {
    addrs = await dns.lookup(host, { all: true });
  } catch {
    throw new HttpError(400, `Hostul ${host} nu poate fi rezolvat DNS`);
  }
  if (!addrs || addrs.length === 0) {
    throw new HttpError(400, `Hostul ${host} nu are adrese DNS`);
  }
  for (const a of addrs) {
    if (isPrivateIp(a.address)) {
      throw new HttpError(400, `Hostul ${host} rezolvă spre o adresă privată (${a.address}) — accesul e respins`);
    }
  }
  return u;
}

module.exports = { validateSafeUrl, isPrivateIp, HttpError };
