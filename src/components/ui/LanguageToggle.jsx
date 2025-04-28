import React from 'react';
import { createPageUrl } from '@/utils';

export default function LanguageToggle({ currentLanguage }) {
  // Remove useRouter since we're not using react-router's hook system
  // Instead we'll use window.location methods directly

  // Get current pathname and convert to the other language
  const switchLanguage = () => {
    const newLang = currentLanguage === 'he' ? 'en' : 'he';
    
    // Extract the current page path
    const currentPath = window.location.pathname;
    let pageName = '';
    
    // Determine which page we're on
    if (currentPath.includes('/blog/')) {
      // We would need to look up the corresponding slug in the other language
      // For simplicity, we'll just redirect to the blog page
      pageName = 'Blog';
    } else if (currentPath.includes('/services/')) {
      // Similar to blog post, we'd need to look up the corresponding service slug
      pageName = 'Services';
    } else if (currentPath.includes('/contact')) {
      pageName = 'Contact';
    } else if (currentPath.includes('/about')) {
      pageName = 'About';
    } else if (currentPath.includes('/services')) {
      pageName = 'Services';
    } else if (currentPath.includes('/blog')) {
      pageName = 'Blog';
    } else if (currentPath.includes('/blogpost')) {
      pageName = 'BlogPost';
    } else {
      // Default to home page
      pageName = 'Home';
    }
    
    // Preserve any URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set the language parameter
    urlParams.set('lang', newLang);
    
    // Navigate to the same page in the other language
    window.location.href = createPageUrl(pageName) + `?${urlParams.toString()}`;
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