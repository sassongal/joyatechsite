
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LightRaysMenu from './components/LightRaysMenu';

export default function Layout({ children, currentPageName }) {
  const [language, setLanguage] = useState('he'); // Default language is Hebrew
  
  useEffect(() => {
    // Check URL parameters for language preference
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    if (langParam && (langParam === 'he' || langParam === 'en')) {
      setLanguage(langParam);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang && browserLang.startsWith('he')) {
        setLanguage('he');
      } else {
        setLanguage('en');
      }
    }
  }, []); // Language detection only runs once

  useEffect(() => {
    // Set HTML dir and lang attributes when language changes
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  
  return (
    <div className="min-h-screen flex flex-col">
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

      <LightRaysMenu />
      <Header language={language} />
      <main className="flex-grow pt-20">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { language });
          }
          return child;
        })}
      </main>
      <Footer language={language} />
    </div>
  );
}
