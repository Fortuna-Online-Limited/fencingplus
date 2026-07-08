import { ArrowRight, BookOpen, Heart, Zap } from 'lucide-react';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const coreValues = [
  {
    icon: BookOpen,
    title: '專業引導',
    desc: '所有教練均持有香港劍擊總會認可資格，並具備多年幼兒及兒童教學經驗。我們深信，正確的起步是成功的一半。從基本劍術到競技技巧，教練以科學化方式循序漸進，確保每位學員在安全的環境下打下紮實基礎。',
    img: 'https://images.pexels.com/photos/8815943/pexels-photo-8815943.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    icon: Heart,
    title: '品格培育',
    desc: '劍擊不只是技術的比拼，更是品格的磨練。我們的課程設計融入正向教育理念，透過尊重對手、接受失敗、從新出發等劍道精神，幫助孩子建立自律、冷靜與謙遜的品格，讓運動場上學到的價值觀，在課室與生活中同樣發光。',
    img: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
  {
    icon: Zap,
    title: '全面成長',
    desc: '我們相信每個孩子都有無限潛能。FENCING PLUS提供從啟蒙到精英的完整培訓路徑，因材施教，讓孩子按自己的步伐成長。無論是強身健體、培養興趣，還是目標代表學校出賽，我們都有相應的課程方案。',
    img: 'https://images.pexels.com/photos/6077776/pexels-photo-6077776.jpeg?auto=compress&cs=tinysrgb&w=700',
  },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
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
            About Us
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">關於我們</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            一群熱愛劍擊、熱愛教育的人，用心為香港下一代打造最好的培訓環境
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                品牌故事
              </span>
              <h2 className="mt-3 text-4xl font-black text-slate-900 leading-tight">
                從熱情出發，<br />以專業為本
              </h2>
              <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                <p>
                  FENCING PLUS 成立於 2026 年，由一群擁有豐富競技及教學經驗的香港劍擊運動員攜手創辦。
                  創辦人深信，劍擊這項優雅而精準的運動，能為兒童帶來遠超體能鍛鍊的正面影響。
                </p>
                <p>
                  品牌成立之初，我們便立下清晰目標：打破劍擊「高門檻、危險、昂貴」的刻板印象，
                  讓更多香港家庭的孩子有機會接觸、愛上這項運動。我們提供全套安全裝備，
                  並以小班制確保每位學員獲得充分關注。
                </p>
                <p>
                  時至今日，中心已培訓逾百位學員，年齡由 3.5 歲至成人不等，
                  其中多名學員更代表學校及香港出賽，屢獲殊榮。我們的故事，才剛剛開始。
                </p>
              </div>
              <button
                onClick={() => onNavigate('courses')}
                className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-800 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5"
              >
                探索我們的課程
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/15">
                <img
                  src="https://images.pexels.com/photos/8815943/pexels-photo-8815943.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fencing training"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-gold rounded-2xl p-5 shadow-xl">
                <div className="text-primary-900 font-black text-3xl">2026</div>
                <div className="text-primary-900/80 text-sm font-semibold">年正式成立</div>
              </div>
              <div className="absolute -top-5 -right-5 bg-primary rounded-2xl p-5 shadow-xl">
                <div className="text-white font-black text-3xl">100+</div>
                <div className="text-white/80 text-sm font-semibold">位培訓學員</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              核心價值
            </span>
            <h2 className="mt-3 text-4xl font-black text-slate-900">
              三大核心，成就卓越
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              我們相信，真正的培訓不只在劍道上，更在孩子的心裡
            </p>
          </div>
          <div className="space-y-20">
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-5">
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">{v.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-base">{v.desc}</p>
                </div>
                <div className={`rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={v.img}
                    alt={v.title}
                    className="w-full h-72 lg:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            加入 FENCING PLUS 大家庭
          </h2>
          <p className="text-white/70 text-lg mb-8">
            認識我們，了解我們，然後讓我們一同陪伴您的孩子成長
          </p>
          <button
            onClick={() => onNavigate('facilities')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black rounded-2xl transition-all hover:-translate-y-0.5 shadow-xl"
          >
            聯絡我們 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
