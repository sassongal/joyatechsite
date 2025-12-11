import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function StickyCTA({ language = 'he' }) {
  const rtl = language === 'he';
  const contactHref = `${createPageUrl('Contact')}?lang=${language}`;
  const whatsappHref = 'https://wa.me/972546468676?text=היי%20Gal,%20אשמח%20לדבר';

  return (
    <div
      dir={rtl ? 'rtl' : 'ltr'}
      className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 items-end"
    >
      <Link
        to={contactHref}
        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
      >
        <Phone className="w-4 h-4" />
        {rtl ? 'שיחת אבחון 15 דק׳' : '15-min Discovery Call'}
      </Link>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </a>
    </div>
  );
}
