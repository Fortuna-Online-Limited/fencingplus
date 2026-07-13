import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

const serviceOptions = [
  'Wood Privacy Fencing',
  'Vinyl & PVC Fencing',
  'Ornamental Iron & Steel',
  'Chain Link Fencing',
  'Aluminum Fencing',
  'Farm & Ranch Fencing',
  'Other / Not Sure',
];

const contactInfo = [
  {
    icon: MapPin,
    label: 'Our Location',
    value: '4821 Oakwood Drive, Austin, TX 78701',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(512) 555-0192',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@fencingplus.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Fri: 7am–6pm  |  Sat: 8am–4pm',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('inquiries_Fencing_Plus').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || '',
      message: (form.service
        ? `Service: ${form.service}\n${form.message}`
        : form.message),
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us directly.');
      return;
    }

    setStatus('success');
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1076209/pexels-photo-1076209.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">Contact Us</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to get started? Reach out for a free estimate or to ask any
            questions — our team usually responds within a few hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Let's Talk About Your Project
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Whether you have a detailed plan or just a rough idea, we're here to
                  help you every step of the way.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100"
                  >
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-slate-800 font-medium text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 h-52">
                <img
                  src="https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Office area"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-10">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      Message Received!
                    </h3>
                    <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. A member of our team will contact you
                      within 1 business day.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-slate-900 mb-7">
                      Request a Free Estimate
                    </h3>

                    {status === 'error' && (
                      <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span className="text-sm">{errorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                          >
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="(512) 555-0100"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition text-slate-900 placeholder-slate-400 text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                          >
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition text-slate-900 text-sm bg-white"
                          >
                            <option value="">Select a service...</option>
                            {serviceOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project — property size, fence style, any special requirements..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none transition text-slate-900 placeholder-slate-400 text-sm resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-900 font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-amber-500/20 disabled:cursor-not-allowed disabled:translate-y-0"
                      >
                        {status === 'loading' ? (
                          <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-center text-slate-400 text-xs">
                        We respect your privacy. Your information is never shared with
                        third parties.
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
