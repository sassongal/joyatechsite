import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedElement from '../ui/AnimatedElement';
import { CheckCircle } from 'lucide-react';

export default function AboutPreview({ language = 'he' }) {
  const rtl = language === 'he';
  
  const translations = {
    title: rtl ? 'למה לבחור ב-Joya-Tech?' : 'Why Choose Joya-Tech?',
    description: rtl 
      ? 'אנחנו מאמינים שהצלחה דיגיטלית מגיעה משילוב של אסטרטגיה חכמה, טכנולוגיה מתקדמת ושירות אישי מעולה. אנו מביאים ניסיון רב שנים בתחום השיווק הדיגיטלי וטכנולוגיות המידע כדי לספק פתרונות המותאמים בדיוק לצרכים שלך.'
      : 'We believe that digital success comes from combining smart strategy, advanced technology and excellent personal service. We bring years of experience in digital marketing and information technology to deliver solutions tailored exactly to your needs.',
    benefits: [
      rtl ? 'גישה אישית ומותאמת לכל לקוח' : 'Personalized approach for each client',
      rtl ? 'שימוש בטכנולוגיות AI מתקדמות' : 'Using advanced AI technologies',
      rtl ? 'תוצאות מדידות ושקיפות מלאה' : 'Measurable results and full transparency',
      rtl ? 'זמינות גבוהה ושירות מעולה' : 'High availability and excellent service',
      rtl ? 'מחירים הוגנים ותוצאות מוכחות' : 'Fair prices and proven results',
      rtl ? 'צוות מומחים מקצועי ומנוסה' : 'Professional and experienced team of experts'
    ],
    learnMore: rtl ? 'למידע נוסף עלינו' : 'Learn More About Us',
    stats: [
      {
        number: '50+',
        label: rtl ? 'לקוחות מרוצים' : 'Satisfied Clients'
      },
      {
        number: '5+',
        label: rtl ? 'שנות ניסיון' : 'Years of Experience'
      },
      {
        number: '100+',
        label: rtl ? 'פרויקטים מוצלחים' : 'Successful Projects'
      }
    ]
  };

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <AnimatedElement 
            animation={rtl ? "slideRight" : "slideLeft"} 
            className={`relative ${rtl ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-5/6 bg-blue-500/10 rounded-full blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Team working together"
                className="w-full relative z-10 rounded-xl shadow-xl"
              />
              
              {/* Stats overlay */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 grid grid-cols-3 gap-8 w-5/6 z-20">
                {translations.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
          
          {/* Content Side */}
          <div className={`${rtl ? 'lg:order-1' : 'lg:order-2'}`}>
            <AnimatedElement animation="fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{translations.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{translations.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {translations.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <Link 
                to={createPageUrl('About') + `?lang=${language}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {translations.learnMore}
                <svg className={`w-5 h-5 ${rtl ? 'mr-2' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M19 12H5" : "M5 12h14"}></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M12 5l-7 7 7 7" : "M12 5l7 7-7 7"}></path>
                </svg>
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}