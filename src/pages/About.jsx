import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedElement from '../components/ui/AnimatedElement';
import SEO from '../components/SEO';
import { Users, Lightbulb, Target, Award, Star, CheckCircle, TrendingUp, Users as Team, Rocket } from 'lucide-react';
import logoBlue from '@/assets/graphics/LogoBlue.png';

export default function About({ language = 'he' }) {
  const rtl = language === 'he';
  
  const translations = {
    title: rtl ? 'אודות Joya-Tech' : 'About Joya-Tech',
    subtitle: rtl 
      ? 'חברת פתרונות דיגיטליים המתמחה בשיווק, פיתוח ואסטרטגיה'
      : 'A digital solutions company specializing in marketing, development and strategy',
    missionTitle: rtl ? 'המשימה שלנו' : 'Our Mission',
    mission: rtl 
      ? 'אנו מאמינים שכל עסק, קטן כגדול, ראוי לנוכחות דיגיטלית מצוינת. המשימה שלנו היא להפוך את הטכנולוגיה המתקדמת והשיווק הדיגיטלי לנגישים, פשוטים ואפקטיביים עבור כל לקוחותינו.'
      : 'We believe that every business, big or small, deserves an excellent digital presence. Our mission is to make advanced technology and digital marketing accessible, simple and effective for all our clients.',
    valueTitle: rtl ? 'הערכים שלנו' : 'Our Values',
    values: [
      {
        title: rtl ? 'מקצועיות' : 'Professionalism',
        description: rtl 
          ? 'אנו שואפים למצוינות בכל פרויקט ומציבים רף גבוה לאיכות העבודה שלנו'
          : 'We strive for excellence in every project and set a high standard for the quality of our work',
        icon: <Award className="w-8 h-8" />
      },
      {
        title: rtl ? 'חדשנות' : 'Innovation',
        description: rtl 
          ? 'אנו מתעדכנים באופן שוטף בטכנולוגיות החדשות ביותר ומחפשים תמיד את הפתרון היצירתי והמתקדם ביותר'
          : 'We constantly update ourselves with the latest technologies and always look for the most creative and advanced solution',
        icon: <Lightbulb className="w-8 h-8" />
      },
      {
        title: rtl ? 'שקיפות' : 'Transparency',
        description: rtl 
          ? 'אנו מאמינים בתקשורת פתוחה וכנה עם הלקוחות שלנו ובמדידת תוצאות אמיתיות'
          : 'We believe in open and honest communication with our customers and measuring real results',
        icon: <CheckCircle className="w-8 h-8" />
      },
      {
        title: rtl ? 'יחס אישי' : 'Personal Attention',
        description: rtl 
          ? 'כל לקוח מקבל ליווי צמוד ופתרון המותאם במיוחד לצרכים וליעדים שלו'
          : 'Each client receives close guidance and a solution specially tailored to their needs and goals',
        icon: <Users className="w-8 h-8" />
      },
      {
        title: rtl ? 'מיקוד בתוצאות' : 'Results-Oriented',
        description: rtl 
          ? 'השורה התחתונה חשובה לנו - אנו שואפים להשיג תוצאות עסקיות אמיתיות ומדידות עבור לקוחותינו'
          : 'The bottom line is important to us - we strive to achieve real and measurable business results for our clients',
        icon: <Target className="w-8 h-8" />
      },
      {
        title: rtl ? 'מובילות מקצועית' : 'Professional Leadership',
        description: rtl 
          ? 'צוות המומחים שלנו תמיד מעודכן בטרנדים האחרונים ובטכנולוגיות המתקדמות ביותר בתחום'
          : 'Our team of experts is always updated with the latest trends and most advanced technologies in the field',
        icon: <Star className="w-8 h-8" />
      }
    ],
    contactCTA: rtl ? 'רוצים לעבוד איתנו?' : 'Want to work with us?',
    contactButton: rtl ? 'צרו קשר' : 'Contact Us'
  };


  return (
    <>
      <SEO 
        page="about"
        language={language}
        type="website"
      />
      
      <main dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-primary-50 to-neutral-50">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{translations.title}</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">{translations.subtitle}</p>
        </AnimatedElement>
        
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <AnimatedElement animation="fadeIn" className="mb-20" id="mission">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={rtl ? 'lg:order-2' : 'lg:order-1'}>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">{translations.missionTitle}</h2>
                <p className="text-lg text-neutral-600">{translations.mission}</p>
              </div>
              <div className={rtl ? 'lg:order-1' : 'lg:order-2'}>
                <div className="relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-5/6 bg-primary-500/20 rounded-full blur-2xl"></div>
                  <img
                    src={logoBlue}
                    alt="Joya-Tech Logo"
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-md mx-auto rounded-xl shadow-xl relative z-10"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          {/* Founder Story Section */}
          <AnimatedElement animation="fadeIn" className="mb-20 bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                  {rtl ? 'הסיפור שלנו' : 'Our Story'}
                </h2>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    {rtl
                      ? 'JoyaTech נוסדה על ידי גל ששון, יזם טכנולוגי ומומחה בתחום האוטומציה הדיגיטלית. לאחר שנים של עבודה עם עשרות עסקים, גל זיהה צורך ברור - עסקים קטנים ובינוניים זקוקים לטכנולוגיה מתקדמת אך פשוטה ליישום.'
                      : 'JoyaTech was founded by Gal Sasson, a tech entrepreneur and expert in digital automation. After years of working with dozens of businesses, Gal identified a clear need - small and medium businesses require advanced yet simple-to-implement technology.'
                    }
                  </p>
                  <p>
                    {rtl
                      ? 'המומחיות העמוקה של גל בתחום ה-SEO והשיווק הדיגיטלי, בשילוב עם ראייה עסקית חדה, הובילה ליצירת JoyaTech - חברה שמתמחה בהפיכת טכנולוגיות מורכבות לפתרונות פשוטים ויעילים.'
                      : 'Gal\'s deep expertise in SEO and digital marketing, combined with sharp business acumen, led to the creation of JoyaTech - a company specializing in turning complex technologies into simple and effective solutions.'
                    }
                  </p>
                  <p>
                    {rtl
                      ? 'היום, JoyaTech מובילה את המהפכה של GEO/AEO - אופטימיזציה למנועי תשובה מבוססי AI כמו ChatGPT, Claude, ו-Perplexity. אנחנו עוזרים לעסקים לא רק להיות מצויינים בגוגל, אלא גם להופיע בתשובות של מודלי שפה גדולים.'
                      : 'Today, JoyaTech leads the GEO/AEO revolution - optimization for AI-powered answer engines like ChatGPT, Claude, and Perplexity. We help businesses not just excel on Google, but also appear in large language model responses.'
                    }
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-xl">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {rtl ? '2020 - ההתחלה' : '2020 - The Beginning'}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {rtl ? 'ייסוד החברה עם דגש על אוטומציה ו-CRM' : 'Company founding focusing on automation & CRM'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {rtl ? '2022 - התרחבות' : '2022 - Expansion'}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {rtl ? 'הוספת שירותי SEO מתקדמים ופיתוח אתרים' : 'Adding advanced SEO services and web development'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {rtl ? '2024 - מובילי GEO/AEO' : '2024 - GEO/AEO Leaders'}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {rtl ? 'חלוצי אופטימיזציה ל-AI ומנועי תשובה בישראל' : 'Pioneering AI optimization and answer engines in Israel'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary-600 text-white rounded-full flex items-center justify-center font-bold">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {rtl ? '2025 - העתיד' : '2025 - The Future'}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {rtl ? 'הרחבת מגוון השירותים וחדשנות מתמדת' : 'Expanding services and continuous innovation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Success Metrics */}
          <AnimatedElement animation="fadeIn" className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-12 text-center">
              {rtl ? 'ההצלחה שלנו במספרים' : 'Our Success in Numbers'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  number: '60+',
                  label: rtl ? 'פרויקטים מוצלחים' : 'Successful Projects'
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  number: '150%',
                  label: rtl ? 'עלייה ממוצעת בטראפיק' : 'Average Traffic Increase'
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  number: '4.9/5',
                  label: rtl ? 'דירוג שביעות רצון' : 'Satisfaction Rating'
                },
                {
                  icon: <Team className="w-8 h-8" />,
                  number: '35%',
                  label: rtl ? 'חיסכון בזמן עבודה' : 'Time Savings'
                }
              ].map((metric, index) => (
                <AnimatedElement key={index} animation="scaleIn" delay={index * 0.1}>
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                      {metric.icon}
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-2">{metric.number}</div>
                    <div className="text-sm text-neutral-600">{metric.label}</div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>

          {/* Values Section */}
          <AnimatedElement animation="fadeIn" className="mb-20" id="values">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-12 text-center">{translations.valueTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {translations.values.map((value, index) => (
                <AnimatedElement
                  key={index}
                  animation="slideUp"
                  delay={0.1 * index}
                >
                  <article className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 text-primary-600" aria-hidden="true">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900">{value.title}</h3>
                    <p className="text-neutral-600">{value.description}</p>
                  </article>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>

          {/* CTA Section */}
          <AnimatedElement animation="fadeIn" className="text-center">
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white p-12 rounded-2xl shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {translations.contactCTA}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {rtl
                  ? 'בואו נדבר על איך נוכל להוביל את העסק שלכם קדימה'
                  : 'Let\'s talk about how we can move your business forward'}
              </p>
              <Link
                to={createPageUrl('/contact', language)}
                className="inline-block px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-100 transition-colors shadow-lg"
              >
                {translations.contactButton}
              </Link>
            </div>
          </AnimatedElement>

        </div>
      </div>
    </main>
    </>
  );
}
