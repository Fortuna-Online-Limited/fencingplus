import { Award, Users, Heart } from 'lucide-react';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface TeamPageProps {
  onNavigate: (page: Page) => void;
}

const WA_LINK = 'https://wa.me/85298765432';

const coaches = [
  {
    name: '陳志明 教練',
    nameEn: 'Coach Chan Chi-Ming',
    role: '創辦人 / 首席教練',
    img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: '「我相信每個孩子都有屬於自己的劍道，教練的責任是找到那條路。」',
    credentials: [
      '前香港劍擊代表隊成員（花劍）',
      '香港劍擊總會認可一級教練',
      '兒童及青少年教練資歷逾10年',
      '香港理工大學運動科學學士',
    ],
    specialty: '花劍 / 幼兒啟蒙',
    specialtyColor: 'bg-gold text-primary-900',
  },
  {
    name: '李美琪 教練',
    nameEn: 'Coach Li Mei-Kei',
    role: '資深兒童教練',
    img: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: '「耐心是最好的教材。看見孩子一點一滴進步，是我最大的滿足。」',
    credentials: [
      '前全港學界劍擊錦標賽冠軍（花劍）',
      '香港劍擊總會認可教練',
      '兒童心理學進修課程結業',
      '執教兒童劍擊班逾7年',
    ],
    specialty: '花劍 / 兒童教學',
    specialtyColor: 'bg-primary text-white',
  },
  {
    name: '張浩然 教練',
    nameEn: 'Coach Cheung Ho-Yin',
    role: '競技訓練教練',
    img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: '「競技劍擊是一門思考的運動。我幫助學員學習如何在壓力下冷靜判斷。」',
    credentials: [
      '前港代表隊成員（重劍），出戰亞洲錦標賽',
      '香港劍擊總會認可一級教練',
      '體能訓練師 (HKCSEP) 認證',
      '執教精英班及競賽培訓逾8年',
    ],
    specialty: '重劍 / 精英培訓',
    specialtyColor: 'bg-slate-800 text-white',
  },
  {
    name: '黃曉彤 教練',
    nameEn: 'Coach Wong Hiu-Tung',
    role: '幼兒及初階教練',
    img: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: '「每個小朋友都是第一次，我的工作是讓這個第一次充滿驚喜和笑聲。」',
    credentials: [
      '香港劍擊總會認可教練',
      '幼兒體育教育文憑（HKIED）',
      '執教幼兒班及小學組逾5年',
      '持急救護理證書（HKRC）',
    ],
    specialty: '花劍 / 幼兒教學',
    specialtyColor: 'bg-gold text-primary-900',
  },
];

const teamStats = [
  { icon: Award, value: '港隊級別', label: '創辦教練背景' },
  { icon: Users, value: '4 位', label: '認證教練' },
  { icon: Heart, value: '8:1', label: '師生比例上限' },
];

export default function TeamPage({ onNavigate: _onNavigate }: TeamPageProps) {
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

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.name}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={coach.img}
                    alt={coach.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${coach.specialtyColor}`}>
                      {coach.specialty}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="font-black text-slate-900 text-lg">{coach.name}</h3>
                    <p className="text-primary font-semibold text-sm">{coach.role}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{coach.nameEn}</p>
                  </div>

                  <blockquote className="text-slate-600 text-xs italic leading-relaxed mb-4 border-l-2 border-gold pl-3">
                    {coach.quote}
                  </blockquote>

                  <ul className="space-y-1.5 flex-1">
                    {coach.credentials.map((c) => (
                      <li key={c} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
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
