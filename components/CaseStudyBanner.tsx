'use client';

interface Props {
  onLoad: () => void;
}

export default function CaseStudyBanner({ onLoad }: Props) {
  return (
    <div
      className="rounded-2xl p-4 mb-8 flex items-center justify-between gap-4"
      style={{
        background: 'linear-gradient(135deg, #FFF5F3 0%, #FFFBF0 50%, #F5F3FF 100%)',
        border: '1px solid rgba(245, 166, 35, 0.25)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: 'linear-gradient(135deg, #FFE4E0, #FFF3D6)' }}
        >
          🗺️
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">Demo: "New Chapter" Single Launch</p>
          <p className="text-xs text-stone-400 mt-0.5">
            Pop artist · empowerment anthem · targeting women 18–30
          </p>
        </div>
      </div>
      <button
        onClick={onLoad}
        className="shrink-0 text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #FF6B5B, #F5A623)',
          color: 'white',
          boxShadow: '0 2px 8px rgba(255, 107, 91, 0.3)',
        }}
      >
        Load Example
      </button>
    </div>
  );
}
