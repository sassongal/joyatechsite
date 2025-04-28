import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedElement from '../ui/AnimatedElement';

export default function Hero({ language = 'he' }) {
  const rtl = language === 'he';
  
  const translations = {
    title: rtl 
      ? 'פתרונות דיגיטליים חדשניים לצמיחת העסק שלך'
      : 'Innovative Digital Solutions for Your Business Growth',
    subtitle: rtl
      ? 'Joya-Tech מספקת שירותי דיגיטל מותאמים אישית לעסק שלך, מקידום אתרים ועד פתרונות AI מתקדמים'
      : 'Joya-Tech provides tailored digital services for your business, from SEO to AI solutions',
    cta: rtl ? 'גלה את השירותים שלנו' : 'Discover Our Services',
    ctaSecondary: rtl ? 'צור קשר' : 'Contact Us'
  };

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-white to-gray-100">
      <AnimatedElement animation="fadeIn" delay={0.2}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{translations.title}</h1>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.4}>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">{translations.subtitle}</p>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.6}>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={createPageUrl('Services') + `?lang=${language}`} className="bg-primary text-white px-6 py-3 rounded-full shadow hover:bg-primary-dark transition">
            {translations.cta}
          </Link>
          <Link to={createPageUrl('Contact') + `?lang=${language}`} className="bg-white text-primary border border-primary px-6 py-3 rounded-full shadow hover:border-primary-dark transition">
            {translations.ctaSecondary}
          </Link>
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fadeIn" delay={0.8}>
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
          alt="Digital Marketing"
          className="mt-10 max-w-md w-full rounded-3xl shadow-2xl object-cover"
        />
      </AnimatedElement>
    </section>
  );
}
