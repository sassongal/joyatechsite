// src/constants/config.js
export const CONFIG = {
  site: {
    url: import.meta.env.VITE_SITE_URL || 'https://joyatech.com',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/',
    contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'Gal@joya-tech.net',
    contactPhone: import.meta.env.VITE_CONTACT_PHONE || '+972-54-646-8676',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.joyatech.com'
  },

  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebug: import.meta.env.NODE_ENV === 'development',
    enableServiceWorker: false, // Future feature
  },

  validation: {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^[+]?[1-9][\d]{0,15}$/,
    nameMinLength: 2,
    nameMaxLength: 50,
    messageMinLength: 10,
    messageMaxLength: 1000
  },

  ui: {
    animationDuration: 300,
    toastDuration: 5000,
    debounceDelay: 300,
    maxRetries: 3
  }
};
