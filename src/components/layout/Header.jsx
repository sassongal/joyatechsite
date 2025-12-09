
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { getTranslation, isRTL } from '@/constants/translations';
import { Menu, X } from 'lucide-react';
import LanguageToggle from '../ui/LanguageToggle';
import GooeyNav from '../GooeyNav';
import joyaLogo from '@/assets/graphics/joyairon.png';

export default function Header({ language = 'he' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const rtl = isRTL(language);

  // Translation helper
  const t = (key) => getTranslation(key, language);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      dir={rtl ? 'rtl' : 'ltr'}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-neutral-50/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
      aria-label={rtl ? 'תפריט עליון' : 'Top navigation'}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={createPageUrl('Home') + `?lang=${language}`} className="flex items-center relative" aria-label={rtl ? 'חזרה לדף הבית' : 'Back to home'}>
          <img 
            src={joyaLogo}
            alt="JoyaTech Logo" 
            className="h-20 -mt-8"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center" aria-label={rtl ? 'ניווט ראשי' : 'Main navigation'}>
          <GooeyNav
            items={[
              { label: t('home'), href: createPageUrl('Home') + `?lang=${language}` },
              { label: t('magazine'), href: createPageUrl('Magazine') + `?lang=${language}` },
              { label: t('tools'), href: createPageUrl('Tools') + `?lang=${language}` },
              { label: t('courses'), href: createPageUrl('Courses') + `?lang=${language}` },
              { label: t('services'), href: createPageUrl('Services') + `?lang=${language}` },
              { label: t('about'), href: createPageUrl('About') + `?lang=${language}` }
            ]}
            particleCount={20}
            animationTime={800}
            timeVariance={400}
          />
          <LanguageToggle currentLanguage={language} />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <LanguageToggle currentLanguage={language} />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-4 rtl:mr-4 rtl:ml-0 text-gray-900 hover:text-primary-600 transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? (rtl ? 'סגור תפריט' : 'Close menu') : (rtl ? 'פתח תפריט' : 'Open menu')}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div 
          dir={rtl ? 'rtl' : 'ltr'}
          className="md:hidden bg-neutral-50 shadow-lg pt-4 pb-6 absolute top-full left-0 right-0"
        >
          <nav className="container mx-auto px-4 flex flex-col space-y-4" aria-label={rtl ? 'תפריט נייד' : 'Mobile navigation'}>
            <Link 
              to={createPageUrl('Home') + `?lang=${language}`}
              className="text-neutral-900 hover:text-primary-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link 
              to={createPageUrl('Magazine') + `?lang=${language}`}
              className="text-neutral-900 hover:text-primary-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("magazine")}
            </Link>
            <Link
              to={createPageUrl('Tools') + `?lang=${language}`}
              className="text-neutral-900 hover:text-primary-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("tools")}
            </Link>
            <Link
              to={createPageUrl('Courses') + `?lang=${language}`}
              className="text-neutral-900 hover:text-primary-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("courses")}
            </Link>
            <Link 
              to={createPageUrl('Services') + `?lang=${language}`}
              className="text-gray-900 hover:text-primary-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("services")}
            </Link>
            <Link
              to={createPageUrl('About') + `?lang=${language}`}
              className="text-gray-900 hover:text-primary-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("about")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
