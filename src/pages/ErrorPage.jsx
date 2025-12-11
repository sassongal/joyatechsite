import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export default function ErrorPage({ language = 'he' }) {
  const location = useLocation();
  const rtl = language === 'he';

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-lg w-full text-center bg-white shadow-lg rounded-2xl p-8 border border-neutral-200">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">
          {rtl ? 'הדף לא נמצא' : 'Page Not Found'}
        </h2>
        <p className="text-neutral-600 mb-6">
          {rtl 
            ? 'מצטערים, הדף שחיפשת לא קיים או הועבר למקום אחר.'
            : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>
        <Link
          to={`/?lang=${language}`}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-colors"
        >
          <Home className="w-5 h-5" />
          {rtl ? 'חזרה לדף הבית' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
