import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { getTranslation, isRTL } from '@/constants/translations';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import joyaLogo from '@/assets/graphics/joyairon.png';

export default function Footer({ language = 'he' }) {
  const rtl = isRTL(language);

  // Translation helper
  const t = (key) => getTranslation(key, language);

  const currentYear = new Date().getFullYear();

  return (
    <footer dir={rtl ? 'rtl' : 'ltr'} className="bg-white/90 backdrop-blur-md border-t border-neutral-200 shadow-inner text-neutral-800 pt-12 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Column 1: Logo & Description */}
          <div>
            <Link to={createPageUrl('Home') + `?lang=${language}`} className="inline-block mb-4">
              <img 
                src={joyaLogo} 
                alt="JoyaTech Logo" 
                loading="lazy"
                decoding="async"
                className="h-14"
              />
            </Link>
            <p className="text-neutral-600 mb-4">
              {rtl 
                ? 'Joya-Tech מספקת פתרונות דיגיטליים חדשניים לעסקים המעוניינים לצמוח ולהצליח בעולם הדיגיטלי המודרני.'
                : 'Joya-Tech provides innovative digital solutions for businesses looking to grow and succeed in the modern digital landscape.'}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">{t("services")}</h3>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl('Services') + `?service=seo&lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("seo")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=geo&lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("geo")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=content&lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("content")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=ai&lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("ai_workshops")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=crm&lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("crm")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=web&lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("websites")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Services') + `?service=design&lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("design")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">{t("companyInfo")}</h3>
            <ul className="space-y-3">
              <li>
                <Link to={createPageUrl('About') + `?lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Tools') + `?lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("tools")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Magazine') + `?lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("magazine")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Courses') + `?lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("courses")}
                </Link>
              </li>
              <li>
                <Link to={createPageUrl('Contact') + `?lang=${language}`} className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  {t("terms")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">{t("contactUs")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 text-primary-500" />
                <span className="text-neutral-600">{t("address")}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 text-primary-500" />
                <a href="mailto:Gal@joya-tech.net" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Gal@joya-tech.net
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 text-primary-500" />
                <a href="tel:+972546468676" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  054-646-8676
                </a>
              </li>
              <li className="flex items-center">
                <MessageCircle size={18} className="mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0 text-primary-500" />
                <a
                  href="https://wa.me/972546468676?text=היי%20Gal,%20אשמח%20לשוחח%20על%20פרויקט"
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-200 pt-6 pb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">{t("newsletter")}</h3>
            <p className="text-neutral-600 mb-6">{t("newsletterSubtitle")}</p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="px-4 py-2 rounded-md brand-input focus:border-primary-400 focus:outline-none w-full sm:w-auto"
                required
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-md font-medium transition-colors text-white shadow-sm"
              >
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-200 pt-6 text-center">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
