import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import  BlogPost  from '@/entities/BlogPost.json';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Search, X, Calendar, Tag, User } from 'lucide-react';

export default function Blog({ language = 'he' }) {
  const rtl = language === 'he';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const translations = {
    title: rtl ? 'הבלוג שלנו' : 'Our Blog',
    subtitle: rtl 
      ? 'טיפים, תובנות וחדשות מעולם הדיגיטל'
      : 'Tips, insights and news from the digital world',
    search: rtl ? 'חיפוש...' : 'Search...',
    clearSearch: rtl ? 'נקה חיפוש' : 'Clear search',
    allCategories: rtl ? 'כל הקטגוריות' : 'All Categories',
    categories: {
      'seo': rtl ? 'קידום אתרים' : 'SEO',
      'content': rtl ? 'תוכן וקופירייטינג' : 'Content & Copywriting',
      'ai': rtl ? 'בינה מלאכותית' : 'Artificial Intelligence',
      'crm': rtl ? 'ניהול לקוחות' : 'CRM',
      'web_development': rtl ? 'פיתוח אתרים' : 'Web Development',
      'design': rtl ? 'עיצוב גרפי' : 'Graphic Design'
    },
    loading: rtl ? 'טוען מאמרים...' : 'Loading posts...',
    noResults: rtl ? 'לא נמצאו תוצאות. נסו חיפוש אחר.' : 'No results found. Try a different search.',
    readMore: rtl ? 'קרא עוד' : 'Read More',
    postedBy: rtl ? 'פורסם ע"י' : 'Posted by',
    noPosts: rtl ? 'אין מאמרים עדיין. בקרוב יתווספו מאמרים חדשים.' : 'No posts yet. New posts will be added soon.'
  };

  // Set page title and meta description based on language
  React.useEffect(() => {
    document.title = language === 'he' 
      ? 'הבלוג | Joya-Tech'
      : 'Blog | Joya-Tech';
      
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = language === 'he'
      ? 'בלוג Joya-Tech - טיפים, תובנות ומאמרים מקצועיים בנושאי שיווק דיגיטלי, SEO, בניית אתרים ובינה מלאכותית.'
      : 'Joya-Tech Blog - Tips, insights and professional articles on digital marketing, SEO, website development and artificial intelligence.';
  }, [language]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await BlogPost.filter({ published: true }, '-publish_date');
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and selected category
  const filteredPosts = posts.filter(post => {
    const matchesSearchTerm = searchTerm === '' || 
      (rtl 
        ? post.title_he?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          post.content_he?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.summary_he?.toLowerCase().includes(searchTerm.toLowerCase())
        : post.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          post.content_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.summary_en?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearchTerm && matchesCategory;
  });

  // Format date according to language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (rtl) {
      return format(date, 'dd/MM/yyyy');
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{translations.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.subtitle}</p>
        </AnimatedElement>
        
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter */}
          <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={translations.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <Search className="absolute top-3.5 left-3 text-gray-400 w-5 h-5" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute top-3.5 right-3 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                >
                  <option value="">{translations.allCategories}</option>
                  {Object.entries(translations.categories).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Blog Posts */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">{translations.loading}</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{translations.noPosts}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{translations.noResults}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <AnimatedElement 
                  key={post.id} 
                  animation="slideUp" 
                  delay={0.1 * (index % 5)}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={rtl ? post.title_he : post.title_en}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6 flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                        {post.category && (
                          <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                            <Tag className="w-3.5 h-3.5 mr-1" />
                            {translations.categories[post.category] || post.category.replace('_', ' ')}
                          </span>
                        )}
                        {post.publish_date && (
                          <span className="inline-flex items-center text-gray-500">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {formatDate(post.publish_date)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {rtl ? post.title_he : post.title_en}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {rtl ? post.summary_he : post.summary_en}
                      </p>
                    </div>
                    <div className="border-t border-gray-100 p-6 flex items-center justify-between">
                      <span className="inline-flex items-center text-gray-500 text-sm">
                        <User className="w-3.5 h-3.5 mr-1" />
                        {translations.postedBy} {post.created_by ? post.created_by.split('@')[0] : 'Joya-Tech'}
                      </span>
                      <Link
                        to={createPageUrl('BlogPost') + `?id=${post.id}&lang=${language}`}
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                      >
                        {translations.readMore}
                        <svg className={`w-4 h-4 ${rtl ? '1' : 'ml-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M19 12H5" : "M5 12h14"}></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M12 5l-7 7 7 7" : "M12 5l7 7-7 7"}></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}