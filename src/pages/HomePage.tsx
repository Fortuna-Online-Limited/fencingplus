import { useState, useEffect } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const WA_LINK = 'https://wa.me/85298765432';

const HERO_SLIDES = [
  'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/01_Home/AI/Scenario%201:%20Two-person%20sparring%20practice/Scenario1_Two-person_sparring%20practice_16-9.png',
  'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/01_Home/AI/Scene%202:%20Close-up%20of%20an%20individual%20hero/Scene2_Close-up_of_an_individual_hero_boy.png',
  'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/01_Home/AI/Scene%202:%20Close-up%20of%20an%20individual%20hero/Scene2_Close-up_of_an_individual_hero_girl.png',
  'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/01_Home/AI/Scene%203:%20Warm%20Interaction%20Between%20Coach%20and%20Child/Scene3_Warm_Interaction_Between_Coach_and_Child.png',
];

const values = [
  {
    iconImg: 'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/01_Home/Icon/Focus/Focus.png',
    title: '專注力',
    subtitle: 'Focus & Concentration',
    desc: '劍擊需要高度集中精神，每一次交鋒都是對注意力的訓練，幫助孩子在學業與生活中同樣保持專注。',
    color: 'bg-primary-50 border-primary-100',
  },
  {
    iconImg: 'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/01_Home/Icon/Confidence/Confidence.png',
    title: '自信心',
    subtitle: 'Confidence & Growth',
    desc: '從第一次握劍到第一場友誼賽，每一個進步都是自信的積累，讓孩子學懂欣賞自己的成長。',
    color: 'bg-gold-50 border-gold-100',
  },
  {
    iconImg: 'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/01_Home/Icon/Perseverance/Perseverance.png',
    title: '堅毅力',
    subtitle: 'Resilience & Character',
    desc: '劍道上的跌倒與爬起，磨練孩子面對挫折的韌性，培育永不放棄的運動員精神與正面人生態度。',
    color: 'bg-primary-50 border-primary-100',
  },
];

const news = [
  {
    date: '2026年5月',
    badge: '比賽成績',
    title: '學員於學界劍擊錦標賽奪得銀牌',
    desc: '恭賀本中心學員陳小明於本年度學界劍擊錦標賽花劍項目勇奪銀牌，為自己及中心爭光！',
    img: 'https://images.pexels.com/photos/6077776/pexels-photo-6077776.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    date: '2026年4月',
    badge: '新課程',
    title: '幼兒啟蒙班正式開班，名額有限！',
    desc: '全新幼兒劍擊啟蒙班（3.5-6歲）正式招生，以遊戲化教學培養小朋友對劍擊的興趣，歡迎查詢。',
    img: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    date: '2026年3月',
    badge: '中心活動',
    title: '免費體驗日圓滿結束，逾50組家庭參與',
    desc: '感謝各位家長及小朋友的踴躍參與，免費劍擊體驗日反應熱烈，下次體驗日詳情敬請留意。',
    img: 'https://images.pexels.com/photos/8815943/pexels-photo-8815943.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const testimonials = [
  {
    name: '陳媽媽',
    child: '兒子 7 歲，就讀兒童恆常班',
    text: '兒子本來很內向，參加劍擊班後明顯自信了很多，在課堂上也更敢於表達自己。教練非常有耐心，每次上課回來他都很開心，強力推薦！',
    stars: 5,
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: '李爸爸',
    child: '女兒 10 歲，就讀兒童恆常班',
    text: '起初擔心劍擊危險，但來參觀後發現安全措施非常完善，教練也耐心解釋每個動作。女兒學了三個月已愛上這項運動，成績進步了不少！',
    stars: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: '張媽媽',
    child: '女兒 5 歲，就讀幼兒啟蒙班',
    text: '五歲的女兒在啟蒙班玩得非常開心！課程以遊戲為主，完全沒有壓力，老師很懂得跟小朋友溝通。最重要是她每週都迫不及待想去上課！',
    stars: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: '王爸爸',
    child: '兒子 14 歲，就讀精英班',
    text: '兒子在FENCING PLUS接受精英班訓練後，技術突飛猛進，今年成功代表學校參加學界比賽並獲獎。教練的指導非常專業，針對每個學員的弱點制訂訓練計劃。',
    stars: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-advance hero slideshow every 4 s
  useEffect(() => {
    const timer = setInterval(
      () => setSlideIndex((p) => (p + 1) % HERO_SLIDES.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  // Auto-advance testimonials every 5 s
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentTestimonial((p) => (p + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const prevT = () => setCurrentTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);
  const nextT = () => setCurrentTestimonial((p) => (p + 1) % testimonials.length);

  return (
    <div className="bg-[#F8F9FA]">
      {/* ── Hero Slideshow ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Slides */}
        {HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === slideIndex ? 0.9 : 0,
            }}
          />
        ))}

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/65 to-primary-700/50" />

        {/* Slide dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slideIndex ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-sm font-semibold tracking-wide">
              香港專業兒童及青少年劍擊培訓中心
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 text-balance">
            FENCING PLUS
            <span className="block text-gold mt-1 text-3xl md:text-4xl lg:text-5xl font-bold">
              讓劍擊成為孩子成長的自信基石
            </span>
          </h1>

          <p className="text-white/80 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
            無論有沒有運動底子，<strong className="text-white">3.5歲起</strong>即可加入。
            專業教練以遊戲化教學，讓孩子在快樂中建立{' '}
            <span className="text-gold font-semibold">專注力、自信心與堅毅力</span>。
          </p>
          <p className="text-white/60 text-sm mb-10">
            安全裝備齊全 · 小班教學 · 絕無隱藏收費
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('courses')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black text-base rounded-2xl transition-all duration-200 shadow-xl shadow-gold/30 hover:-translate-y-0.5"
            >
              了解核心課程
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/25 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              免費 WhatsApp 查詢
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 z-10">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section className="bg-primary py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '3.5歲+', label: '最小學員年齡' },
            { n: '8:1', label: '師生比例' },
            { n: '100%', label: '裝備齊備，零自費' },
            { n: '全年', label: '持續招生' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-gold font-black text-3xl md:text-4xl mb-1">{s.n}</div>
              <div className="text-white/70 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              核心理念
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">
              劍擊，不只是運動
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
              每一堂課，都在塑造孩子終身受用的品格與能力
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className={`rounded-2xl border p-8 hover:-translate-y-1 transition-transform duration-300 ${v.color}`}
              >
                <div className="w-20 h-20 mb-5 flex items-center justify-center">
                  <img
                    src={v.iconImg}
                    alt={v.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                  {v.subtitle}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                最新動態
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-black text-slate-900">
                榮譽牆與中心消息
              </h2>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="hidden md:flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
            >
              查看更多 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n) => (
              <div
                key={n.title}
                className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={n.img}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {n.badge}
                    </span>
                    <span className="text-slate-400 text-xs">{n.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">{n.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              學員見證
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900">
              家長怎麼說
            </h2>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-primary/8 border border-primary-100 min-h-[220px]">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[currentTestimonial].stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="text-slate-700 text-lg leading-relaxed mb-8 italic">
                「{testimonials[currentTestimonial].text}」
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold"
                />
                <div>
                  <div className="font-bold text-slate-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-slate-500 text-sm">{testimonials[currentTestimonial].child}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentTestimonial ? 'bg-primary w-6' : 'bg-slate-300 w-2'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevT}
                  className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextT}
                  className="w-9 h-9 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            為孩子踏出第一步
          </h2>
          <p className="text-white/75 text-lg mb-8">
            立即WhatsApp查詢，了解最適合孩子的課程方案，首堂體驗課歡迎免費試堂。
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black text-lg rounded-2xl transition-all duration-200 hover:-translate-y-0.5 shadow-2xl shadow-black/20"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            立即 WhatsApp 查詢
          </a>
        </div>
      </section>
    </div>
  );
}
