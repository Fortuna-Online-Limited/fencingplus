import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import {
  MapPin, Phone, Mail, Clock,
  CheckCircle, AlertCircle, Send,
  Shield, Zap, Wind, Dumbbell,
} from 'lucide-react';
import { useLocale } from '../lib/locale';

const WA_LINK = 'https://wa.me/85298765432';

const FACILITY_ICONS = [Shield, Zap, Wind, Dumbbell];

export default function FacilitiesContactPage() {
  const { t } = useLocale();

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

    const { error } = await supabase.from('inquiries_Fencing_Plus').insert({
      name: form.parent_name,
      phone: form.phone,
      child_name: form.student_age,
      message: (form.course_interest
        ? `課程意向：${form.course_interest}${form.message ? `\n${form.message}` : ''}`
        : form.message) || '',
    });

    if (error) {
      setStatus('error');
      setErrorMsg(t.facilities.errorMsg);
      return;
    }

    setStatus('success');
    setForm({ parent_name: '', phone: '', student_age: '', course_interest: '', message: '' });
  };

  const contactInfoIcons = [MapPin, Phone, Mail, Clock];

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
            {t.facilities.heroEyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">{t.facilities.heroTitle}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">{t.facilities.heroSubtitle}</p>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              {t.facilities.facilitySectionLabel}
            </span>
            <h2 className="mt-3 text-4xl font-black text-slate-900">{t.facilities.facilityTitle}</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">{t.facilities.facilitySubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/information/to_be_confirmed.png"
                alt="Fencing facility"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.facilities.facilityCards.map((f, i) => {
                const Icon = FACILITY_ICONS[i];
                return (
                  <div key={f.title} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5">{f.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hygiene notice */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-primary text-base mb-1">{t.facilities.hygieneTitle}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{t.facilities.hygieneBody}</p>
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
                  {t.facilities.contactSectionLabel}
                </span>
                <h2
                  className="mt-3 text-3xl md:text-4xl font-black text-slate-900 leading-tight"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {t.facilities.contactTitle}
                </h2>
                <p className="mt-4 text-slate-500 leading-relaxed">{t.facilities.contactSubtitle}</p>
              </div>

              {t.facilities.contactInfoItems.map((item, i) => {
                const Icon = contactInfoIcons[i];
                return (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
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
                );
              })}

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-gold hover:bg-gold-400 text-primary-900 font-black rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-gold/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.facilities.waButton}
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
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{t.facilities.successTitle}</h3>
                    <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">{t.facilities.successBody}</p>
                    <p className="mt-3 text-slate-400 text-sm">{t.facilities.successWaHint}</p>
                    <div className="flex gap-3 justify-center mt-6">
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-5 py-2.5 border border-primary text-primary font-semibold rounded-xl text-sm hover:bg-primary hover:text-white transition-colors"
                      >
                        {t.facilities.successBack}
                      </button>
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-gold hover:bg-gold-400 text-primary-900 font-bold rounded-xl text-sm transition-colors"
                      >
                        {t.facilities.successWaButton}
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{t.facilities.formTitle}</h3>
                    <p className="text-slate-500 text-sm mb-7">{t.facilities.formSubtitle}</p>

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
                            {t.facilities.nameLabel} <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="parent_name"
                            type="text"
                            required
                            value={form.parent_name}
                            onChange={handleChange}
                            placeholder={t.facilities.namePlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            {t.facilities.phoneLabel} <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder={t.facilities.phonePlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            {t.facilities.ageLabel} <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="student_age"
                            type="text"
                            required
                            value={form.student_age}
                            onChange={handleChange}
                            placeholder={t.facilities.agePlaceholder}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            {t.facilities.courseLabel}
                          </label>
                          <select
                            name="course_interest"
                            value={form.course_interest}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition text-slate-900 text-sm bg-white"
                          >
                            <option value="">{t.facilities.coursePlaceholder}</option>
                            {t.facilities.courseOptions.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          {t.facilities.messageLabel}
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          placeholder={t.facilities.messagePlaceholder}
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
                            {t.facilities.submittingButton}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {t.facilities.submitButton}
                          </>
                        )}
                      </button>

                      <p className="text-center text-slate-400 text-xs">{t.facilities.privacyNote}</p>
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
