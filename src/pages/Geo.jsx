import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AnimatedElement from '../components/ui/AnimatedElement';
import { createPageUrl } from '@/utils';
import { Sparkles, BarChart3, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import LeadMagnet from '../components/home/LeadMagnet';

export default function Geo({ language = 'he' }) {
  const rtl = language === 'he';

  const faq = [
    {
      q: rtl ? 'מה זה GEO/AEO?' : 'What is GEO/AEO?',
      a: rtl
        ? 'אופטימיזציה לתוכן ולסכמה כך שמודלי שפה ו-AI Overviews יבחרו בכם כמקור תשובה.'
        : 'Optimization of content and schema so LLMs and AI overviews pick you as the answer source.',
    },
    {
      q: rtl ? 'איך מודדים הצלחה?' : 'How do you measure success?',
      a: rtl
        ? 'חשיפה ב-AI Overviews/LLM answers, CTR משוער, ושיפור בדירוג SERP משולב.'
        : 'AI overview/LLM answer visibility, estimated CTR, and uplift in blended SERP rankings.',
    },
    {
      q: rtl ? 'למי זה מתאים?' : 'Who is it for?',
      a: rtl
        ? 'עסקים עם תוכן חזק שרוצים להופיע בתשובות AI ובחיפושים המשלבים מודלים.'
        : 'Brands with strong content who want to show up in AI answers and LLM-blended search.',
    },
  ];

  const process = [
    rtl ? 'מחקר כוונת LLM ושאילתות AI רלוונטיות' : 'LLM intent research and relevant AI queries',
    rtl ? 'תיוג/סכמה GEO + התאמת מבנה תוכן' : 'GEO schema/tagging + content restructuring',
    rtl ? 'שכתוב טקסטים בסגנון מותאם מודלים' : 'LLM-style rewrites for favored answers',
    rtl ? 'מדידה ושיפור: חשיפה ב-AI answers, CTR משוער' : 'Measure & improve: AI answers visibility, estimated CTR',
  ];

  const breadcrumbs = [
    { name: rtl ? 'דף הבית' : 'Home', url: 'https://joyatech.com' },
    { name: rtl ? 'GEO/AEO' : 'GEO/AEO', url: 'https://joyatech.com/geo' },
  ];

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: rtl ? 'GEO/AEO - קידום מודלי שפה' : 'GEO/AEO - LLM Search Optimization',
    serviceType: 'GEO/AEO',
    provider: {
      '@type': 'Organization',
      name: 'Joya-Tech Digital Solutions',
      url: 'https://joyatech.com',
      areaServed: 'IL',
    },
    description: rtl
      ? 'אופטימיזציה למודלי שפה ול-AI Overviews: מחקר כוונות LLM, סכמה מותאמת GEO, ושכתוב תוכן שמועדף על מודלים.'
      : 'Optimization for language models and AI overviews: LLM intent research, GEO-aligned schema, and LLM-style content rewrites.',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <SEO
        page="geo"
        language={language}
        type="service"
        serviceType="GEO/AEO - LLM Search Optimization"
        breadcrumbs={breadcrumbs}
        extraLd={[serviceLd, faqLd]}
      />

      <main dir={rtl ? 'rtl' : 'ltr'} className="bg-neutral-50">
        <section className="pt-28 pb-16 bg-white">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                {rtl ? 'שירות GEO/AEO מתקדם' : 'Advanced GEO/AEO service'}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
                {rtl ? 'לבלוט בתשובות AI ובחיפושי מודלי שפה' : 'Stand out in AI answers and LLM search'}
              </h1>
              <p className="text-neutral-700 text-lg leading-relaxed mb-6">
                {rtl
                  ? 'אנחנו בונים אסטרטגיית GEO/AEO מלאה: כוונות LLM, סכמה מותאמת GEO, ושכתוב תוכן בשפת המודל כדי להגדיל חשיפה בתשובות AI.'
                  : 'We build a full GEO/AEO strategy: LLM intent research, GEO-ready schema, and LLM-style rewrites to boost your visibility in AI answers.'}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  to={createPageUrl('Contact') + `?service=geo&lang=${language}`}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-semibold"
                >
                  {rtl ? 'שיחת אבחון GEO/AEO' : 'GEO/AEO Discovery Call'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={createPageUrl('Services') + `?service=geo&lang=${language}`}
                  className="inline-flex items-center gap-2 px-4 py-3 border border-neutral-200 text-neutral-800 rounded-xl hover:border-primary-300"
                >
                  {rtl ? 'כל שירותי הדיגיטל' : 'View all services'}
                </Link>
              </div>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {rtl ? 'למה עכשיו GEO/AEO?' : 'Why GEO/AEO now?'}
              </h3>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                  {rtl
                    ? 'AI Overviews ו-LLM answers הופכים לערוץ תנועה מרכזי; מי שמתויג נכון זוכה לחשיפה ראשונה.'
                    : 'AI Overviews and LLM answers are becoming a primary traffic channel; well-tagged content wins first exposure.'}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                  {rtl
                    ? 'מודלים מעדיפים סכמה ברורה ותוכן מותאם הקשר; אנחנו מיישמים זאת מקצה לקצה.'
                    : 'Models favor clear schema and context-tuned content; we implement end-to-end.'}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                  {rtl
                    ? 'מעקב ומדידה: חשיפה ב-AI, CTR משוער ודירוג ב-SERP משולב.'
                    : 'Tracking and measurement: AI visibility, estimated CTR, and blended SERP uplift.'}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                  {rtl ? 'GEO/AEO – להתבלט בתשובות ה-AI' : 'GEO/AEO – Stand out in AI answers'}
                </h2>
                <p className="text-neutral-700 mb-4">
                  {rtl
                    ? 'אנחנו מותאמים למודלי שפה ול-AI Overviews: מחקר כוונת LLM, סכמה מותאמת GEO, ושכתוב תוכן שמועדף על מודלים כדי שתופיעו ראשונים.'
                    : 'We optimize for language models and AI overviews: LLM intent research, GEO-ready schema, and LLM-style rewrites so you surface first.'}
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">•</span>
                    {rtl ? 'מדידת חשיפה ב-AI Overviews ו-LLM answers' : 'Tracking AI overview and LLM answer visibility'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">•</span>
                    {rtl ? 'תיוג/סכמה ייעודיים ל-GEO/AEO' : 'GEO/AEO-focused schema and tagging'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600">•</span>
                    {rtl ? 'שכתוב תוכן בשפת המודל' : 'LLM-friendly content rewrites'}
                  </li>
                </ul>
                <div className="mt-6 flex gap-3 flex-wrap">
                  <Link
                    to={createPageUrl('Services') + `?service=geo&lang=${language}`}
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-semibold"
                  >
                    {rtl ? 'בואו נדבר GEO/AEO' : 'Let’s talk GEO/AEO'}
                  </Link>
                  <Link
                    to={createPageUrl('Contact') + `?service=geo&lang=${language}`}
                    className="inline-flex items-center gap-2 px-4 py-3 border border-neutral-200 text-neutral-800 rounded-xl hover:border-primary-300"
                  >
                    {rtl ? 'בדיקת חשיפה ללא עלות' : 'Free visibility check'}
                  </Link>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {rtl ? 'איתותי מגמה (דיווחים גלובליים)' : 'Trend signals (global reports)'}
                </h3>
                <ul className="space-y-3 text-neutral-700">
                  <li>
                    {rtl
                      ? 'דיווחי שוק (SISTRIX 2024) מצביעים על חשיפה גבוהה ל-AI Overviews בחיפושים בארה\"ב.'
                      : 'Market reports (SISTRIX 2024) indicate high AI Overview exposure in US searches.'}
                  </li>
                  <li>
                    {rtl
                      ? 'נרשמת עלייה משמעותית בתשובות AI בדסקטופ לעומת מובייל (נתוני שוק עדכניים).'
                      : 'Notable increase in AI answers on desktop versus mobile (recent market data).'}
                  </li>
                  <li>
                    {rtl
                      ? 'מודלי שפה נותנים עדיפות לתוכן עם סכמה ברורה ותיוג הקשרי – זה מה שאנחנו מיישמים.'
                      : 'LLMs prioritize clearly tagged, schema-rich content – that’s what we implement.'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-neutral-50">
          <div className="container mx-auto px-4">
            <AnimatedElement animation="fadeInUp" className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                {rtl ? 'התהליך שלנו ל-GEO/AEO' : 'Our GEO/AEO process'}
              </h2>
              <p className="text-neutral-700 max-w-3xl mx-auto">
                {rtl
                  ? 'ארבעה שלבים שמקדמים תוכן לתוך תשובות AI: כוונות, סכמה, שכתוב מותאם מודל, ומדידה רציפה.'
                  : 'Four steps to push your content into AI answers: intents, schema, model-friendly rewrites, and continuous measurement.'}
              </p>
            </AnimatedElement>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step, idx) => (
                <AnimatedElement key={idx} animation="slideUp" delay={idx * 0.05}>
                  <div className="h-full p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-3 font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-neutral-800 font-semibold mb-2">
                      {step}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {rtl ? 'שאלות נפוצות' : 'FAQs'}
                </h3>
                <div className="space-y-3">
                  {faq.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <p className="font-semibold text-neutral-900 mb-1">{item.q}</p>
                      <p className="text-neutral-700 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {rtl ? 'מה תקבלו איתנו' : 'What you get with us'}
                </h3>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary-600 mt-0.5" />
                    {rtl ? 'סכמה ותיוג GEO/AEO מוטמעים' : 'Embedded GEO/AEO schema and tagging'}
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary-600 mt-0.5" />
                    {rtl ? 'שכתוב תכנים בשפת המודל' : 'Model-language rewrites for content'}
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary-600 mt-0.5" />
                    {rtl ? 'דשבורד מדידה ל-AI Overviews' : 'AI Overviews tracking dashboard'}
                  </li>
                </ul>
                <div className="mt-5">
                  <Link
                    to={createPageUrl('Contact') + `?service=geo&lang=${language}`}
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-xl font-semibold"
                  >
                    {rtl ? 'בואו נקפיץ את החשיפה שלכם' : 'Boost your AI visibility'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <LeadMagnet language={language} />
      </main>
    </>
  );
}
