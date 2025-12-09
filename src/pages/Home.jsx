import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroNew from '../components/home/HeroNew';
import CardSwap from '../components/CardSwap';
import ClientsLogosSlider from '../components/home/ClientsLogosSlider';
import { Bot, Layers, Sparkles, BookOpen } from 'lucide-react';

export default function Home({ language = 'he' }) {
  const rtl = language === 'he';

  const pageTitle = rtl
    ? 'Joya-Tech Digital Solutions - פתרונות דיגיטליים מתקדמים לעסקים'
    : 'Joya-Tech Digital Solutions - Advanced Digital Solutions for Businesses';

  const pageDescription = rtl
    ? 'Joya-Tech מציעה פתרונות דיגיטליים מתקדמים לעסקים, כולל קידום אתרים, יצירת תוכן, בניית אתרים, שירותי CRM ועיצוב גרפי.'
    : 'Joya-Tech offers advanced digital solutions for businesses, including SEO, content creation, website development, CRM services, and graphic design.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Joya-Tech',
        url: 'https://joyatech.com',
        logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png',
        email: 'Gal@joya-tech.net',
        telephone: '+972-54-646-8676',
        sameAs: [
          'https://www.linkedin.com',
          'https://www.instagram.com'
        ]
      },
      {
        '@type': 'WebSite',
        url: 'https://joyatech.com',
        name: 'Joya-Tech Digital Solutions',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://joyatech.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: rtl ? 'דף הבית' : 'Home',
            item: 'https://joyatech.com'
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/030050_3.png" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main>
        <HeroNew language={language} />

        {/* Services Card Swap */}
        <section id="services" aria-labelledby="services-heading" className="py-20 bg-gradient-to-br from-neutral-50 via-primary-50/40 to-secondary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {language === 'he' ? 'השירותים שלנו' : 'Our Services'}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'he'
                  ? 'פתרונות דיגיטליים מתקדמים המותאמים במיוחד לצרכי העסק שלך'
                  : 'Advanced digital solutions tailored specifically to your business needs'
                }
              </p>
            </div>

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
          </div>
        </section>

        <ClientsLogosSlider />
      </main>
    </>
  );
}
