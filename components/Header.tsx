'use client';

export default function Header() {
  return (
    <header className="w-full border-b border-white/8 py-5 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
            DNA
          </div>
          <div>
            <p className="text-xs text-white/40 leading-none mb-0.5 uppercase tracking-widest">Artist</p>
            <p className="font-semibold text-white leading-none">DNA Content Engine</p>
          </div>
        </div>
        <span className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">MVP v1.0</span>
      </div>
    </header>
  );
}
