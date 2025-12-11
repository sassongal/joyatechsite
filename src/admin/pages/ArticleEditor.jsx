// src/admin/pages/ArticleEditor.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { useAuth } from '../hooks/useAuth';
import { 
  Save, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Tag,
  Clock,
  Globe,
  Loader2
} from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNew = !id || id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('he'); // 'he' | 'en'
  
  const [article, setArticle] = useState({
    title_he: '',
    title_en: '',
    slug: '',
    content_he: '',
    content_en: '',
    excerpt_he: '',
    excerpt_en: '',
    category: 'tutorials',
    author: 'Gal Sasson',
    featuredImage: '',
    tags: [],
    featured: false,
    published: false,
    readTime: 5,
    seoTitle_he: '',
    seoTitle_en: '',
    seoDescription_he: '',
    seoDescription_en: '',
  });

  const categories = [
    { value: 'tutorials', label: 'מדריכים' },
    { value: 'design', label: 'עיצוב' },
    { value: 'business', label: 'עסקים' },
    { value: 'ai-implementation', label: 'יישום AI' },
    { value: 'marketing', label: 'שיווק' },
    { value: 'tech_trends', label: 'טרנדים טכנולוגיים' },
  ];

  useEffect(() => {
    if (!isNew) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const docRef = doc(db, 'articles', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate('/admin/articles');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u0590-\u05FF]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleChange = (field, value) => {
    setArticle(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug from English title
      if (field === 'title_en' && !prev.slug) {
        updated.slug = generateSlug(value);
      }
      
      return updated;
    });
  };

  const handleTagsChange = (tagsString) => {
    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean);
    handleChange('tags', tags);
  };

  const handleSave = async (publish = null) => {
    setSaving(true);
    
    try {
      const now = serverTimestamp();
      const data = {
        ...article,
        published: publish !== null ? publish : article.published,
        publishedAt: publish ? now : article.publishedAt,
        updatedAt: now,
      };

      if (isNew) {
        data.createdAt = now;
        const docRef = await addDoc(collection(db, 'articles'), data);
        navigate(`/admin/articles/${docRef.id}`);
      } else {
        await setDoc(doc(db, 'articles', id), data, { merge: true });
      }

      // Log activity
      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action: isNew ? 'create' : 'update',
        collection: 'articles',
        documentId: isNew ? 'new' : id,
        documentTitle: article.title_he || article.title_en,
        createdAt: now,
      });

    } catch (error) {
      console.error('Error saving article:', error);
      alert('שגיאה בשמירת המאמר');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/articles')}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isNew ? 'מאמר חדש' : 'עריכת מאמר'}
            </h1>
            {!isNew && (
              <p className="text-sm text-neutral-400 mt-1">
                {article.published ? 'מפורסם' : 'טיוטה'}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {article.published ? (
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-yellow-400 hover:bg-yellow-500/10 border border-yellow-500/30 rounded-lg transition-colors"
            >
              <EyeOff className="w-4 h-4" />
              בטל פרסום
            </button>
          ) : (
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-green-400 hover:bg-green-500/10 border border-green-500/30 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              פרסם
            </button>
          )}
          
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            שמור
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Tabs */}
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('he')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'he' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
              >
                <Globe className="w-4 h-4" />
                עברית
              </button>
              <button
                onClick={() => setActiveTab('en')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'en' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                }`}
              >
                <Globe className="w-4 h-4" />
                English
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                כותרת ({activeTab === 'he' ? 'עברית' : 'אנגלית'})
              </label>
              <input
                type="text"
                value={activeTab === 'he' ? article.title_he : article.title_en}
                onChange={(e) => handleChange(`title_${activeTab}`, e.target.value)}
                className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={activeTab === 'he' ? 'כותרת המאמר' : 'Article Title'}
                dir={activeTab === 'he' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Excerpt */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                תקציר ({activeTab === 'he' ? 'עברית' : 'אנגלית'})
              </label>
              <textarea
                value={activeTab === 'he' ? article.excerpt_he : article.excerpt_en}
                onChange={(e) => handleChange(`excerpt_${activeTab}`, e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder={activeTab === 'he' ? 'תקציר קצר' : 'Short excerpt'}
                dir={activeTab === 'he' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                תוכן ({activeTab === 'he' ? 'עברית' : 'אנגלית'})
              </label>
              <textarea
                value={activeTab === 'he' ? article.content_he : article.content_en}
                onChange={(e) => handleChange(`content_${activeTab}`, e.target.value)}
                rows={20}
                className="w-full px-4 py-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono text-sm"
                placeholder={activeTab === 'he' ? 'תוכן המאמר (Markdown)' : 'Article content (Markdown)'}
                dir={activeTab === 'he' ? 'rtl' : 'ltr'}
              />
              <p className="text-xs text-neutral-500 mt-1">תומך ב-Markdown</p>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">SEO</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  כותרת SEO ({activeTab === 'he' ? 'עברית' : 'אנגלית'})
                </label>
                <input
                  type="text"
                  value={activeTab === 'he' ? article.seoTitle_he : article.seoTitle_en}
                  onChange={(e) => handleChange(`seoTitle_${activeTab}`, e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="כותרת לתוצאות חיפוש"
                  dir={activeTab === 'he' ? 'rtl' : 'ltr'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  תיאור SEO ({activeTab === 'he' ? 'עברית' : 'אנגלית'})
                </label>
                <textarea
                  value={activeTab === 'he' ? article.seoDescription_he : article.seoDescription_en}
                  onChange={(e) => handleChange(`seoDescription_${activeTab}`, e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="תיאור קצר לתוצאות חיפוש"
                  dir={activeTab === 'he' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              תמונה ראשית
            </h3>
            <ImageUploader
              value={article.featuredImage}
              onChange={(url) => handleChange('featuredImage', url)}
              folder="articles"
            />
          </div>

          {/* Meta */}
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-4">הגדרות</h3>
            
            <div className="space-y-4">
              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={article.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  dir="ltr"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  קטגוריה
                </label>
                <select
                  value={article.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  כותב
                </label>
                <input
                  type="text"
                  value={article.author}
                  onChange={(e) => handleChange('author', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  זמן קריאה (דקות)
                </label>
                <input
                  type="number"
                  value={article.readTime}
                  onChange={(e) => handleChange('readTime', parseInt(e.target.value) || 5)}
                  min={1}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  תגיות
                </label>
                <input
                  type="text"
                  value={article.tags?.join(', ') || ''}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="ai, automation, tutorial"
                  dir="ltr"
                />
                <p className="text-xs text-neutral-500 mt-1">הפרד בפסיקים</p>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={article.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="featured" className="text-sm text-neutral-300">
                  מאמר מומלץ
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
