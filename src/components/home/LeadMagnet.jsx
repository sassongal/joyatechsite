import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LeadMagnet({ language = 'he' }) {
  const rtl = language === 'he';

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 border border-neutral-200 shadow-sm p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary-700 mb-2">
              {rtl ? 'Lead Magnet' : 'Lead Magnet'}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              {rtl ? 'בדיקת חשיפה ל-AI Overviews תוך 48 שעות' : 'AI Overview visibility check in 48 hours'}
            </h3>
            <p className="text-neutral-700">
              {rtl
                ? 'נקבל את כתובות התוכן המרכזי שלכם, ננתח חשיפה ב-AI Overviews ומנועי LLM, ונחזיר המלצות GEO/AEO ממוקדות.'
                : 'Share your key URLs; we analyze AI overview/LLM visibility and return focused GEO/AEO recommendations.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={createPageUrl('Contact') + `?service=geo&lang=${language}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow"
            >
              {rtl ? 'בקשו בדיקה עכשיו' : 'Request the check'}
            </Link>
            <Link
              to={createPageUrl('Magazine') + `?lang=${language}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-200 text-neutral-800 rounded-xl hover:border-primary-300"
            >
              {rtl ? 'קראו על GEO/AEO' : 'Read about GEO/AEO'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
