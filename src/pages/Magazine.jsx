import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import  MagazineArticle  from '@/entities/MagazineArticle.json';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Search, X, Calendar, Tag, User, ChevronRight } from 'lucide-react';

export default function Magazine({ language = 'he' }) {
  const rtl = language === 'he';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [featuredArticle, setFeaturedArticle] = useState(null);
  
  const translations = {
    title: rtl ? 'מגזין Joya-Tech' : 'Joya-Tech Magazine',
    subtitle: rtl 
      ? 'חדשנות, מחשבות וטכנולוגיות מקצה החנית של עולם הדיגיטל'
      : 'Innovation, thoughts and cutting-edge technologies from the digital world',
    search: rtl ? 'חיפוש מאמרים...' : 'Search articles...',
    clearSearch: rtl ? 'נקה חיפוש' : 'Clear search',
    allCategories: rtl ? 'כל הקטגוריות' : 'All Categories',
    featured: rtl ? 'מאמר מומלץ' : 'Featured Article',
    latest: rtl ? 'מאמרים אחרונים' : 'Latest Articles',
    trending: rtl ? 'פופולריים' : 'Trending',
    categories: {
      'tech_trends': rtl ? 'טרנדים טכנולוגיים' : 'Tech Trends',
      'digital_marketing': rtl ? 'שיווק דיגיטלי' : 'Digital Marketing',
      'ai_innovation': rtl ? 'חדשנות בבינה מלאכותית' : 'AI Innovation',
      'web_development': rtl ? 'פיתוח אתרים' : 'Web Development',
      'business_growth': rtl ? 'צמיחה עסקית' : 'Business Growth',
      'cybersecurity': rtl ? 'אבטחת סייבר' : 'Cybersecurity'
    },
    loading: rtl ? 'טוען מאמרים...' : 'Loading articles...',
    noResults: rtl ? 'לא נמצאו תוצאות. נסו חיפוש אחר.' : 'No results found. Try a different search.',
    readMore: rtl ? 'קרא עוד' : 'Read More',
    readingTime: rtl ? 'זמן קריאה:' : 'Reading time:',
    minutes: rtl ? 'דקות' : 'minutes',
    postedBy: rtl ? 'מאת' : 'By',
    noPosts: rtl ? 'אין מאמרים עדיין. בקרוב יתווספו מאמרים חדשים.' : 'No articles yet. New articles will be added soon.'
  };

  // Set page title and meta description based on language
  React.useEffect(() => {
    document.title = language === 'he' 
      ? 'מגזין Joya-Tech | תוכן מקצועי בנושאי טכנולוגיה ודיגיטל'
      : 'Joya-Tech Magazine | Professional content on technology and digital';
      
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = language === 'he'
      ? 'מגזין Joya-Tech - תוכן מקצועי ומעמיק בנושאי טכנולוגיה, חדשנות דיגיטלית, שיווק, פיתוח אתרים ובינה מלאכותית.'
      : 'Joya-Tech Magazine - Professional and in-depth content on technology, digital innovation, marketing, web development and artificial intelligence.';
  }, [language]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await MagazineArticle.filter({ published: true }, '-publish_date');
        
        // Find featured article
        const featured = fetchedArticles.find(article => article.featured);
        if (featured) {
          setFeaturedArticle(featured);
          // Remove featured from the regular list
          const regularArticles = fetchedArticles.filter(article => article.id !== featured.id);
          setArticles(regularArticles);
        } else {
          // If no featured article, just use all articles
          setFeaturedArticle(fetchedArticles[0] || null);
          setArticles(fetchedArticles.slice(1));
        }
      } catch (error) {
        console.error('Failed to fetch magazine articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on search term and selected category
  const filteredArticles = articles.filter(article => {
    const matchesSearchTerm = searchTerm === '' || 
      (rtl 
        ? article.title_he?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          article.content_he?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary_he?.toLowerCase().includes(searchTerm.toLowerCase())
        : article.title_en?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          article.content_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary_en?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
    
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
    <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-blue-50/40 to-teal-50/30">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 font-heading">
            {translations.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {translations.subtitle}
          </p>
        </AnimatedElement>
        
        <div className="max-w-7xl mx-auto">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all appearance-none bg-white"
                >
                  <option value="">{translations.allCategories}</option>
                  {Object.entries(translations.categories).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-gray-600">{translations.loading}</span>
            </div>
          ) : articles.length === 0 && !featuredArticle ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{translations.noPosts}</p>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredArticle && !searchTerm && !selectedCategory && (
                <AnimatedElement animation="fadeIn" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <span className="inline-block w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mr-4 rounded-full"></span>
                    {translations.featured}
                  </h2>
                  
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      <div className="md:order-2">
                        <img 
                          src={featuredArticle.cover_image_url || featuredArticle.image_url || "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
                          alt={rtl ? featuredArticle.title_he : featuredArticle.title_en}
                          className="h-full w-full object-cover"
                          style={{ minHeight: "300px" }}
                        />
                      </div>
                      <div className="p-8 md:order-1 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          <span className="inline-flex items-center bg-teal-100 text-teal-800 px-3 py-1.5 rounded-full text-sm font-medium">
                            <Tag className="w-4 h-4 mr-1" />
                            {translations.categories[featuredArticle.category] || featuredArticle.category.replace('_', ' ')}
                          </span>
                          {featuredArticle.publish_date && (
                            <span className="ml-3 inline-flex items-center text-gray-500 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(featuredArticle.publish_date)}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 font-heading">
                          {rtl ? featuredArticle.title_he : featuredArticle.title_en}
                        </h3>
                        
                        <p className="text-gray-600 mb-6">
                          {rtl ? featuredArticle.summary_he : featuredArticle.summary_en}
                        </p>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center">
                            {featuredArticle.author_image && (
                              <img 
                                src={featuredArticle.author_image} 
                                alt={featuredArticle.author}
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{translations.postedBy} {featuredArticle.author}</p>
                              {featuredArticle.reading_time && (
                                <p className="text-sm text-gray-500">{translations.readingTime} {featuredArticle.reading_time} {translations.minutes}</p>
                              )}
                            </div>
                          </div>
                          
                          <Link
                            to={createPageUrl('MagazineArticle') + `?id=${featuredArticle.id}&lang=${language}`}
                            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
                          >
                            {translations.readMore}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              )}
              
              {/* Latest Articles */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="inline-block w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mr-4 rounded-full"></span>
                  {searchTerm || selectedCategory ? 
                    (`${translations.noResults}: ${filteredArticles.length} ${rtl ? 'תוצאות' : 'results'}`) : 
                    translations.latest
                  }
                </h2>
                
                {filteredArticles.length === 0 && (searchTerm || selectedCategory) ? (
                  <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                    <p className="text-gray-500">{translations.noResults}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, index) => (
                      <AnimatedElement 
                        key={article.id} 
                        animation="slideUp" 
                        delay={0.1 * (index % 5)}
                      >
                        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full flex flex-col transform hover:-translate-y-1 hover:border-teal-500 border border-transparent duration-300">
                          <div className="relative">
                            <img
                              src={article.image_url || "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3"}
                              alt={rtl ? article.title_he : article.title_en}
                              className="w-full h-48 object-cover"
                            />
                            {article.category && (
                              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-md">
                                {translations.categories[article.category] || article.category.replace('_', ' ')}
                              </span>
                            )}
                          </div>
                          <div className="p-6 flex-grow">
                            <h3 className="text-xl font-bold mb-3 text-gray-900 font-heading line-clamp-2">
                              {rtl ? article.title_he : article.title_en}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {rtl ? article.summary_he : article.summary_en}
                            </p>
                          </div>
                          <div className="border-t border-gray-100 p-6 flex items-center justify-between">
                            <div className="flex items-center">
                              {article.reading_time && (
                                <span className="text-sm text-gray-500">
                                  {article.reading_time} {translations.minutes}
                                </span>
                              )}
                            </div>
                            <Link
                              to={createPageUrl('MagazineArticle') + `?id=${article.id}&lang=${language}`}
                              className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center"
                            >
                              {translations.readMore}
                              <ChevronRight className={`w-4 h-4 ${rtl ? 'mr-1 transform rotate-180' : 'ml-1'}`} />
                            </Link>
                          </div>
                        </div>
                      </AnimatedElement>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}