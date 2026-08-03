import { useState, useEffect, useMemo } from 'react';
import { X, Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLocale } from '../lib/locale';
import NewsModal, { type NewsArticle } from './NewsModal';

interface NewsItem {
  id: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  summary: string;
  summary_en: string;
  publish_date: string;
  image_url: string;
  image_urls: string[];
}

interface NewsListModalProps {
  onClose: () => void;
}

const PAGE_SIZE = 9;

export default function NewsListModal({ onClose }: NewsListModalProps) {
  const { t, locale } = useLocale();
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  useEffect(() => {
    supabase
      .from('news_Fencing_Plus')
      .select('id, title_zh, title_en, content_zh, content_en, summary, summary_en, publish_date, image_url, image_urls')
      .eq('is_published', true)
      .order('publish_date', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setAllNews(data as NewsItem[]);
        setLoading(false);
      });
  }, []);

  const loc = (zhVal: string, enVal: string) =>
    locale === 'en' && enVal ? enVal : zhVal;

  const filtered = useMemo(() => {
    if (!search.trim()) return allNews;
    const q = search.toLowerCase();
    return allNews.filter((n) => {
      const title = loc(n.title_zh, n.title_en).toLowerCase();
      const content = loc(n.content_zh, n.content_en).toLowerCase();
      return title.includes(q) || content.includes(q);
    });
  }, [allNews, search, locale]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{t.home.newsTitle}</h2>
              <p className="text-slate-400 text-sm mt-0.5">
                {filtered.length} {locale === 'en' ? 'articles' : '則消息'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label={t.newsModal.close}
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                placeholder={locale === 'en' ? 'Search news...' : '搜尋消息...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 h-64 animate-pulse" />
                ))}
              </div>
            ) : pageItems.length === 0 ? (
              <p className="text-center text-slate-400 py-16">
                {locale === 'en' ? 'No articles found.' : '沒有找到相關消息。'}
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageItems.map((n) => {
                  const cover = (n.image_urls?.length && n.image_urls[0]) || n.image_url;
                  const summaryText = loc(n.summary, n.summary_en) || loc(n.content_zh, n.content_en).slice(0, 120);
                  return (
                    <div
                      key={n.id}
                      onClick={() => setSelected(n as unknown as NewsArticle)}
                      className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white group cursor-pointer"
                    >
                      {cover && (
                        <div className="h-44 overflow-hidden">
                          <img
                            src={cover}
                            alt={loc(n.title_zh, n.title_en)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-slate-400 text-xs">
                            {new Date(n.publish_date).toLocaleDateString(
                              locale === 'en' ? 'en-GB' : 'zh-HK',
                              { year: 'numeric', month: 'long' }
                            )}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                          {loc(n.title_zh, n.title_en)}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{summaryText}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-slate-100">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.newsModal.prev}
              </button>
              <span className="text-sm text-slate-500 font-medium">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {t.newsModal.next}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {selected && <NewsModal article={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
