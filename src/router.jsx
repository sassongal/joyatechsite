// src/router.jsx

import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/Layout';
import AdminLayout from '@/layout/AdminLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/ServicesHighlight';
import Blog from '@/pages/BlogPreview';
import Contact from '@/pages/ContactCTA';
import BlogPosts from '@/pages/admin/BlogPosts';
import CreateBlogPost from '@/pages/admin/CreateBlogPost';
import EditBlogPost from '@/pages/admin/EditBlogPost';
//import ServicePosts from '@/pages/admin/ServicePosts';
//import CreateServicePost from '@/pages/admin/CreateServicePost';
//import EditServicePost from '@/pages/admin/EditServicePost';
//import MagazineArticles from '@/pages/admin/MagazineArticles';
//import CreateMagazineArticle from '@/pages/admin/CreateMagazineArticle';
//import EditMagazineArticle from '@/pages/admin/EditMagazineArticle';
//import ContactMessages from '@/pages/admin/ContactMessages';
import ErrorPage from '@/pages/ErrorPage';
import LoadingSpinner from '@/pages/LoadingSpinner';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // אתר ציבורי
    errorElement: <ErrorPage />, // עמוד שגיאה מותאם
    children: [
      {
        index: true,
        element: <Home />, // נטען גם Spinner זמני בהמשך אם צריך
      },
      {
        path: 'about',
        element: <About />, 
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />, // מערכת ניהול
    errorElement: <ErrorPage />, // עמוד שגיאה מותאם גם לאדמין
    children: [
      {
        index: true,
        element: <Navigate to="/admin/blogs" replace />, // ברירת מחדל
      },
      {
        path: 'blogs',
        element: <BlogPosts />,
      },
      {
        path: 'blogs/create',
        element: <CreateBlogPost />,
      },
      {
        path: 'blogs/edit/:id',
        element: <EditBlogPost />,
      },
      {
        path: 'services',
        element: <ServicePosts />,
      },
      {
        path: 'services/create',
        element: <CreateServicePost />,
      },
      {
        path: 'services/edit/:id',
        element: <EditServicePost />,
      },
      {
        path: 'magazine',
        element: <MagazineArticles />,
      },
      {
        path: 'magazine/create',
        element: <CreateMagazineArticle />,
      },
      {
        path: 'magazine/edit/:id',
        element: <EditMagazineArticle />,
      },
      {
        path: 'contacts',
        element: <ContactMessages />,
      },
    ],
  },
]);

export default router;
