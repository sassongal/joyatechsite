
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

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
    
    // Set HTML dir attribute for RTL/LTR
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Set global fonts
    const addGlobalStyle = (css) => {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      document.head.appendChild(style);
    };
    
    addGlobalStyle(`
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap');
      
      :root {
        /* Colors */
        --color-primary: #2563eb;
        --color-primary-light: #3b82f6;
        --color-primary-dark: #1d4ed8;
        --color-secondary: #0ea5e9;
        --color-secondary-light: #38bdf8;
        --color-secondary-dark: #0284c7;
        --color-accent: #06b6d4;
        --color-accent-light: #22d3ee;
        --color-accent-dark: #0891b2;
        
        /* Spacing */
        --section-spacing-y: 6rem;
        --section-spacing-x: 2rem;
        
        /* Border Radius */
        --radius-sm: 0.375rem;
        --radius-md: 0.5rem;
        --radius-lg: 0.75rem;
        --radius-xl: 1rem;
        
        /* Shadows */
        --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      }
      
      /* Base Styles */
      html {
        scroll-behavior: smooth;
      }
      
      body {
        font-family: 'Alef', sans-serif;
        background-color: #ffffff;
        color: #1a1a1a;
        line-height: 1.75;
      }
      
      h1, h2, h3, h4, h5, h6, .font-heading {
        font-family: 'Rubik', sans-serif;
        line-height: 1.25;
      }
      
      /* Section Spacing */
      section {
        padding: var(--section-spacing-y) var(--section-spacing-x);
      }
      
      /* Container */
      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
      }
      
      /* Animations */
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-float-slow {
        animation: float 8s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      /* Transitions */
      .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
      }
      
      /* Card Styles */
      .card {
        background: #ffffff;
        border-radius: var(--radius-lg);
        border: 1px solid rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
      }
      
      .card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
      
      /* Button Styles */
      .button {
        padding: 0.75rem 1.5rem;
        font-weight: 500;
        border-radius: var(--radius-md);
        transition: all 0.3s ease;
      }
      
      .button:hover {
        transform: translateY(-2px);
      }
      
      /* Backgrounds */
      .bg-gradient-subtle {
        background: linear-gradient(to bottom right, rgba(37, 99, 235, 0.05), rgba(6, 182, 212, 0.05));
      }
      
      .bg-grid {
        background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        background-size: 40px 40px;
      }
    `);
  }, []);
  
  // Add hreflang meta tags for SEO
  useEffect(() => {
    const currentPath = window.location.pathname;
    const baseUrl = window.location.origin;

    // Set document title
    document.title = "שדרוג עיצוב האתר בהשראת Element";
    
    // Create hreflang links for Hebrew and English
    const createHreflangLink = (lang) => {
      const existingLink = document.querySelector(`link[hreflang="${lang}"]`);
      
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
      
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${baseUrl}${currentPath}?lang=${lang}`;
      
      document.head.appendChild(link);
    };
    
    createHreflangLink('he');
    createHreflangLink('en');
    
    // Cleanup on unmount
    return () => {
      const heLink = document.querySelector('link[hreflang="he"]');
      const enLink = document.querySelector('link[hreflang="en"]');
      
      if (heLink) document.head.removeChild(heLink);
      if (enLink) document.head.removeChild(enLink);
    };
  }, [currentPageName]);
  
  return (
    <div className="min-h-screen flex flex-col">
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
