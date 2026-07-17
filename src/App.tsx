import { useState, useEffect } from 'react';
import { LocaleProvider } from './lib/locale';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import TeamPage from './pages/TeamPage';
import FacilitiesContactPage from './pages/FacilitiesContactPage';

type Page = 'home' | 'about' | 'courses' | 'team' | 'facilities';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  const pageComponents: Record<Page, React.ReactNode> = {
    home: <HomePage onNavigate={navigate} />,
    about: <AboutPage onNavigate={navigate} />,
    courses: <CoursesPage />,
    team: <TeamPage onNavigate={navigate} />,
    facilities: <FacilitiesContactPage />,
  };

  return (
    <ErrorBoundary>
      <LocaleProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar currentPage={currentPage} onNavigate={navigate} />
          <main className="flex-1">{pageComponents[currentPage]}</main>
          <Footer onNavigate={navigate} />
          <WhatsAppButton />
        </div>
      </LocaleProvider>
    </ErrorBoundary>
  );
}
