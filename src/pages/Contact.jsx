import React from 'react';
import AnimatedElement from '../components/ui/AnimatedElement';
import ContactForm from '../components/contact/ContactForm';

export default function Contact({ language = 'he' }) {
  const rtl = language === 'he';
  
  // Set page title and meta description based on language
  React.useEffect(() => {
    document.title = language === 'he' 
      ? 'צור קשר | Joya-Tech'
      : 'Contact Us | Joya-Tech';
      
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = language === 'he'
      ? 'צרו קשר עם Joya-Tech לקבלת ייעוץ ללא עלות או לשאלות בנושא שירותי החברה - קידום אתרים, פיתוח אתרים, קופירייטינג ועוד.'
      : 'Contact Joya-Tech for a free consultation or questions about the company\'s services - SEO, website development, copywriting and more.';
  }, [language]);

  return (
    <>
      <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-4 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {rtl ? 'צרו איתנו קשר' : 'Contact Us'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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