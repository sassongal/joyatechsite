import React from 'react';
import Hero from '../components/home/Hero';
import ServicesHighlight from '../components/home/ServicesHighlight';
import AboutPreview from '../components/home/AboutPreview';
import BlogPreview from '../components/home/BlogPreview';
import ContactCTA from '../components/home/ContactCTA';

export default function Home({ language = 'he' }) {
  // Set page title and meta description based on language
  React.useEffect(() => {
    document.title = language === 'he' 
      ? 'Joya-Tech Digital Solutions - פתרונות דיגיטליים מתקדמים לעסקים'
      : 'Joya-Tech Digital Solutions - Advanced Digital Solutions for Businesses';
      
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = language === 'he'
      ? 'Joya-Tech מציעה פתרונות דיגיטליים מתקדמים לעסקים, כולל קידום אתרים, יצירת תוכן, בניית אתרים, שירותי CRM ועיצוב גרפי.'
      : 'Joya-Tech offers advanced digital solutions for businesses, including SEO, content creation, website development, CRM services, and graphic design.';
      
    // Add Open Graph meta tags
    const setMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    setMetaTag('og:title', document.title);
    setMetaTag('og:description', metaDescription.content);
    setMetaTag('og:type', 'website');
    setMetaTag('og:url', window.location.href);
    setMetaTag('og:image', 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png');
  }, [language]);

  return (
    <>
      <Hero language={language} />
      <ServicesHighlight language={language} />
      <AboutPreview language={language} />
      <BlogPreview language={language} />
      <ContactCTA language={language} />
    </>
  );
}