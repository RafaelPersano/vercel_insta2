# InstaStyle — Vercel (secure Gemini 2.0 Flash)

## Deploy no Vercel
1. Suba este projeto para um repositório no GitHub.
2. No Vercel, crie um novo projeto a partir desse repositório.
3. Em Settings → Environment Variables, adicione:
   - `API_KEY` = sua chave do Gemini
4. Deploy automático será feito.
5. Acesse a URL do projeto e teste enviando prompts.

## Observações
- Backend seguro: chave nunca vai para o cliente.
- Função `/api/generate` faz proxy para o Gemini 2.0 Flash.
