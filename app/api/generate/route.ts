import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const { brandDNA, objective, targetAudience, vibe, language } = await req.json();

    if (!brandDNA || !objective) {
      return NextResponse.json({ error: 'brandDNA and objective are required' }, { status: 400 });
    }

    const langInstruction =
      language === 'Hebrew'
        ? 'Write the social media post entirely in Hebrew (right-to-left). The image prompt should remain in English.'
        : 'Write the social media post in English.';

    const systemPrompt = `You are an expert music marketing strategist and social media copywriter.
You specialize in crafting content that feels authentically rooted in an artist's creative DNA — never generic, always deeply personal.
Your output must be structured, actionable, and emotionally resonant.`;

    const userPrompt = `Analyze the following Artist Brand DNA and generate social media content.

---
BRAND DNA (the artist's voice, story, or lyrics):
${brandDNA}
---

CAMPAIGN BRIEF:
- Objective: ${objective}
- Target Audience: ${targetAudience || 'General music fans'}
- Vibe/Style: ${vibe || 'Authentic'}
- Language: ${language}

${langInstruction}

Generate a response in the following EXACT JSON format (no markdown, no extra text — raw JSON only):
{
  "post": "<The social media caption/post, 3-5 sentences, emotionally resonant, with 3-5 relevant hashtags at the end>",
  "imagePrompt": "<A detailed Midjourney image prompt that visually captures the mood of this content, ~50 words, starting with a subject description>",
  "brandAlignment": <integer from 1 to 100 representing how well this content aligns with the Brand DNA>,
  "alignmentReason": "<1-2 sentences explaining why this score was given>"
}`;

    const message = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';

    let parsed: {
      post: string;
      imagePrompt: string;
      brandAlignment: number;
      alignmentReason: string;
    };

    try {
      // Strip potential markdown fences
      const clean = rawText.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      return NextResponse.json({ error: 'Failed to parse Claude response', raw: rawText }, { status: 500 });
    }

    // Persist to Supabase (non-blocking — we don't fail the request if it errors)
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('generations').insert({
          brand_dna: brandDNA,
          objective,
          target_audience: targetAudience,
          vibe,
          language,
          post: parsed.post,
          image_prompt: parsed.imagePrompt,
          brand_alignment: parsed.brandAlignment,
          alignment_reason: parsed.alignmentReason,
        }).throwOnError();
      } catch {
        // Table may not exist yet — fail silently
      }
    }

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
