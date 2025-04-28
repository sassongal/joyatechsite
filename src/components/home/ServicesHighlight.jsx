import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedElement from '../ui/AnimatedElement';
import { Search, Feather, Monitor, BarChart3, Database, PenTool } from 'lucide-react';

export default function ServicesHighlight({ language = 'he' }) {
  const rtl = language === 'he';
  
  const translations = {
    title: rtl ? 'השירותים שלנו' : 'Our Services',
    subtitle: rtl 
      ? 'מגוון פתרונות דיגיטליים להצלחת העסק שלך'
      : 'A range of digital solutions for your business success',
    viewAll: rtl ? 'לכל השירותים' : 'View All Services',
    services: [
      {
        icon: <Search className="w-6 h-6" />,
        title: rtl ? 'קידום אתרים SEO' : 'SEO Services',
        description: rtl 
          ? 'קידום אורגני בגוגל לשיפור החשיפה והגדלת הטראפיק לאתר שלך'
          : 'Organic promotion on Google to improve exposure and increase traffic to your website',
        href: 'services/seo'
      },
      {
        icon: <Feather className="w-6 h-6" />,
        title: rtl ? 'יצירת תוכן וקופירייטינג' : 'Content & Copywriting',
        description: rtl 
          ? 'יצירת תוכן מקורי ואיכותי בשילוב כלי AI מתקדמים להעברת המסר שלך'
          : 'Creating original and quality content combined with advanced AI tools to convey your message',
        href: 'services/content'
      },
      {
        icon: <Monitor className="w-6 h-6" />,
        title: rtl ? 'בניית אתרים ודפי נחיתה' : 'Website Development',
        description: rtl 
          ? 'אתרים מקצועיים, מעוצבים ומותאמים למובייל עם חווית משתמש מעולה'
          : 'Professional, designed and mobile-friendly websites with excellent user experience',
        href: 'services/web'
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: rtl ? 'סדנאות AI לחברות' : 'AI Workshops',
        description: rtl 
          ? 'הכשרה מקצועית בטכנולוגיות AI להגברת הפרודוקטיביות והיצירתיות בארגון'
          : 'Professional training in AI technologies to increase productivity and creativity in your organization',
        href: 'services/ai'
      },
      {
        icon: <Database className="w-6 h-6" />,
        title: rtl ? 'שירותי CRM ואוטומציה' : 'CRM & Automation',
        description: rtl 
          ? 'ניהול לקוחות, אוטומציה של תהליכים ואינטגרציה מלאה למערכות העסק שלך'
          : 'Customer management, process automation and full integration with your business systems',
        href: 'services/crm'
      },
      {
        icon: <PenTool className="w-6 h-6" />,
        title: rtl ? 'עיצוב גרפי ולוגואים' : 'Graphic & Logo Design',
        description: rtl 
          ? 'עיצוב מקצועי של חומרים שיווקיים, לוגואים ומיתוג לבידול העסק שלך'
          : 'Professional design of marketing materials, logos and branding to differentiate your business',
        href: 'services/design'
      }
    ]
  };

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{translations.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.subtitle}</p>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {translations.services.map((service, index) => (
            <AnimatedElement 
              key={index} 
              animation="slideUp" 
              delay={0.1 * index}
              className="group"
            >
              <Link 
                to={createPageUrl('Services') + `?service=${service.href.split('/')[1]}&lang=${language}`}
                className="block h-full p-8 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:shadow-xl"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Link>
            </AnimatedElement>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to={createPageUrl('Services') + `?lang=${language}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            {translations.viewAll}
            <svg className={`w-5 h-5 ${rtl ? 'mr-2' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M19 12H5" : "M5 12h14"}></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M12 5l-7 7 7 7" : "M12 5l7 7-7 7"}></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}