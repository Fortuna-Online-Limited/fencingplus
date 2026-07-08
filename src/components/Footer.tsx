import { Sword, MapPin, Phone, Mail, Clock } from 'lucide-react';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const WA_LINK = 'https://wa.me/85298765432';

export default function Footer({ onNavigate }: FooterProps) {
  const links: { label: string; key: Page }[] = [
    { label: '首頁', key: 'home' },
    { label: '關於我們', key: 'about' },
    { label: '課程介紹', key: 'courses' },
    { label: '教練團隊', key: 'team' },
    { label: '場地 & 聯絡', key: 'facilities' },
  ];

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <Sword className="w-5 h-5 text-primary-900 rotate-45" />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-black text-base tracking-wide">FENCING</span>
                <span className="block text-gold font-bold text-xs tracking-[0.25em] uppercase">Plus</span>
              </div>
            </button>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              讓劍擊成為孩子成長的自信基石。專業兒童及青少年劍擊培訓，由啟蒙到競技，陪伴每一個孩子成長。
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
              WhatsApp 即時查詢
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">快速導覽</h4>
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
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">聯絡資訊</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">香港九龍旺角某大廈<br />1/F 劍擊訓練中心</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-white/60 text-sm">+852 9876 5432</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="text-white/60 text-sm">info@fencingplus.hk</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">週一至週五 14:00–21:00<br />週六至週日 09:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} FENCING PLUS. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            培育下一代劍擊精英 &bull; 由香港出發，放眼國際
          </p>
        </div>
      </div>
    </footer>
  );
}
