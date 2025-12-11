import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import AnimatedElement from '../components/ui/AnimatedElement';
import SEO from '../components/SEO';
import { CheckCircle, Users, Award, Clock, BookOpen, Star, Phone, MessageSquare, Target, TrendingUp, Zap, Heart, Sparkles, ArrowRight, Play, Send, MessageCircle } from 'lucide-react';

export default function Courses({ language = 'he' }) {
  const rtl = language === 'he';
  const prefersReducedMotion = useReducedMotion();

  const translations = useMemo(() => ({
    title: rtl ? 'קורסי בינה מלאכותית' : 'AI Courses',
    subtitle: rtl
      ? 'הכשרות מקצועיות בבינה מלאכותית - מהיסודות ועד יישומים מתקדמים'
      : 'Professional AI training - from basics to advanced applications',
    badge: rtl ? 'הכשרה מקצועית' : 'Professional Training',
    heroTitle: rtl ? 'הדרכת AI מ-א\' ועד ת\'' : 'AI Coaching from A to Z',
    heroSubtitle: rtl
      ? 'כרטיס כניסה להבנת הפוטנציאל האמיתי של בינה מלאכותית. קורסים והכשרות AI מקיפים שיעצימו אתכם בעידן הדיגיטלי.'
      : 'Entry ticket to understanding the true potential of artificial intelligence. Comprehensive AI courses and training that will empower you in the digital age.',
    cta: rtl ? 'התחל עכשיו' : 'Start Now',
    learnMore: rtl ? 'למידע נוסף' : 'Learn More'
  }), [rtl]);

  return (
    <>
      <SEO page="courses" language={language} type="website" />
      <main className="text-neutral-900">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-36 pb-24 min-h-screen flex items-center bg-gradient-to-br from-neutral-50 via-primary-50/40 to-secondary-50"
        aria-labelledby="courses-hero-title"
      >
        {/* Aurora Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[40rem] h-[40rem] -left-32 -top-32 bg-gradient-to-r from-primary-300/25 via-secondary-200/20 to-accent-200/15 blur-3xl rounded-full"
            animate={prefersReducedMotion ? {} : {
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-[35rem] h-[35rem] right-0 top-10 bg-gradient-to-r from-secondary-200/25 via-primary-200/20 to-accent-200/20 blur-3xl rounded-full"
            animate={prefersReducedMotion ? {} : {
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 border border-secondary-200 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-secondary-600" />
                <span className="text-secondary-700 text-sm font-medium">{translations.badge}</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                id="courses-hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-6xl xl:text-7xl font-bold text-neutral-900 leading-tight"
              >
                {translations.heroTitle.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="inline-block mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-neutral-700 leading-relaxed max-w-xl"
              >
                {translations.heroSubtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 flex-wrap"
              >
                <Link
                  to="#courses"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-lg shadow-md transition-colors"
                >
                  <Play className="w-5 h-5" />
                  {translations.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex gap-3 items-center">
                  <a
                    href="tel:+972546468676"
                    className="inline-flex items-center gap-2 px-4 py-3 border border-primary-300 bg-white text-primary-700 rounded-xl font-semibold transition-colors"
                    aria-label={rtl ? 'התקשרו אלינו' : 'Call us'}
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://wa.me/972546468676?text=היי%20Gal,%20אשמח%20לדבר%20על%20קורסים"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-semibold transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-8 pt-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">150+</div>
                  <div className="text-neutral-600">{rtl ? 'בוגרים' : 'Graduates'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-600">4.9/5</div>
                  <div className="text-neutral-600">{rtl ? 'דירוג' : 'Rating'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-500">95%</div>
                  <div className="text-neutral-600">{rtl ? 'שביעות רצון' : 'Satisfaction'}</div>
                </div>
              </motion.div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                {/* Floating Cards */}
                <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card rounded-2xl p-6 border border-neutral-200 shadow-2xl mb-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900 font-semibold">{rtl ? 'קורס מתקדם' : 'Advanced Course'}</h3>
                    <p className="text-neutral-600 text-sm">{rtl ? 'לומדים עכשיו' : 'Currently Learning'}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={prefersReducedMotion ? {} : { y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="glass-card rounded-2xl p-6 border border-neutral-200 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-neutral-900 font-semibold">{rtl ? 'תוצאות מדהימות' : 'Amazing Results'}</h3>
                    <p className="text-neutral-600 text-sm">{rtl ? 'הגדלת פרודוקטיביות' : 'Productivity Boost'}</p>
                  </div>
                </div>
              </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-transparent" aria-labelledby="learning-paths-title">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fadeIn" className="text-center mb-16">
            <h2 id="learning-paths-title" className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              {rtl ? 'מסלולי הלמידה שלנו' : 'Our Learning Paths'}
            </h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              {rtl
                ? 'בחרו את המסלול המתאים לכם - הדרכה פרטנית או הכשרה ארגונית'
                : 'Choose the path that suits you - personal coaching or organizational training'}
            </p>
          </AnimatedElement>

          {/* Learning Paths */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <AnimatedElement animation="slideUp" delay={0.1}>
              <div className="glass-card rounded-2xl p-8 border border-neutral-200 hover:border-primary-300 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      {rtl ? 'הדרכה פרטנית ואישית' : 'Personal & Individual Coaching'}
                    </h3>
                    <p className="text-secondary-700 text-sm">{rtl ? 'מותאם לצרכים שלכם' : 'Tailored to your needs'}</p>
                  </div>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  {rtl
                    ? 'לימוד מותאם אישית לקצב שלכם עם תשומת לב מלאה לצרכים הייחודיים. כל שיעור מותאם במיוחד עבורכם, עם תרגולים פרקטיים ותמיכה צמודה לאורך כל הדרך.'
                    : 'Learning tailored to your pace with full attention to your unique needs. Each lesson is specially adapted for you, with practical exercises and close support throughout the journey.'}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    rtl ? 'תכנית לימודים מותאמת אישית' : 'Personalized learning program',
                    rtl ? 'קצב למידה לפי הצרכים שלכם' : 'Learning pace according to your needs',
                    rtl ? 'תמיכה אישית וצמודה' : 'Personal and close support',
                    rtl ? 'תרגולים פרקטיים מותאמים' : 'Adapted practical exercises'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="#contact"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold shadow-md transition-colors"
                >
                  {rtl ? 'בחר מסלול זה' : 'Choose This Path'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slideUp" delay={0.2}>
              <div className="glass-card rounded-2xl p-8 border border-neutral-200 hover:border-secondary-400 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-700">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      {rtl ? 'הדרכה קבוצתית וארגונית' : 'Group & Organizational Coaching'}
                    </h3>
                    <p className="text-secondary-700 text-sm">{rtl ? 'לצוותים וארגונים' : 'For teams and organizations'}</p>
                  </div>
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  {rtl
                    ? 'לימוד בצוות לחברות וארגונים עם דגש על יישום מעשי בעבודה. הקניית כלים שמשפיעים מיידית על הפרודוקטיביות והיעילות של הצוות כולו.'
                    : 'Team learning for companies and organizations with emphasis on practical implementation at work. Providing tools that immediately impact the productivity and efficiency of the entire team.'}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    rtl ? 'הכשרת צוותים שלמים' : 'Training entire teams',
                    rtl ? 'יישום מעשי בעבודה' : 'Practical implementation at work',
                    rtl ? 'חיסכון בזמן ובמשאבים' : 'Saving time and resources',
                    rtl ? 'שיפור פרודוקטיביות ארגונית' : 'Improving organizational productivity'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="#contact"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold shadow-md transition-colors"
                >
                  {rtl ? 'בחר מסלול זה' : 'Choose This Path'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedElement>
          </div>

          {/* Course Tracks */}
          <AnimatedElement animation="fadeIn" className="mb-20" id="course-tracks">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {rtl ? 'מסלולי הקורסים' : 'Course Tracks'}
              </h3>
              <p className="text-neutral-700 max-w-2xl mx-auto">
                {rtl
                  ? 'מגוון רחב של קורסים - מהיסודות ועד למומחיות מתקדמת'
                  : 'Wide range of courses - from basics to advanced expertise'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: rtl ? 'מבוא לבינה מלאכותית' : 'Introduction to AI',
                  description: rtl ? 'יסודות ה-AI והכלים הבסיסיים' : 'AI fundamentals and basic tools',
                  icon: <BookOpen className="w-6 h-6" />,
                  gradient: 'bg-primary-500'
                },
                {
                  title: rtl ? 'אוטומציה עם AI' : 'Automation with AI',
                  description: rtl ? 'בניית תהליכים אוטומטיים חכמים' : 'Building smart automated processes',
                  icon: <Zap className="w-6 h-6" />,
                  gradient: 'bg-primary-500'
                },
                {
                  title: rtl ? 'יצירת תוכן עם AI' : 'Content Creation with AI',
                  description: rtl ? 'כתיבה, עיצוב ויצירת מדיה' : 'Writing, design and media creation',
                  icon: <MessageSquare className="w-6 h-6" />,
                  gradient: 'bg-primary-500'
                },
                {
                  title: rtl ? 'ניתוח נתונים' : 'Data Analysis',
                  description: rtl ? 'עיבוד וניתוח נתונים עם AI' : 'Data processing and analysis with AI',
                  icon: <TrendingUp className="w-6 h-6" />,
                  gradient: 'bg-primary-500'
                },
                {
                  title: rtl ? 'עיצוב עם AI' : 'AI Design',
                  description: rtl ? 'כלי עיצוב ואיורים דיגיטליים' : 'Design tools and digital illustrations',
                  icon: <Target className="w-6 h-6" />,
                  gradient: 'bg-primary-500'
                },
                {
                  title: rtl ? 'קורס מומחים' : 'Expert Course',
                  description: rtl ? 'מיומנויות מתקדמות ויישומים מורכבים' : 'Advanced skills and complex applications',
                  icon: <Award className="w-6 h-6" />,
                  gradient: 'bg-primary-500'
                }
              ].map((track, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-card rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-colors group"
                >
                  <div className={`w-12 h-12 ${track.gradient} rounded-xl flex items-center justify-center text-white mb-4`}>
                    {track.icon}
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">{track.title}</h4>
                  <p className="text-neutral-700 text-sm">{track.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>

          {/* Advantages Section */}
          <AnimatedElement animation="fadeIn" className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {rtl ? 'למה לבחור ב-Joya-Tech?' : 'Why Choose Joya-Tech?'}
              </h3>
              <p className="text-neutral-700 max-w-2xl mx-auto">
                {rtl
                  ? 'הניסיון, המומחיות והמחויבות שלנו מבדילים אותנו משאר ספקי ההכשרות'
                  : 'Our experience, expertise and commitment set us apart from other training providers'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: rtl ? 'מדריכים מקצועיים' : 'Professional Instructors',
                  description: rtl ? 'צוות מומחים עם ניסיון מעשי בעולם ה-AI' : 'Team of experts with practical experience in the AI world',
                  gradient: 'bg-primary-500'
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: rtl ? 'תעודות מוכרות' : 'Recognized Certificates',
                  description: rtl ? 'תעודות מקצועיות המוכרות בשוק העבודה' : 'Professional certificates recognized in the job market',
                  gradient: 'bg-primary-500'
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: rtl ? 'גמישות בלמידה' : 'Learning Flexibility',
                  description: rtl ? 'לימוד בקצב שלכם, מתי שנוח לכם' : 'Learn at your pace, whenever convenient',
                  gradient: 'bg-primary-500'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: rtl ? 'תוכן מעשי ורלוונטי' : 'Practical & Relevant Content',
                  description: rtl ? 'כלים ומיומנויות שאפשר להשתמש בהם מיידית' : 'Tools and skills you can use immediately',
                  gradient: 'bg-primary-500'
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: rtl ? 'קהילת בוגרים' : 'Graduates Community',
                  description: rtl ? 'רשת של בוגרים לתמיכה והמשך למידה' : 'Network of graduates for support and continued learning',
                  gradient: 'bg-primary-500'
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: rtl ? 'תמיכה אישית' : 'Personal Support',
                  description: rtl ? 'ליווי צמוד לאורך כל מסע הלמידה' : 'Close accompaniment throughout the learning journey',
                  gradient: 'bg-primary-500'
                }
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-card rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-colors group text-center"
                >
                  <div className={`w-16 h-16 ${advantage.gradient} rounded-xl flex items-center justify-center text-white mx-auto mb-4`}>
                    {advantage.icon}
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">{advantage.title}</h4>
                  <p className="text-neutral-700 text-sm">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>

          {/* Testimonials Section */}
          <AnimatedElement animation="fadeIn" className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {rtl ? 'מה אומרים הבוגרים?' : 'What Our Graduates Say?'}
              </h3>
              <p className="text-neutral-700 max-w-2xl mx-auto">
                {rtl
                  ? 'הצלחות ושביעות רצון מהבוגרים שלנו'
                  : 'Success stories and satisfaction from our graduates'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  text: rtl ? '"הקורס שינה לי את החיים המקצועיים. למדתי להשתמש ב-AI בצורה יעילה וזה הכפיל לי את הפרודוקטיביות"' : '"The course changed my professional life. I learned to use AI efficiently and it doubled my productivity"',
                  author: rtl ? 'שרה כהן' : 'Sarah Cohen',
                  role: rtl ? 'מנהלת שיווק' : 'Marketing Manager',
                  rating: 5
                },
                {
                  text: rtl ? '"כחברה, ההכשרה הארגונית של Joya-Tech העלתה את כל הצוות לרמה חדשה. מומלץ בחום!"' : '"As a company, Joya-Tech\'s organizational training raised the entire team to a new level. Highly recommended!"',
                  author: rtl ? 'דוד לוי' : 'David Levy',
                  role: rtl ? 'מנכ"ל TechStart' : 'CEO TechStart',
                  rating: 5
                },
                {
                  text: rtl ? '"הגישה האישית והמותאמת עזרה לי להבין AI ברמה שאף קורס אחר לא הצליח"' : '"The personal and tailored approach helped me understand AI at a level that no other course succeeded"',
                  author: rtl ? 'רחל אברהם' : 'Rachel Abraham',
                  role: rtl ? 'מפתחת תוכנה' : 'Software Developer',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-card rounded-xl p-6 border border-neutral-200"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-500 fill-accent-500" />
                    ))}
                  </div>
                  <p className="text-neutral-700 italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="text-primary-600 font-semibold">{testimonial.author}</div>
                    <div className="text-neutral-600 text-sm">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedElement>

          {/* CTA Section */}
          <AnimatedElement animation="fadeIn">
            <div className="glass-card rounded-2xl p-8 md:p-12 border border-neutral-200 text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                {rtl ? 'מוכנים להתחיל?' : 'Ready to Start?'}
              </h3>
              <p className="text-xl text-neutral-700 mb-8">
                {rtl
                  ? 'צרו איתנו קשר לייעוץ ללא עלות והתאמה אישית של הקורס המושלם עבורכם'
                  : 'Contact us for free consultation and personal adaptation of the perfect course for you'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Link
                  to="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-lg shadow-md transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  {rtl ? 'השאירו פרטים' : 'Leave Details'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex gap-3">
                  <a
                    href="tel:+972546468676"
                    className="inline-flex items-center gap-2 px-4 py-3 border border-primary-300 bg-white text-primary-700 rounded-xl font-semibold transition-colors"
                    aria-label={rtl ? 'התקשרו אלינו' : 'Call us'}
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/972546468676?text=היי%20Gal,%20אשמח%20לדבר%20על%20קורסים"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-xl font-semibold transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <p className="text-neutral-600 text-sm">
                {rtl ? 'ייעוץ ראשוני ללא עלות • התאמה אישית • התחלה מיידית' : 'Free initial consultation • Personal adaptation • Immediate start'}
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>
      </main>
    </>
  );
}
