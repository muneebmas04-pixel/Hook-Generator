# Next Hook Generator

A ready-to-deploy Next.js app for generating high-retention short-form video hooks.

## Included files
- `app/page.tsx` — main UI with transcript input and hook cards
- `app/api/generate/route.ts` — mock API route returning dummy data
- `tailwind.config.ts` — custom red/black gradient and glassmorphism theme
- `app/globals.css` — global dark styling and glass panel styles

## Local setup
1. Install Node.js 20+ from https://nodejs.org/
2. Open a terminal inside `next-hook-generator`
3. Run `npm install`
4. Run `npm run dev`
5. Open `http://localhost:3000`

## Deploy to Vercel via GitHub
1. Create a GitHub repository and push the `next-hook-generator` folder.
2. Go to https://vercel.com and sign in.
3. Click **New Project** and import your GitHub repo.
4. Use the default settings; Vercel will detect Next.js automatically.
5. Deploy.

## Replace dummy logic with a real LLM call
- Update `app/api/generate/route.ts` to invoke OpenAI or Anthropic using your API key.
- Keep the same JSON response shape: `{ hooks: [{ hook, visualCue, retentionAnalytics }] }`.
- Use the `systemPrompt` constant as the internal prompt for the model.
