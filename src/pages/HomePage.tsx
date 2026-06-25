import { ArrowRight, CheckCircle, Star } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '2,400+', label: 'Projects Completed' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '50+', label: 'Expert Installers' },
];

const highlights = [
  'Licensed & Fully Insured',
  'Free On-Site Estimates',
  'Lifetime Workmanship Warranty',
  'Same-Week Installation Available',
  'Eco-Friendly Material Options',
  'Custom Design Consultations',
];

const testimonials = [
  {
    name: 'James Harrington',
    role: 'Homeowner',
    text: 'Fencing Plus transformed our backyard completely. The craftsmanship is outstanding and the team was professional from start to finish. Would recommend to anyone.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Property Manager',
    text: 'We have used Fencing Plus for three commercial properties now. Their consistency and quality are unmatched. Fast, reliable, and competitively priced.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
  {
    name: 'Robert Castillo',
    role: 'Ranch Owner',
    text: 'The agricultural fencing they installed has held up perfectly over two years. Excellent value and the crew was incredibly knowledgeable about what we needed.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/75 to-slate-800/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium tracking-wide">
              Professional Fencing Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Built to Last.{' '}
            <span className="text-amber-400">Designed to Impress.</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            From residential privacy fences to commercial security installations,
            Fencing Plus delivers premium craftsmanship backed by over 15 years of
            trusted expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-0.5"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              View Our Services
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">
                Why Choose Us
              </span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Quality You Can Count On, Every Time
              </h2>
              <p className="mt-5 text-slate-600 text-lg leading-relaxed">
                We believe a fence is more than a boundary — it's an investment in
                your property's value, security, and curb appeal. Every project
                receives our full commitment to excellence.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('services')}
                className="mt-10 group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Explore All Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-300">
                <img
                  src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional fence installation"
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-500 rounded-2xl p-6 shadow-xl">
                <div className="text-slate-900 font-bold text-3xl">15+</div>
                <div className="text-slate-900/80 text-sm font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase">
              Our Services
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
              A Fence for Every Need
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              From classic wood to modern steel, we offer the full spectrum of
              fencing solutions for residential and commercial clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
                title: 'Residential Fencing',
                desc: 'Beautiful, durable fences that add privacy, security, and value to your home.',
              },
              {
                img: 'https://images.pexels.com/photos/3609851/pexels-photo-3609851.jpeg?auto=compress&cs=tinysrgb&w=600',
                title: 'Commercial & Industrial',
                desc: 'High-security perimeter fencing for businesses, warehouses, and facilities.',
              },
              {
                img: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600',
                title: 'Custom Metalwork',
                desc: 'Ornamental iron and custom steel fabrication for gates, railings, and more.',
              },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => onNavigate('services')}
                className="group relative rounded-2xl overflow-hidden text-left focus:outline-none"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-amber-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 font-semibold rounded-xl transition-all duration-200"
            >
              View All Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-semibold text-sm tracking-widest uppercase">
              Testimonials
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-slate-500 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-slate-800 text-lg mb-8">
            Contact us today for a free, no-obligation estimate. Our team is ready to
            bring your vision to life.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-slate-900/30"
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
