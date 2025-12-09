import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Users, Lightbulb, Target, Award, Star, CheckCircle } from 'lucide-react';
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

  // Set page title and meta description based on language
  React.useEffect(() => {
    document.title = language === 'he' 
      ? 'אודות Joya-Tech | פתרונות דיגיטליים'
      : 'About Joya-Tech | Digital Solutions';
      
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = language === 'he'
      ? 'הכירו את Joya-Tech - חברת פתרונות דיגיטליים המתמחה בשיווק, פיתוח ואסטרטגיה עם צוות מקצועי ומנוסה.'
      : 'Meet Joya-Tech - a digital solutions company specializing in marketing, development and strategy with a professional and experienced team.';
  }, [language]);

  return (
    <main dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{translations.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.subtitle}</p>
        </AnimatedElement>
        
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <AnimatedElement animation="fadeIn" className="mb-20" id="mission">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={rtl ? 'lg:order-2' : 'lg:order-1'}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{translations.missionTitle}</h2>
                <p className="text-lg text-gray-600">{translations.mission}</p>
              </div>
              <div className={rtl ? 'lg:order-1' : 'lg:order-2'}>
                <div className="relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-5/6 bg-primary-500/20 rounded-full blur-2xl"></div>
                  <img
                    src={logoBlue}
                    alt="Joya-Tech Logo"
                    className="w-full max-w-md mx-auto rounded-xl shadow-xl relative z-10"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          {/* Values Section */}
          <AnimatedElement animation="fadeIn" className="mb-20" id="values">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">{translations.valueTitle}</h2>
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
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </article>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
          
        </div>
      </div>
    </main>
  );
}
