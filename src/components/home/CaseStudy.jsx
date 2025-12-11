import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

export default function CaseStudy({ language = 'he' }) {
  const rtl = language === 'he';

  const stats = [
    {
      value: rtl ? '↑ 38%' : '↑ 38%',
      label: rtl ? 'גידול בחשיפה לתשובות AI' : 'AI answer visibility uplift',
    },
    {
      value: rtl ? '↓ 22%' : '↓ 22%',
      label: rtl ? 'ירידה בזמן מענה לפניות' : 'Drop in lead response time',
    },
    {
      value: rtl ? '6 שבועות' : '6 weeks',
      label: rtl ? 'זמן ביצוע' : 'Time to deliver',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 shadow-sm grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-sm font-semibold text-primary-700 mb-2">
              {rtl ? 'Case Study (נתונים פנימיים)' : 'Case Study (internal data)'}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              {rtl
                ? 'מותג תוכן ישראלי: GEO/AEO + אוטומציה שמביאה יותר לידים'
                : 'Israeli content brand: GEO/AEO + automation driving more leads'}
            </h3>
            <p className="text-neutral-700 mb-4">
              {rtl
                ? 'יישמנו מחקר כוונת LLM, סכמה מותאמת GEO, ושכתוב תכנים “בשפת המודל”. במקביל, אוטומציה ללכידת לידים והפעלה מהירה.'
                : 'We applied LLM intent research, GEO-aligned schema, and LLM-style rewrites. In parallel, we automated lead capture and rapid follow-up.'}
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {stats.map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-neutral-200 text-center">
                  <div className="text-xl font-bold text-primary-700">{s.value}</div>
                  <div className="text-neutral-600 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
            <Link
              to={createPageUrl('Contact') + `?service=geo&lang=${language}`}
              className="inline-flex items-center gap-2 text-primary-700 font-semibold"
            >
              {rtl ? 'בואו נקפיץ גם אתכם' : 'Let’s boost your visibility too'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3 text-neutral-700">
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <p className="font-semibold text-neutral-900 mb-1">
                {rtl ? 'גישה' : 'Approach'}
              </p>
              <p className="text-sm leading-relaxed">
                {rtl
                  ? 'מיפוי כוונות מודלי שפה, יישום סכמה GEO ותיוג הקשרי, ושכתוב פסקאות מפתח ל-LLM.'
                  : 'Mapping LLM intents, applying GEO schema and contextual tagging, and rewriting key paragraphs for LLM consumption.'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <p className="font-semibold text-neutral-900 mb-1">
                {rtl ? 'תוצאה' : 'Result'}
              </p>
              <p className="text-sm leading-relaxed">
                {rtl
                  ? 'עלייה ב-answers AI ונפח לידים, עם אוטומציה שמקצרת זמן מענה ללקוחות.'
                  : 'Higher AI answers visibility and lead volume, with automation cutting response time to prospects.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
