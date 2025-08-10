import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing prompt in request body' });
    return;
  }

  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    res.status(500).json({ error: 'API_KEY not configured in environment' });
    return;
  }

  try {
    const GEMINI_URL =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    const body = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };

    const r = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': API_KEY
      },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const errText = await r.text();
      res.status(r.status).send(errText);
      return;
    }

    const data = await r.json();
    res.status(200).json(data);
  } catch (err: any) {
    console.error('Error calling Gemini API:', err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
