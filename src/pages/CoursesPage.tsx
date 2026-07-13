import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLocale } from '../lib/locale';

const WA_LINK = 'https://wa.me/85298765432';

interface Course {
  id: string;
  course_name: string;
  course_name_en: string;
  age_group: string;
  age_group_en: string;
  description: string;
  description_en: string;
  schedule_info: string;
  schedule_info_en: string;
  fee: string;
  fee_en: string;
  image_url: string;
  sort_order: number;
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function CourseCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-slate-100 overflow-hidden shadow-sm flex flex-col animate-pulse">
      <div className="h-52 bg-slate-200" />
      <div className="p-7 flex flex-col gap-3 flex-1">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
          <div className="h-6 w-16 bg-slate-100 rounded-full" />
        </div>
        <div className="h-6 w-2/3 bg-slate-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-5/6 bg-slate-100 rounded" />
        </div>
        <div className="mt-auto h-12 w-full bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const { t, locale } = useLocale();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase
      .from('courses_Fencing_Plus')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (err) setError(locale === 'en' ? 'Failed to load courses. Please try again.' : '載入課程資料時發生錯誤，請稍後再試。');
        else setCourses(data ?? []);
        setLoading(false);
      });
  }, [locale]);

  const loc = (zhVal: string, enVal: string) =>
    locale === 'en' && enVal ? enVal : zhVal;

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/6077776/pexels-photo-6077776.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-primary-900/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            {t.courses.heroEyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">{t.courses.heroTitle}</h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto">{t.courses.heroSubtitle}</p>
        </div>
      </section>

      {/* Notice */}
      <section className="bg-gold/10 border-b border-gold/20 py-4">
        <p className="text-center text-primary font-semibold text-sm">{t.courses.notice}</p>
      </section>

      {/* Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {error && <p className="text-center text-red-500 py-12">{error}</p>}

          <div className="grid md:grid-cols-2 gap-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
              : courses.map((c, idx) => {
                  const isElite = idx === courses.length - 1 && courses.length > 1;
                  const palette = [
                    { border: 'border-gold', bg: 'bg-gold-50', tag: 'bg-gold text-primary-900', accent: 'text-gold' },
                    { border: 'border-primary', bg: 'bg-primary-50', tag: 'bg-primary text-white', accent: 'text-primary' },
                    { border: 'border-slate-200', bg: 'bg-slate-50', tag: 'bg-slate-700 text-white', accent: 'text-slate-700' },
                    { border: 'border-gold', bg: 'bg-gradient-to-br from-gold-50 to-primary-50', tag: 'bg-gradient-to-r from-gold to-gold-600 text-primary-900', accent: 'text-gold-600' },
                  ];
                  const p = palette[idx % palette.length];
                  const displayName = loc(c.course_name, c.course_name_en);
                  const displayAge = loc(c.age_group, c.age_group_en);
                  const displayDesc = loc(c.description, c.description_en);
                  const displaySchedule = loc(c.schedule_info, c.schedule_info_en);
                  const displayFee = loc(c.fee, c.fee_en);
                  const scheduleLines = displaySchedule.split('；').filter(Boolean);

                  return (
                    <div
                      key={c.id}
                      className={`rounded-3xl border-2 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${p.border} ${p.bg} ${isElite ? 'ring-2 ring-gold ring-offset-2' : ''}`}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={c.image_url}
                          alt={displayName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        {isElite && (
                          <div className="absolute top-4 right-4 bg-gold text-primary-900 text-xs font-black px-3 py-1 rounded-full shadow-lg">
                            {t.courses.eliteBadge}
                          </div>
                        )}
                      </div>

                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${p.tag}`}>{displayName}</span>
                          <span className="text-slate-500 text-sm font-medium">{displayAge}</span>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 mb-3">{displayName}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5">{displayDesc}</p>

                        {scheduleLines.length > 0 && (
                          <ul className="space-y-2 mb-6 flex-1">
                            {scheduleLines.map((line) => (
                              <li key={line} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className={`font-bold shrink-0 mt-0.5 ${p.accent}`}>✓</span>
                                {line}
                              </li>
                            ))}
                          </ul>
                        )}

                        {displayFee && (
                          <p className="text-xs text-slate-500 mb-4 border-t border-slate-200 pt-3">
                            <span className="font-semibold">{t.courses.feeLabel}</span>{displayFee}
                          </p>
                        )}

                        <a
                          href={`${WA_LINK}?text=${encodeURIComponent(`你好，我想查詢「${c.course_name}」的詳細資訊。`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold hover:bg-gold-400 text-primary-900 font-bold text-sm rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md shadow-gold/20"
                        >
                          {WA_ICON}
                          {t.courses.waButton}
                        </a>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-primary-50 border-t border-primary-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-black text-slate-900 mb-3">{t.courses.faqTitle}</h3>
          <p className="text-slate-500 mb-8">{t.courses.faqSubtitle}</p>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {t.courses.faq.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-5 shadow-sm border border-primary-100">
                <p className="font-bold text-primary text-sm mb-2">{item.q}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
