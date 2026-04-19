'use client';

export default function Header() {
  return (
    <header className="w-full border-b border-stone-200 bg-white/80 backdrop-blur-md py-4 px-6 md:px-10 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs tracking-tight"
            style={{ background: 'linear-gradient(135deg, #FF6B5B, #F5A623)' }}
          >
            DNA
          </div>
          <div>
            <p className="text-[10px] text-stone-400 leading-none mb-0.5 uppercase tracking-[0.15em] font-medium">Artist</p>
            <p className="font-bold text-stone-800 leading-none text-sm">DNA Content Engine</p>
          </div>
        </div>
        <span className="text-[11px] text-stone-400 border border-stone-200 rounded-full px-3 py-1 font-medium bg-stone-50">
          MVP v1.0
        </span>
      </div>
    </header>
  );
}
