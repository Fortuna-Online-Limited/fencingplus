import { Shield, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-slate-900" />
              </div>
              <div className="text-left">
                <span className="block text-white font-bold text-lg leading-none">Fencing</span>
                <span className="block text-amber-400 font-semibold text-sm leading-none tracking-widest uppercase">Plus</span>
              </div>
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Premium fencing solutions crafted with precision and built to stand the
              test of time. Serving Austin and surrounding areas since 2009.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 bg-white/5 hover:bg-amber-500/20 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400 hover:text-amber-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', key: 'home' },
                { label: 'Services', key: 'services' },
                { label: 'Contact Us', key: 'contact' },
              ].map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className="text-slate-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">(512) 555-0192</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">hello@fencingplus.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-slate-400 text-sm">4821 Oakwood Drive<br />Austin, TX 78701</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Fencing Plus. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Licensed & Insured &bull; TX License #FP-2024-0081
          </p>
        </div>
      </div>
    </footer>
  );
}
