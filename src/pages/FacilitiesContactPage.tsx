import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import {
  MapPin, Phone, Mail, Clock,
  CheckCircle, AlertCircle, Send,
  Shield, Zap, Wind, Dumbbell,
} from 'lucide-react';

const WA_LINK = 'https://wa.me/85298765432';

const facilities = [
  {
    icon: Shield,
    title: '標準電子劍道',
    desc: '配備符合國際劍擊聯盟（FIE）標準的電子計分系統，提供真實比賽體驗，助學員快速適應競賽環境。',
  },
  {
    icon: Zap,
    title: '電子計分系統',
    desc: '全套電子計分器材，即時反饋得分，讓對練更公平準確，培養學員正確的競賽意識。',
  },
  {
    icon: Wind,
    title: '防撞保護軟包',
    desc: '場地四周設有防撞保護軟包，地板採用防滑運動地膠，全方位保障學員訓練安全。',
  },
  {
    icon: Dumbbell,
    title: '體能訓練區',
    desc: '設有專屬體能訓練區域，配合劍擊訓練的敏捷性及反應速度練習，全面提升學員身體素質。',
  },
];

const courseOptions = [
  '幼兒劍擊啟蒙班（3.5-6歲）',
  '兒童劍擊恆常班（7-14歲）',
  '青少年/成人體驗班（15歲或以上）',
  '明日之星/精英訓練班',
  '未定，希望了解更多',
];

export default function FacilitiesContactPage() {
  const [form, setForm] = useState({
    parent_name: '',
    phone: '',
    student_age: '',
    course_interest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('fencing_inquiries').insert({
      parent_name: form.parent_name,
      phone: form.phone,
      student_age: form.student_age,
      course_interest: form.course_interest || null,
      message: form.message || null,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('提交時發生錯誤，請稍後再試，或直接 WhatsApp 聯絡我們。');
      return;
    }

    setStatus('success');
    setForm({ parent_name: '', phone: '', student_age: '', course_interest: '', message: '' });
  };

  return (
    <div className="bg-[#F8F9FA]">
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-primary-900/85" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Facilities &amp; Contact
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">場地 &amp; 聯絡</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            參觀我們的專業劍道設施，或留下聯絡資料，我們將盡快回覆您
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              場地設備
            </span>
            <h2 className="mt-3 text-4xl font-black text-slate-900">
              專業設施，安心學習
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              嚴格按照國際標準設計與維護，確保每位學員在最佳環境下訓練
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fencing facility"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {facilities.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hygiene notice */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-primary text-base mb-1">衛生安全承諾</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                所有劍擊器材（面罩、護甲、手套）均於每次課後進行消毒清潔，場地定期以醫療級消毒液清潔，
                確保學員在安全衛生的環境下訓練。家長可隨時查閱我們的清潔紀錄。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">
                  聯絡我們
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                  有問題？<br />讓我們告訴您
                </h2>
                <p className="mt-4 text-slate-500 leading-relaxed">
                  填寫下方表格，或直接 WhatsApp 查詢，我們通常在數小時內回覆。
                </p>
              </div>

              {[
                { icon: MapPin, label: '地址', value: '香港九龍旺角某大廈 1/F 劍擊訓練中心' },
                { icon: Phone, label: '電話 / WhatsApp', value: '+852 9876 5432' },
                { icon: Mail, label: '電郵', value: 'info@fencingplus.hk' },
                { icon: Clock, label: '營業時間', value: '週一至五 14:00–21:00\n週六至日 09:00–18:00' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wide mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-slate-800 text-sm font-medium whitespace-pre-line">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-gold/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                即時 WhatsApp 查詢
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-10">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">查詢已成功送出！</h3>
                    <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                      感謝您的查詢！我們的教練團隊將在一個工作天內與您聯絡，為您詳細介紹課程資訊。
                    </p>
                    <p className="mt-3 text-slate-400 text-sm">
                      如需即時回覆，歡迎直接 WhatsApp 聯絡我們
                    </p>
                    <div className="flex gap-3 justify-center mt-6">
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-5 py-2.5 border border-primary text-primary font-semibold rounded-xl text-sm hover:bg-primary hover:text-white transition-colors"
                      >
                        再次查詢
                      </button>
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-gold hover:bg-gold-400 text-primary-900 font-bold rounded-xl text-sm transition-colors"
                      >
                        WhatsApp 聯絡
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">免費諮詢表格</h3>
                    <p className="text-slate-500 text-sm mb-7">
                      填寫以下資料，教練將盡快致電或以 WhatsApp 回覆您
                    </p>

                    {status === 'error' && (
                      <div className="mb-5 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span className="text-sm">{errorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            家長姓名 <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="parent_name"
                            type="text"
                            required
                            value={form.parent_name}
                            onChange={handleChange}
                            placeholder="例：陳大文"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            聯絡電話 <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="例：9876 5432"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            學員年齡 <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="student_age"
                            type="text"
                            required
                            value={form.student_age}
                            onChange={handleChange}
                            placeholder="例：7歲"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            想諮詢的課程
                          </label>
                          <select
                            name="course_interest"
                            value={form.course_interest}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 text-sm bg-white"
                          >
                            <option value="">請選擇課程...</option>
                            {courseOptions.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          留言（可選）
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="請告訴我們任何問題，例如：孩子有沒有運動底子？希望了解哪類課程？對劍擊有什麼期望？"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 placeholder-slate-400 text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary-800 disabled:bg-primary-300 text-white font-black rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-primary/20 disabled:cursor-not-allowed disabled:translate-y-0"
                      >
                        {status === 'loading' ? (
                          <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            正在提交...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            提交查詢
                          </>
                        )}
                      </button>

                      <p className="text-center text-slate-400 text-xs">
                        我們尊重您的私隱，所有資料僅用於回覆查詢，絕不會轉交第三方。
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
