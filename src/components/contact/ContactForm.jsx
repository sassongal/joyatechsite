import React, { useState } from 'react';
import  ContactMessage  from '@/entities/ContactMessage';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import AnimatedElement from '../ui/AnimatedElement';

export default function ContactForm({ language = 'he' }) {
  const rtl = language === 'he';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
    language
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const translations = {
    title: rtl ? 'צרו איתנו קשר' : 'Contact Us',
    subtitle: rtl 
      ? 'יש לכם שאלה או פרויקט בתכנון? מלאו את הטופס ונחזור אליכם בהקדם'
      : 'Have a question or planning a project? Fill out the form and we\'ll get back to you shortly',
    name: rtl ? 'שם מלא' : 'Full Name',
    email: rtl ? 'אימייל' : 'Email',
    phone: rtl ? 'טלפון' : 'Phone',
    service: rtl ? 'שירות מבוקש' : 'Service of Interest',
    message: rtl ? 'הודעה' : 'Message',
    send: rtl ? 'שליחה' : 'Send Message',
    sending: rtl ? 'שולח...' : 'Sending...',
    thanks: rtl ? 'תודה על פנייתך!' : 'Thank you for your message!',
    response: rtl 
      ? 'קיבלנו את הודעתך ונחזור אליך בהקדם האפשרי.'
      : 'We have received your message and will get back to you as soon as possible.',
    required: rtl ? 'שדה חובה' : 'Required field',
    invalidEmail: rtl ? 'כתובת אימייל לא תקינה' : 'Invalid email address',
    phoneOptional: rtl ? 'טלפון (לא חובה)' : 'Phone (optional)',
    serviceOptions: {
      '': rtl ? 'בחר/י שירות' : 'Select a service',
      'seo': rtl ? 'קידום אתרים SEO' : 'SEO Services',
      'content': rtl ? 'יצירת תוכן וקופירייטינג' : 'Content & Copywriting',
      'ai': rtl ? 'סדנאות AI לחברות' : 'AI Workshops',
      'crm': rtl ? 'שירותי CRM ואוטומציה' : 'CRM & Automation',
      'web': rtl ? 'בניית אתרים' : 'Website Development',
      'design': rtl ? 'עיצוב גרפי ולוגואים' : 'Graphic & Logo Design',
      'other': rtl ? 'אחר' : 'Other'
    },
    directContact: rtl ? 'או צרו קשר ישירות' : 'Or Contact Us Directly',
    email_contact: 'info@joyatech.com',
    phone_contact: '+972 50-123-4567'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name])  {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = translations.required;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = translations.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations.invalidEmail;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = translations.required;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await ContactMessage.create(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
        language
      });
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert(rtl ? 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר.' : 'An error occurred while submitting the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">{translations.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.subtitle}</p>
        </AnimatedElement>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Enhanced styling */}
            <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-teal-500"></div>
              <div className="p-8">
                {isSubmitted ? (
                  <AnimatedElement animation="scale" className="flex flex-col items-center justify-center text-center h-full py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-md">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">{translations.thanks}</h3>
                    <p className="text-gray-600 max-w-md">{translations.response}</p>
                  </AnimatedElement>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {translations.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {translations.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        {translations.phoneOptional}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service_interest" className="block text-sm font-medium text-gray-700 mb-1">
                        {translations.service}
                      </label>
                      <select
                        id="service_interest"
                        name="service_interest"
                        value={formData.service_interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white shadow-sm"
                      >
                        {Object.entries(translations.serviceOptions).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {translations.message} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={`w-full px-4 py-3 border ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm`}
                      ></textarea>
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center disabled:opacity-70 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {translations.sending}
                        </>
                      ) : (
                        <>
                          <Send className={`w-5 h-5 ${rtl ? 'ml-2' : 'mr-2'}`} />
                          {translations.send}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
            
            {/* Contact Info - Enhanced styling */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-6 font-heading">{translations.directContact}</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white/10 p-3 rounded-lg mr-4 rtl:ml-4 rtl:mr-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200 mb-1">{translations.email}</p>
                      <a href={`mailto:${translations.email_contact}`} className="text-lg font-medium hover:underline">
                        {translations.email_contact}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white/10 p-3 rounded-lg mr-4 rtl:ml-4 rtl:mr-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200 mb-1">{translations.phone}</p>
                      <a href={`tel:${translations.phone_contact}`} className="text-lg font-medium hover:underline">
                        {translations.phone_contact}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27053.57085735127!2d34.75855609335937!3d32.08297999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b9c395c56d5%3A0xe6f1a3c2b388de9!2sTel%20Aviv-Yafo%2C%20Israel!5e0!3m2!1sen!2sus!4v1644422835414!5m2!1sen!2sus"
                  className="w-full h-48 rounded-b-2xl border-t border-blue-500/30"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}