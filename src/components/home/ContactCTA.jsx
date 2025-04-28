import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedElement from '../ui/AnimatedElement';

export default function ContactCTA({ language = 'he' }) {
  const rtl = language === 'he';
  
  const translations = {
    title: rtl ? 'מוכנים להצליח בדיגיטל?' : 'Ready to Succeed Digitally?',
    subtitle: rtl 
      ? 'צרו איתנו קשר היום ונתחיל לעבוד על הפתרון המושלם עבורכם'
      : 'Contact us today and we\'ll start working on the perfect solution for you',
    cta: rtl ? 'דברו איתנו' : 'Talk to Us',
    ctaSecondary: rtl ? 'גלו את השירותים שלנו' : 'Explore Our Services'
  };

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="py-20 bg-blue-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedElement animation="fadeIn" className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{translations.title}</h2>
          <p className="text-xl text-blue-100 mb-10">{translations.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={createPageUrl('Contact') + `?lang=${language}`}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              {translations.cta}
            </Link>
            <Link 
              to={createPageUrl('Services') + `?lang=${language}`}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all border border-blue-500 shadow-md hover:shadow-lg"
            >
              {translations.ctaSecondary}
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}