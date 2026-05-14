/**
 * Decodează JWT payload client-side (fără verificare secret).
 * Verificarea reală se face server-side la POST /api/webview/action.
 */
export function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function isExpired(payload) {
  if (!payload?.exp) return true;
  return Math.floor(Date.now() / 1000) > payload.exp;
}
