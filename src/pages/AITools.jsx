import React, { useState, useEffect } from 'react';
import  AITool  from '@/constants/AITool.json';
import AnimatedElement from '../components/ui/AnimatedElement';
import { Search, X, ExternalLink, Palette, Type, Gauge, Mic, Video, BarChart, Image, Code } from 'lucide-react';

export default function AITools({ language = 'he' }) {
  const rtl = language === 'he';
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const translations = {
    title: rtl ? 'כלי AI חינמיים' : 'Free AI Tools',
    subtitle: rtl 
      ? 'אוסף כלי AI חינמיים שיעזרו לכם להגביר את היעילות והיצירתיות'
      : 'A collection of free AI tools to boost your efficiency and creativity',
    search: rtl ? 'חיפוש כלים...' : 'Search tools...',
    clearSearch: rtl ? 'נקה חיפוש' : 'Clear search',
    allCategories: rtl ? 'כל הקטגוריות' : 'All Categories',
    visitTool: rtl ? 'בקר בכלי' : 'Visit Tool',
    loading: rtl ? 'טוען כלים...' : 'Loading tools...',
    noResults: rtl ? 'לא נמצאו תוצאות. נסו חיפוש אחר.' : 'No results found. Try a different search.',
    noTools: rtl ? 'אין כלים עדיין. בקרוב יתווספו כלים חדשים.' : 'No tools yet. New tools will be added soon.',
    categories: {
      'design': rtl ? 'עיצוב גרפי' : 'Graphic Design',
      'content': rtl ? 'תוכן וכתיבה' : 'Content & Writing',
      'automation': rtl ? 'אוטומציה' : 'Automation',
      'voice': rtl ? 'קול ודיבור' : 'Voice & Speech',
      'video': rtl ? 'וידאו' : 'Video',
      'data': rtl ? 'נתונים וניתוח' : 'Data & Analysis',
      'image': rtl ? 'עיבוד תמונה' : 'Image Processing',
      'coding': rtl ? 'פיתוח וקידוד' : 'Development & Coding'
    }
  };

  const categoryIcons = {
    'design': <Palette className="w-5 h-5" />,
    'content': <Type className="w-5 h-5" />,
    'automation': <Gauge className="w-5 h-5" />,
    'voice': <Mic className="w-5 h-5" />,
    'video': <Video className="w-5 h-5" />,
    'data': <BarChart className="w-5 h-5" />,
    'image': <Image className="w-5 h-5" />,
    'coding': <Code className="w-5 h-5" />
  };

  // Set page title and meta description based on language
  React.useEffect(() => {
    document.title = language === 'he' 
      ? 'כלי AI חינמיים | Joya-Tech'
      : 'Free AI Tools | Joya-Tech';
      
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = language === 'he'
      ? 'אוסף כלי AI חינמיים מומלצים לשיפור היעילות והיצירתיות - עיצוב, כתיבה, אוטומציה, קול, וידאו ונתונים.'
      : 'Collection of recommended free AI tools to improve efficiency and creativity - design, writing, automation, voice, video and data.';
  }, [language]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const fetchedTools = await AITool.list('order');
        setTools(fetchedTools);
      } catch (error) {
        console.error('Failed to fetch AI tools:', error);
        setTools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  // Filter tools based on search term and selected category
  const filteredTools = tools.filter(tool => {
    const matchesSearchTerm = searchTerm === '' || 
      (rtl 
        ? tool.name_he?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          tool.description_he?.toLowerCase().includes(searchTerm.toLowerCase())
        : tool.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          tool.description_en?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === '' || tool.category === selectedCategory;
    
    return matchesSearchTerm && matchesCategory;
  });

  // Group tools by category
  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <section dir={rtl ? 'rtl' : 'ltr'} className="pt-28 pb-16 bg-gradient-to-br from-teal-50/40 to-blue-50/30">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fadeIn" className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 font-heading">
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
          
          {/* Tools Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-gray-600">{translations.loading}</span>
            </div>
          ) : tools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{translations.noTools}</p>
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <p className="text-gray-500">{translations.noResults}</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(translations.categories).map(([category, categoryName]) => {
                const categoryTools = groupedTools[category] || [];
                if (categoryTools.length === 0 && (selectedCategory === '' || selectedCategory === category)) return null;
                
                return (
                  <AnimatedElement 
                    key={category}
                    animation="fadeIn"
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 text-teal-600">
                        {categoryIcons[category]}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {categoryName}
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryTools.map((tool, index) => (
                        <AnimatedElement
                          key={tool.id}
                          animation="slideUp"
                          delay={0.1 * (index % 3)}
                          className="group"
                        >
                          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 h-full flex flex-col">
                            <h3 className="text-xl font-bold mb-3 text-gray-900">
                              {rtl ? tool.name_he : tool.name_en}
                            </h3>
                            <p className="text-gray-600 mb-6 flex-grow">
                              {rtl ? tool.description_he : tool.description_en}
                            </p>
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                            >
                              {translations.visitTool}
                              <ExternalLink className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                            </a>
                          </div>
                        </AnimatedElement>
                      ))}
                    </div>
                  </AnimatedElement>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}