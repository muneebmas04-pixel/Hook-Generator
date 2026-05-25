import { NextRequest, NextResponse } from 'next/server';

const systemPrompt = `You are an Elite Short-Form Content Strategist and Senior Next.js Developer. Your job is to generate 5 short-form hook variations for the provided transcript using a data-backed algorithmic framework. Each hook must be 3-8 words only, include 1-2 emojis, and use one of these retention frameworks: Negative Bias, Contrarian Pivot, or High-Stakes Open Loop. Avoid cliches like 'Watch till the end,' 'You won't believe this,' 'Here's what happened,' or 'Life hack.' Output an array of 5 items, each with hook, visualCue, and retentionAnalytics.`;

function extractTopic(transcript: string) {
  const cleaned = transcript
    .replace(/\n+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  if (!cleaned) {
    return 'this topic';
  }

  const firstSentence = cleaned.split(/(?<=[.!?])\s+/)[0] || cleaned;
  const words = firstSentence
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(Boolean);

  if (words.length <= 3) {
    return firstSentence;
  }

  return words.slice(0, 3).join(' ');
}

function buildHookRows(topic: string) {
  return [
    {
      hook: `Stop wasting ${topic} ⚠️`,
      visualCue: `Show a quick, urgent cut of you shaking your head while pointing at a red alert overlay.`,
      retentionAnalytics: `Leverages negative bias and warning signals to trigger a reflexive pause, reducing swipe-away risk in the first 3 seconds.`,
    },
    {
      hook: `Everything about ${topic} is wrong`,
      visualCue: `Start with a surprised expression and text reveal that challenges the viewer's expectation.`,
      retentionAnalytics: `Uses contrarian tension to create an open loop; viewers stay to see how the belief is overturned.`,
    },
    {
      hook: `The dark truth about ${topic}`,
      visualCue: `Open on a moody close-up with dramatic red overlays and a whispery caption.`,
      retentionAnalytics: `Imposes curiosity through a high-stakes open loop, making the first seconds feel like a necessary reveal.`,
    },
    {
      hook: `Don't ignore ${topic} 🚨`,
      visualCue: `Flash a quick sequence of warning symbols and a text pulse to imply urgency.`,
      retentionAnalytics: `Highlights a negative bias by positioning the content as a neglected danger, which discourages immediate abandonment.`,
    },
    {
      hook: `Why ${topic} fails fast`,
      visualCue: `Show a brief visual of a collapsing chart or broken process to set up the payoff.`,
      retentionAnalytics: `Combines contrarian framing with a promise of a fast failure lesson, which keeps viewers engaged for the payoff.`,
    },
  ];
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const transcript = typeof body.transcript === 'string' ? body.transcript : '';
  const topic = extractTopic(transcript);
  const results = buildHookRows(topic);

  return NextResponse.json({ prompt: systemPrompt, hooks: results });
}
