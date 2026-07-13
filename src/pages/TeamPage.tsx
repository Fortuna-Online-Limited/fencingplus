import { useEffect, useState } from 'react';
import { Award, Users, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface TeamPageProps {
  onNavigate: (page: Page) => void;
}

interface Coach {
  id: string;
  coach_name: string;
  title: string;
  experience: string[];
  bio: string;
  avatar_url: string;
  sort_order: number;
}

const WA_LINK = 'https://wa.me/85298765432';

const teamStats = [
  { icon: Award, value: '港隊級別', label: '創辦教練背景' },
  { icon: Users, value: '4 位', label: '認證教練' },
  { icon: Heart, value: '8:1', label: '師生比例上限' },
];

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
          <div className="h-3 w-4/6 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function TeamPage({ onNavigate: _onNavigate }: TeamPageProps) {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase
      .from('coaches_Fencing_Plus')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (err) setError('載入教練資料時發生錯誤，請稍後再試。');
        else setCoaches(data ?? []);
        setLoading(false);
      });
  }, []);

  const badgePalette = [
    'bg-gold text-primary-900',
    'bg-primary text-white',
    'bg-primary text-white',
    'bg-gold text-primary-900',
  ];

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3766256/pexels-photo-3766256.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-primary-900/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Our Team
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">教練團隊</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            每位教練均具備豐富競技資歷與兒童教學經驗，以耐心、親和力和專業引領每一位學員
          </p>
        </div>
      </section>

      {/* Team stats */}
      <section className="bg-primary py-10">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          {teamStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <s.icon className="w-5 h-5 text-gold" />
              </div>
              <div className="text-white font-black text-xl">{s.value}</div>
              <div className="text-white/60 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Coach cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              認識教練
            </span>
            <h2 className="mt-3 text-4xl font-black text-slate-900">
              專業背後，都是故事
            </h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto">
              我們的教練不只是技術的傳授者，更是孩子成長路上的引路人
            </p>
          </div>

          {error && (
            <p className="text-center text-red-500 py-12">{error}</p>
          )}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <CoachCardSkeleton key={i} />)
              : coaches.map((coach, idx) => (
                  <div
                    key={coach.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Photo */}
                    <div className="relative h-72 overflow-hidden bg-slate-100">
                      <img
                        src={coach.avatar_url}
                        alt={coach.coach_name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${badgePalette[idx % badgePalette.length]}`}>
                          {coach.title}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="mb-4">
                        <h3 className="font-black text-slate-900 text-xl">{coach.coach_name}</h3>
                        <p className="text-primary font-semibold text-sm">{coach.title}</p>
                      </div>

                      {coach.bio && (
                        <p className="text-slate-500 text-xs leading-relaxed mb-3">{coach.bio}</p>
                      )}

                      {coach.experience.length > 0 && (
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                            個人獎項
                          </p>
                          <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {coach.experience.map((item, i) => (
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
                ))}
          </div>
        </div>
      </section>

      {/* Teaching philosophy */}
      <section className="py-20 bg-primary-50 border-t border-primary-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            教學理念
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900 mb-6">
            每個孩子都有自己的節奏
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg max-w-2xl mx-auto mb-8">
            我們深信，沒有教不好的學生，只有未找到合適方法的教學。每位教練均接受兒童心理與教學法培訓，
            擅長以孩子能理解的語言和方式進行教學，在鼓勵與挑戰之間取得平衡，
            讓每一位學員都能在劍道上找到屬於自己的自信與喜悅。
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            預約免費試堂
          </a>
        </div>
      </section>
    </div>
  );
}
