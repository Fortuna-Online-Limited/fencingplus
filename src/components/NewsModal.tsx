import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLocale } from '../lib/locale';

export interface NewsArticle {
  id: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  publish_date: string;
  image_url: string;
  image_urls: string[];
}

interface NewsModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export default function NewsModal({ article, onClose }: NewsModalProps) {
  const { t, locale } = useLocale();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const images =
    article && Array.isArray(article.image_urls) && article.image_urls.length > 0
      ? article.image_urls
      : article && article.image_url
      ? [article.image_url]
      : [];

  const title = article
    ? locale === 'en' && article.title_en
      ? article.title_en
      : article.title_zh
    : '';
  const content = article
    ? locale === 'en' && article.content_en
      ? article.content_en
      : article.content_zh
    : '';

  const prev = useCallback(() => {
    setGalleryIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setGalleryIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    setGalleryIndex(0);
  }, [article?.id]);

  useEffect(() => {
    if (!article) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(false);
        else onClose();
      } else if (images.length > 1) {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [article, lightbox, images.length, prev, next, onClose]);

  if (!article) return null;

  const dateStr = new Date(article.publish_date).toLocaleDateString(
    locale === 'en' ? 'en-GB' : 'zh-HK',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <>
      <div
        className="fixed inset-0 z-[1000] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[88vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            {images.length > 0 && (
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl bg-slate-100">
                <img
                  src={images[galleryIndex]}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-700" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-700" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/60 rounded-full text-white text-xs font-medium">
                      {galleryIndex + 1} {t.newsModal.of} {images.length}
                    </div>
                    <button
                      onClick={() => setLightbox(true)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/50 hover:bg-slate-900/70 text-white flex items-center justify-center transition-all"
                      title={t.newsModal.galleryHint}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-slate-900/50 hover:bg-slate-900/70 text-white flex items-center justify-center transition-all"
              style={{ right: images.length > 1 ? '3.25rem' : '0.75rem' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              {dateStr}
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {title}
            </h2>
            <div className="mt-5 prose prose-slate max-w-none">
              {content.split('\n').map((line, i) => (
                <p key={i} className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightbox && images.length > 0 && (
        <div
          className="fixed inset-0 z-[1100] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(false)}
        >
          <img
            src={images[galleryIndex]}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">
                {galleryIndex + 1} {t.newsModal.of} {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
