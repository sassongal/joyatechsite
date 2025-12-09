// src/constants/translations.js
export const TRANSLATIONS = {
  he: {
    // Navigation
    home: 'בית',
    magazine: 'מגזין Joya-Tech',
    tools: 'כלים מומלצים',
    courses: 'קורסי AI',
    services: 'שירותים',
    about: 'אודות',
    contact: 'צור קשר',

    // Common UI
    loading: 'טוען...',
    error: 'שגיאה',
    retry: 'נסה שוב',
    back: 'חזור',

    // SEO
    siteTitle: 'Joya-Tech Digital Solutions',
    siteDescription: 'פתרונות דיגיטליים מתקדמים לעסקים',
    ogImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png',

    // Form labels
    name: 'שם מלא',
    email: 'דוא״ל',
    phone: 'טלפון',
    company: 'חברה',
    message: 'הודעה',
    submit: 'שלח הודעה',
    sending: 'שולח...',

    // Categories
    all: 'הכל',
    content: 'יצירת תוכן',
    design: 'עיצוב וגרפיקה',
    productivity: 'פרודוקטיביות',
    data: 'ניתוח נתונים',
    audio: 'אודיו ומוזיקה',
    video: 'וידאו ועריכה',
    development: 'פיתוח תוכנה',

    // Footer specific
    seo: 'קידום אתרים SEO',
    ai_workshops: 'סדנאות AI לחברות',
    crm: 'שירותי CRM ואוטומציה',
    websites: 'בניית אתרים',
    companyInfo: 'חברה',
    legal: 'משפטי',
    privacy: 'מדיניות פרטיות',
    terms: 'תנאי שימוש',
    cookie: 'מדיניות עוגיות',
    followUs: 'עקבו אחרינו',
    contactUs: 'צרו קשר',
    address: 'תל אביב, ישראל',
    rights: 'כל הזכויות שמורות ל-Joya-Tech Digital Solutions',
    newsletter: 'הירשמו לניוזלטר שלנו',
    newsletterSubtitle: 'קבלו עדכונים וטיפים בתחום הדיגיטל',
    subscribe: 'הירשמו',
    emailPlaceholder: 'האימייל שלך'
  },
  en: {
    // Navigation
    home: 'Home',
    magazine: 'Joya-Tech Magazine',
    tools: 'Recommended Tools',
    courses: 'AI Courses',
    services: 'Services',
    about: 'About',
    contact: 'Contact',

    // Common UI
    loading: 'Loading...',
    error: 'Error',
    retry: 'Try Again',
    back: 'Back',

    // SEO
    siteTitle: 'Joya-Tech Digital Solutions',
    siteDescription: 'Advanced Digital Solutions for Businesses',
    ogImage: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png',

    // Form labels
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    message: 'Message',
    submit: 'Send Message',
    sending: 'Sending...',

    // Categories
    all: 'All',
    content: 'Content Creation',
    design: 'Design & Graphics',
    productivity: 'Productivity',
    data: 'Data Analysis',
    audio: 'Audio & Music',
    video: 'Video & Editing',
    development: 'Software Development',

    // Footer specific
    seo: 'SEO Services',
    ai_workshops: 'AI Workshops',
    crm: 'CRM & Automation',
    websites: 'Website Development',
    companyInfo: 'Company',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookie: 'Cookie Policy',
    followUs: 'Follow Us',
    contactUs: 'Contact Us',
    address: 'Tel Aviv, Israel',
    rights: 'All rights reserved to Joya-Tech Digital Solutions',
    newsletter: 'Subscribe to our newsletter',
    newsletterSubtitle: 'Get digital tips and updates',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Your email'
  }
};

// Helper function to get translations
export const getTranslation = (key, language = 'he') => {
  return TRANSLATIONS[language]?.[key] || key;
};

// Helper function to get RTL flag
export const isRTL = (language = 'he') => language === 'he';
