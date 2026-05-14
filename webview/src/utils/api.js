export async function submitAction(action, data) {
  const token = new URLSearchParams(window.location.search).get('t');
  const res = await fetch('https://api.catyai.io/api/webview/action', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ action, data }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
