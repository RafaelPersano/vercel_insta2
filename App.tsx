import React, { useState } from 'react';
import { generateWithServer } from './services/geminiService';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await generateWithServer(prompt);
      setResult(JSON.stringify(res, null, 2));
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{fontFamily:'Arial, sans-serif', padding:20}}>
      <h1>InstaStyle — Vercel (backend seguro)</h1>
      <p>Prompt para Gemini (chave fica no backend).</p>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={6} cols={60} />
      <div style={{marginTop:10}}>
        <button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
          {loading ? 'Gerando...' : 'Gerar'}
        </button>
      </div>
      {error && <pre style={{color:'crimson'}}>{error}</pre>}
      {result && <pre style={{whiteSpace:'pre-wrap', background:'#f3f3f3', padding:10}}>{result}</pre>}
    </div>
  );
}
