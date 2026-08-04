import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Lock, LogOut, Plus, Pencil, Trash2, X, Upload, Image as ImageIcon,
  Calendar, Eye, EyeOff, KeyRound, ArrowLeft, FileText, Newspaper,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLocale } from '../lib/locale';
import { useToast } from '../components/Toast';

const STORAGE_BUCKET = 'Fencing_plus';
const STORAGE_FOLDER = '05_News';
const MAX_IMAGES = 10;

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
}

type View = 'list' | 'edit';

export default function AdminPage() {
  const { t, locale } = useLocale();
  const { showToast } = useToast();

  const [session, setSession] = useState<ReturnType<typeof supabase.auth.getSession> extends Promise<infer R> ? Awaited<R>['data']['session'] : null>(null);
  const [authReady, setAuthReady] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [view, setView] = useState<View>('list');
  const [news, setNews] = useState<NewsRow[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [editing, setEditing] = useState<NewsRow | null>(null);

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

  useEffect(() => {
    if (session) fetchNews();
  }, [session, fetchNews]);

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
            <h1 className="text-2xl font-black text-white">{t.admin.loginTitle}</h1>
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
              <Newspaper className="w-5 h-5 text-primary-900" />
            </div>
            <div>
              <div className="text-white font-black leading-tight">{t.admin.dashboardTitle}</div>
              <div className="text-white/50 text-xs">{t.admin.dashboardSubtitle}</div>
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
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {view === 'list' && (
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

        {view === 'edit' && (
          <NewsForm
            initial={editing}
            onCancel={() => { setEditing(null); setView('list'); }}
            onSaved={() => { setEditing(null); setView('list'); fetchNews(); }}
          />
        )}
      </main>

      {showPwdModal && (
        <ChangePasswordModal onClose={() => setShowPwdModal(false)} />
      )}
    </div>
  );

  function NewsList({
    news, loading, onAdd, onEdit, onDelete,
  }: {
    news: NewsRow[];
    loading: boolean;
    onAdd: () => void;
    onEdit: (n: NewsRow) => void;
    onDelete: (n: NewsRow) => void;
  }) {
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
              return (
                <div
                  key={n.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    {cover ? (
                      <img src={cover} alt={title} className="w-full h-full object-cover" />
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
                          n.is_published
                            ? { backgroundColor: '#dcfce7', color: '#15803d' }
                            : { backgroundColor: '#f1f5f9', color: '#64748b' }
                        }
                      >
                        {n.is_published ? t.admin.statusBadge.published : t.admin.statusBadge.draft}
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
    const [publishDate, setPublishDate] = useState(
      initial?.publish_date || new Date().toISOString().slice(0, 10)
    );
    const [titleZh, setTitleZh] = useState(initial?.title_zh || '');
    const [titleEn, setTitleEn] = useState(initial?.title_en || '');
    const [contentZh, setContentZh] = useState(initial?.content_zh || '');
    const [contentEn, setContentEn] = useState(initial?.content_en || '');
    const [imageUrls, setImageUrls] = useState<string[]>(initial?.image_urls || []);
    const [isPublished, setIsPublished] = useState(initial?.is_published ?? true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const uploadFiles = async (files: FileList) => {
      const remaining = MAX_IMAGES - imageUrls.length;
      const toUpload = Array.from(files).slice(0, remaining);
      if (toUpload.length === 0) {
        showToast(t.admin.toastImageLimit, 'error');
        return;
      }
      setUploading(true);
      const uploaded: string[] = [];
      for (const file of toUpload) {
        const ext = file.name.split('.').pop() || 'jpg';
        const path = `${STORAGE_FOLDER}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, file, { upsert: false });
        if (error) {
          showToast(t.admin.toastUploadError, 'error');
          continue;
        }
        const { data: pub } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        if (pub?.publicUrl) uploaded.push(pub.publicUrl);
      }
      if (uploaded.length > 0) {
        setImageUrls((prev) => [...prev, ...uploaded]);
        showToast(`${uploaded.length} ${t.admin.toastUploadSuccess}`, 'success');
      }
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    };

    const removeImage = (idx: number) => {
      setImageUrls((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSave = async () => {
      setSaving(true);
      const payload = {
        publish_date: publishDate,
        title_zh: titleZh,
        title_en: titleEn,
        content_zh: contentZh,
        content_en: contentEn,
        image_url: imageUrls[0] || initial?.image_url || '',
        image_urls: imageUrls,
        is_published: isPublished,
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
              <label className="block text-sm font-semibold text-slate-700">{t.admin.images}</label>
              <span className="text-xs text-slate-400">{t.admin.imagesHint}</span>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && uploadFiles(e.target.files)}
                className="hidden"
                id="news-images-input"
              />
              <label
                htmlFor="news-images-input"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-50 text-primary font-semibold rounded-xl cursor-pointer hover:bg-primary-100 transition-all"
              >
                {uploading ? (
                  <><Upload className="w-5 h-5 animate-pulse" /> {t.admin.uploading}</>
                ) : (
                  <><Upload className="w-5 h-5" /> {t.admin.uploadImages}</>
                )}
              </label>
              {imageUrls.length >= MAX_IMAGES && (
                <p className="mt-2 text-xs text-red-500">{t.admin.imageFull}</p>
              )}
            </div>

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                {imageUrls.map((url, idx) => (
                  <div key={url} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square">
                    <img src={url} alt="" className="w-full h-full object-cover" />
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
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">{t.admin.status}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsPublished(true)}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  isPublished
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {t.admin.published}
              </button>
              <button
                onClick={() => setIsPublished(false)}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  !isPublished
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {t.admin.draft}
              </button>
            </div>
          </div>

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

  function ChangePasswordModal({ onClose }: { onClose: () => void }) {
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
}
