'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CaseStudyBanner from '@/components/CaseStudyBanner';
import BriefForm, { BriefValues } from '@/components/BriefForm';
import OutputCard, { GenerationResult } from '@/components/OutputCard';
import { CASE_STUDY } from '@/lib/caseStudy';

const INITIAL_BRIEF: BriefValues = {
  objective: '',
  targetAudience: '',
  vibe: '',
  language: 'English',
};

export default function Home() {
  const [brandDNA, setBrandDNA] = useState('');
  const [brief, setBrief] = useState<BriefValues>(INITIAL_BRIEF);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState('');

  const loadCaseStudy = () => {
    setBrandDNA(CASE_STUDY.brandDNA);
    setBrief({
      objective: CASE_STUDY.objective,
      targetAudience: CASE_STUDY.targetAudience,
      vibe: CASE_STUDY.vibe,
      language: CASE_STUDY.language as BriefValues['language'],
    });
    setResult(null);
    setError('');
  };

  const generate = async () => {
    if (!brandDNA.trim()) { setError('Please paste your Brand DNA first.'); return; }
    if (!brief.objective)  { setError('Please select an objective.'); return; }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandDNA, ...brief }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Generation failed');

      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const charsLeft = 2000 - brandDNA.length;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #130d1f 50%, #0d1320 100%)' }}>
      <Header />

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text mb-3">
            Artist DNA Content Engine
          </h1>
          <p className="text-white/50 text-lg">
            Paste your creative DNA. Get content that sounds unmistakably like <em>you</em>.
          </p>
        </div>

        <CaseStudyBanner onLoad={loadCaseStudy} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Input Panel */}
          <div className="space-y-6">

            {/* Brand DNA */}
            <div className="glass-card rounded-2xl p-6">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Brand DNA
              </label>
              <p className="text-xs text-white/30 mb-3">
                Paste lyrics, a story, a manifesto — anything that captures your artistic voice.
              </p>
              <textarea
                value={brandDNA}
                onChange={(e) => setBrandDNA(e.target.value.slice(0, 2000))}
                placeholder={"\"She stands at the edge of the boat, the salt water is cold and endless beneath her...\"\n\nPaste your Brand DNA here — lyrics, a story, or a creative manifesto that defines your sound and soul."}
                rows={10}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-colors resize-none"
              />
              <p className={`text-right text-xs mt-1.5 ${charsLeft < 100 ? 'text-orange-400' : 'text-white/20'}`}>
                {charsLeft} characters remaining
              </p>
            </div>

            {/* Brief Form */}
            <div className="glass-card rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Campaign Brief</p>
              <BriefForm values={brief} onChange={setBrief} />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-base text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
              style={{
                background: loading
                  ? 'rgba(139,92,246,0.4)'
                  : 'linear-gradient(135deg, #7c3aed 0%, #a21caf 50%, #ea580c 100%)',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Generating your content…
                </span>
              ) : (
                '✦ Generate Content'
              )}
            </button>
          </div>

          {/* RIGHT — Output Panel */}
          <div>
            {!result && !loading && (
              <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-72">
                <div className="w-16 h-16 rounded-2xl bg-violet-600/20 flex items-center justify-center mb-5 text-3xl">
                  ✦
                </div>
                <p className="text-white/50 text-base font-medium mb-2">Your content will appear here</p>
                <p className="text-white/25 text-sm">
                  Fill in your Brand DNA and campaign brief, then hit Generate.
                </p>
              </div>
            )}

            {loading && (
              <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-72">
                <div className="relative w-16 h-16 mb-5">
                  <svg className="animate-spin w-16 h-16" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="rgba(139,92,246,0.2)" strokeWidth="6" />
                    <path d="M32 4a28 28 0 0128 28" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="g" x1="32" y1="4" x2="60" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-white/60 text-sm">Claude is reading your DNA…</p>
              </div>
            )}

            {result && !loading && (
              <OutputCard result={result} language={brief.language} />
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-12">
          Powered by Claude AI · Artist DNA Content Engine MVP
        </p>
      </main>
    </div>
  );
}
