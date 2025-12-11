// src/admin/pages/ArticlesManager.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  FileText,
  Calendar,
  Tag
} from 'lucide-react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';

export default function ArticlesManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, article: null });

  const categories = [
    { value: 'all', label: 'כל הקטגוריות' },
    { value: 'tutorials', label: 'מדריכים' },
    { value: 'design', label: 'עיצוב' },
    { value: 'business', label: 'עסקים' },
    { value: 'ai-implementation', label: 'יישום AI' },
    { value: 'marketing', label: 'שיווק' },
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const articlesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setArticles(articlesData);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (article) => {
    try {
      await updateDoc(doc(db, 'articles', article.id), {
        published: !article.published,
        publishedAt: !article.published ? new Date() : null,
        updatedAt: new Date()
      });
      fetchArticles();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.article) return;
    try {
      await deleteDoc(doc(db, 'articles', deleteConfirm.article.id));
      setDeleteConfirm({ open: false, article: null });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title_he?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.title_en?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'published' && article.published) ||
      (filterStatus === 'draft' && !article.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const columns = [
    {
      key: 'title',
      label: 'כותרת',
      render: (article) => (
        <div className="flex items-center gap-3">
          {article.featuredImage ? (
            <img 
              src={article.featuredImage} 
              alt="" 
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-neutral-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-white">{article.title_he || article.title_en}</p>
            <p className="text-xs text-neutral-500">{article.slug}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'קטגוריה',
      render: (article) => (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-700/50 text-neutral-300 text-xs rounded-lg">
          <Tag className="w-3 h-3" />
          {article.category}
        </span>
      )
    },
    {
      key: 'status',
      label: 'סטטוס',
      render: (article) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg ${
          article.published 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {article.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          {article.published ? 'מפורסם' : 'טיוטה'}
        </span>
      )
    },
    {
      key: 'date',
      label: 'תאריך',
      render: (article) => (
        <div className="flex items-center gap-1 text-sm text-neutral-400">
          <Calendar className="w-4 h-4" />
          {article.createdAt?.toDate?.()?.toLocaleDateString('he-IL') || '-'}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'פעולות',
      render: (article) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/articles/${article.id}`}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
            title="ערוך"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleTogglePublish(article)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
            title={article.published ? 'בטל פרסום' : 'פרסם'}
          >
            {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setDeleteConfirm({ open: true, article })}
            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded-lg transition-colors"
            title="מחק"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">ניהול מאמרים</h1>
          <p className="text-neutral-400 mt-1">{articles.length} מאמרים</p>
        </div>
        <Link
          to="/admin/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          מאמר חדש
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="חיפוש מאמרים..."
                className="w-full pr-10 pl-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="published">מפורסם</option>
            <option value="draft">טיוטה</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredArticles}
        loading={loading}
        emptyMessage="אין מאמרים עדיין"
        emptyAction={
          <Link to="/admin/articles/new" className="text-primary-400 hover:text-primary-300">
            צור מאמר ראשון
          </Link>
        }
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, article: null })}
        onConfirm={handleDelete}
        title="מחיקת מאמר"
        message={`האם אתה בטוח שברצונך למחוק את המאמר "${deleteConfirm.article?.title_he}"? פעולה זו אינה הפיכה.`}
        confirmText="מחק"
        confirmColor="red"
      />
    </div>
  );
}
