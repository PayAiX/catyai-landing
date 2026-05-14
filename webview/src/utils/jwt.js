/**
 * Decodează JWT payload client-side (fără verificare secret).
 * Verificarea reală se face server-side la POST /api/webview/action.
 */
export function decodeJWT(token) {
  try {
    // Strip any trailing garbage WhatsApp may append to URL
    const cleanToken = token.split('&')[0].split('#')[0].trim();
    const parts = cleanToken.split('.');
    if (parts.length !== 3) return null;
    // Fix base64url → base64 + add padding
    let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (payload.length % 4 !== 0) payload += '=';
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function isExpired(payload) {
  if (!payload?.exp) return true;
  return Math.floor(Date.now() / 1000) > payload.exp;
}
