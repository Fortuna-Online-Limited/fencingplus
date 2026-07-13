import { ArrowRight, BookOpen, Heart, Zap } from 'lucide-react';
import { useLocale } from '../lib/locale';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const VALUE_ICONS = [BookOpen, Heart, Zap];

const VALUE_IMGS = [
  'https://images.pexels.com/photos/8815943/pexels-photo-8815943.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=700',
  'https://images.pexels.com/photos/6077776/pexels-photo-6077776.jpeg?auto=compress&cs=tinysrgb&w=700',
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useLocale();

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
            {t.about.heroEyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">{t.about.heroTitle}</h1>
          <p className="text-white/70 text-lg leading-relaxed">{t.about.heroSubtitle}</p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                {t.about.storySectionLabel}
              </span>
              <h2
                className="mt-3 text-4xl font-black text-slate-900 leading-tight"
                style={{ whiteSpace: 'pre-line' }}
              >
                {t.about.storyTitle}
              </h2>
              <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                {t.about.storyParas.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <button
                onClick={() => onNavigate('courses')}
                className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary-800 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5"
              >
                {t.about.storyCta}
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
                <div className="text-primary-900 font-black text-3xl">{t.about.storyFounded}</div>
                <div className="text-primary-900/80 text-sm font-semibold">{t.about.storyFoundedLabel}</div>
              </div>
              <div className="absolute -top-5 -right-5 bg-primary rounded-2xl p-5 shadow-xl">
                <div className="text-white font-black text-3xl">{t.about.storyStudents}</div>
                <div className="text-white/80 text-sm font-semibold">{t.about.storyStudentsLabel}</div>
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
              {t.about.valuesSectionLabel}
            </span>
            <h2 className="mt-3 text-4xl font-black text-slate-900">{t.about.valuesTitle}</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">{t.about.valuesSubtitle}</p>
          </div>
          <div className="space-y-20">
            {t.about.coreValues.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <div
                  key={v.title}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{v.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-base">{v.desc}</p>
                  </div>
                  <div className={`rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img
                      src={VALUE_IMGS[i]}
                      alt={v.title}
                      className="w-full h-72 lg:h-80 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t.about.ctaTitle}</h2>
          <p className="text-white/70 text-lg mb-8">{t.about.ctaSubtitle}</p>
          <button
            onClick={() => onNavigate('facilities')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black rounded-2xl transition-all hover:-translate-y-0.5 shadow-xl"
          >
            {t.about.ctaButton} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
