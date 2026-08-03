import { useState, useEffect } from 'react';
import { LocaleProvider } from './lib/locale';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import FacilitiesContactPage from './pages/FacilitiesContactPage';
import AdminPage from './pages/AdminPage';

type Page = 'home' | 'about' | 'team' | 'facilities';

function isAdminRoute() {
  const p = window.location.pathname.replace(/\/+$/, '');
  return p === '/admin' || p === '/admin/login';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [adminMode, setAdminMode] = useState(isAdminRoute());

  useEffect(() => {
    const onPop = () => setAdminMode(isAdminRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  if (adminMode) {
    return (
      <ErrorBoundary>
        <LocaleProvider>
          <ToastProvider>
            <AdminPage />
          </ToastProvider>
        </LocaleProvider>
      </ErrorBoundary>
    );
  }

  const pageComponents: Record<Page, React.ReactNode> = {
    home: <HomePage onNavigate={navigate} />,
    about: <AboutPage onNavigate={navigate} />,
    team: <TeamPage onNavigate={navigate} />,
    facilities: <FacilitiesContactPage />,
  };

  return (
    <ErrorBoundary>
      <LocaleProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar currentPage={currentPage} onNavigate={navigate} />
            <main className="flex-1">{pageComponents[currentPage]}</main>
            <Footer onNavigate={navigate} />
            <WhatsAppButton />
          </div>
        </ToastProvider>
      </LocaleProvider>
    </ErrorBoundary>
  );
}
