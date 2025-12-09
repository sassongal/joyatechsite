// src/constants/seo.js
export const SEO_CONFIG = {
  site: {
    name: 'Joya-Tech Digital Solutions',
    url: 'https://joyatech.com', // Update with actual domain
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
        description: 'שירותי קידום אתרים, פיתוח תוכנה, עיצוב גרפי ואוטומציה עסקית מקצועיים.',
        keywords: 'שירותי קידום אתרים, פיתוח תוכנה, עיצוב גרפי, אוטומציה עסקית'
      },
      en: {
        title: 'Digital Services - Joya-Tech',
        description: 'Professional SEO services, software development, graphic design, and business automation.',
        keywords: 'SEO services, software development, graphic design, business automation'
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
    }
  }
};

// Helper function to get page SEO data
export const getPageSEO = (page, language = 'he') => {
  return SEO_CONFIG.pages[page]?.[language] || SEO_CONFIG.pages.home[language];
};
