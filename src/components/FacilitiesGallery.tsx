import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLocale } from '../lib/locale';

type Category = 'venue' | 'pistes' | 'scoring';
type FilterTab = 'all' | Category;

interface GalleryImage {
  id: string;
  src: string;
  category: Category;
  titleZh: string;
  titleEn: string;
}

const BASE = 'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/05_Facilities_Contact/Site_and_Equipment-Photos_of_the_Actual_Site';

const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'site_01', src: `${BASE}/site_01.png`, category: 'venue', titleZh: '品牌木紋形象牆', titleEn: 'Brand Reception & Logo Wall' },
  { id: 'site_02', src: `${BASE}/site_02.png`, category: 'venue', titleZh: '全景寬敞練劍場地', titleEn: 'Panoramic Training Area' },
  { id: 'site_03', src: `${BASE}/site_03.png`, category: 'venue', titleZh: '明亮透光專業劍道區', titleEn: 'Bright Professional Piste Area' },
  { id: 'site_04', src: `${BASE}/site_04.jpeg`, category: 'venue', titleZh: '專屬金屬劍道特寫', titleEn: 'Custom Metallic Fencing Piste' },
  { id: 'site_05', src: `${BASE}/site_05.jpg`, category: 'venue', titleZh: '高空環形燈光與多條賽道', titleEn: 'High-ceiling Ring Lighting & Track System' },
  { id: 'site_06', src: `${BASE}/site_06.jpg`, category: 'venue', titleZh: '階梯式家長觀賽休息區', titleEn: 'Tiered Spectator & Parent Seating' },
  { id: 'site_07', src: `${BASE}/site_07.jpeg`, category: 'venue', titleZh: '體能與敏捷度訓練器材', titleEn: 'Physical & Agility Training Equipment' },
  { id: 'electronic_devices_01', src: `${BASE}/electronic_devices_01.jpeg`, category: 'scoring', titleZh: '國際賽事級電子計分器', titleEn: 'International Match Electronic Scoring Box' },
  { id: 'electronic_devices_02', src: `${BASE}/electronic_devices_02.jpeg`, category: 'scoring', titleZh: '精密裁判發光指示燈', titleEn: 'Precision Fencing Target & Signal Lights' },
  { id: 'kendo_01', src: `${BASE}/kendo_01.png`, category: 'pistes', titleZh: '國際標準避震防滑金屬劍道', titleEn: 'Standard Shock-Absorbing Metallic Piste' },
  { id: 'kendo_02', src: `${BASE}/kendo_02.png`, category: 'pistes', titleZh: '高品質金屬網格特寫', titleEn: 'High-Durability Metallic Grid Surface' },
];

const HERO_ORDER = [
  'site_02', 'site_05', 'site_03', 'site_01', 'site_06',
  'kendo_01', 'site_04', 'electronic_devices_01',
  'site_07', 'kendo_02', 'electronic_devices_02',
];

const heroSlides = HERO_ORDER.map((id) => GALLERY_IMAGES.find((i) => i.id === id)!).filter(Boolean);

export default function FacilitiesGallery() {
  const { t, locale } = useLocale();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const heroTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = activeTab === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((i) => i.category === activeTab);

  const activeLightboxImage = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  useEffect(() => {
    if (isHoveringHero) {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
      return;
    }
    heroTimerRef.current = setInterval(() => {
      setHeroIndex((p) => (p + 1) % heroSlides.length);
    }, 4000);
    return () => {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    };
  }, [isHoveringHero]);

  const goHeroNext = useCallback(() => setHeroIndex((p) => (p + 1) % heroSlides.length), []);
  const goHeroPrev = useCallback(() => setHeroIndex((p) => (p - 1 + heroSlides.length) % heroSlides.length), []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lbNext = useCallback(() => {
    setLightboxIndex((p) => (p === null ? p : (p + 1) % filtered.length));
  }, [filtered.length]);
  const lbPrev = useCallback(() => {
    setLightboxIndex((p) => (p === null ? p : (p - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'ArrowLeft') lbPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, lbNext, lbPrev]);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: t.facilities.gallery.tabs.all },
    { key: 'venue', label: t.facilities.gallery.tabs.venue },
    { key: 'pistes', label: t.facilities.gallery.tabs.pistes },
    { key: 'scoring', label: t.facilities.gallery.tabs.scoring },
  ];

  const loc = (zh: string, en: string) => (locale === 'en' ? en : zh);
  const catLabel = (cat: Category) =>
    locale === 'en' ? t.facilities.gallery.categories[cat] : t.facilities.gallery.categories[cat];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            {t.facilities.gallery.sectionLabel}
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-slate-900">
            {t.facilities.gallery.sectionTitle}
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            {t.facilities.gallery.sectionSubtitle}
          </p>
        </div>

        {/* ── Hero Swiper ── */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/15 mb-14 group"
          style={{ aspectRatio: '16 / 9' }}
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
        >
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === heroIndex ? 1 : 0, pointerEvents: i === heroIndex ? 'auto' : 'none' }}
            >
              <img
                src={slide.src}
                alt={loc(slide.titleZh, slide.titleEn)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-2">
                  {catLabel(slide.category)}
                </span>
                <h3 className="text-xl md:text-3xl font-black drop-shadow-lg">
                  {loc(slide.titleZh, slide.titleEn)}
                </h3>
              </div>
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={goHeroPrev}
            aria-label={t.facilities.gallery.lightboxPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/30 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goHeroNext}
            aria-label={t.facilities.gallery.lightboxNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/30 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === heroIndex ? 'w-8 bg-gold' : 'w-2 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const count = tab.key === 'all'
              ? GALLERY_IMAGES.length
              : GALLERY_IMAGES.filter((i) => i.category === tab.key).length;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 ${
                  activeTab === tab.key
                    ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {tab.label}
                <span className={`ml-2 text-xs ${activeTab === tab.key ? 'text-white/70' : 'text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Responsive Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightboxIndex(i)}
              className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                i === 0 && filtered.length > 4 ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-square' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={img.src}
                alt={loc(img.titleZh, img.titleEn)}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-left translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block text-gold text-[10px] font-bold tracking-widest uppercase mb-1">
                  {catLabel(img.category)}
                </span>
                <h4 className="text-white font-bold text-base leading-snug drop-shadow-lg">
                  {loc(img.titleZh, img.titleEn)}
                </h4>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full bg-white/80 backdrop-blur-sm text-primary uppercase tracking-wide">
                {catLabel(img.category)}
              </span>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out]"
          onClick={closeLightbox}
        >
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-white z-10">
            <span className="text-sm font-semibold text-white/70">
              {(lightboxIndex ?? 0) + 1} / {filtered.length}
            </span>
            <button
              onClick={closeLightbox}
              aria-label={t.facilities.gallery.lightboxClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); lbPrev(); }}
            aria-label={t.facilities.gallery.lightboxPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <div
            className="max-w-[90vw] max-h-[80vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxImage.src}
              alt={loc(activeLightboxImage.titleZh, activeLightboxImage.titleEn)}
              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-5 text-center text-white">
              <span className="inline-block text-gold text-xs font-bold tracking-widest uppercase mb-1">
                {catLabel(activeLightboxImage.category)}
              </span>
              <h4 className="text-lg font-bold">
                {loc(activeLightboxImage.titleZh, activeLightboxImage.titleEn)}
              </h4>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); lbNext(); }}
            aria-label={t.facilities.gallery.lightboxNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
            {filtered.map((img, i) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === lightboxIndex ? 'border-gold scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
