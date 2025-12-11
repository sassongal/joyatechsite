// src/admin/AdminRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './AdminLayout';
import { Loader2 } from 'lucide-react';

// Lazy load admin pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ArticlesManager = lazy(() => import('./pages/ArticlesManager'));
const ArticleEditor = lazy(() => import('./pages/ArticleEditor'));
const ToolsManager = lazy(() => import('./pages/ToolsManager'));
const TestimonialsManager = lazy(() => import('./pages/TestimonialsManager'));
const PortfolioManager = lazy(() => import('./pages/PortfolioManager'));
const CarouselDesigner = lazy(() => import('./pages/CarouselDesigner'));
const MediaLibrary = lazy(() => import('./pages/MediaLibrary'));
const Settings = lazy(() => import('./pages/Settings'));
const ActivityLog = lazy(() => import('./pages/ActivityLog'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
  </div>
);

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public login route */}
          <Route path="login" element={<Login />} />
          
          {/* Protected admin routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="articles" element={<ArticlesManager />} />
                      <Route path="articles/new" element={<ArticleEditor />} />
                      <Route path="articles/:id" element={<ArticleEditor />} />
                      <Route path="tools" element={<ToolsManager />} />
                      <Route path="testimonials" element={<TestimonialsManager />} />
                      <Route path="portfolio" element={<PortfolioManager />} />
                      <Route path="carousels" element={<CarouselDesigner />} />
                      <Route path="media" element={<MediaLibrary />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="activity" element={<ActivityLog />} />
                      <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Routes>
                  </Suspense>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
