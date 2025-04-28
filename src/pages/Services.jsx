import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import  Service  from '@/entities/Service.json';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Search, Feather, Monitor, BarChart3, Database, PenTool, ChevronRight } from 'lucide-react';
import ContactCTA from '../components/home/ContactCTA';

export default function Services({ language = 'he' }) {
  const rtl = language === 'he';
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState(null);
  
  const translations = {
    title: rtl ? 'השירותים שלנו' : 'Our Services',
    subtitle: rtl 
      ? 'פתרונות דיגיטליים מקיפים להצלחת העסק שלך'
      : 'Comprehensive digital solutions for your business success',
    loading: rtl ? 'טוען שירותים...' : 'Loading services...',
    allServices: rtl ? 'כל השירותים' : 'All Services',
    serviceCategories: {
      'seo': {
        title: rtl ? 'קידום אתרים SEO' : 'SEO Services',
        icon: <Search className="w-6 h-6" />
      },
      'content': {
        title: rtl ? 'יצירת תוכן וקופירייטינג' : 'Content & Copywriting',
        icon: <Feather className="w-6 h-6" />
      },
      'web': {
        title: rtl ? 'בניית אתרים ודפי נחיתה' : 'Website Development',
        icon: <Monitor className="w-6 h-6" />
      },
      'ai': {
        title: rtl ? 'סדנאות AI לחברות' : 'AI Workshops',
        icon: <BarChart3 className="w-6 h-6" />
      },
      'crm': {
        title: rtl ? 'שירותי CRM ואוטומציה' : 'CRM & Automation',
        icon: <Database className="w-6 h-6" />
      },
      'design': {
        title: rtl ? 'עיצוב גרפי ולוגואים' : 'Graphic & Logo Design',
        icon: <PenTool className="w-6 h-6" />
      }
    }
  };

  useEffect(() => {
    document.title = language === 'he' 
      ? 'השירותים שלנו | Joya-Tech'
      : 'Our Services | Joya-Tech';
      
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = language === 'he'
      ? 'גלו את מגוון השירותים שלנו: קידום אתרים, יצירת תוכן, בניית אתרים, סדנאות AI, שירותי CRM ועיצוב גרפי.'
      : 'Discover our range of services: SEO, content creation, website development, AI workshops, CRM services, and graphic design.';
  }, [language]);

  // Try loading services from the entity store
  useEffect(() => {
    const loadServices = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        if (serviceParam && translations.serviceCategories[serviceParam]) {
          setActiveService(serviceParam);
        }
        
        const fetchedServices = await Service.list('order');
        setServices(fetchedServices);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        // Provide fallback services in case database is empty
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Fallback services when database is empty
  const fallbackServices = [
    {
      category: 'seo',
      title_he: 'קידום אתרים SEO',
      title_en: 'SEO Services',
      description_he: 'שירותי קידום אורגני בגוגל, מחקר מילות מפתח, אופטימיזציה טכנית ובניית אסטרטגיית קידום.',
      description_en: 'Organic promotion on Google, keyword research, technical optimization and building a promotion strategy.',
      features_he: [
        'ניתוח מקיף של האתר וביצועיו',
        'מחקר מילות מפתח מעמיק',
        'אופטימיזציה טכנית לאתר',
        'בניית תוכן ממוקד SEO',
        'ניטור ודיווח חודשי',
        'קידום מותאם למובייל'
      ],
      features_en: [
        'Comprehensive website analysis',
        'In-depth keyword research',
        'Technical website optimization',
        'SEO-focused content creation',
        'Monthly monitoring and reporting',
        'Mobile-optimized promotion'
      ]
    },
    {
      category: 'content',
      title_he: 'יצירת תוכן וקופירייטינג',
      title_en: 'Content & Copywriting',
      description_he: 'כתיבת תוכן שיווקי מקורי וממיר, פוסטים לבלוג, תיאורי מוצרים ותוכן לדפי נחיתה בשילוב טכנולוגיות AI.',
      description_en: 'Writing original and converting marketing content, blog posts, product descriptions and landing page content combined with AI technologies.',
      features_he: [
        'כתיבת תוכן מותאם SEO',
        'יצירת תוכן לרשתות חברתיות',
        'כתיבת בלוגים וניוזלטרים',
        'שכתוב תוכן קיים',
        'עריכת תוכן',
        'כתיבה בעזרת כלי AI מתקדמים'
      ],
      features_en: [
        'SEO-optimized content writing',
        'Social media content creation',
        'Blog and newsletter writing',
        'Rewriting existing content',
        'Content editing',
        'Writing with advanced AI tools'
      ]
    },
    {
      category: 'web',
      title_he: 'בניית אתרים ודפי נחיתה',
      title_en: 'Website Development',
      description_he: 'פיתוח אתרים ודפי נחיתה מודרניים, מהירים ומותאמים למובייל, המתוכננים להמרות גבוהות.',
      description_en: 'Development of modern, fast and mobile-friendly websites and landing pages designed for high conversions.',
      features_he: [
        'עיצוב מותאם אישית',
        'חווית משתמש מתקדמת',
        'מהירות טעינה אופטימלית',
        'אתרי וורדפרס מתקדמים',
        'דפי נחיתה ממירים',
        'תחזוקה ותמיכה שוטפת'
      ],
      features_en: [
        'Custom design',
        'Advanced user experience',
        'Optimal loading speed',
        'Advanced WordPress websites',
        'Converting landing pages',
        'Ongoing maintenance and support'
      ]
    },
    {
      category: 'ai',
      title_he: 'סדנאות AI לחברות',
      title_en: 'AI Workshops',
      description_he: 'סדנאות מעשיות לשימוש בכלי AI לשיפור היעילות והפרודוקטיביות בעסק, מותאמות לצרכי הארגון.',
      description_en: 'Practical workshops for using AI tools to improve efficiency and productivity in business, tailored to the needs of the organization.',
      features_he: [
        'הכשרה בשימוש ב-ChatGPT',
        'עבודה עם Midjourney ו-DALL-E',
        'אוטומציה של תהליכים שגרתיים',
        'שילוב AI בתהליכי השיווק',
        'התאמה לצרכי הארגון',
        'תרגול מעשי ומעקב'
      ],
      features_en: [
        'Training in using ChatGPT',
        'Working with Midjourney and DALL-E',
        'Automation of routine processes',
        'Integrating AI into marketing processes',
        'Customization to organizational needs',
        'Practical exercises and follow-up'
      ]
    },
    {
      category: 'crm',
      title_he: 'שירותי CRM ואוטומציה',
      title_en: 'CRM & Automation',
      description_he: 'הטמעת מערכות CRM וניהול לקוחות בשילוב אוטומציות של תהליכי מכירות ושיווק להגדלת היעילות.',
      description_en: 'Implementation of CRM systems and customer management combined with automation of sales and marketing processes to increase efficiency.',
      features_he: [
        'הקמת מערכת GoHighLevel',
        'אוטומציה של תהליכי שיווק',
        'בניית ניוזלטרים אוטומטיים',
        'סנכרון מול מערכות קיימות',
        'יצירת דוחות וניתוח ביצועים',
        'הדרכות וליווי צוות'
      ],
      features_en: [
        'Setting up GoHighLevel system',
        'Marketing process automation',
        'Building automatic newsletters',
        'Synchronization with existing systems',
        'Creating reports and performance analysis',
        'Team training and support'
      ]
    },
    {
      category: 'design',
      title_he: 'עיצוב גרפי ולוגואים',
      title_en: 'Graphic & Logo Design',
      description_he: 'עיצוב לוגואים, מיתוג מלא וחומרים גרפיים לשיווק העסק בשילוב טכנולוגיות AI ליצירת תוצאות מרשימות.',
      description_en: 'Design of logos, full branding and graphic materials for business marketing combined with AI technologies to create impressive results.',
      features_he: [
        'עיצוב לוגו מקצועי',
        'מיתוג מלא לעסק',
        'עיצוב חומרים שיווקיים',
        'עיצוב לרשתות חברתיות',
        'שילוב טכנולוגיות AI',
        'שפה עיצובית אחידה'
      ],
      features_en: [
        'Professional logo design',
        'Full business branding',
        'Marketing materials design',
        'Social media design',
        'Integration of AI technologies',
        'Unified design language'
      ]
    }
  ];

  // Get the active service details
  const getActiveServiceDetails = () => {
    if (!activeService) return null;
    
    // Try to find in database services first
    const dbService = services.find(s => s.category === activeService);
    if (dbService) return dbService;
    
    // Fall back to hardcoded services
    return fallbackServices.find(s => s.category === activeService);
  };

  const activeServiceDetails = getActiveServiceDetails();

  return (
    <>
      <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{translations.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.subtitle}</p>
          </AnimatedElement>
          
          {/* Service Categories */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-1 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1">
                <button
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    !activeService ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveService(null)}
                >
                  {translations.allServices}
                </button>
                
                {Object.entries(translations.serviceCategories).map(([key, service]) => (
                  <button
                    key={key}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      activeService === key ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveService(key)}
                  >
                    <span className="hidden md:inline">{service.title}</span>
                    <span className="md:hidden">{service.icon}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Service Listing or Service Details */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">{translations.loading}</span>
              </div>
            ) : activeServiceDetails ? (
              <AnimatedElement animation="fadeIn">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                  {activeServiceDetails.image_url && (
                    <img
                      src={activeServiceDetails.image_url}
                      alt={rtl ? activeServiceDetails.title_he : activeServiceDetails.title_en}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {translations.serviceCategories[activeService]?.icon}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {rtl ? activeServiceDetails.title_he : activeServiceDetails.title_en}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-8">
                      {rtl ? activeServiceDetails.description_he : activeServiceDetails.description_en}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {rtl ? 'מה כולל השירות?' : 'What does the service include?'}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {(rtl 
                        ? activeServiceDetails.features_he 
                        : activeServiceDetails.features_en)?.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <ChevronRight className={`w-5 h-5 text-blue-600 mt-1 ${rtl ? 'ml-2 transform rotate-180' : 'mr-2'}`} />
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      to={createPageUrl('Contact') + `?service=${activeService}&lang=${language}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {rtl ? 'התייעצות ללא עלות' : 'Free Consultation'}
                    </Link>
                  </div>
                </div>
              </AnimatedElement>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(services.length > 0 ? services : fallbackServices).map((service, index) => (
                  <AnimatedElement 
                    key={service.category || index} 
                    animation="slideUp" 
                    delay={0.1 * index}
                  >
                    <div 
                      className="bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all cursor-pointer h-full"
                      onClick={() => setActiveService(service.category)}
                    >
                      {service.image_url && (
                        <img
                          src={service.image_url}
                          alt={rtl ? service.title_he : service.title_en}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-100 text-blue-600">
                          {translations.serviceCategories[service.category]?.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">
                          {rtl ? service.title_he : service.title_en}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {rtl ? service.description_he : service.description_en}
                        </p>
                        <span className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                          {rtl ? 'למידע נוסף' : 'Learn More'}
                          <ChevronRight className={`w-5 h-5 ${rtl ? 'mr-1 transform rotate-180' : 'ml-1'}`} />
                        </span>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      <ContactCTA language={language} />
    </>
  );
}