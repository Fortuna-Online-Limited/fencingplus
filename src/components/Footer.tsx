import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocale } from '../lib/locale';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const WA_LINK = 'https://wa.me/85298765432';

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLocale();

  const links: { label: string; key: Page }[] = [
    { label: t.nav.home, key: 'home' },
    { label: t.nav.about, key: 'about' },
    { label: t.nav.courses, key: 'courses' },
    { label: t.nav.team, key: 'team' },
    { label: t.nav.facilities, key: 'facilities' },
  ];

  const contactItems = [
    { Icon: MapPin, text: t.footer.address },
    { Icon: Phone, text: t.footer.phone },
    { Icon: Mail, text: t.footer.email },
    { Icon: Clock, text: t.footer.hours },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <button onClick={() => onNavigate('home')} className="flex items-center mb-5 group">
              <img
                src="https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/00_Brand_Identity/FENCING%20PLUS%20Logo/BG_removed_PNG/FENCING_plus_BGremover_628x397-removebg-preview.png"
                alt="FENCING PLUS"
                className="h-16 w-auto object-contain brightness-0 invert group-hover:opacity-85 transition-opacity"
              />
            </button>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t.footer.brandTagline}
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-gold hover:bg-gold-400 text-primary-900 font-bold text-sm rounded-xl transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.footer.brandCta}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => onNavigate(link.key)}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              {t.footer.contactLabel}
            </h4>
            <ul className="space-y-4">
              {contactItems.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm whitespace-pre-line">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} FENCING PLUS. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
