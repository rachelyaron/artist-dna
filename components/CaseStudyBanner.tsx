'use client';

interface Props {
  onLoad: () => void;
}

export default function CaseStudyBanner({ onLoad }: Props) {
  return (
    <div className="glass-card rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">&#x1F5BC;</span>
        <div>
          <p className="text-sm font-semibold text-white">Case Study: The Lighthouse</p>
          <p className="text-xs text-white/50 mt-0.5">
            A lonely girl at sea finds a lighthouse — dreamy indie folk single launch
          </p>
        </div>
      </div>
      <button
        onClick={onLoad}
        className="shrink-0 text-xs font-semibold px-4 py-2 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-300 transition-colors cursor-pointer"
      >
        Load Example
      </button>
    </div>
  );
}
