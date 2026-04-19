'use client';

export type Language = 'English' | 'Hebrew';

export interface BriefValues {
  objective: string;
  targetAudience: string;
  vibe: string;
  language: Language;
}

interface Props {
  values: BriefValues;
  onChange: (values: BriefValues) => void;
}

const OBJECTIVES = [
  { value: '', label: 'Select objective…' },
  { value: 'Album Launch',    label: '&#x1F4BF; Album Launch' },
  { value: 'Single Release',  label: '&#x1F3B5; Single Release' },
  { value: 'Concert Promo',   label: '&#x1F3A4; Concert Promo' },
  { value: 'Merch Drop',      label: '&#x1F455; Merch Drop' },
  { value: 'Behind the Scenes', label: '&#x1F39E; Behind the Scenes' },
];

const labelClass = 'block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2';
const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-colors';

export default function BriefForm({ values, onChange }: Props) {
  const set = <K extends keyof BriefValues>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange({ ...values, [key]: e.target.value as BriefValues[K] });

  return (
    <div className="space-y-5">
      {/* Objective */}
      <div>
        <label className={labelClass}>Objective</label>
        <select value={values.objective} onChange={set('objective')} className={inputClass + ' cursor-pointer'}>
          {OBJECTIVES.map((o) => (
            <option key={o.value} value={o.value} dangerouslySetInnerHTML={{ __html: o.label }} />
          ))}
        </select>
      </div>

      {/* Target Audience */}
      <div>
        <label className={labelClass}>Target Audience</label>
        <input
          type="text"
          placeholder="e.g. Gen Z fans of Indie Rock"
          value={values.targetAudience}
          onChange={set('targetAudience')}
          className={inputClass}
        />
      </div>

      {/* Vibe / Style */}
      <div>
        <label className={labelClass}>Vibe / Style</label>
        <input
          type="text"
          placeholder="e.g. Retro, Gritty, Dreamy"
          value={values.vibe}
          onChange={set('vibe')}
          className={inputClass}
        />
      </div>

      {/* Language Toggle */}
      <div>
        <label className={labelClass}>Language</label>
        <div className="flex rounded-xl overflow-hidden border border-white/10 w-fit">
          {(['English', 'Hebrew'] as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onChange({ ...values, language: lang })}
              className={`px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                values.language === lang
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-white/40 hover:text-white/70'
              }`}
            >
              {lang === 'Hebrew' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
