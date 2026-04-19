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
  includeHashtags: true,
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
      includeHashtags: true,
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #FDFAF6 0%, #FFF8F5 40%, #F9F7FF 100%)' }}>
      <Header />

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12">

        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-400 border border-stone-200 rounded-full px-4 py-1.5 mb-5 bg-white">
            <span className="w-1.5 h-1.5 rounded-full bg-coral-400" style={{ background: '#FF6B5B' }} />
            Powered by Claude AI
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight gradient-text mb-4 leading-tight">
            Artist DNA<br />Content Engine
          </h1>
          <p className="text-stone-500 text-lg max-w-lg mx-auto leading-relaxed">
            Paste your creative DNA. Get content that sounds unmistakably like <em className="text-stone-700 not-italic font-semibold">you</em>.
          </p>
        </div>

        <CaseStudyBanner onLoad={loadCaseStudy} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Input Panel */}
          <div className="space-y-5">

            {/* Brand DNA */}
            <div className="surface rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ background: '#FF6B5B' }} />
                <label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">
                  Brand DNA
                </label>
              </div>
              <p className="text-xs text-stone-400 mb-3 ml-4">
                Paste lyrics, a story, a manifesto — anything that captures your artistic voice.
              </p>
              <textarea
                value={brandDNA}
                onChange={(e) => setBrandDNA(e.target.value.slice(0, 2000))}
                placeholder={`"She stands at the edge of the boat, the salt water is cold and endless beneath her..."\n\nPaste your Brand DNA here — lyrics, a story, or a creative manifesto that defines your sound and soul.`}
                rows={10}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
              />
              <p className={`text-right text-xs mt-1.5 font-medium ${charsLeft < 100 ? 'text-orange-500' : 'text-stone-300'}`}>
                {charsLeft} characters remaining
              </p>
            </div>

            {/* Campaign Brief */}
            <div className="surface rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full" style={{ background: '#F5A623' }} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400">Campaign Brief</p>
              </div>
              <BriefForm values={brief} onChange={setBrief} />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                <span>⚠</span> {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generate}
              disabled={loading}
              className="btn-generate w-full py-4 rounded-2xl font-bold text-base text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
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
                <span className="flex items-center justify-center gap-2">
                  <span>✦</span> Generate Content
                </span>
              )}
            </button>
          </div>

          {/* RIGHT — Output Panel */}
          <div>
            {!result && !loading && (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-80 border border-dashed border-stone-200"
                style={{ background: 'linear-gradient(135deg, #FFFBF8 0%, #F9F7FF 100%)' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-2xl"
                  style={{ background: 'linear-gradient(135deg, #FFE4E0, #FFF3D6, #EDE9FF)' }}
                >
                  ✦
                </div>
                <p className="text-stone-600 text-base font-semibold mb-2">Your content will appear here</p>
                <p className="text-stone-400 text-sm max-w-48">
                  Fill in your Brand DNA and campaign brief, then hit Generate.
                </p>
              </div>
            )}

            {loading && (
              <div
                className="rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-80 border border-dashed border-amber-200"
                style={{ background: 'linear-gradient(135deg, #FFFBF0 0%, #FFF8F5 100%)' }}
              >
                <div className="relative w-16 h-16 mb-5">
                  <svg className="animate-spin w-16 h-16" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="#F5EDD6" strokeWidth="6" />
                    <path d="M32 4a28 28 0 0128 28" stroke="url(#lg)" strokeWidth="6" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="lg" x1="32" y1="4" x2="60" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF6B5B" />
                        <stop offset="1" stopColor="#F5A623" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="text-stone-500 text-sm font-medium">Claude is reading your DNA…</p>
              </div>
            )}

            {result && !loading && (
              <OutputCard result={result} language={brief.language} objective={brief.objective} vibe={brief.vibe} />
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-stone-300 text-xs mt-14 font-medium">
          Powered by Claude AI · Artist DNA Content Engine MVP · Built by Rachel Yaron
        </p>
      </main>
    </div>
  );
}
