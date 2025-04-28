// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Magazine from './pages/Magazine';
import MagazineArticle from './pages/MagazineArticle';
import AITools from './pages/AITools';
import Layout from './Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogpost" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/magazinearticle" element={<MagazineArticle />} />
        <Route path="/aitools" element={<AITools />} />
      </Routes>
    </Layout>
  );
}
