import React from 'react';
import AnimatedElement from '../ui/AnimatedElement';
import { TrendingUp, BarChart3, Sparkles } from 'lucide-react';

export default function GEOHighlights({ language = 'he' }) {
  const rtl = language === 'he';

  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: rtl ? 'צמיחה בבקשות AI' : 'AI Query Growth',
      desc: rtl
        ? 'מנועי חיפוש AI מדגישים תשובות מודלי שפה; חשיפה ב-AI Overviews הופכת לקריטית.'
        : 'AI search experiences prioritize LLM answers; visibility in AI Overviews is now critical.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: rtl ? 'מדידה ודיווח' : 'Measurement & Reporting',
      desc: rtl
        ? 'מדדים ייעודיים ל-GEO/AIO: מעקב חשיפה ב-AI Overviews, CTR משוער ותיעדוף תוכן.'
        : 'Dedicated GEO/AIO metrics: AI overview visibility, estimated CTR, and content prioritization.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: rtl ? 'אופטימיזציה למודלים' : 'LLM-Ready Content',
      desc: rtl
        ? 'תיוג סכמה, שכתוב טקסטים בשפת LLM, והנחיות פרומפט כדי להעלות סיכוי להופיע בתשובות.'
        : 'Schema tagging, LLM-style rewrites, and prompt-ready guidance to increase likelihood of surfacing in answers.'
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeInUp" className="text-center mb-8">
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            {rtl ? 'למה GEO/AIO חשוב עכשיו' : 'Why GEO/AIO matters now'}
          </h3>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            {rtl
              ? 'החיפוש זז למודלי שפה. אנחנו מתאימים את התוכן והסכמה כך שתופיעו גם ב-AI Overviews וגם ב-SERP המשולב.'
              : 'Search is shifting to language models. We align your content and schema so you show up in AI overviews and blended SERP.'}
          </p>
        </AnimatedElement>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((item, idx) => (
            <AnimatedElement key={idx} animation="slideUp" delay={idx * 0.05}>
              <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50 h-full flex flex-col gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-neutral-900">{item.title}</h4>
                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
