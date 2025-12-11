import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LanguageToggle({ currentLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current pathname and convert to the other language
  const switchLanguage = () => {
    const newLang = currentLanguage === 'he' ? 'en' : 'he';
    
    // Extract the current page path
    const currentPath = location.pathname;
    let pageName = '';
    
    // Determine which page we're on
    if (currentPath.includes('/services/')) {
      // Similar to blog post, we'd need to look up the corresponding service slug
      pageName = 'Services';
    } else if (currentPath.includes('/contact')) {
      pageName = 'Contact';
    } else if (currentPath.includes('/about')) {
      pageName = 'About';
    } else if (currentPath.includes('/services')) {
      pageName = 'Services';
    } else if (currentPath.includes('/tools')) {
      pageName = 'Tools';
    } else if (currentPath.includes('/courses')) {
      pageName = 'Courses';
    } else if (currentPath.includes('/magazine')) {
      pageName = 'Magazine';
    } else {
      // Default to home page
      pageName = 'Home';
    }
    
    // Preserve any URL parameters
    const urlParams = new URLSearchParams(location.search);
    
    // Set the language parameter
    urlParams.set('lang', newLang);
    
    // Navigate to the same page in the other language
    navigate(`${createPageUrl(pageName)}?${urlParams.toString()}`);
  };

  return (
    <button
      onClick={switchLanguage}
      className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-md bg-white/10 hover:bg-white/20 transition-colors"
      aria-label={currentLanguage === 'he' ? 'Switch to English' : 'עבור לעברית'}
    >
      {currentLanguage === 'he' ? 'EN' : 'עב'}
    </button>
  );
}
