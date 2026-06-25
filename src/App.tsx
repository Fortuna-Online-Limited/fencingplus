import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';

type Page = 'home' | 'services' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={navigate} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
