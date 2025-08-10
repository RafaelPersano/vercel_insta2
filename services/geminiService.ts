export async function generateWithServer(prompt: string) {
  const resp = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Server error: ${resp.status} - ${text}`);
  }
  return resp.json();
}
