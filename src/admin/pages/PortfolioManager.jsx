// src/admin/pages/PortfolioManager.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { useAuth } from '../hooks/useAuth';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  Save,
  Loader2,
  Calendar
} from 'lucide-react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import Modal from '../components/Modal';
import ImageUploader from '../components/ImageUploader';

export default function PortfolioManager() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, item: null });
  const [editModal, setEditModal] = useState({ open: false, item: null });
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'all', label: 'הכל' },
    { value: 'web', label: 'אתרים' },
    { value: 'branding', label: 'מיתוג' },
    { value: 'marketing', label: 'שיווק' },
    { value: 'automation', label: 'אוטומציה' },
    { value: 'design', label: 'עיצוב' },
  ];

  const emptyItem = {
    title_he: '',
    title_en: '',
    description_he: '',
    description_en: '',
    category: 'web',
    client: '',
    beforeImage: '',
    afterImage: '',
    gallery: [],
    tags: [],
    featured: false,
    published: true,
    order: 0,
    completedAt: '',
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (item) => {
    try {
      await updateDoc(doc(db, 'portfolio', item.id), {
        published: !item.published,
        updatedAt: serverTimestamp()
      });
      fetchItems();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.item) return;
    try {
      await deleteDoc(doc(db, 'portfolio', deleteConfirm.item.id));
      setDeleteConfirm({ open: false, item: null });
      fetchItems();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleSave = async () => {
    if (!editModal.item) return;
    setSaving(true);
    
    try {
      const now = serverTimestamp();
      const data = {
        ...editModal.item,
        updatedAt: now,
      };

      if (editModal.item.id) {
        await updateDoc(doc(db, 'portfolio', editModal.item.id), data);
      } else {
        data.createdAt = now;
        data.order = items.length;
        await addDoc(collection(db, 'portfolio'), data);
      }

      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action: editModal.item.id ? 'update' : 'create',
        collection: 'portfolio',
        documentId: editModal.item.id || 'new',
        documentTitle: editModal.item.title_he,
        createdAt: now,
      });

      setEditModal({ open: false, item: null });
      fetchItems();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateEditItem = (field, value) => {
    setEditModal(prev => ({
      ...prev,
      item: { ...prev.item, [field]: value }
    }));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title_he?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: 'title',
      label: 'עבודה',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.afterImage || item.beforeImage ? (
            <img src={item.afterImage || item.beforeImage} alt="" className="w-16 h-12 rounded-lg object-cover" />
          ) : (
            <div className="w-16 h-12 bg-neutral-700 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-neutral-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-white">{item.title_he}</p>
            <p className="text-xs text-neutral-500">{item.client}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'קטגוריה',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-1 bg-neutral-700/50 text-neutral-300 text-xs rounded-lg">
          {categories.find(c => c.value === item.category)?.label || item.category}
        </span>
      )
    },
    {
      key: 'images',
      label: 'תמונות',
      render: (item) => (
        <div className="flex gap-1">
          {item.beforeImage && <span className="text-xs text-neutral-500">לפני</span>}
          {item.beforeImage && item.afterImage && <span className="text-neutral-600">|</span>}
          {item.afterImage && <span className="text-xs text-neutral-500">אחרי</span>}
        </div>
      )
    },
    {
      key: 'status',
      label: 'סטטוס',
      render: (item) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg ${
          item.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {item.published ? 'פעיל' : 'מוסתר'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'פעולות',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditModal({ open: true, item: { ...item } })}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleTogglePublish(item)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
          >
            {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setDeleteConfirm({ open: true, item })}
            className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded-lg transition-colors"
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
          <h1 className="text-2xl font-bold text-white">תיק עבודות</h1>
          <p className="text-neutral-400 mt-1">{items.length} עבודות</p>
        </div>
        <button
          onClick={() => setEditModal({ open: true, item: { ...emptyItem } })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          עבודה חדשה
        </button>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="חיפוש עבודות..."
                className="w-full pr-10 pl-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredItems}
        loading={loading}
        emptyMessage="אין עבודות עדיין"
        emptyAction={
          <button 
            onClick={() => setEditModal({ open: true, item: { ...emptyItem } })}
            className="text-primary-400 hover:text-primary-300"
          >
            הוסף עבודה ראשונה
          </button>
        }
      />

      {/* Edit Modal */}
      <Modal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, item: null })}
        title={editModal.item?.id ? 'עריכת עבודה' : 'עבודה חדשה'}
        maxWidth="2xl"
      >
        {editModal.item && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">שם (עברית)</label>
                <input
                  type="text"
                  value={editModal.item.title_he}
                  onChange={(e) => updateEditItem('title_he', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">שם (אנגלית)</label>
                <input
                  type="text"
                  value={editModal.item.title_en}
                  onChange={(e) => updateEditItem('title_en', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">לקוח</label>
                <input
                  type="text"
                  value={editModal.item.client}
                  onChange={(e) => updateEditItem('client', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">קטגוריה</label>
                <select
                  value={editModal.item.category}
                  onChange={(e) => updateEditItem('category', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.filter(c => c.value !== 'all').map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">תיאור (עברית)</label>
              <textarea
                value={editModal.item.description_he}
                onChange={(e) => updateEditItem('description_he', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">תמונה - לפני</label>
                <ImageUploader
                  value={editModal.item.beforeImage}
                  onChange={(url) => updateEditItem('beforeImage', url)}
                  folder="portfolio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">תמונה - אחרי</label>
                <ImageUploader
                  value={editModal.item.afterImage}
                  onChange={(url) => updateEditItem('afterImage', url)}
                  folder="portfolio"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editModal.item.featured}
                  onChange={(e) => updateEditItem('featured', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-300">מומלץ</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editModal.item.published}
                  onChange={(e) => updateEditItem('published', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-300">פעיל</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-700">
              <button
                onClick={() => setEditModal({ open: false, item: null })}
                className="px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                שמור
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, item: null })}
        onConfirm={handleDelete}
        title="מחיקת עבודה"
        message={`האם אתה בטוח שברצונך למחוק את "${deleteConfirm.item?.title_he}"?`}
        confirmText="מחק"
        confirmColor="red"
      />
    </div>
  );
}
