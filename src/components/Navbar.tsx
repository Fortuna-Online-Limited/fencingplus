import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Home', key: 'home' },
    { label: 'Services', key: 'services' },
    { label: 'Contact Us', key: 'contact' },
  ];

  const handleNav = (key: string) => {
    onNavigate(key);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-slate-900 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors">
              <Shield className="w-5 h-5 text-slate-900" />
            </div>
            <div className="text-left">
              <span className="block text-white font-bold text-lg leading-none tracking-tight">
                Fencing
              </span>
              <span className="block text-amber-400 font-semibold text-sm leading-none tracking-widest uppercase">
                Plus
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.key
                    ? 'bg-amber-500 text-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="ml-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-6 border-t border-white/10 pt-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === link.key
                    ? 'bg-amber-500 text-slate-900'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('contact')}
              className="block w-full mt-3 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors text-center"
            >
              Get Free Quote
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
