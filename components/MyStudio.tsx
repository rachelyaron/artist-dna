'use client';

export default function MyStudio() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center text-3xl mb-6"
        style={{ background: 'linear-gradient(135deg, #FFE4E0, #FFF3D6, #EDE9FF)' }}
      >
        🎵
      </div>

      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border rounded-full px-4 py-1.5 mb-5"
        style={{ color: '#9B8EC4', borderColor: '#C4BAE8', background: '#F5F3FF' }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#9B8EC4' }} />
        Coming Soon
      </div>

      <h2 className="text-2xl font-black text-stone-800 mb-3">My Studio</h2>
      <p className="text-stone-400 text-base max-w-sm leading-relaxed">
        Save and revisit your past generations. Personal accounts coming in the next version.
      </p>

      <div className="mt-10 grid grid-cols-3 gap-3 w-full max-w-sm opacity-30 pointer-events-none select-none">
        {[
          { obj: 'Single Release', score: 91 },
          { obj: 'Concert Promo',  score: 78 },
          { obj: 'Album Launch',   score: 85 },
        ].map((item, i) => (
          <div key={i} className="surface rounded-xl p-3 text-left">
            <div className="w-full h-2 bg-stone-200 rounded-full mb-2" />
            <div className="w-3/4 h-2 bg-stone-100 rounded-full mb-3" />
            <span className="text-[10px] font-bold text-stone-400">{item.obj}</span>
            <p className="text-xs font-black mt-1" style={{ color: '#9B8EC4' }}>{item.score}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-stone-300 mt-4">Preview of what's coming</p>
    </div>
  );
}
