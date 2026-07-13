import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLocale, type Locale } from '../lib/locale';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const LOGO_URL =
  'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/00_Brand_Identity/FENCING%20PLUS%20Logo/BG_removed_PNG/FENCING_plus_BGremover_628x397-removebg-preview.png';

const WA_LINK = 'https://wa.me/85298765432';

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WOOD_BG_URL =
  'https://liqbuhtnlclwwilrvpgs.supabase.co/storage/v1/object/public/Fencing_plus/00_Brand_Identity/FENCING%20PLUS%20Logo/Forest_Green_Main_Color_Version/Background.png';

const WOOD_STYLE: React.CSSProperties = {
  backgroundImage: `url("${WOOD_BG_URL}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const LOCALE_LABELS: Record<Locale, string> = { 'zh-HK': '繁', en: 'EN' };
const LOCALE_OPTIONS: Locale[] = ['zh-HK', 'en'];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { t, locale, setLocale } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (key: Page) => {
    onNavigate(key);
    setMenuOpen(false);
  };

  const links: { label: string; key: Page }[] = [
    { label: t.nav.home, key: 'home' },
    { label: t.nav.about, key: 'about' },
    { label: t.nav.courses, key: 'courses' },
    { label: t.nav.team, key: 'team' },
    { label: t.nav.facilities, key: 'facilities' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 border-b border-amber-900/20 ${
        scrolled || menuOpen ? 'shadow-lg shadow-black/20' : ''
      }`}
      style={WOOD_STYLE}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between py-2 min-h-[72px]">

          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            aria-label="回到首頁"
            style={{
              background: 'transparent',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '4px 0',
              margin: 0,
              lineHeight: 0,
              boxShadow: 'none',
            }}
            className="shrink-0 group"
          >
            <img
              src={LOGO_URL}
              alt="FENCING PLUS"
              style={{
                height: '68px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                background: 'transparent',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                maxWidth: 'none',
              }}
              className="group-hover:opacity-80 transition-opacity"
            />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  currentPage === link.key
                    ? 'text-[#F2A900] bg-black/8'
                    : 'text-[#0A5C36] hover:text-[#F2A900] hover:bg-black/6'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop right: language switcher + WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 bg-black/8 rounded-lg p-0.5" aria-label="Language">
              <Globe className="w-3.5 h-3.5 text-[#0A5C36] mx-1.5 shrink-0" />
              {LOCALE_OPTIONS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                    locale === l
                      ? 'bg-[#F2A900] text-[#073b24] shadow-sm'
                      : 'text-[#0A5C36] hover:text-[#F2A900]'
                  }`}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F2A900] hover:bg-[#ffc01a] text-[#073b24] font-bold text-sm rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md shadow-amber-900/30"
            >
              {WA_ICON}
              {t.nav.whatsapp}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#0A5C36] p-2 rounded-lg hover:bg-black/8 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-amber-900/20 pt-4 pb-5 space-y-1 animate-fade-in">
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 px-4 py-2 mb-1">
              <Globe className="w-4 h-4 text-[#0A5C36] shrink-0" />
              <div className="flex items-center gap-1 bg-black/8 rounded-lg p-0.5">
                {LOCALE_OPTIONS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                      locale === l
                        ? 'bg-[#F2A900] text-[#073b24] shadow-sm'
                        : 'text-[#0A5C36] hover:text-[#F2A900]'
                    }`}
                  >
                    {LOCALE_LABELS[l]}
                  </button>
                ))}
              </div>
            </div>

            {links.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  currentPage === link.key
                    ? 'text-[#F2A900] bg-black/8'
                    : 'text-[#0A5C36] hover:text-[#F2A900] hover:bg-black/6'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full mt-3 py-3 bg-[#F2A900] hover:bg-[#ffc01a] text-[#073b24] font-bold text-sm rounded-xl transition-colors shadow-md shadow-amber-900/20"
            >
              {WA_ICON}
              {t.nav.whatsappMobile}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
