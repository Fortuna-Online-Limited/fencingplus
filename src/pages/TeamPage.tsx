import { useEffect, useState } from 'react';
import { Award, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLocale } from '../lib/locale';

type Page = 'home' | 'about' | 'team' | 'facilities';

interface TeamPageProps {
  onNavigate: (page: Page) => void;
}

interface Coach {
  id: string;
  coach_name: string;
  coach_name_en: string;
  title: string;
  title_en: string;
  experience: string[];
  experience_en: string[];
  bio: string;
  bio_en: string;
  avatar_url: string;
  sort_order: number;
}


const STAT_ICONS = [Award, Users];

const HEAD_COACH_BADGE = 'bg-gold text-primary-900';
const ELITE_BADGE = 'bg-primary text-white';

function isHeadCoach(coach: Coach) {
  return (
    coach.title.includes('總教練') ||
    coach.title_en.toLowerCase().includes('head coach')
  );
}

function badgeClass(coach: Coach) {
  return isHeadCoach(coach) ? HEAD_COACH_BADGE : ELITE_BADGE;
}

function CoachCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col animate-pulse">
      <div className="h-72 bg-slate-200" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-6 w-1/2 bg-slate-200 rounded" />
        <div className="h-4 w-1/3 bg-slate-100 rounded" />
        <div className="space-y-2 mt-2">
          <div className="h-3 w-full bg-slate-100 rounded" />
          <div className="h-3 w-5/6 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function TeamPage({ onNavigate }: TeamPageProps) {
  const { t, locale } = useLocale();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase
      .from('coaches_Fencing_Plus')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (err) setError(locale === 'en' ? 'Failed to load coaches.' : '載入教練資料時發生錯誤，請稍後再試。');
        else setCoaches(data ?? []);
        setLoading(false);
      });
  }, [locale]);

  const loc = (zhVal: string, enVal: string) =>
    locale === 'en' && enVal ? enVal : zhVal;

  const coachName = (c: Coach) => loc(c.coach_name, c.coach_name_en);

  const locArr = (zhArr: string[], enArr: string[]) =>
    locale === 'en' && enArr.length > 0 ? enArr : zhArr;

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/05_Facilities_Contact/Site_and_Equipment-Photos_of_the_Actual_Site/site_01_v2.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-primary-900/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            {t.team.heroEyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">{t.team.heroTitle}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">{t.team.heroSubtitle}</p>
        </div>
      </section>

      {/* Team stats */}
      <section className="bg-primary py-10">
        <div className="max-w-xl mx-auto px-6 grid grid-cols-2 gap-6 text-center">
          {t.team.stats.map((s, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="text-white font-black text-xl">{s.value}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Coach cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              {t.team.sectionLabel}
            </span>
            <h2 className="mt-3 text-4xl font-black text-slate-900">{t.team.sectionTitle}</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">{t.team.sectionSubtitle}</p>
          </div>

          {error && <p className="text-center text-red-500 py-12">{error}</p>}

          {/* Head coach featured card */}
          {!loading && coaches.filter(isHeadCoach).map((coach) => {
            const displayTitle = loc(coach.title, coach.title_en);
            const displayBio = loc(coach.bio, coach.bio_en);
            const displayExp = locArr(coach.experience, coach.experience_en);
            return (
              <div
                key={coach.id}
                className="mb-10 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-2 border-gold/40 hover:-translate-y-1 transition-all duration-300 grid md:grid-cols-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={coach.avatar_url}
                    alt={coach.coach_name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 text-sm font-bold rounded-full ${HEAD_COACH_BADGE} shadow-lg`}>
                      {displayTitle}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="font-black text-slate-900 text-2xl mb-1">{coachName(coach)}</h3>
                  <p className="text-primary font-semibold text-sm mb-4">{displayTitle}</p>
                  {displayBio && (
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{displayBio}</p>
                  )}
                  {displayExp.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                        {t.team.achievementsLabel}
                      </p>
                      <ul className="space-y-1.5">
                        {displayExp.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm text-slate-600 leading-relaxed">
                            <span className="text-gold font-bold mt-0.5 shrink-0">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Elite members grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && coaches.filter((c) => !isHeadCoach(c)).map((coach, idx) => {
              const displayTitle = loc(coach.title, coach.title_en);
              const displayBio = loc(coach.bio, coach.bio_en);
              const displayExp = locArr(coach.experience, coach.experience_en);

              return (
                <div
                  key={coach.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <img
                      src={coach.avatar_url}
                      alt={coach.coach_name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 20%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${ELITE_BADGE}`}>
                        {displayTitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="font-black text-slate-900 text-xl">{coachName(coach)}</h3>
                      <p className="text-primary font-semibold text-sm">{displayTitle}</p>
                    </div>

                    {displayBio && (
                      <p className="text-slate-500 text-xs leading-relaxed mb-3">{displayBio}</p>
                    )}

                    {displayExp.length > 0 && (
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                          {t.team.achievementsLabel}
                        </p>
                        <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {displayExp.map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed">
                              <span className="text-gold font-bold mt-0.5 shrink-0">▸</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skeletons while loading */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <CoachCardSkeleton key={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* Teaching philosophy */}
      <section className="py-20 bg-primary-50 border-t border-primary-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            {t.team.philosophySectionLabel}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900 mb-6">
            {t.team.philosophyTitle}
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg max-w-2xl mx-auto mb-8">
            {t.team.philosophyBody}
          </p>
          <button
            onClick={() => onNavigate('facilities')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg"
          >
            {t.team.philosophyButton}
          </button>
        </div>
      </section>
    </div>
  );
}
