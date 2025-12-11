import { Clock, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import AnimatedElement from '../components/ui/AnimatedElement';
import ContactForm from '../components/contact/ContactForm';
import SEO from '../components/SEO';

export default function Contact({ language = 'he' }) {
  const rtl = language === 'he';

  const benefits = rtl ? [
    {
      icon: Clock,
      title: 'תגובה תוך 24 שעות',
      description: 'אנחנו מתחייבים לחזור אליכם תוך 24 שעות בימי עסקים'
    },
    {
      icon: CheckCircle2,
      title: 'ייעוץ ראשוני חינם',
      description: 'פגישת ייעוץ ראשונית בת 30 דקות ללא עלות והתחייבות'
    },
    {
      icon: MessageSquare,
      title: 'תוכנית אסטרטגית מותאמת אישית',
      description: 'נבנה עבורכם תוכנית פעולה מפורטת המותאמת לצרכי העסק שלכם'
    },
    {
      icon: CheckCircle2,
      title: 'שקיפות מלאה',
      description: 'דיווח שקוף על תהליכים, התקדמות ותוצאות מדידות'
    }
  ] : [
    {
      icon: Clock,
      title: '24-Hour Response',
      description: 'We commit to responding within 24 hours on business days'
    },
    {
      icon: CheckCircle2,
      title: 'Free Initial Consultation',
      description: '30-minute initial consultation at no cost or commitment'
    },
    {
      icon: MessageSquare,
      title: 'Custom Strategic Plan',
      description: 'We build a detailed action plan tailored to your business needs'
    },
    {
      icon: CheckCircle2,
      title: 'Full Transparency',
      description: 'Transparent reporting on processes, progress, and measurable results'
    }
  ];

  const contactMethods = rtl ? [
    {
      icon: MessageSquare,
      title: 'טופס יצירת קשר',
      description: 'מלאו את הטופס ונחזור אליכם בהקדם',
      cta: 'עיקרי'
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      description: 'שלחו לנו הודעה ותקבלו מענה מהיר',
      link: 'https://wa.me/972524252670'
    },
    {
      icon: MessageSquare,
      title: 'אימייל',
      description: 'info@joya-tech.net',
      link: 'mailto:info@joya-tech.net'
    }
  ] : [
    {
      icon: MessageSquare,
      title: 'Contact Form',
      description: 'Fill out the form and we\'ll get back to you soon',
      cta: 'Primary'
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      description: 'Send us a message for quick response',
      link: 'https://wa.me/972524252670'
    },
    {
      icon: MessageSquare,
      title: 'Email',
      description: 'info@joya-tech.net',
      link: 'mailto:info@joya-tech.net'
    }
  ];

  return (
    <>
      <SEO page="contact" language={language} type="website" />

      {/* Hero Section */}
      <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-12 bg-gradient-to-br from-primary-50 to-neutral-50">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              {rtl ? 'בואו נדבר על הצמיחה הדיגיטלית שלכם' : 'Let\'s Talk About Your Digital Growth'}
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              {rtl
                ? 'מתמחים ב-GEO/AEO, אוטומציה דיגיטלית, ופתרונות AI מתקדמים. אנחנו כאן כדי להביא את העסק שלכם לשלב הבא'
                : 'Specializing in GEO/AEO, digital automation, and advanced AI solutions. We\'re here to take your business to the next level'}
            </p>
          </AnimatedElement>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { value: '60+', label: rtl ? 'פרויקטים מוצלחים' : 'Successful Projects' },
              { value: '24h', label: rtl ? 'זמן תגובה מקסימלי' : 'Max Response Time' },
              { value: '4.9/5', label: rtl ? 'דירוג לקוחות' : 'Client Rating' },
              { value: '35%', label: rtl ? 'חיסכון בזמן ממוצע' : 'Average Time Saved' }
            ].map((stat, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={index * 0.1}>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose JoyaTech */}
      <section dir={rtl ? 'rtl' : 'ltr'} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {rtl ? 'למה לבחור ב-JoyaTech?' : 'Why Choose JoyaTech?'}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {rtl
                ? 'אנחנו לא רק מספקים שירותים - אנחנו שותפים להצלחה שלכם'
                : 'We don\'t just provide services - we\'re partners in your success'}
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimatedElement key={index} animation="fadeInUp" delay={index * 0.1}>
                <div className="flex gap-4 p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                    <p className="text-neutral-600">{benefit.description}</p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section dir={rtl ? 'rtl' : 'ltr'} className="py-16 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {rtl ? 'מה קורה אחרי שתיצרו קשר?' : 'What Happens After You Contact Us?'}
            </h2>
          </AnimatedElement>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {(rtl ? [
                {
                  step: '1',
                  title: 'ייעוץ ראשוני (30 דקות, חינם)',
                  description: 'שיחת היכרות בה נבין את האתגרים והמטרות שלכם, ונציג את הגישה שלנו'
                },
                {
                  step: '2',
                  title: 'הצעת אסטרטגיה מותאמת אישית',
                  description: 'נבנה עבורכם תוכנית פעולה מפורטת עם אבני דרך ברורות ותוצאות מדידות'
                },
                {
                  step: '3',
                  title: 'מפת דרכים ליישום',
                  description: 'נציג לכם את השלבים המדויקים, לוחות הזמנים והמשאבים הנדרשים'
                },
                {
                  step: '4',
                  title: 'תמיכה שוטפת ודיווח',
                  description: 'עדכונים קבועים, גישה למערכת ניהול, ותמיכה מקצועית לכל אורך הדרך'
                }
              ] : [
                {
                  step: '1',
                  title: 'Initial Consultation (30 min, free)',
                  description: 'Get-to-know call where we understand your challenges and goals, and present our approach'
                },
                {
                  step: '2',
                  title: 'Custom Strategy Proposal',
                  description: 'We build a detailed action plan with clear milestones and measurable results'
                },
                {
                  step: '3',
                  title: 'Implementation Roadmap',
                  description: 'We present the exact steps, timelines, and resources required'
                },
                {
                  step: '4',
                  title: 'Ongoing Support & Reporting',
                  description: 'Regular updates, management system access, and professional support throughout'
                }
              ]).map((item, index) => (
                <AnimatedElement key={index} animation="fadeInLeft" delay={index * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{item.title}</h3>
                      <p className="text-neutral-600">{item.description}</p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section dir={rtl ? 'rtl' : 'ltr'} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {rtl ? 'בחרו את דרך ההתקשרות המועדפת עליכם' : 'Choose Your Preferred Contact Method'}
            </h2>
          </AnimatedElement>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {contactMethods.map((method, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={index * 0.1}>
                <div className="text-center p-6 bg-neutral-50 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{method.title}</h3>
                  <p className="text-neutral-600 mb-4">{method.description}</p>
                  {method.link && (
                    <a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {rtl ? 'פתח' : 'Open'}
                    </a>
                  )}
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm language={language} />
    </>
  );
}
