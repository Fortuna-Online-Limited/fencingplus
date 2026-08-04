import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocale } from '../lib/locale';

type Page = 'home' | 'about' | 'team' | 'facilities';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const WA_LINK = 'https://wa.me/85268956089';
const IG_LINK = 'https://www.instagram.com/fencingplushklimited/';
const XHS_LINK = 'https://www.xiaohongshu.com/user/profile/fencingplushklimited';

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLocale();

  const links: { label: string; key: Page }[] = [
    { label: t.nav.home, key: 'home' },
    { label: t.nav.about, key: 'about' },
    { label: t.nav.team, key: 'team' },
    { label: t.nav.facilities, key: 'facilities' },
  ];

  const phoneHrefs = t.footer.phoneNumbers.map((n) => `tel:${n.replace(/\s/g, '')}`);

  const contactItems = [
    { Icon: MapPin, text: t.footer.address, href: undefined },
    { Icon: Phone, text: t.footer.phone, href: undefined, phoneHrefs },
    { Icon: Mail, text: t.footer.email, href: `mailto:${t.footer.email}` },
    { Icon: Clock, text: t.footer.hours, href: undefined },
  ] as const;

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
              {contactItems.map(({ Icon, text, href, phoneHrefs }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  {phoneHrefs ? (
                    <span className="text-white/60 text-sm">
                      {t.footer.phoneNumbers.map((num, i) => (
                        <span key={num}>
                          {i > 0 && <span className="text-white/40 mx-1">/</span>}
                          <a
                            href={phoneHrefs[i]}
                            className="hover:text-gold transition-colors"
                          >
                            {num}
                          </a>
                        </span>
                      ))}
                    </span>
                  ) : href ? (
                    <a href={href} className="text-white/60 text-sm hover:text-gold transition-colors whitespace-pre-line">{text}</a>
                  ) : (
                    <span className="text-white/60 text-sm whitespace-pre-line">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          {/* Social Links with QR Codes */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="text-center">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">
                {t.footer.qrTitle}
              </h4>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              {/* Instagram card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-4 max-w-[260px]">
                <a
                  href={IG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-full border-2 border-[#0A5C36]/20 flex items-center justify-center text-[#0A5C36] hover:border-[#F2A900] hover:scale-105 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <img
                  src="https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/information/Fencing_IG_QRcode.png"
                  alt="Instagram QR Code"
                  className="w-[200px] h-[200px] object-contain rounded-lg"
                />
                <span className="text-[#0A5C36] font-semibold text-sm">Instagram</span>
              </div>

              {/* Xiaohongshu card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-4 max-w-[260px]">
                <a
                  href={XHS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.footer.qrXhs}
                  className="w-12 h-12 rounded-full border-2 border-[#0A5C36]/20 flex items-center justify-center overflow-hidden hover:border-[#F2A900] hover:scale-105 transition-all duration-200"
                >
                  <svg viewBox="0 0 48 48" className="w-7 h-7" aria-hidden="true">
                    <rect x="4" y="4" width="40" height="40" rx="10" fill="#FF2442" />
                    <text x="24" y="20" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="sans-serif">小紅</text>
                    <text x="24" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff" fontFamily="sans-serif">書</text>
                  </svg>
                </a>
                <img
                  src="https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/information/Fencing_Xiaohongshu_QRcode.png"
                  alt="小紅書 QR Code"
                  className="w-[200px] h-[200px] object-contain rounded-lg"
                />
                <span className="text-[#0A5C36] font-semibold text-sm">{t.footer.qrXhs}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} FENCING PLUS. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
