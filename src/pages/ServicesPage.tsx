import { ArrowRight, CheckCircle } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    img: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Wood Privacy Fencing',
    description:
      'Classic and timeless, our wood privacy fences are crafted from premium cedar, pine, and redwood. Perfect for creating a secluded outdoor retreat with natural warmth and charm.',
    features: ['Cedar, Pine & Redwood options', 'Heights from 4ft to 8ft', 'Staining & sealing available', 'Board-on-board or shadowbox styles'],
  },
  {
    img: 'https://images.pexels.com/photos/3609851/pexels-photo-3609851.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Vinyl & PVC Fencing',
    description:
      'Low-maintenance and long-lasting, vinyl fencing offers the look of painted wood without the upkeep. Available in dozens of styles and colors to complement any home.',
    features: ['Zero maintenance required', '30-year color warranty', 'Rot & pest resistant', 'Variety of styles & heights'],
  },
  {
    img: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Ornamental Iron & Steel',
    description:
      'Make a bold statement with our custom ornamental iron and steel fencing. Ideal for elegant entries, pool enclosures, and decorative perimeter fencing.',
    features: ['Custom design fabrication', 'Powder-coated finish options', 'Corrosion resistant', 'Pairs beautifully with brick or stone'],
  },
  {
    img: 'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Chain Link Fencing',
    description:
      'Affordable and highly durable, chain link fencing is ideal for securing large properties, sports courts, and commercial facilities without sacrificing visibility.',
    features: ['Galvanized & vinyl-coated options', 'Various gauge weights', 'Privacy slats available', 'Cost-effective for large areas'],
  },
  {
    img: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Aluminum Fencing',
    description:
      'Elegant and rust-free, aluminum fencing is the premier choice for pool areas and decorative enclosures. Lightweight yet strong, it never needs painting or staining.',
    features: ['Completely rust-proof', 'Lightweight & strong', 'Pool-safe designs', 'Multiple colors & styles'],
  },
  {
    img: 'https://images.pexels.com/photos/1076209/pexels-photo-1076209.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Farm & Ranch Fencing',
    description:
      'Keep livestock safe and land boundaries defined with our heavy-duty agricultural fencing. We install split rail, woven wire, barbed wire, and electric fence systems.',
    features: ['Split rail & woven wire', 'Electric fence installation', 'Large acreage specialists', 'Livestock & equine solutions'],
  },
];

const process = [
  { step: '01', title: 'Free Consultation', desc: 'We visit your property, assess your needs, and provide a detailed, no-obligation quote.' },
  { step: '02', title: 'Design & Planning', desc: 'Our team works with you on material selection, style, and layout to create your perfect fence.' },
  { step: '03', title: 'Professional Installation', desc: 'Certified installers handle every detail from permits to post-setting to final cleanup.' },
  { step: '04', title: 'Quality Inspection', desc: 'We walk through the finished project with you to ensure complete satisfaction before we leave.' },
];

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/3609851/pexels-photo-3609851.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-amber-400 font-semibold text-sm tracking-widest uppercase mb-4">
            What We Offer
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
            Our Services
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            From residential privacy to large-scale commercial installations, Fencing
            Plus provides expert solutions across every fencing category.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-100 border border-slate-100 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm tracking-widest uppercase">
              How It Works
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
              Our Simple Process
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
              Getting a beautiful new fence is easier than you think. Here's what to
              expect from start to finish.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-amber-500/50 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-5">
                    <span className="text-slate-900 font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Not Sure Which Fence Is Right for You?
          </h2>
          <p className="text-slate-800 text-lg mb-8">
            Our experts will guide you through every option and recommend the best
            solution for your property, budget, and style.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
          >
            Request a Free Consultation
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
