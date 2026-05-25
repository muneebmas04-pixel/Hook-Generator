'use client';

import { useState } from 'react';

type HookCard = {
  hook: string;
  visualCue: string;
  retentionAnalytics: string;
};

type ResponsePayload = {
  prompt: string;
  hooks: HookCard[];
};

const internalPrompt = `Act as a Senior Next.js Developer and an Elite Short-Form Content Strategist.

When the transcript is submitted, process it using the following strict data-backed hook framework to output exactly 5 Hook Variations.

Length & Format: Maximum 3–8 words ONLY. No long sentences. No context or explanations in the hook itself. Use 1-2 highly relevant emojis.

Algorithmic Triggers (Data-Backed): Every hook must utilize one of the three highest-performing algorithmic frameworks for 3-second retention:
- Negative Bias / The Warning
- The Contrarian Pivot
- The High-Stakes Open Loop

Strict Anti-Cliche Rule: NEVER use generic hooks like: "Watch till the end," "You won't believe this," "Here's what happened," or "Life hack."

The Payoff Mapping: The hook must accurately tease the highest-value moment in the transcript to ensure the Average Percentage Viewed (APV) doesn't drop after the first 3 seconds.

Output Format Requirement: For each of the 5 hooks generated, display a visually distinct card containing:
- The Hook
- Visual/B-Roll Cue
- Retention Analytics
`;

export default function HomePage() {
  const [transcript, setTranscript] = useState('');
  const [hooks, setHooks] = useState<HookCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promptText, setPromptText] = useState(internalPrompt);

  async function generateHooks() {
    setLoading(true);
    setError(null);
    setHooks([]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate hooks.');
      }

      const data = (await response.json()) as ResponsePayload;
      setHooks(data.hooks);
      setPromptText(data.prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-hero-gradient p-8 shadow-glow">
        <div className="mb-10 rounded-3xl border border-white/10 bg-[#0c0c0f]/80 p-8 glass-panel">
          <div className="mb-4 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-neon">Hook Generator</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              High-Retention Short-Form Hooks
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Paste your transcript and generate 5 data-backed hooks, each with a visual cue and retention analysis designed for TikTok, Reels, and Shorts.
            </p>
          </div>

          <textarea
            value={transcript}
            onChange={(event) => setTranscript(event.target.value)}
            placeholder="Paste your video transcript here..."
            className="min-h-[260px] w-full rounded-3xl border border-white/10 bg-black/40 px-5 py-5 text-sm text-white shadow-xl outline-none transition focus:border-neon/80 focus:ring-2 focus:ring-neon/20"
          />

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={generateHooks}
              disabled={loading || !transcript.trim()}
              className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-neon via-red-500 to-red-600 px-7 py-4 text-sm font-semibold text-black shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? 'Generating...' : 'Generate Hooks'}
            </button>
            <p className="max-w-2xl text-xs text-slate-400 sm:text-sm">
              This app uses a mock API route now. Swap in your OpenAI/Anthropic call later using the built-in system prompt.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {error ? (
              <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            {hooks.length > 0 ? (
              hooks.map((item, index) => (
                <div key={index} className="glass-panel rounded-[28px] border border-white/10 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-neon">Hook {index + 1}</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{item.hook}</h2>
                  <div className="mt-5 space-y-4 text-sm text-slate-300">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-white">Visual/B-Roll Cue</p>
                      <p>{item.visualCue}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-white">Retention Analytics</p>
                      <p>{item.retentionAnalytics}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel rounded-[28px] border border-white/10 p-8 text-slate-400">
                Generate 5 hook variations to preview the output cards here.
              </div>
            )}
          </div>

          <div className="glass-panel rounded-[28px] border border-white/10 p-6 text-sm text-slate-300 shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-neon">Internal System Prompt</p>
            <pre className="mt-5 max-h-[640px] overflow-auto whitespace-pre-wrap rounded-3xl border border-white/10 bg-black/40 p-4 text-sm leading-6 text-slate-200 scrollbar-thin">
              {promptText}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
