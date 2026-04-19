'use client';

export type Language = 'English' | 'Hebrew';

export interface BriefValues {
  objective: string;
  targetAudience: string;
  vibe: string;
  language: Language;
  includeHashtags: boolean;
}

interface Props {
  values: BriefValues;
  onChange: (values: BriefValues) => void;
}

const OBJECTIVES = [
  { value: '', label: 'Select objective…' },
  { value: 'Album Launch',       label: '💿 Album Launch' },
  { value: 'Single Release',     label: '🎵 Single Release' },
  { value: 'Concert Promo',      label: '🎤 Concert Promo' },
  { value: 'Merch Drop',         label: '👕 Merch Drop' },
  { value: 'Behind the Scenes',  label: '🎞️ Behind the Scenes' },
];

const labelClass = 'block text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-400 mb-2';
const inputClass =
  'w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all';

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
            <option key={o.value} value={o.value}>{o.label}</option>
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
        <div className="flex rounded-xl overflow-hidden border border-stone-200 w-fit bg-stone-50">
          {(['English', 'Hebrew'] as Language[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => onChange({ ...values, language: lang })}
              className={`px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                values.language === lang
                  ? 'text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
              style={
                values.language === lang
                  ? { background: 'linear-gradient(135deg, #9B8EC4, #7C6FAF)' }
                  : {}
              }
            >
              {lang === 'Hebrew' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>
          ))}
        </div>
      </div>

      {/* Hashtags toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group w-fit">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={values.includeHashtags}
              onChange={(e) => onChange({ ...values, includeHashtags: e.target.checked })}
            />
            <div
              className="w-10 h-6 rounded-full transition-all duration-200"
              style={{ background: values.includeHashtags ? 'linear-gradient(135deg, #FF6B5B, #F5A623)' : '#E7E5E4' }}
            />
            <div
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
              style={{ left: values.includeHashtags ? '22px' : '4px' }}
            />
          </div>
          <span className="text-sm font-medium text-stone-600 group-hover:text-stone-800 transition-colors select-none">
            Include hashtags
          </span>
        </label>
      </div>
    </div>
  );
}
