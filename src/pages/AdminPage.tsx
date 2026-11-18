import { useState, useEffect, useCallback } from 'react';
import {
  Lock, LogOut, Plus, Pencil, Trash2, X, Image as ImageIcon,
  Calendar, Eye, EyeOff, KeyRound, ArrowLeft, FileText, Newspaper, Trophy, Search,
  Link as LinkIcon, Video as VideoIcon, Play,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLocale } from '../lib/locale';
import { useToast } from '../components/Toast';
import { isVideoUrl } from '../lib/mediaType';

const MAX_IMAGES = 10;
const MAX_HONOR_IMAGES = 5;

const HK_TZ = 'Asia/Hong_Kong';

function hkLocalToISO(localStr: string): string {
  return localStr.length >= 16 ? localStr.slice(0, 16) + ':00+08:00' : localStr;
}

function isoToHkLocal(isoStr: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: HK_TZ,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date(isoStr));
  const get = (type: string) => parts.find((p) => p.type === type)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
}

interface NewsRow {
  id: string;
  created_at: string;
  publish_date: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  image_url: string;
  image_urls: string[];
  is_published: boolean;
  status: string;
  scheduled_at: string | null;
}

interface HonorRow {
  id: string;
  created_at: string;
  updated_at: string;
  student_name: string;
  award_title: string;
  award_title_en: string;
  category: string;
  category_en: string;
  event_date: string;
  description: string;
  description_en: string;
  image_url: string;
  image_urls: string[];
  is_published: boolean;
}

type View = 'list' | 'edit';
type Section = 'news' | 'honors';

export default function AdminPage() {
  const { t, locale } = useLocale();
  const { showToast } = useToast();

  const [session, setSession] = useState<ReturnType<typeof supabase.auth.getSession> extends Promise<infer R> ? Awaited<R>['data']['session'] : null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [email, setEmail] = useState('info@fencingpowerhk.com');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [section, setSection] = useState<Section>('news');
  const [view, setView] = useState<View>('list');
  const [news, setNews] = useState<NewsRow[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [editing, setEditing] = useState<NewsRow | null>(null);

  const [honors, setHonors] = useState<HonorRow[]>([]);
  const [honorsLoading, setHonorsLoading] = useState(true);
  const [editingHonor, setEditingHonor] = useState<HonorRow | null>(null);
  const [honorSearch, setHonorSearch] = useState('');

  const [showPwdModal, setShowPwdModal] = useState(false);

  const goSite = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setAuthReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const fetchNews = useCallback(async () => {
    setListLoading(true);
    const { data, error } = await supabase
      .from('news_Fencing_Plus')
      .select('*')
      .order('publish_date', { ascending: false })
      .order('created_at', { ascending: false });
    if (!error && data) setNews(data as NewsRow[]);
    setListLoading(false);
  }, []);

  const fetchHonors = useCallback(async () => {
    setHonorsLoading(true);
    const { data, error } = await supabase
      .from('honors_Fencing_Plus')
      .select('*')
      .order('event_date', { ascending: false });
    if (!error && data) setHonors(data as HonorRow[]);
    setHonorsLoading(false);
  }, []);

  useEffect(() => {
    if (session) {
      fetchNews();
      fetchHonors();
    }
  }, [session, fetchNews, fetchHonors]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const { error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    });
    if (error) {
      console.error('[Admin Login] Sign-in failed:', error.message, error.status);
      showToast(t.admin.toastLoginError, 'error');
    } else {
      showToast(t.admin.toastLoginSuccess, 'success');
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('list');
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white/60 text-sm">{t.admin.loading}</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold mb-4 shadow-xl shadow-gold/20">
              <Lock className="w-8 h-8 text-primary-900" />
            </div>
            <div className="flex flex-col items-center leading-none mb-1">
              <span className="text-2xl font-black text-white">FENCING POWER</span>
              <span className="text-[9px] font-bold tracking-[0.22em] text-white/60 mt-0.5">HK LIMITED</span>
            </div>
            <h1 className="text-sm font-bold text-white/80 mt-2">{t.admin.loginTitle}</h1>
            <p className="mt-2 text-white/60 text-sm">{t.admin.loginSubtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white rounded-3xl shadow-2xl p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.emailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.admin.emailPlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.passwordLabel}</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.admin.passwordPlaceholder}
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-primary/20 hover:-translate-y-0.5 disabled:translate-y-0"
            >
              {loginLoading ? t.admin.loggingIn : t.admin.loginButton}
            </button>
            <button
              type="button"
              onClick={goSite}
              className="w-full py-2.5 text-slate-500 hover:text-primary font-medium text-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t.admin.backToSite}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-primary sticky top-0 z-40 shadow-lg shadow-primary/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center shrink-0">
              {section === 'news' ? <Newspaper className="w-5 h-5 text-primary-900" /> : <Trophy className="w-5 h-5 text-primary-900" />}
            </div>
            <div>
              <div className="text-white font-black leading-tight">
                {section === 'news' ? t.admin.dashboardTitle : t.admin.honorDashboardTitle}
              </div>
              <div className="text-white/50 text-xs">
                {section === 'news' ? t.admin.dashboardSubtitle : t.admin.honorDashboardSubtitle}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPwdModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all"
            >
              <KeyRound className="w-4 h-4" /> {t.admin.changePassword}
            </button>
            <button
              onClick={goSite}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> {t.admin.backToSite}
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-sm font-medium transition-all"
            >
              <LogOut className="w-4 h-4" /> {t.admin.logout}
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => { setSection('news'); setView('list'); }}
              className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-all ${
                section === 'news' ? 'bg-white text-primary' : 'text-white/60 hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4 inline mr-1.5" />{t.admin.tabNews}
            </button>
            <button
              onClick={() => { setSection('honors'); setView('list'); }}
              className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-all ${
                section === 'honors' ? 'bg-white text-primary' : 'text-white/60 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4 inline mr-1.5" />{t.admin.tabHonors}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {section === 'news' && view === 'list' && (
          <NewsList
            news={news}
            loading={listLoading}
            onAdd={() => { setEditing(null); setView('edit'); }}
            onEdit={(n) => { setEditing(n); setView('edit'); }}
            onDelete={async (n) => {
              if (!window.confirm(t.admin.confirmDelete)) return;
              const { error } = await supabase.from('news_Fencing_Plus').delete().eq('id', n.id);
              if (error) {
                showToast(t.admin.toastDeleteError, 'error');
              } else {
                setNews((prev) => prev.filter((x) => x.id !== n.id));
                showToast(t.admin.toastDeleteSuccess, 'success');
              }
            }}
          />
        )}

        {section === 'news' && view === 'edit' && (
          <NewsForm
            initial={editing}
            onCancel={() => { setEditing(null); setView('list'); }}
            onSaved={() => { setEditing(null); setView('list'); fetchNews(); }}
          />
        )}

        {section === 'honors' && view === 'list' && (
          <HonorList
            honors={honors}
            loading={honorsLoading}
            search={honorSearch}
            onSearch={setHonorSearch}
            onAdd={() => { setEditingHonor(null); setView('edit'); }}
            onEdit={(h) => { setEditingHonor(h); setView('edit'); }}
            onDelete={async (h) => {
              if (!window.confirm(t.admin.confirmDeleteHonor)) return;
              const { error } = await supabase.from('honors_Fencing_Plus').delete().eq('id', h.id);
              if (error) {
                showToast(t.admin.toastHonorDeleteError, 'error');
              } else {
                setHonors((prev) => prev.filter((x) => x.id !== h.id));
                showToast(t.admin.toastHonorDeleteSuccess, 'success');
              }
            }}
            onTogglePublish={async (h) => {
              const { error } = await supabase
                .from('honors_Fencing_Plus')
                .update({ is_published: !h.is_published })
                .eq('id', h.id);
              if (error) {
                showToast(t.admin.toastHonorSaveError, 'error');
              } else {
                setHonors((prev) => prev.map((x) => x.id === h.id ? { ...x, is_published: !x.is_published } : x));
              }
            }}
          />
        )}

        {section === 'honors' && view === 'edit' && (
          <HonorForm
            initial={editingHonor}
            onCancel={() => { setEditingHonor(null); setView('list'); }}
            onSaved={() => { setEditingHonor(null); setView('list'); fetchHonors(); }}
          />
        )}
      </main>

      {showPwdModal && (
        <ChangePasswordModal onClose={() => setShowPwdModal(false)} />
      )}
    </div>
  );
}

function NewsList({
  news, loading, onAdd, onEdit, onDelete,
}: {
  news: NewsRow[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (n: NewsRow) => void;
  onDelete: (n: NewsRow) => void;
}) {
  const { t, locale } = useLocale();
  return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900">{t.admin.dashboardTitle}</h2>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" /> {t.admin.addNews}
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-white border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400">{t.admin.empty}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {news.map((n) => {
              const title = locale === 'en' && n.title_en ? n.title_en : n.title_zh;
              const cover = (n.image_urls?.length && n.image_urls[0]) || n.image_url;
              const dateStr = new Date(n.publish_date).toLocaleDateString(
                locale === 'en' ? 'en-GB' : 'zh-HK',
                { year: 'numeric', month: 'short', day: 'numeric' }
              );
              const isScheduled = n.status === 'scheduled' && n.scheduled_at && new Date(n.scheduled_at) > new Date();
              const scheduledDateStr = n.scheduled_at
                ? new Date(n.scheduled_at).toLocaleString(
                    locale === 'en' ? 'en-GB' : 'zh-HK',
                    { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: HK_TZ }
                  )
                : '';
              const effectiveStatus = n.status === 'scheduled' && !isScheduled ? 'published' : n.status;
              return (
                <div
                  key={n.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                    {cover ? (
                      isVideoUrl(cover) ? (
                        <>
                          <video src={cover} className="w-full h-full object-cover" muted preload="metadata" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                            <Play className="w-5 h-5 text-white fill-white/90" />
                          </div>
                        </>
                      ) : (
                        <img src={cover} alt={title} className="w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 truncate">{title || '—'}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-400 text-xs">{dateStr}</span>
                      <span
                        className="px-2 py-0.5 text-xs font-semibold rounded-full"
                        style={
                          effectiveStatus === 'published'
                            ? { backgroundColor: '#dcfce7', color: '#15803d' }
                            : effectiveStatus === 'scheduled'
                            ? { backgroundColor: '#fef3c7', color: '#b45309' }
                            : { backgroundColor: '#f1f5f9', color: '#64748b' }
                        }
                      >
                        {effectiveStatus === 'published'
                          ? t.admin.statusBadge.published
                          : effectiveStatus === 'scheduled'
                          ? `${t.admin.statusBadge.scheduled}: ${scheduledDateStr}`
                          : t.admin.statusBadge.draft}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onEdit(n)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-primary hover:bg-primary-50 rounded-lg text-sm font-semibold transition-all"
                    >
                      <Pencil className="w-4 h-4" /> {t.admin.editNews}
                    </button>
                    <button
                      onClick={() => onDelete(n)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition-all"
                    >
                      <Trash2 className="w-4 h-4" /> {t.admin.deleteNews}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

function NewsForm({
  initial, onCancel, onSaved,
}: {
  initial: NewsRow | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const { t } = useLocale();
  const { showToast } = useToast();
  const [publishDate, setPublishDate] = useState(
      initial?.publish_date || new Date().toISOString().slice(0, 10)
    );
    const [titleZh, setTitleZh] = useState(initial?.title_zh || '');
    const [titleEn, setTitleEn] = useState(initial?.title_en || '');
    const [contentZh, setContentZh] = useState(initial?.content_zh || '');
    const [contentEn, setContentEn] = useState(initial?.content_en || '');
    const [imageUrls, setImageUrls] = useState<string[]>(initial?.image_urls || []);
    const [publishStatus, setPublishStatus] = useState<'published' | 'scheduled' | 'draft'>(
      initial?.status === 'scheduled' ? 'scheduled'
        : initial?.status === 'draft' ? 'draft'
        : 'published'
    );
    const [scheduledAt, setScheduledAt] = useState(
      initial?.scheduled_at
        ? isoToHkLocal(initial.scheduled_at)
        : ''
    );
    const [saving, setSaving] = useState(false);
    const [mediaUrlInput, setMediaUrlInput] = useState('');

    const addMediaUrl = () => {
      const url = mediaUrlInput.trim();
      if (!url) return;
      if (imageUrls.length >= MAX_IMAGES) {
        showToast(t.admin.toastImageLimit, 'error');
        return;
      }
      setImageUrls((prev) => [...prev, url]);
      setMediaUrlInput('');
      showToast(t.admin.toastMediaUrlAdded, 'success');
    };

    const removeImage = (idx: number) => {
      setImageUrls((prev) => prev.filter((_, i) => i !== idx));
    };

    const previewIsVideo = isVideoUrl(mediaUrlInput.trim());

    const handleSave = async () => {
      setSaving(true);
      const finalStatus = publishStatus === 'scheduled' && scheduledAt
        ? (new Date(hkLocalToISO(scheduledAt)) <= new Date() ? 'published' : 'scheduled')
        : publishStatus;
      const finalPublishDate = finalStatus === 'published' && publishStatus === 'published'
        ? new Date().toISOString().slice(0, 10)
        : publishDate;
      const payload = {
        publish_date: finalPublishDate,
        title_zh: titleZh,
        title_en: titleEn,
        content_zh: contentZh,
        content_en: contentEn,
        image_url: imageUrls[0] || initial?.image_url || '',
        image_urls: imageUrls,
        is_published: finalStatus === 'published',
        status: finalStatus,
        scheduled_at: finalStatus === 'scheduled' ? hkLocalToISO(scheduledAt) : null,
        summary: contentZh.slice(0, 120),
        summary_en: contentEn.slice(0, 120),
        title: titleZh,
        is_pinned: initial?.is_pinned ?? false,
      };
      let error;
      if (initial) {
        ({ error } = await supabase.from('news_Fencing_Plus').update(payload).eq('id', initial.id));
      } else {
        ({ error } = await supabase.from('news_Fencing_Plus').insert(payload));
      }
      setSaving(false);
      if (error) {
        showToast(t.admin.toastSaveError, 'error');
      } else {
        showToast(t.admin.toastSaveSuccess, 'success');
        onSaved();
      }
    };

    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900">
            {initial ? t.admin.editNews : t.admin.addNews}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.publishDate}</label>
            <div className="relative max-w-xs">
              <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.titleZh}</label>
              <input
                value={titleZh}
                onChange={(e) => setTitleZh(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.titleEn}</label>
              <input
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.contentZh}</label>
              <textarea
                value={contentZh}
                onChange={(e) => setContentZh(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 resize-y"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.contentEn}</label>
              <textarea
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 resize-y"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-slate-700">{t.admin.mediaLabel}</label>
              <span className="text-xs text-slate-400">{t.admin.mediaHint}</span>
            </div>

            {/* URL input */}
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="url"
                  value={mediaUrlInput}
                  onChange={(e) => setMediaUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMediaUrl(); } }}
                  placeholder={t.admin.mediaUrlPlaceholder}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-slate-800"
                />
              </div>
              <button
                type="button"
                onClick={addMediaUrl}
                disabled={!mediaUrlInput.trim() || imageUrls.length >= MAX_IMAGES}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all disabled:opacity-50"
              >
                {t.admin.mediaUrlAdd}
              </button>
            </div>

            {/* Live preview of current URL input */}
            {mediaUrlInput.trim() && (
              <div className="mb-4 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-3">
                <p className="text-xs text-slate-400 mb-2 font-medium">預覽 Preview</p>
                <div className="w-full max-w-xs aspect-video rounded-lg overflow-hidden bg-slate-100 mx-auto">
                  {previewIsVideo ? (
                    <video src={mediaUrlInput.trim()} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={mediaUrlInput.trim()} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                  )}
                </div>
              </div>
            )}

            {imageUrls.length >= MAX_IMAGES && (
              <p className="mb-3 text-xs text-red-500">{t.admin.imageFull}</p>
            )}

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                {imageUrls.map((url, idx) => {
                  const isVideo = isVideoUrl(url);
                  return (
                    <div key={url} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-100">
                      {isVideo ? (
                        <video
                          src={url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      )}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                          <Play className="w-8 h-8 text-white fill-white/90 drop-shadow-lg" />
                        </div>
                      )}
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title={t.admin.removeImage}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-gold text-primary-900 text-[10px] font-bold rounded">
                          Cover
                        </span>
                      )}
                      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-slate-900/60 text-white text-[10px] font-bold rounded flex items-center gap-0.5">
                        {isVideo ? <><VideoIcon className="w-2.5 h-2.5" /> Video</> : 'Image'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.admin.status}</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setPublishStatus('published')}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  publishStatus === 'published'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {t.admin.publishNow}
              </button>
              <button
                type="button"
                onClick={() => setPublishStatus('scheduled')}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  publishStatus === 'scheduled'
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {t.admin.scheduled}
              </button>
              <button
                type="button"
                onClick={() => setPublishStatus('draft')}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  publishStatus === 'draft'
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {t.admin.draft}
              </button>
            </div>
          </div>

          {publishStatus === 'scheduled' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.scheduledAt}</label>
                <div className="relative max-w-xs">
                  <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
                  />
                </div>
                <p className="mt-2 text-xs text-amber-700">{t.admin.scheduledHint}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-none px-8 py-3 bg-primary hover:bg-primary-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 disabled:translate-y-0"
            >
              {saving ? t.admin.saving : t.admin.save}
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-xl transition-all"
            >
              {t.admin.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  }

function HonorList({
  honors, loading, search, onSearch, onAdd, onEdit, onDelete, onTogglePublish,
}: {
  honors: HonorRow[];
  loading: boolean;
  search: string;
  onSearch: (s: string) => void;
  onAdd: () => void;
  onEdit: (h: HonorRow) => void;
  onDelete: (h: HonorRow) => void;
  onTogglePublish: (h: HonorRow) => void;
}) {
  const { t, locale } = useLocale();
    const loc = (zh: string, en: string) => (locale === 'en' ? en || zh : zh || en);
    const filtered = honors.filter((h) => {
      const q = search.toLowerCase().trim();
      if (!q) return true;
      return (
        h.student_name.toLowerCase().includes(q) ||
        h.award_title.toLowerCase().includes(q) ||
        h.award_title_en.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.category_en.toLowerCase().includes(q)
      );
    });

    return (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" /> {t.admin.addHonor}
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t.admin.searchPlaceholder}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-slate-800 w-full sm:w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Trophy className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400">{search ? t.admin.searchPlaceholder : t.admin.honorEmpty}</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((h) => {
              const cover = h.image_urls?.[0] || h.image_url;
              return (
                <div
                  key={h.id}
                  className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-3 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    {cover ? (
                      <img src={cover} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 truncate">{loc(h.award_title, h.award_title_en)}</span>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full shrink-0 ${
                          h.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {h.is_published ? t.admin.published : t.admin.draft}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{h.student_name}</span>
                      <span className="px-1.5 py-0.5 bg-gold/20 rounded font-medium" style={{ color: '#92640a' }}>
                        {loc(h.category, h.category_en)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(h.event_date).toLocaleDateString(locale === 'en' ? 'en-GB' : 'zh-HK', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onTogglePublish(h)}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                      title={h.is_published ? t.admin.draft : t.admin.published}
                    >
                      {h.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onEdit(h)}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(h)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

function HonorForm({
  initial, onCancel, onSaved,
}: {
  initial: HonorRow | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const { t } = useLocale();
  const { showToast } = useToast();
  const [studentName, setStudentName] = useState(initial?.student_name ?? '');
    const [awardTitleZh, setAwardTitleZh] = useState(initial?.award_title ?? '');
    const [awardTitleEn, setAwardTitleEn] = useState(initial?.award_title_en ?? '');
    const [categoryZh, setCategoryZh] = useState(initial?.category ?? '');
    const [categoryEn, setCategoryEn] = useState(initial?.category_en ?? '');
    const [eventDate, setEventDate] = useState(initial?.event_date ?? new Date().toISOString().slice(0, 10));
    const [descriptionZh, setDescriptionZh] = useState(initial?.description ?? '');
    const [descriptionEn, setDescriptionEn] = useState(initial?.description_en ?? '');
    const [imageUrls, setImageUrls] = useState<string[]>(initial?.image_urls ?? (initial?.image_url ? [initial.image_url] : []));
    const [isPublished, setIsPublished] = useState(initial?.is_published ?? true);
    const [saving, setSaving] = useState(false);
    const [mediaUrlInput, setMediaUrlInput] = useState('');

    const addMediaUrl = () => {
      const url = mediaUrlInput.trim();
      if (!url) return;
      if (imageUrls.length >= MAX_HONOR_IMAGES) {
        showToast(t.admin.honorImageFull, 'error');
        return;
      }
      setImageUrls((prev) => [...prev, url]);
      setMediaUrlInput('');
      showToast(t.admin.toastMediaUrlAdded, 'success');
    };

    const handleSave = async () => {
      if (!studentName.trim() || !awardTitleZh.trim() || !eventDate) {
        showToast(t.admin.toastHonorSaveError, 'error');
        return;
      }
      setSaving(true);
      const cover = imageUrls[0] || '';
      const payload = {
        student_name: studentName.trim(),
        award_title: awardTitleZh.trim(),
        award_title_en: awardTitleEn.trim(),
        category: categoryZh.trim(),
        category_en: categoryEn.trim(),
        event_date: eventDate,
        description: descriptionZh.trim(),
        description_en: descriptionEn.trim(),
        image_url: cover,
        image_urls: imageUrls,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      };
      let error;
      if (initial) {
        ({ error } = await supabase.from('honors_Fencing_Plus').update(payload).eq('id', initial.id));
      } else {
        ({ error } = await supabase.from('honors_Fencing_Plus').insert(payload));
      }
      setSaving(false);
      if (error) {
        showToast(t.admin.toastHonorSaveError, 'error');
      } else {
        showToast(t.admin.toastHonorSaveSuccess, 'success');
        onSaved();
      }
    };

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.studentName}</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
                placeholder="張小明 / Lucas Cheung"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.eventDate}</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.awardTitleZh}</label>
              <input
                type="text"
                value={awardTitleZh}
                onChange={(e) => setAwardTitleZh(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
                placeholder="全港青少年劍擊錦標賽 U10 花劍冠軍"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.awardTitleEn}</label>
              <input
                type="text"
                value={awardTitleEn}
                onChange={(e) => setAwardTitleEn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
                placeholder="HK Youth Fencing Championship U10 Foil Champion"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.categoryZh}</label>
              <input
                type="text"
                value={categoryZh}
                onChange={(e) => setCategoryZh(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
                placeholder="花劍 / 個人賽"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.categoryEn}</label>
              <input
                type="text"
                value={categoryEn}
                onChange={(e) => setCategoryEn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
                placeholder="Foil / Individual"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.descriptionZh}</label>
              <textarea
                value={descriptionZh}
                onChange={(e) => setDescriptionZh(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 resize-none"
                placeholder="比賽亮點或簡短描述..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.descriptionEn}</label>
              <textarea
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800 resize-none"
                placeholder="Competition highlights or brief description..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {t.admin.honorImages}
              <span className="ml-2 text-xs font-normal text-slate-400">{t.admin.honorImagesHint}</span>
            </label>

            {/* URL input */}
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="url"
                  value={mediaUrlInput}
                  onChange={(e) => setMediaUrlInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMediaUrl(); } }}
                  placeholder={t.admin.mediaUrlPlaceholder}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-slate-800"
                />
              </div>
              <button
                type="button"
                onClick={addMediaUrl}
                disabled={!mediaUrlInput.trim() || imageUrls.length >= MAX_HONOR_IMAGES}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all disabled:opacity-50"
              >
                {t.admin.mediaUrlAdd}
              </button>
            </div>

            {/* Live preview of current URL input */}
            {mediaUrlInput.trim() && (
              <div className="mb-4 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-3">
                <p className="text-xs text-slate-400 mb-2 font-medium">預覽 Preview</p>
                <div className="w-full max-w-xs aspect-video rounded-lg overflow-hidden bg-slate-100 mx-auto">
                  <img src={mediaUrlInput.trim()} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
                </div>
              </div>
            )}

            {imageUrls.length >= MAX_HONOR_IMAGES && (
              <p className="mb-3 text-xs text-red-500">{t.admin.honorImageFull}</p>
            )}

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-gold text-primary-900 text-[10px] font-bold rounded">{t.admin.published}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setImageUrls((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.status}</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsPublished(true)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isPublished ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1.5" />{t.admin.published}
              </button>
              <button
                type="button"
                onClick={() => setIsPublished(false)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  !isPublished ? 'bg-slate-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <EyeOff className="w-4 h-4 inline mr-1.5" />{t.admin.draft}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-slate-600 hover:text-slate-800 font-bold rounded-xl hover:bg-slate-100 transition-all"
            >
              {t.admin.cancel}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-primary hover:bg-primary-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              {saving ? t.admin.saving : t.admin.save}
            </button>
          </div>
        </div>
      </div>
    );
  }

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const { showToast } = useToast();
  const [current, setCurrent] = useState('');
    const [next, setNext] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (next !== confirm) {
        showToast(t.admin.passwordMismatch, 'error');
        return;
      }
      if (next.length < 6) {
        showToast(t.admin.newPasswordHint, 'error');
        return;
      }
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: next });
      setLoading(false);
      if (error) {
        showToast(t.admin.toastPasswordError, 'error');
      } else {
        showToast(t.admin.toastPasswordSuccess, 'success');
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 z-[1050] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900">{t.admin.changePasswordTitle}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.currentPassword}</label>
              <input
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.newPassword}</label>
              <input
                type="password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
              <p className="mt-1 text-xs text-slate-400">{t.admin.newPasswordHint}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.admin.confirmPassword}</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-800"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              {loading ? t.admin.saving : t.admin.changePasswordButton}
            </button>
          </form>
        </div>
      </div>
    );
  }
