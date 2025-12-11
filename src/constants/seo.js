// src/constants/seo.js
export const SEO_CONFIG = {
  site: {
    name: 'Joya-Tech Digital Solutions',
    url: 'https://joyatech.com',
    ogImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png',
    twitterHandle: '@joyatech'
  },

  pages: {
    home: {
      he: {
        title: 'Joya-Tech Digital Solutions - פתרונות דיגיטליים מתקדמים לעסקים',
        description: 'Joya-Tech מציעה פתרונות דיגיטליים מתקדמים לעסקים, כולל קידום אתרים, יצירת תוכן, בניית אתרים, שירותי CRM ועיצוב גרפי.',
        keywords: 'קידום אתרים, יצירת תוכן, בניית אתרים, CRM, עיצוב גרפי, Joya-Tech'
      },
      en: {
        title: 'Joya-Tech Digital Solutions - Advanced Digital Solutions for Businesses',
        description: 'Joya-Tech offers advanced digital solutions for businesses, including SEO, content creation, website development, CRM services, and graphic design.',
        keywords: 'SEO, content creation, web development, CRM, graphic design, Joya-Tech'
      }
    },

    services: {
      he: {
        title: 'שירותים דיגיטליים - Joya-Tech',
        description: 'שירותי קידום אתרים, GEO/AIO למודלי שפה, פיתוח תוכנה, עיצוב ואוטומציה עסקית מקצועיים.',
        keywords: 'שירותי קידום אתרים, GEO, AIO, מודלי שפה, פיתוח תוכנה, עיצוב גרפי, אוטומציה עסקית'
      },
      en: {
        title: 'Digital Services - Joya-Tech',
        description: 'Professional SEO and GEO/AIO for LLMs, software development, design, and business automation.',
        keywords: 'SEO, GEO, AIO, LLM optimization, software development, graphic design, business automation'
      }
    },

    magazine: {
      he: {
        title: 'מגזין Joya-Tech - תוכן דיגיטלי וחדשנות',
        description: 'מאמרים מקצועיים על טכנולוגיה, AI, קידום אתרים ועולם הדיגיטל.',
        keywords: 'AI, קידום אתרים, טכנולוגיה, חדשנות דיגיטלית, Joya-Tech'
      },
      en: {
        title: 'Joya-Tech Magazine - Digital Content & Innovation',
        description: 'Professional articles about technology, AI, SEO, and the digital world.',
        keywords: 'AI, SEO, technology, digital innovation, Joya-Tech'
      }
    },

    courses: {
      he: {
        title: 'קורסי AI ובינה מלאכותית - Joya-Tech',
        description: 'הדרכת בינה מלאכותית מ-א\' ועד ת\' - קורסים מקצועיים להכשרת AI.',
        keywords: 'קורסי AI, בינה מלאכותית, הכשרת AI, למידת מכונה, Joya-Tech'
      },
      en: {
        title: 'AI Courses & Training - Joya-Tech',
        description: 'AI coaching from A to Z - Professional AI training courses.',
        keywords: 'AI courses, artificial intelligence, AI training, machine learning, Joya-Tech'
      }
    },

    tools: {
      he: {
        title: 'כלים מומלצים לפרודוקטיביות - Joya-Tech',
        description: 'אוסף כלי AI וטכנולוגיה מומלצים לשיפור הפרודוקטיביות והיצירתיות.',
        keywords: 'כלי AI, פרודוקטיביות, טכנולוגיה, כלים דיגיטליים'
      },
      en: {
        title: 'Recommended Tools for Productivity - Joya-Tech',
        description: 'Collection of recommended AI and technology tools to improve productivity and creativity.',
        keywords: 'AI tools, productivity, technology, digital tools'
      }
    },
    
    about: {
      he: {
        title: 'אודות Joya-Tech - פתרונות דיגיטליים מתקדמים',
        description: 'הכירו את Joya-Tech - חברת פתרונות דיגיטליים המתמחה בשיווק, פיתוח ואסטרטגיה עם צוות מקצועי ומנוסה.',
        keywords: 'אודות Joya-Tech, צוות, משימה, ערכים, חברת דיגיטל'
      },
      en: {
        title: 'About Joya-Tech - Advanced Digital Solutions',
        description: 'Meet Joya-Tech - a digital solutions company specializing in marketing, development and strategy with a professional and experienced team.',
        keywords: 'about Joya-Tech, team, mission, values, digital company'
      }
    },
    
    contact: {
      he: {
        title: 'צור קשר - Joya-Tech',
        description: 'צרו קשר עם Joya-Tech לשיחת ייעוץ חינם. נשמח לעזור עם פרויקט הדיגיטל הבא שלכם.',
        keywords: 'צור קשר, פנייה, ייעוץ, פרויקט דיגיטלי'
      },
      en: {
        title: 'Contact - Joya-Tech', 
        description: 'Contact Joya-Tech for a free consultation. We\'d love to help with your next digital project.',
        keywords: 'contact, inquiry, consultation, digital project'
      }
    },

    geo: {
      he: {
        title: 'GEO/AEO - קידום מודלי שפה ותשובות AI | Joya-Tech',
        description: 'קידום GEO/AEO למודלי שפה ו-AI Overviews: מחקר כוונות LLM, סכמה מותאמת GEO, ושכתוב תוכן שמועדף על מודלים.',
        keywords: 'GEO, AEO, קידום מודלי שפה, AI Overviews, קידום AI, LLM SEO'
      },
      en: {
        title: 'GEO/AEO - LLM & AI Answers Optimization | Joya-Tech',
        description: 'GEO/AEO services for LLMs and AI overviews: LLM intent research, GEO-aligned schema, and LLM-style content rewrites.',
        keywords: 'GEO, AEO, LLM optimization, AI overview visibility, AI search, LLM SEO'
      }
    }
  }
};

// Helper function to get page SEO data
export const getPageSEO = (page, language = 'he') => {
  return SEO_CONFIG.pages[page]?.[language] || SEO_CONFIG.pages.home[language];
};

// Helper function to get canonical URL (removes lang parameter)
export const getCanonicalUrl = (pathname = '/') => {
  const baseUrl = SEO_CONFIG.site.url;
  const cleanPath = pathname.replace(/\?lang=[^&]*/, '').replace(/&lang=[^&]*/, '');
  return `${baseUrl}${cleanPath}`;
};

// Helper function to get current language from URL
export const getLanguageFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || 'he';
};
