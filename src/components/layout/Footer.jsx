import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ language = 'he' }) {
  const rtl = language === 'he';
  
  const translations = {
    services: rtl ? 'שירותים' : 'Services',
    seo: rtl ? 'קידום אתרים SEO' : 'SEO Services',
    content: rtl ? 'יצירת תוכן וקופירייטינג' : 'Content & Copywriting',
    ai_workshops: rtl ? 'סדנאות AI לחברות' : 'AI Workshops',
    crm: rtl ? 'שירותי CRM ואוטומציה' : 'CRM & Automation',
    websites: rtl ? 'בניית אתרים' : 'Website Development',
    design: rtl ? 'עיצוב גרפי ולוגואים' : 'Graphic & Logo Design',
    company: rtl ? 'חברה' : 'Company',
    about: rtl ? 'אודות' : 'About Us',
    blog: rtl ? 'בלוג' : 'Blog',
    contact: rtl ? 'צור קשר' : 'Contact Us',
    legal: rtl ? 'משפטי' : 'Legal',
    privacy: rtl ? 'מדיניות פרטיות' : 'Privacy Policy',
    terms: rtl ? 'תנאי שימוש' : 'Terms of Service',
    cookie: rtl ? 'מדיניות עוגיות' : 'Cookie Policy',
    followUs: rtl ? 'עקבו אחרינו' : 'Follow Us',
    contactUs: rtl ? 'צרו קשר' : 'Contact Us',
    address: rtl ? 'תל אביב, ישראל' : 'Tel Aviv, Israel',
    rights: rtl ? 'כל הזכויות שמורות ל-Joya-Tech Digital Solutions' : 'All rights reserved to Joya-Tech Digital Solutions',
    newsletter: rtl ? 'הירשמו לניוזלטר שלנו' : 'Subscribe to our newsletter',
    newsletterSubtitle: rtl ? 'קבלו עדכונים וטיפים בתחום הדיגיטל' : 'Get digital tips and updates',
    subscribe: rtl ? 'הירשמו' : 'Subscribe',
    emailPlaceholder: rtl ? 'האימייל שלך' : 'Your email'
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer dir={rtl ? 'rtl' : 'ltr'} className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo & Description */}
          <div>
            <Link to={createPageUrl('Home') + `?lang=${language}`} className="inline-block mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png" 
                alt="JoyaTech Logo" 
                className="h-10"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              {rtl 
                ? 'Joya-Tech מספקת פתרונות דיגיטליים חדשניים לעסקים המעוניינים לצמוח ולהצליח בעולם הדיגיטלי המודרני.'
                : 'Joya-Tech provides innovative digital solutions for businesses looking to grow and succeed in the modern digital landscape.'}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{translations.services}</h3>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl('Services') + `?service=seo&lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.seo}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=content&lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.content}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=ai&lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.ai_workshops}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=crm&lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.crm}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=web&lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.websites}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=design&lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.design}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{translations.company}</h3>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl('About') + `?lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.about}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Blog') + `?lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.blog}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Contact') + `?lang=${language}`} className="text-gray-400 hover:text-white transition-colors">
                  {translations.contact}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {translations.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {translations.terms}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{translations.contactUs}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 text-blue-500" />
                <span className="text-gray-400">{translations.address}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 text-blue-500" />
                <a href="mailto:info@joyatech.com" className="text-gray-400 hover:text-white transition-colors">
                  info@joyatech.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 text-blue-500" />
                <a href="tel:+972501234567" className="text-gray-400 hover:text-white transition-colors">
                  +972 50-123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">{translations.newsletter}</h3>
            <p className="text-gray-400 mb-6">{translations.newsletterSubtitle}</p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder={translations.emailPlaceholder}
                className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none w-full sm:w-auto"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
              >
                {translations.subscribe}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} {translations.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}