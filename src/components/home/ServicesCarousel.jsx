import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Layers, Bot, BookOpen } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ServicesCarousel = ({ language = 'he' }) => {
  const rtl = language === 'he';
  const prefersReducedMotion = useReducedMotion();

  const services = [
    {
      id: 1,
      title: rtl ? 'אוטומציה ו-CRM חכמים' : 'Business Automation & CRM',
      subtitle: rtl ? 'חיבור תהליכים, אוטומציה של לידים, אינטגרציות CRM, ובוטים שמפחיתים עומסים אנושיים.' : 'Process wiring, lead automation, CRM integrations, and bots that reduce manual load.',
      tag: rtl ? 'זמן תגובה מהיר יותר ב-40%' : '40% faster response times',
      icon: <Bot className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-primary-50 via-white to-secondary-50',
      buttonText: rtl ? 'לפרטים נוספים' : 'Learn More'
    },
    {
      id: 2,
      title: rtl ? 'עיצוב אתרים ומיתוג' : 'Web Design & Branding',
      subtitle: rtl ? 'אתרי זכוכיתיות כהים עם אנימציות וואו, UX ממוקד המרה ומיתוג שובה עין.' : 'Dark glassmorphism sites with wow motion, conversion-focused UX, and striking branding.',
      tag: rtl ? 'נראות פרימיום' : 'Premium presence',
      icon: <Layers className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
      gradient: 'from-secondary-50 via-white to-accent-50',
      buttonText: rtl ? 'לפרטים נוספים' : 'Learn More'
    },
    {
      id: 3,
      title: rtl ? 'סדנאות אוטומציה והדרכות פרטיות' : 'Automation Workshops & Private Tutoring',
      subtitle: rtl ? 'סשנים אישיים לעסקים ואנשים: כתיבה, אוטומציות, וחיבורים לכלי עבודה קיימים.' : 'Personalized sessions for teams and individuals: writing, automations, and tooling integrations.',
      tag: rtl ? 'למידה מותאמת' : 'Tailored learning',
      icon: <Sparkles className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      gradient: 'from-accent-50 via-white to-primary-50',
      buttonText: rtl ? 'לפרטים נוספים' : 'Learn More'
    },
    {
      id: 4,
      title: rtl ? 'קורסי בינה מלאכותית' : 'AI Courses & Training',
      subtitle: rtl ? 'הדרכות מקיפות בבינה מלאכותית - מהיסודות ועד ליישומים מתקדמים. ליחידים ולארגונים.' : 'Comprehensive AI training - from basics to advanced applications. For individuals and organizations.',
      tag: rtl ? 'הכשרה מקצועית' : 'Professional training',
      icon: <BookOpen className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-neutral-100 via-white to-secondary-50',
      buttonText: rtl ? 'לפרטים נוספים' : 'Learn More'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, prefersReducedMotion, services.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {rtl ? 'שירותים שמחברים טכנולוגיה לאנשים' : 'Services that connect tech to people'}
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            {rtl ? 'משלבים אוטומציה, חוויית משתמש ועיצוב כדי לייצר תוצאות מדידות ומיידיות.' : 'Blending automation, UX, and design to deliver measurable, immediate results.'}
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence initial={false} custom={rtl ? -1 : 1}>
            <motion.div
              key={currentIndex}
              custom={rtl ? -1 : 1}
              initial={{ opacity: 0, x: rtl ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: rtl ? -100 : 100 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: 'easeInOut' }}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${services[currentIndex].gradient} border border-neutral-200 shadow-2xl`}
            >
              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Text Content */}
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-neutral-200 text-sm font-medium text-neutral-800 shadow-sm"
                    >
                      {services[currentIndex].icon}
                      {services[currentIndex].tag}
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight"
                    >
                      {services[currentIndex].title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg text-neutral-700 leading-relaxed"
                    >
                      {services[currentIndex].subtitle}
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-xl font-bold shadow-lg hover:bg-primary-600 hover:-translate-y-0.5 transition-transform"
                    >
                      {services[currentIndex].buttonText}
                      <ChevronRight className={`w-5 h-5 ${rtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 ${rtl ? 'right-4' : 'left-4'} -translate-y-1/2 p-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-lg z-20`}
            aria-label={rtl ? 'הקודם' : 'Previous'}
          >
            {rtl ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <button
            onClick={nextSlide}
            className={`absolute top-1/2 ${rtl ? 'left-4' : 'right-4'} -translate-y-1/2 p-3 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-lg z-20`}
            aria-label={rtl ? 'הבא' : 'Next'}
          >
            {rtl ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 rtl:space-x-reverse z-20">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === idx ? 'bg-primary-500' : 'bg-neutral-400/70 hover:bg-neutral-500/80'
                } transition-colors`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
