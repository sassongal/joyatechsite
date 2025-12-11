import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Search, Calendar, Clock, User, Filter, ArrowRight } from 'lucide-react';
import articlesData from '../../all-articles-final.json';

export default function Magazine({ language = 'he' }) {
  const rtl = language === 'he';
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Categories
  const categories = {
    all: rtl ? 'הכל' : 'All',
    tutorials: rtl ? 'מדריכים' : 'Tutorials',
    design: rtl ? 'עיצוב' : 'Design',
    automation: rtl ? 'אוטומציה' : 'Automation',
    ai: rtl ? 'בינה מלאכותית' : 'AI',
    business: rtl ? 'עסקים' : 'Business',
    marketing: rtl ? 'שיווק' : 'Marketing',
    technology: rtl ? 'טכנולוגיה' : 'Technology'
  };

  useEffect(() => {
    // Simulate loading
    const loadArticles = async () => {
      try {
        setArticles(articlesData);
        setFilteredArticles(articlesData);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        (rtl ? article.title_he : article.title_en).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rtl ? article.excerpt_he : article.excerpt_en).toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles, rtl]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(rtl ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Featured articles (first 3)
  const featuredArticles = filteredArticles.filter(article => article.featured).slice(0, 3);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <main dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-neutral-50" aria-labelledby="magazine-page-title">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatedElement animation="fadeIn" className="text-center mb-12">
          <h1 id="magazine-page-title" className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            {rtl ? 'מגזין Joya-Tech' : 'Joya-Tech Magazine'}
          </h1>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
            {rtl
              ? 'מאמרים, מדריכים ותובנות על עולם הבינה המלאכותית, אוטומציה וטכנולוגיה מתקדמת'
              : 'Articles, guides and insights on the world of artificial intelligence, automation and advanced technology'}
          </p>
        </AnimatedElement>

        {/* Filters */}
        <AnimatedElement animation="slideUp" className="mb-12">
          <div className="glass-card rounded-2xl p-6 border border-neutral-200">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute ${rtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5`} />
                  <input
                    type="text"
                    placeholder={rtl ? 'חפש מאמרים...' : 'Search articles...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full ${rtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl brand-input placeholder-neutral-500 focus:border-primary-400 focus:outline-none`}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <div className="relative">
                  <Filter className={`absolute ${rtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5`} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full ${rtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl brand-input focus:border-primary-400 focus:outline-none appearance-none`}
                  >
                    {Object.entries(categories).map(([key, label]) => (
                      <option key={key} value={key} className="bg-white">
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <AnimatedElement animation="fadeIn" className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
              {rtl ? 'מאמרים מומלצים' : 'Featured Articles'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <article
                  key={article.id}
                  className="glass-card rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-300 transition-all duration-300 group"
                >
                  <Link to={createPageUrl('MagazineArticle').replace('magazinearticle', `magazine/${article.id}`) + `?lang=${language}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={rtl ? article.title_he : article.title_en}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                          {categories[article.category] || article.category}
                        </span>
                        <span className="text-neutral-400 text-sm">•</span>
                        <div className="flex items-center gap-1 text-neutral-500 text-sm">
                          <Clock className="w-4 h-4" />
                          {article.readTime} {rtl ? 'דק׳' : 'min'}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {rtl ? article.title_he : article.title_en}
                      </h3>

                      <p className="text-neutral-700 mb-4 line-clamp-3">
                        {rtl ? article.excerpt_he : article.excerpt_en}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-neutral-500 text-sm">
                          <User className="w-4 h-4" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-2 text-primary-600 group-hover:gap-3 transition-all">
                          <span className="text-sm">{rtl ? 'קרא עוד' : 'Read More'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </AnimatedElement>
        )}

        {/* Regular Articles */}
        <AnimatedElement animation="fadeIn">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <article
                key={article.id}
                className="glass-card rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-300 transition-all duration-300 group"
              >
                <Link to={createPageUrl('MagazineArticle').replace('magazinearticle', `magazine/${article.id}`) + `?lang=${language}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={rtl ? article.title_he : article.title_en}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                        {categories[article.category] || article.category}
                      </span>
                      <span className="text-neutral-400 text-sm">•</span>
                      <div className="flex items-center gap-1 text-neutral-500 text-sm">
                        <Clock className="w-4 h-4" />
                        {article.readTime} {rtl ? 'דק׳' : 'min'}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {rtl ? article.title_he : article.title_en}
                    </h3>

                    <p className="text-neutral-700 mb-4 line-clamp-3">
                      {rtl ? article.excerpt_he : article.excerpt_en}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-neutral-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.date)}
                      </div>
                      <div className="flex items-center gap-2 text-primary-600 group-hover:gap-3 transition-all">
                        <span className="text-sm">{rtl ? 'קרא עוד' : 'Read More'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </AnimatedElement>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">
              {rtl ? 'לא נמצאו מאמרים התואמים לחיפוש שלך' : 'No articles found matching your search'}
            </p>
          </div>
        )}

        {/* Stats */}
        <AnimatedElement animation="fadeIn" className="mt-16">
          <div className="glass-card rounded-2xl p-8 border border-neutral-200 text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              {rtl ? 'סטטיסטיקות המגזין' : 'Magazine Statistics'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-500">{articles.length}</div>
                <div className="text-neutral-600">{rtl ? 'מאמרים' : 'Articles'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-600">
                  {Object.keys(categories).length - 1}
                </div>
                <div className="text-neutral-600">{rtl ? 'קטגוריות' : 'Categories'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-500">
                  {Math.round(articles.reduce((sum, article) => sum + article.readTime, 0) / articles.length)}
                </div>
                <div className="text-neutral-600">{rtl ? 'דק׳ ממוצע' : 'Avg Minutes'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">
                  {articles.filter(a => a.featured).length}
                </div>
                <div className="text-neutral-600">{rtl ? 'מומלצים' : 'Featured'}</div>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </main>
  );
}
