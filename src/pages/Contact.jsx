import React from 'react';
import AnimatedElement from '../components/ui/AnimatedElement';
import ContactForm from '../components/contact/ContactForm';
import SEO from '../components/SEO';

export default function Contact({ language = 'he' }) {
  const rtl = language === 'he';
  
  return (
    <>
      <SEO page="contact" language={language} type="website" />
      <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-4 bg-gradient-to-br from-primary-50 to-neutral-50">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {rtl ? 'צרו איתנו קשר' : 'Contact Us'}
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {rtl 
                ? 'אנחנו כאן כדי לענות על כל שאלה ולעזור לכם להצליח בדיגיטל'
                : 'We are here to answer any questions and help you succeed digitally'}
            </p>
          </AnimatedElement>
        </div>
      </section>
      
      <ContactForm language={language} />
    </>
  );
}
