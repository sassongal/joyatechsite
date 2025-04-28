
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X } from 'lucide-react';
import LanguageToggle from '../ui/LanguageToggle';

export default function Header({ language = 'he' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const rtl = language === 'he';
  
  const translations = {
    home: rtl ? 'בית' : 'Home',
    magazine: rtl ? 'מגזין Joya-Tech' : 'Joya-Tech Magazine',
    aiTools: rtl ? 'כלי AI חינמיים' : 'Free AI Tools',
    services: rtl ? 'שירותים' : 'Services',
    about: rtl ? 'אודות' : 'About',
    blog: rtl ? 'בלוג' : 'Blog',
    contact: rtl ? 'צור קשר' : 'Contact'
  };

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
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to={createPageUrl('Home') + `?lang=${language}`} className="flex items-center">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png" 
            alt="JoyaTech Logo" 
            className="h-10"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <Link 
            to={createPageUrl('Home') + `?lang=${language}`}
            className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
          >
            {translations.home}
          </Link>
          <Link 
            to={createPageUrl('Magazine') + `?lang=${language}`}
            className="text-teal-600 hover:text-teal-700 font-medium transition-colors px-3 py-1.5 bg-teal-50 rounded-md"
          >
            {translations.magazine}
          </Link>
          <Link 
            to={createPageUrl('AITools') + `?lang=${language}`}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors px-3 py-1.5 bg-blue-50 rounded-md"
          >
            {translations.aiTools}
          </Link>
          <Link 
            to={createPageUrl('Services') + `?lang=${language}`}
            className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
          >
            {translations.services}
          </Link>
          <Link 
            to={createPageUrl('About') + `?lang=${language}`}
            className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
          >
            {translations.about}
          </Link>
          <Link 
            to={createPageUrl('Blog') + `?lang=${language}`}
            className="text-gray-900 hover:text-blue-600 font-medium transition-colors"
          >
            {translations.blog}
          </Link>
          <Link 
            to={createPageUrl('Contact') + `?lang=${language}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors shadow-md hover:shadow-lg"
          >
            {translations.contact}
          </Link>
          <LanguageToggle currentLanguage={language} />
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <LanguageToggle currentLanguage={language} />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-4 rtl:mr-4 rtl:ml-0 text-gray-900 hover:text-blue-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div 
          dir={rtl ? 'rtl' : 'ltr'}
          className="md:hidden bg-white shadow-lg pt-4 pb-6 absolute top-full left-0 right-0"
        >
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to={createPageUrl('Home') + `?lang=${language}`}
              className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translations.home}
            </Link>
            <Link 
              to={createPageUrl('Magazine') + `?lang=${language}`}
              className="text-teal-600 hover:text-teal-700 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translations.magazine}
            </Link>
            <Link 
              to={createPageUrl('AITools') + `?lang=${language}`}
              className="text-blue-600 hover:text-blue-700 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translations.aiTools}
            </Link>
            <Link 
              to={createPageUrl('Services') + `?lang=${language}`}
              className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translations.services}
            </Link>
            <Link 
              to={createPageUrl('About') + `?lang=${language}`}
              className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translations.about}
            </Link>
            <Link 
              to={createPageUrl('Blog') + `?lang=${language}`}
              className="text-gray-900 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translations.blog}
            </Link>
            <Link 
              to={createPageUrl('Contact') + `?lang=${language}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors inline-block w-fit shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {translations.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
