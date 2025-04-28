import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import  BlogPost  from '@/entities/BlogPost.json';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Calendar, Tag, User, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage({ language = 'he' }) {
  const rtl = language === 'he';
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  const translations = {
    loading: rtl ? 'טוען מאמר...' : 'Loading post...',
    error: rtl ? 'שגיאה בטעינת המאמר. נסו שוב מאוחר יותר.' : 'Error loading the post. Please try again later.',
    postNotFound: rtl ? 'המאמר לא נמצא. נסו שוב או חזרו לבלוג.' : 'Post not found. Please try again or return to the blog.',
    backToBlog: rtl ? 'חזרה לבלוג' : 'Back to Blog',
    postedBy: rtl ? 'פורסם ע"י' : 'Posted by',
    relatedPosts: rtl ? 'מאמרים קשורים' : 'Related Posts',
    readMore: rtl ? 'קרא עוד' : 'Read More',
    categories: {
      'seo': rtl ? 'קידום אתרים' : 'SEO',
      'content': rtl ? 'תוכן וקופירייטינג' : 'Content & Copywriting',
      'ai': rtl ? 'בינה מלאכותית' : 'Artificial Intelligence',
      'crm': rtl ? 'ניהול לקוחות' : 'CRM',
      'web_development': rtl ? 'פיתוח אתרים' : 'Web Development',
      'design': rtl ? 'עיצוב גרפי' : 'Graphic Design'
    }
  };

  // Format date according to language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (rtl) {
      return format(date, 'dd/MM/yyyy');
    } else {
      return format(date, 'MMM dd, yyyy');
    }
  };

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      try {
        setLoading(true);
        
        // Get post ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');
        
        if (!postId) {
          setError(translations.postNotFound);
          setLoading(false);
          return;
        }
        
        // Fetch the post
        const fetchedPost = await BlogPost.get(postId);
        
        if (!fetchedPost) {
          setError(translations.postNotFound);
          setLoading(false);
          return;
        }
        
        setPost(fetchedPost);
        
        // Fetch related posts (same category)
        if (fetchedPost.category) {
          const related = await BlogPost.filter({ 
            category: fetchedPost.category,
            published: true
          }, '-publish_date', 3);
          
          // Filter out the current post
          setRelatedPosts(related.filter(p => p.id !== fetchedPost.id));
        }
        
        // Set page title and meta description
        document.title = rtl 
          ? fetchedPost.title_he + ' | Joya-Tech'
          : fetchedPost.title_en + ' | Joya-Tech';
          
        // Set meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        
        metaDescription.content = rtl
          ? fetchedPost.meta_description_he || fetchedPost.summary_he
          : fetchedPost.meta_description_en || fetchedPost.summary_en;
          
        // Add Open Graph meta tags
        const setMetaTag = (property, content) => {
          let meta = document.querySelector(`meta[property="${property}"]`);
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
          }
          meta.content = content;
        };
        
        setMetaTag('og:title', document.title);
        setMetaTag('og:description', metaDescription.content);
        setMetaTag('og:type', 'article');
        setMetaTag('og:url', window.location.href);
        if (fetchedPost.image_url) {
          setMetaTag('og:image', fetchedPost.image_url);
        }
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        setError(translations.error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndRelated();
  }, [language]);

  if (loading) {
    return (
      <div className="pt-28 pb-16 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">{translations.loading}</span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-28 pb-16 flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Link 
          to={createPageUrl('Blog') + `?lang=${language}`}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <ArrowLeft className={`w-5 h-5 ${rtl ? 'ml-2' : 'mr-2'}`} />
          {translations.backToBlog}
        </Link>
      </div>
    );
  }

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <AnimatedElement animation="fadeIn" className="mb-8">
            <Link 
              to={createPageUrl('Blog') + `?lang=${language}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ChevronLeft className={`w-5 h-5 ${rtl ? 'ml-1 transform rotate-180' : 'mr-1'}`} />
              {translations.backToBlog}
            </Link>
          </AnimatedElement>
          
          {/* Post Header */}
          <AnimatedElement animation="fadeIn" className="mb-8">
            {post.image_url && (
              <img
                src={post.image_url}
                alt={rtl ? post.title_he : post.title_en}
                className="w-full h-96 object-cover rounded-xl shadow-xl mb-8"
              />
            )}
            
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              {post.category && (
                <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                  <Tag className="w-4 h-4 mr-1.5" />
                  {translations.categories[post.category] || post.category.replace('_', ' ')}
                </span>
              )}
              {post.publish_date && (
                <span className="inline-flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {formatDate(post.publish_date)}
                </span>
              )}
              {post.created_by && (
                <span className="inline-flex items-center text-gray-500">
                  <User className="w-4 h-4 mr-1.5" />
                  {translations.postedBy} {post.created_by.split('@')[0]}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {rtl ? post.title_he : post.title_en}
            </h1>
            
            {(rtl ? post.summary_he : post.summary_en) && (
              <p className="text-xl text-gray-600 mb-8 font-medium">
                {rtl ? post.summary_he : post.summary_en}
              </p>
            )}
          </AnimatedElement>
          
          {/* Post Content */}
          <AnimatedElement animation="fadeIn" className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>
                {rtl ? post.content_he : post.content_en}
              </ReactMarkdown>
            </div>
          </AnimatedElement>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <AnimatedElement animation="fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{translations.relatedPosts}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <AnimatedElement 
                    key={relatedPost.id} 
                    animation="slideUp" 
                    delay={0.1 * index}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                      {relatedPost.image_url && (
                        <img
                          src={relatedPost.image_url}
                          alt={rtl ? relatedPost.title_he : relatedPost.title_en}
                          className="w-full h-40 object-cover"
                        />
                      )}
                      <div className="p-5 flex-grow">
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          {rtl ? relatedPost.title_he : relatedPost.title_en}
                        </h3>
                        {relatedPost.publish_date && (
                          <p className="text-sm text-gray-500 mb-3">
                            {formatDate(relatedPost.publish_date)}
                          </p>
                        )}
                        <Link
                          to={createPageUrl('BlogPost') + `?id=${relatedPost.id}&lang=${language}`}
                          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-2"
                        >
                          {translations.readMore}
                          <ChevronRight className={`w-4 h-4 ${rtl ? 'mr-1 transform rotate-180' : 'ml-1'}`} />
                        </Link>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>
  );
}