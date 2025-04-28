import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import  MagazineArticle  from '@/entities/MagazineArticle.json';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Calendar, Tag, User, ArrowLeft, ChevronLeft, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function MagazineArticlePage({ language = 'he' }) {
  const rtl = language === 'he';
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  
  const translations = {
    loading: rtl ? 'טוען מאמר...' : 'Loading article...',
    error: rtl ? 'שגיאה בטעינת המאמר. נסו שוב מאוחר יותר.' : 'Error loading the article. Please try again later.',
    articleNotFound: rtl ? 'המאמר לא נמצא. נסו שוב או חזרו למגזין.' : 'Article not found. Please try again or return to the magazine.',
    backToMagazine: rtl ? 'חזרה למגזין' : 'Back to Magazine',
    postedBy: rtl ? 'מאת' : 'By',
    shareArticle: rtl ? 'שתף מאמר' : 'Share Article',
    relatedArticles: rtl ? 'מאמרים קשורים' : 'Related Articles',
    readMore: rtl ? 'קרא עוד' : 'Read More',
    readingTime: rtl ? 'זמן קריאה:' : 'Reading time:',
    minutes: rtl ? 'דקות' : 'minutes',
    categories: {
      'tech_trends': rtl ? 'טרנדים טכנולוגיים' : 'Tech Trends',
      'digital_marketing': rtl ? 'שיווק דיגיטלי' : 'Digital Marketing',
      'ai_innovation': rtl ? 'חדשנות בבינה מלאכותית' : 'AI Innovation',
      'web_development': rtl ? 'פיתוח אתרים' : 'Web Development',
      'business_growth': rtl ? 'צמיחה עסקית' : 'Business Growth',
      'cybersecurity': rtl ? 'אבטחת סייבר' : 'Cybersecurity'
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
  
  // Share the current article
  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: rtl ? article.title_he : article.title_en,
        text: rtl ? article.summary_he : article.summary_en,
        url: window.location.href
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert(rtl ? 'הקישור הועתק ללוח!' : 'Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      try {
        setLoading(true);
        
        // Get article ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (!articleId) {
          setError(translations.articleNotFound);
          setLoading(false);
          return;
        }
        
        // Fetch the article
        const fetchedArticle = await MagazineArticle.get(articleId);
        
        if (!fetchedArticle) {
          setError(translations.articleNotFound);
          setLoading(false);
          return;
        }
        
        setArticle(fetchedArticle);
        
        // Fetch related articles (same category)
        if (fetchedArticle.category) {
          const related = await MagazineArticle.filter({ 
            category: fetchedArticle.category,
            published: true
          }, '-publish_date', 3);
          
          // Filter out the current article
          setRelatedArticles(related.filter(a => a.id !== fetchedArticle.id));
        }
        
        // Set page title and meta description
        document.title = rtl 
          ? fetchedArticle.title_he + ' | מגזין Joya-Tech'
          : fetchedArticle.title_en + ' | Joya-Tech Magazine';
          
        // Set meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.name = 'description';
          document.head.appendChild(metaDescription);
        }
        
        metaDescription.content = rtl
          ? fetchedArticle.meta_description_he || fetchedArticle.summary_he
          : fetchedArticle.meta_description_en || fetchedArticle.summary_en;
          
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
        if (fetchedArticle.cover_image_url || fetchedArticle.image_url) {
          setMetaTag('og:image', fetchedArticle.cover_image_url || fetchedArticle.image_url);
        }
      } catch (error) {
        console.error('Failed to fetch magazine article:', error);
        setError(translations.error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndRelated();
  }, [language]);

  if (loading) {
    return (
      <div className="pt-28 pb-16 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        <span className="ml-3 text-gray-600">{translations.loading}</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-28 pb-16 flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Link 
          to={createPageUrl('Magazine') + `?lang=${language}`}
          className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
        >
          <ArrowLeft className={`w-5 h-5 ${rtl ? 'ml-2' : 'mr-2'}`} />
          {translations.backToMagazine}
        </Link>
      </div>
    );
  }

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-blue-50/20 to-gray-50/30">
      <div className="container mx-auto px-4">
        {/* Back Navigation */}
        <AnimatedElement animation="fadeIn" className="max-w-4xl mx-auto mb-8">
          <Link 
            to={createPageUrl('Magazine') + `?lang=${language}`}
            className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
          >
            <ChevronLeft className={`w-5 h-5 ${rtl ? 'ml-1 transform rotate-180' : 'mr-1'}`} />
            {translations.backToMagazine}
          </Link>
        </AnimatedElement>
        
        {/* Article Header */}
        <AnimatedElement animation="fadeIn" className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            {article.category && (
              <span className="inline-flex items-center bg-teal-100 text-teal-800 px-3 py-1.5 rounded-full">
                <Tag className="w-4 h-4 mr-1.5" />
                {translations.categories[article.category] || article.category.replace('_', ' ')}
              </span>
            )}
            {article.publish_date && (
              <span className="inline-flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1.5" />
                {formatDate(article.publish_date)}
              </span>
            )}
            {article.reading_time && (
              <span className="inline-flex items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.reading_time} {translations.minutes}
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
            {rtl ? article.title_he : article.title_en}
          </h1>
          
          <div className="flex items-center justify-between pb-8 border-b border-gray-200">
            <div className="flex items-center">
              {article.author_image ? (
                <img 
                  src={article.author_image} 
                  alt={article.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-teal-600" />
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">{translations.postedBy}</span>
                <h3 className="font-medium text-gray-900">{article.author}</h3>
              </div>
            </div>
            
            <button
              onClick={shareArticle}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {translations.shareArticle}
            </button>
          </div>
        </AnimatedElement>
        
        {/* Article Cover Image */}
        {article.cover_image_url && (
          <AnimatedElement animation="fadeIn" className="max-w-5xl mx-auto mb-10">
            <img
              src={article.cover_image_url}
              alt={rtl ? article.title_he : article.title_en}
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </AnimatedElement>
        )}
        
        {/* Article Content */}
        <AnimatedElement animation="fadeIn" className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 prose prose-lg max-w-none">
            <ReactMarkdown>
              {rtl ? article.content_he : article.content_en}
            </ReactMarkdown>
          </div>
        </AnimatedElement>
        
        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <AnimatedElement animation="fadeIn" className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 font-heading">{translations.relatedArticles}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <AnimatedElement 
                  key={relatedArticle.id} 
                  animation="slideUp" 
                  delay={0.1 * index}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                    {relatedArticle.image_url && (
                      <img
                        src={relatedArticle.image_url}
                        alt={rtl ? relatedArticle.title_he : relatedArticle.title_en}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-5 flex-grow">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 font-heading line-clamp-2">
                        {rtl ? relatedArticle.title_he : relatedArticle.title_en}
                      </h3>
                      {relatedArticle.publish_date && (
                        <p className="text-sm text-gray-500 mb-3">
                          {formatDate(relatedArticle.publish_date)}
                        </p>
                      )}
                      <Link
                        to={createPageUrl('MagazineArticle') + `?id=${relatedArticle.id}&lang=${language}`}
                        className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center mt-2"
                      >
                        {translations.readMore}
                        <ChevronLeft className={`w-4 h-4 ${rtl ? 'mr-1' : 'ml-1'} ${rtl ? '' : 'transform rotate-180'}`} />
                      </Link>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
}