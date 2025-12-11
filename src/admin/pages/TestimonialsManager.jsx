// src/admin/pages/TestimonialsManager.jsx
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
  MessageSquareQuote,
  Star,
  Save,
  Loader2,
  GripVertical
} from 'lucide-react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import Modal from '../components/Modal';
import ImageUploader from '../components/ImageUploader';

export default function TestimonialsManager() {
  const { user } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, item: null });
  const [editModal, setEditModal] = useState({ open: false, item: null });
  const [saving, setSaving] = useState(false);

  const emptyTestimonial = {
    name: '',
    company: '',
    role: '',
    content_he: '',
    content_en: '',
    avatar: '',
    rating: 5,
    featured: false,
    published: true,
    order: 0,
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (item) => {
    try {
      await updateDoc(doc(db, 'testimonials', item.id), {
        published: !item.published,
        updatedAt: serverTimestamp()
      });
      fetchTestimonials();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.item) return;
    try {
      await deleteDoc(doc(db, 'testimonials', deleteConfirm.item.id));
      setDeleteConfirm({ open: false, item: null });
      fetchTestimonials();
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
        await updateDoc(doc(db, 'testimonials', editModal.item.id), data);
      } else {
        data.createdAt = now;
        data.order = testimonials.length;
        await addDoc(collection(db, 'testimonials'), data);
      }

      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action: editModal.item.id ? 'update' : 'create',
        collection: 'testimonials',
        documentId: editModal.item.id || 'new',
        documentTitle: editModal.item.name,
        createdAt: now,
      });

      setEditModal({ open: false, item: null });
      fetchTestimonials();
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

  const filteredItems = testimonials.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'order',
      label: '',
      render: () => (
        <GripVertical className="w-4 h-4 text-neutral-600 cursor-grab" />
      )
    },
    {
      key: 'name',
      label: 'לקוח',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.avatar ? (
            <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
              <MessageSquareQuote className="w-5 h-5 text-neutral-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-white">{item.name}</p>
            <p className="text-xs text-neutral-500">{item.role} @ {item.company}</p>
          </div>
        </div>
      )
    },
    {
      key: 'content',
      label: 'תוכן',
      render: (item) => (
        <p className="text-sm text-neutral-400 truncate max-w-xs">
          {item.content_he?.substring(0, 80)}...
        </p>
      )
    },
    {
      key: 'rating',
      label: 'דירוג',
      render: (item) => (
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'}`} 
            />
          ))}
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
          <h1 className="text-2xl font-bold text-white">ניהול המלצות</h1>
          <p className="text-neutral-400 mt-1">{testimonials.length} המלצות</p>
        </div>
        <button
          onClick={() => setEditModal({ open: true, item: { ...emptyTestimonial } })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          המלצה חדשה
        </button>
      </div>

      {/* Search */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חיפוש המלצות..."
            className="w-full pr-10 pl-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredItems}
        loading={loading}
        emptyMessage="אין המלצות עדיין"
        emptyAction={
          <button 
            onClick={() => setEditModal({ open: true, item: { ...emptyTestimonial } })}
            className="text-primary-400 hover:text-primary-300"
          >
            הוסף המלצה ראשונה
          </button>
        }
      />

      {/* Edit Modal */}
      <Modal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, item: null })}
        title={editModal.item?.id ? 'עריכת המלצה' : 'המלצה חדשה'}
        maxWidth="lg"
      >
        {editModal.item && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">שם</label>
                <input
                  type="text"
                  value={editModal.item.name}
                  onChange={(e) => updateEditItem('name', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">תפקיד</label>
                <input
                  type="text"
                  value={editModal.item.role}
                  onChange={(e) => updateEditItem('role', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">חברה</label>
                <input
                  type="text"
                  value={editModal.item.company}
                  onChange={(e) => updateEditItem('company', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">תמונה</label>
              <ImageUploader
                value={editModal.item.avatar}
                onChange={(url) => updateEditItem('avatar', url)}
                folder="testimonials"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">תוכן (עברית)</label>
              <textarea
                value={editModal.item.content_he}
                onChange={(e) => updateEditItem('content_he', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">תוכן (אנגלית)</label>
              <textarea
                value={editModal.item.content_en}
                onChange={(e) => updateEditItem('content_en', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                dir="ltr"
              />
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">דירוג</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => updateEditItem('rating', n)}
                      className="p-1"
                    >
                      <Star 
                        className={`w-6 h-6 ${n <= editModal.item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
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
        title="מחיקת המלצה"
        message={`האם אתה בטוח שברצונך למחוק את ההמלצה של "${deleteConfirm.item?.name}"?`}
        confirmText="מחק"
        confirmColor="red"
      />
    </div>
  );
}
