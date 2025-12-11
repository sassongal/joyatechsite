import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Layers, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import HeroNew from '../components/home/HeroNew';
import CaseStudy from '../components/home/CaseStudy';
import { createPageUrl } from '../utils';

const CardSwap = lazy(() => import('../components/CardSwap'));
const ClientsLogosSlider = lazy(() => import('../components/home/ClientsLogosSlider'));

export default function Home({ language = 'he' }) {
  const rtl = language === 'he';

  return (
    <>
      <SEO page="home" language={language} type="website" />

      <main>
        <HeroNew language={language} />

        {/* Proof / Social Evidence */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-3xl font-bold text-primary-600">60+</div>
                <p className="text-neutral-600 text-sm">{rtl ? 'פרויקטי אוטומציה ודיגיטל' : 'Automation & digital projects'}</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-3xl font-bold text-secondary-600">35%</div>
                <p className="text-neutral-600 text-sm">{rtl ? 'חיסכון ממוצע בזמן תפעול' : 'Avg. operations time saved'}</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-3xl font-bold text-accent-500">4.9/5</div>
                <p className="text-neutral-600 text-sm">{rtl ? 'דירוג שביעות רצון לקוחות' : 'Client satisfaction score'}</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="text-3xl font-bold text-neutral-900">24h</div>
                <p className="text-neutral-600 text-sm">{rtl ? 'זמן תגובה להצעות מחיר' : 'Response time for proposals'}</p>
              </div>
            </div>
          </div>
        </section>

        <CaseStudy language={language} />

        {/* Services Card Swap */}
        <section id="services" aria-labelledby="services-heading" className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50/40 to-secondary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
                {language === 'he' ? 'השירותים שלנו' : 'Our Services'}
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {language === 'he'
                  ? 'פתרונות דיגיטליים מתקדמים המותאמים במיוחד לצרכי העסק שלך'
                  : 'Advanced digital solutions tailored specifically to your business needs'
                }
              </p>
            </div>

            <Suspense fallback={<div className="text-center text-neutral-500 py-10">Loading services…</div>}>
              <CardSwap
                cards={[
                  {
                    title: language === 'he' ? 'אוטומציה ו-CRM חכמים' : 'Business Automation & CRM',
                    description: language === 'he'
                      ? 'חיבור תהליכים, אוטומציה של לידים, אינטגרציות CRM, ובוטים שמפחיתים עומסים אנושיים.'
                      : 'Process wiring, lead automation, CRM integrations, and bots that reduce manual load.',
                    icon: <Bot className="w-12 h-12" aria-hidden="true" />,
                    features: language === 'he'
                      ? ['אוטומציה של תהליכי מכירה', 'שילוב מערכות CRM', 'בוטים חכמים לשירות לקוחות', 'דוחות ביצועים בזמן אמת']
                      : ['Sales process automation', 'CRM system integration', 'Smart customer service bots', 'Real-time performance reports']
                  },
                  {
                    title: language === 'he' ? 'GEO/AIO - קידום מודלי שפה' : 'GEO/AIO - LLM Search Optimization',
                    description: language === 'he'
                      ? 'אופטימיזציה של תוכן ומבנה עבור מודלי שפה כדי להופיע ראשונים בתשובות AI ו-SERP משולבי מודלים.'
                      : 'Optimize content and structure for language models to surface first in AI answers and blended SERP.',
                    icon: <Sparkles className="w-12 h-12" aria-hidden="true" />,
                    features: language === 'he'
                      ? ['מחקר כוונת משתמש בשאילתות LLM', 'שכתוב ותיוג תוכן ל-GEO', 'מדידת חשיפה ב-AI Overviews', 'התאמה למנועי חיפוש AI ומודלי שפה']
                      : ['LLM intent research', 'Content retagging for GEO', 'AI overview visibility tracking', 'Alignment to AI search and LLMs']
                  },
                  {
                    title: language === 'he' ? 'עיצוב אתרים ומיתוג' : 'Web Design & Branding',
                    description: language === 'he'
                      ? 'אתרי זכוכיתיות כהים עם אנימציות וואו, UX ממוקד המרה ומיתוג שובה עין.'
                      : 'Dark glassmorphism sites with wow motion, conversion-focused UX, and striking branding.',
                    icon: <Layers className="w-12 h-12" aria-hidden="true" />,
                    features: language === 'he'
                      ? ['עיצוב UI/UX מתקדם', 'אנימציות וויזואליות', 'מיתוג מלא לעסק', 'פיתוח responsive']
                      : ['Advanced UI/UX design', 'Visual animations', 'Complete business branding', 'Responsive development']
                  },
                  {
                    title: language === 'he' ? 'סדנאות אוטומציה והדרכות' : 'Automation Workshops & Training',
                    description: language === 'he'
                      ? 'סשנים אישיים לעסקים ואנשים: כתיבה, אוטומציות, וחיבורים לכלי עבודה קיימים.'
                      : 'Personalized sessions for teams and individuals: writing, automations, and tooling integrations.',
                    icon: <Sparkles className="w-12 h-12" aria-hidden="true" />,
                    features: language === 'he'
                      ? ['הדרכות אישיות', 'כלי אוטומציה מתקדמים', 'שילוב מערכות קיימות', 'ליווי מקצועי']
                      : ['Personal training', 'Advanced automation tools', 'Existing system integration', 'Professional guidance']
                  },
                  {
                    title: language === 'he' ? 'קורסי בינה מלאכותית' : 'AI Courses & Training',
                    description: language === 'he'
                      ? 'הדרכות מקיפות בבינה מלאכותית - מהיסודות ועד ליישומים מתקדמים.'
                      : 'Comprehensive AI training - from basics to advanced applications.',
                    icon: <BookOpen className="w-12 h-12" aria-hidden="true" />,
                    features: language === 'he'
                      ? ['יסודות בינה מלאכותית', 'כלי AI מתקדמים', 'יישומים עסקיים', 'פרויקטים מעשיים']
                      : ['AI fundamentals', 'Advanced AI tools', 'Business applications', 'Practical projects']
                  }
                ]}
                autoPlay
                autoPlayInterval={5000}
                showDots
                showArrows
                className="mb-20"
              />
            </Suspense>
          </div>
        </section>

        <Suspense fallback={<div className="text-center text-neutral-500 py-10">Loading clients…</div>}>
          <ClientsLogosSlider />
        </Suspense>
      </main>
    </>
  );
}
