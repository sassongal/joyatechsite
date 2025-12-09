// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Magazine = lazy(() => import('./pages/Magazine'));
const MagazineArticle = lazy(() => import('./pages/MagazineArticle'));
const Tools = lazy(() => import('./pages/Tools'));
const Courses = lazy(() => import('./pages/Courses'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default function App() {
  return (
    <Layout>
      <ErrorBoundary language="he">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/magazine/:id" element={<MagazineArticle />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
