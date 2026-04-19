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
  const scoreColor =
    score >= 80 ? '#a78bfa' : score >= 60 ? '#fb923c' : '#f87171';
  const scoreLabel =
    score >= 80 ? 'Highly Aligned' : score >= 60 ? 'Moderately Aligned' : 'Needs Refinement';

  const degrees = (score / 100) * 360;

  return (
    <div className="animate-fade-in-up space-y-4">
      {/* Post Content */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Generated Post</p>
          <button
            onClick={() => copy(result.post, setCopiedPost)}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            {copiedPost ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p
          className={`text-sm leading-relaxed text-white/90 whitespace-pre-line ${language === 'Hebrew' ? 'text-right' : ''}`}
          dir={language === 'Hebrew' ? 'rtl' : 'ltr'}
        >
          {result.post}
        </p>
      </div>

      {/* Image Prompt */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">✦</span>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Midjourney Prompt</p>
          </div>
          <button
            onClick={() => copy(result.imagePrompt, setCopiedPrompt)}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            {copiedPrompt ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-sm text-violet-300/80 italic leading-relaxed font-mono">
          /imagine {result.imagePrompt}
        </p>
      </div>

      {/* Brand Alignment Score */}
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Brand Alignment</p>
        <div className="flex items-center gap-6">
          {/* Score Ring */}
          <div className="relative shrink-0 w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
              <circle
                cx="40" cy="40" r="34"
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 213.6} 213.6`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{score}</span>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1">
            <p className="text-base font-semibold" style={{ color: scoreColor }}>{scoreLabel}</p>
            <p className="text-sm text-white/50 mt-1.5 leading-relaxed">{result.alignmentReason}</p>
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-5 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${score}%`,
              background: `linear-gradient(90deg, #a78bfa, ${scoreColor})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
