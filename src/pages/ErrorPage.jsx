import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const message = error?.statusText || error?.message || 'משהו השתבש';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">אופס!</h1>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <Link
          to="/"
          className="inline-block bg-primary-600 text-white px-5 py-3 rounded-md shadow hover:bg-primary-700 transition-colors"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
