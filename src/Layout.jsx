
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LightRaysMenu from './components/LightRaysMenu';
import StickyCTA from './components/ui/StickyCTA';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function Layout({ children, currentPageName }) {
  const [language, setLanguage] = useState('he'); // Default language is Hebrew
  const prefersReducedMotion = useReducedMotion();
  const enableLightRays = false;
  const location = useLocation();
  
  useEffect(() => {
    // Check URL parameters for language preference
    const urlParams = new URLSearchParams(location.search);
    const langParam = urlParams.get('lang');

    if (langParam && (langParam === 'he' || langParam === 'en')) {
      setLanguage(langParam);
      localStorage.setItem('lang', langParam);
    } else {
      // Fallback to saved preference or browser language
      const stored = localStorage.getItem('lang');
      if (stored === 'he' || stored === 'en') {
        setLanguage(stored);
      } else {
        const browserLang = navigator.language || navigator.userLanguage;
        setLanguage(browserLang && browserLang.startsWith('he') ? 'he' : 'en');
      }
    }
  }, [location.search]);

  useEffect(() => {
    // Set HTML dir and lang attributes when language changes
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        {language === 'he' ? 'דלג לתוכן הראשי' : 'Skip to main content'}
      </a>

      {/* SVG filter for gooey effect */}
      <svg className="gooey-filter-svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
          </filter>
        </defs>
      </svg>

      {!prefersReducedMotion && enableLightRays && <LightRaysMenu />}
      <Header language={language} />
      <main id="main-content" className="flex-grow pt-20">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { language });
          }
          return child;
        })}
      </main>
      <StickyCTA language={language} />
      <Footer language={language} />
    </div>
  );
}
