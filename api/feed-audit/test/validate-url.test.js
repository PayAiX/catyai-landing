'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { validateSafeUrl, isPrivateIp } = require('../validate-url');

test('acceptă URL public http/https', async () => {
  const u = await validateSafeUrl('http://example.com/feed.xml');
  assert.equal(u.hostname, 'example.com');
  const u2 = await validateSafeUrl('https://example.com:443/feed');
  assert.equal(u2.protocol, 'https:');
  const u3 = await validateSafeUrl('http://example.com:80');
  assert.equal(u3.port, '');
});

test('respinge IP-uri literale private IPv4', async () => {
  for (const ip of [
    'http://10.1.2.3/x',
    'http://10.255.255.255/x',
    'http://172.16.0.1/x',
    'http://172.31.255.255/x',
    'http://192.168.1.1/x',
    'http://127.0.0.1/x',
    'http://169.254.169.254/latest/meta-data',
    'http://169.254.1.1/x',
    'http://0.0.0.0/x',
    'http://100.64.0.1/x',
    'http://100.127.255.255/x',
    'http://192.0.0.1/x',
  ]) {
    await assert.rejects(validateSafeUrl(ip), (err) => {
      assert.equal(err.statusCode, 400, `status pentru ${ip}`);
      return true;
    }, `trebuia respins: ${ip}`);
  }
});

test('respinge IP-uri private IPv6', async () => {
  for (const ip of ['http://[::1]/x', 'http://[fc00::1]/x', 'http://[fd00::1234]/x', 'http://[fe80::1]/x']) {
    await assert.rejects(validateSafeUrl(ip), /privat|privată/i, `trebuia respins: ${ip}`);
  }
});

test('respinge IPv4-mapped IPv6 către loopback', async () => {
  await assert.rejects(validateSafeUrl('http://[::ffff:127.0.0.1]/x'), /privat|privată/i);
  await assert.rejects(validateSafeUrl('http://[::ffff:10.0.0.1]/x'), /privat|privată/i);
});

test('respinge scheme, userinfo și porturi', async () => {
  await assert.rejects(validateSafeUrl('ftp://example.com/feed'), /Protocol neacceptat/);
  await assert.rejects(validateSafeUrl('file:///etc/passwd'), /Protocol neacceptat/);
  await assert.rejects(validateSafeUrl('http://user:pass@example.com/'), /userinfo/);
  await assert.rejects(validateSafeUrl('http://example.com:8080/feed'), /Port neacceptat/);
  await assert.rejects(validateSafeUrl('http://example.com:22/feed'), /Port neacceptat/);
});

test('respinge URL gol sau neparsabil', async () => {
  await assert.rejects(validateSafeUrl(''), /gol/);
  await assert.rejects(validateSafeUrl(undefined), /gol/);
  await assert.rejects(validateSafeUrl('nu-e-un-url'), /parsat/);
});

test('isPrivateIp: granițe CIDR', () => {
  assert.equal(isPrivateIp('0.0.0.0'), true);
  assert.equal(isPrivateIp('0.1.2.3'), true);
  assert.equal(isPrivateIp('0.255.255.255'), true);
  assert.equal(isPrivateIp('9.255.255.255'), false);
  assert.equal(isPrivateIp('10.0.0.0'), true);
  assert.equal(isPrivateIp('11.0.0.0'), false);
  assert.equal(isPrivateIp('172.15.255.255'), false);
  assert.equal(isPrivateIp('172.16.0.0'), true);
  assert.equal(isPrivateIp('172.31.255.255'), true);
  assert.equal(isPrivateIp('172.32.0.0'), false);
  assert.equal(isPrivateIp('192.167.255.255'), false);
  assert.equal(isPrivateIp('192.168.255.255'), true);
  assert.equal(isPrivateIp('169.254.169.254'), true);
  assert.equal(isPrivateIp('100.63.255.255'), false);
  assert.equal(isPrivateIp('100.64.0.0'), true);
  assert.equal(isPrivateIp('100.128.0.0'), false);
  assert.equal(isPrivateIp('100.127.0.0'), true);
  assert.equal(isPrivateIp('101.0.0.0'), false);
  assert.equal(isPrivateIp('192.0.0.255'), true);
  assert.equal(isPrivateIp('192.0.1.0'), false);
});
