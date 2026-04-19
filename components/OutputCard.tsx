'use client';

import { useState } from 'react';

export interface GenerationResult {
  post: string;
  imagePrompt: string;
  brandAlignment: number;
  alignmentReason: string;
}

interface Props {
  result: GenerationResult;
  language: string;
}

export default function OutputCard({ result, language }: Props) {
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const copy = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const score = result.brandAlignment;
  const scoreColor   = score >= 80 ? '#9B8EC4' : score >= 60 ? '#F5A623' : '#FF6B5B';
  const scoreBg      = score >= 80 ? '#F5F3FF' : score >= 60 ? '#FFFBEB' : '#FFF5F3';
  const scoreLabel   = score >= 80 ? 'Highly Aligned' : score >= 60 ? 'Moderately Aligned' : 'Needs Refinement';

  return (
    <div className="animate-fade-in-up space-y-4">

      {/* Generated Post */}
      <div className="surface rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: '#FF6B5B' }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">Generated Post</p>
          </div>
          <button
            onClick={() => copy(result.post, setCopiedPost)}
            className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer font-medium"
          >
            {copiedPost ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <p
          className={`text-sm leading-relaxed text-stone-700 whitespace-pre-line ${language === 'Hebrew' ? 'text-right' : ''}`}
          dir={language === 'Hebrew' ? 'rtl' : 'ltr'}
        >
          {result.post}
        </p>
      </div>

      {/* Midjourney Prompt */}
      <div className="surface rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: '#F5A623' }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">Midjourney Prompt</p>
          </div>
          <button
            onClick={() => copy(result.imagePrompt, setCopiedPrompt)}
            className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 text-stone-500 hover:text-stone-800 hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer font-medium"
          >
            {copiedPrompt ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <div className="surface-inner rounded-xl p-4">
          <p className="text-sm leading-relaxed font-mono" style={{ color: '#9B8EC4' }}>
            <span className="text-stone-400 font-sans font-medium">/imagine</span>{' '}
            {result.imagePrompt}
          </p>
        </div>
      </div>

      {/* Brand Alignment Score */}
      <div className="surface rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-2 h-2 rounded-full" style={{ background: scoreColor }} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">Brand Alignment</p>
        </div>

        <div className="flex items-center gap-5">
          {/* Score Ring */}
          <div className="relative shrink-0 w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#F5F0EC" strokeWidth="7" />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke={scoreColor}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 213.6} 213.6`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-black text-stone-800">{score}</span>
            </div>
          </div>

          {/* Score label + reason */}
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
              style={{ background: scoreBg, color: scoreColor }}
            >
              {scoreLabel}
            </span>
            <p className="text-sm text-stone-500 leading-relaxed">{result.alignmentReason}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${score}%`,
              background: `linear-gradient(90deg, #FF6B5B, ${scoreColor})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
