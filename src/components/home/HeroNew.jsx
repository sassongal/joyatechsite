import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import DOMPurify from 'dompurify';
import { Sparkles, Play, ShieldCheck, Send, Phone, Building2, CheckCircle, MessageCircle } from 'lucide-react';

// Animated Counter Component
function AnimatedCounter({ value, duration = 2 }) {
  const ref = useRef(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [inView]);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration });
      return controls.stop;
    }
  }, [count, value, duration, inView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function HeroNew({ language = 'he' }) {
  const rtl = language === 'he';
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const translations = useMemo(() => ({
    title: rtl
      ? 'טכנולוגיה שמתחברת לאנשים'
      : 'Technology that connects with people',
    subtitle: rtl
      ? 'הופכים תהליכים עסקיים מורכבים לפתרונות אוטומטיים חכמים. אוטומציה ופיתוח – כל מה שהעסק שלך צריך כדי לצמוח.'
      : 'We turn complex business processes into smart automated solutions. Automation and development—everything your business needs to grow.',
    formTitle: rtl ? 'בואו נדבר' : 'Let\'s Talk',
    formSubtitle: rtl
      ? 'מלאו את הפרטים ונחזור אליכם תוך 24 שעות'
      : 'Fill in your details and we\'ll get back to you within 24 hours',
    name: rtl ? 'שם מלא' : 'Full Name',
    email: rtl ? 'דוא״ל' : 'Email',
    phone: rtl ? 'טלפון' : 'Phone',
    company: rtl ? 'חברה' : 'Company',
    service: rtl ? 'שירות' : 'Service',
    message: rtl ? 'הודעה' : 'Message',
    services: {
      automation: rtl ? 'אוטומציה' : 'Automation',
      web: rtl ? 'פיתוח אתרים' : 'Web Development',
      content: rtl ? 'יצירת תוכן' : 'Content Creation',
      design: rtl ? 'עיצוב' : 'Design',
      other: rtl ? 'אחר' : 'Other'
    },
    submit: rtl ? 'שלח הודעה' : 'Send Message',
    sending: rtl ? 'שולח...' : 'Sending...',
    sent: rtl ? 'נשלח בהצלחה!' : 'Sent successfully!',
    badge: rtl ? 'פתרונות מתקדמים' : 'Advanced Solutions'
  }), [rtl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStatus('sent');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    });

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section
      dir={rtl ? 'rtl' : 'ltr'}
      className="relative overflow-hidden pt-36 pb-20 min-h-screen flex items-center bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[40rem] h-[40rem] -left-32 -top-32 bg-gradient-to-r from-secondary-200/30 via-primary-200/20 to-neutral-200/10 blur-3xl rounded-full"
          animate={{
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
          className="absolute w-[35rem] h-[35rem] right-0 top-10 bg-gradient-to-r from-primary-200/20 via-secondary-200/15 to-secondary-200/10 blur-3xl rounded-full"
          animate={{
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
        <motion.div
          className="absolute w-[30rem] h-[30rem] -bottom-20 left-1/4 bg-gradient-to-r from-neutral-200/10 via-accent-200/15 to-primary-200/10 blur-3xl rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(102,215,209,0.06),transparent_40%),radial-gradient(circle_at_70%_10%,rgba(252,119,83,0.04),transparent_35%)]" />
      </div>


      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-10 items-start">
        {/* Text column */}
        <div className="space-y-6">

          {/* Sparkles badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 border border-secondary-300"
          >
            <Sparkles className="w-4 h-4 text-secondary-600" />
            <span className="text-secondary-700 text-sm font-medium">
              {translations.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl xl:text-6xl font-bold text-neutral-900 leading-tight"
          >
            {translations.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-neutral-700 max-w-xl leading-relaxed"
          >
            {translations.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3"
          >
            <Link
              to={createPageUrl('Services') + `?lang=${language}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-neutral-900 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30"
            >
              {rtl ? 'השירותים שלנו' : 'Our Services'}
            </Link>
            <a
              href="tel:+972546468676"
              className="inline-flex items-center justify-center px-7 py-4 border-2 border-secondary-500 text-secondary-700 rounded-xl font-semibold text-lg gap-2"
            >
              <Phone className="w-5 h-5" />
              {rtl ? 'צור קשר' : 'Contact Us'}
            </a>
            <a
              href="https://wa.me/972546468676?text=היי%20Gal,%20אשמח%20לשוחח%20על%20פרויקט"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-4 bg-secondary-100 text-neutral-900 border border-secondary-300 rounded-xl font-semibold text-lg gap-2 shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">
                <AnimatedCounter value={200} />+
              </div>
              <div className="text-neutral-600 text-sm">
                {rtl ? 'פרויקטים' : 'Projects'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">
                <AnimatedCounter value={150} />+
              </div>
              <div className="text-neutral-600 text-sm">
                {rtl ? 'לקוחות' : 'Clients'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neutral-900">
                <AnimatedCounter value={10} />+
              </div>
              <div className="text-neutral-600 text-sm">
                {rtl ? 'שנות ניסיון' : 'Years Experience'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lead form column */}
        <motion.div
          initial={{ opacity: 0, x: rtl ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-neutral-200 p-6 shadow-xl max-w-md mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                {translations.formTitle}
              </h3>
              <p className="text-neutral-700 text-sm">
                {translations.formSubtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    {translations.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-neutral-200/50 border border-neutral-400 rounded-lg text-neutral-900 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-secondary-600/50 focus:border-secondary-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    {translations.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-neutral-200/50 border border-neutral-400 rounded-lg text-neutral-900 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-secondary-600/50 focus:border-secondary-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {translations.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-neutral-200/50 border border-neutral-400 rounded-lg text-neutral-900 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-secondary-600/50 focus:border-secondary-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {translations.company}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-neutral-200/50 border border-neutral-400 rounded-lg text-neutral-900 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-secondary-600/50 focus:border-secondary-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {translations.service}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-neutral-200/50 border border-neutral-400 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary-600/50 focus:border-secondary-600"
                >
                  <option value="">{rtl ? 'בחר שירות' : 'Select Service'}</option>
                  <option value="automation">{translations.services.automation}</option>
                  <option value="web">{translations.services.web}</option>
                  <option value="content">{translations.services.content}</option>
                  <option value="design">{translations.services.design}</option>
                  <option value="other">{translations.services.other}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {translations.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-neutral-200/50 border border-neutral-400 rounded-lg text-neutral-900 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-secondary-600/50 focus:border-secondary-600 resize-none"
                  placeholder={rtl ? 'ספר לנו על הפרויקט שלך...' : 'Tell us about your project...'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-primary-500 disabled:bg-gray-500 text-neutral-900 font-bold rounded-lg shadow-lg shadow-primary-500/30 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? translations.sending :
                 status === 'sent' ? translations.sent :
                 translations.submit}
              </button>
            </form>
          </div>

          {/* Decorative elements */}
          <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-secondary-500/20 blur-2xl" />
          <div className="absolute -right-6 top-0 w-28 h-28 rounded-full bg-primary-500/20 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
