// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Geo = lazy(() => import('./pages/Geo'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Magazine = lazy(() => import('./pages/Magazine'));
const MagazineArticle = lazy(() => import('./pages/MagazineArticle'));
const Tools = lazy(() => import('./pages/Tools'));
const Courses = lazy(() => import('./pages/Courses'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

// Admin routes - separate bundle
const AdminRoutes = lazy(() => import('./admin/AdminRoutes'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary language="he">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Admin routes - separate layout */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          
          {/* Public routes with main layout */}
          <Route path="/*" element={
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/geo" element={<Geo />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/magazine" element={<Magazine />} />
                  <Route path="/magazine/:id" element={<MagazineArticle />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Suspense>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
