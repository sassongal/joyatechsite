import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import  BlogPost  from '@/entities/BlogPost';
import AnimatedElement from '../ui/AnimatedElement';

export default function BlogPreview({ language = 'he' }) {
  const rtl = language === 'he';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const translations = {
    title: rtl ? 'הבלוג שלנו' : 'Our Blog',
    subtitle: rtl 
      ? 'תוכן מקצועי, טיפים וחדשות מעולם הדיגיטל'
      : 'Professional content, tips and news from the digital world',
    viewAll: rtl ? 'לכל המאמרים' : 'View All Posts',
    readMore: rtl ? 'קרא עוד' : 'Read More',
    loading: rtl ? 'טוען מאמרים...' : 'Loading posts...',
    noPosts: rtl ? 'אין מאמרים עדיין. בקרוב יתווספו מאמרים חדשים.' : 'No posts yet. New posts will be added soon.'
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await BlogPost.filter({ published: true }, '-publish_date', 3);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
    <section dir={rtl ? 'rtl' : 'ltr'} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{translations.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{translations.subtitle}</p>
        </AnimatedElement>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">{translations.loading}</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{translations.noPosts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <AnimatedElement 
                key={post.id} 
                animation="slideUp" 
                delay={0.1 * index}
              >
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={rtl ? post.title_he : post.title_en}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-blue-600 font-medium">
                        {post.category && post.category.replace('_', ' ')}
                      </span>
                      {post.publish_date && (
                        <span className="text-sm text-gray-500">
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
                    <Link
                      to={createPageUrl('BlogPost') + `?id=${post.id}&lang=${language}`}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      {translations.readMore}
                      <svg className={`w-4 h-4 ${rtl ? 'mr-1' : 'ml-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
        
        <div className="mt-12 text-center">
          <Link 
            to={createPageUrl('Blog') + `?lang=${language}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {translations.viewAll}
            <svg className={`w-5 h-5 ${rtl ? 'mr-2' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M19 12H5" : "M5 12h14"}></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rtl ? "M12 5l-7 7 7 7" : "M12 5l7 7-7 7"}></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}