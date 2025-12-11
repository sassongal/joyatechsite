// src/admin/pages/ToolsManager.jsx
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
  Wrench,
  ExternalLink,
  Star,
  X,
  Save,
  Loader2
} from 'lucide-react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import Modal from '../components/Modal';

export default function ToolsManager() {
  const { user } = useAuth();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, tool: null });
  const [editModal, setEditModal] = useState({ open: false, tool: null });
  const [saving, setSaving] = useState(false);

  const categories = [
    { value: 'all', label: 'כל הקטגוריות' },
    { value: 'content', label: 'יצירת תוכן' },
    { value: 'design', label: 'עיצוב' },
    { value: 'automation', label: 'אוטומציה' },
    { value: 'productivity', label: 'פרודוקטיביות' },
    { value: 'development', label: 'פיתוח' },
    { value: 'marketing', label: 'שיווק' },
  ];

  const pricingOptions = [
    { value: 'free', label: 'חינם' },
    { value: 'freemium', label: 'Freemium' },
    { value: 'paid', label: 'בתשלום' },
  ];

  const emptyTool = {
    name_he: '',
    name_en: '',
    description_he: '',
    description_en: '',
    category: 'content',
    url: '',
    logo: '',
    pricing: 'freemium',
    rating: 4,
    pros_he: [],
    cons_he: [],
    useCases_he: [],
    featured: false,
    published: true,
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'tools'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const toolsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTools(toolsData);
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (tool) => {
    try {
      await updateDoc(doc(db, 'tools', tool.id), {
        published: !tool.published,
        updatedAt: serverTimestamp()
      });
      fetchTools();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.tool) return;
    try {
      await deleteDoc(doc(db, 'tools', deleteConfirm.tool.id));
      setDeleteConfirm({ open: false, tool: null });
      fetchTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  const handleSave = async () => {
    if (!editModal.tool) return;
    setSaving(true);
    
    try {
      const now = serverTimestamp();
      const data = {
        ...editModal.tool,
        updatedAt: now,
      };

      if (editModal.tool.id) {
        await updateDoc(doc(db, 'tools', editModal.tool.id), data);
      } else {
        data.createdAt = now;
        await addDoc(collection(db, 'tools'), data);
      }

      // Log activity
      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action: editModal.tool.id ? 'update' : 'create',
        collection: 'tools',
        documentId: editModal.tool.id || 'new',
        documentTitle: editModal.tool.name_he,
        createdAt: now,
      });

      setEditModal({ open: false, tool: null });
      fetchTools();
    } catch (error) {
      console.error('Error saving tool:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateEditTool = (field, value) => {
    setEditModal(prev => ({
      ...prev,
      tool: { ...prev.tool, [field]: value }
    }));
  };

  // Filter tools
  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name_he?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.name_en?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: 'name',
      label: 'כלי',
      render: (tool) => (
        <div className="flex items-center gap-3">
          {tool.logo ? (
            <img 
              src={tool.logo} 
              alt="" 
              className="w-10 h-10 rounded-lg object-contain bg-white p-1"
            />
          ) : (
            <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-neutral-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-white">{tool.name_he || tool.name_en}</p>
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-primary-400 flex items-center gap-1"
            >
              {tool.url?.replace(/https?:\/\//, '').split('/')[0]}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'קטגוריה',
      render: (tool) => (
        <span className="inline-flex items-center px-2 py-1 bg-neutral-700/50 text-neutral-300 text-xs rounded-lg">
          {categories.find(c => c.value === tool.category)?.label || tool.category}
        </span>
      )
    },
    {
      key: 'rating',
      label: 'דירוג',
      render: (tool) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-neutral-300">{tool.rating}/5</span>
        </div>
      )
    },
    {
      key: 'pricing',
      label: 'תמחור',
      render: (tool) => {
        const colors = {
          free: 'bg-green-500/20 text-green-400',
          freemium: 'bg-blue-500/20 text-blue-400',
          paid: 'bg-yellow-500/20 text-yellow-400',
        };
        return (
          <span className={`inline-flex items-center px-2 py-1 text-xs rounded-lg ${colors[tool.pricing] || 'bg-neutral-700 text-neutral-300'}`}>
            {pricingOptions.find(p => p.value === tool.pricing)?.label || tool.pricing}
          </span>
        );
      }
    },
    {
      key: 'status',
      label: 'סטטוס',
      render: (tool) => (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg ${
          tool.published 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {tool.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          {tool.published ? 'פעיל' : 'מוסתר'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'פעולות',
      render: (tool) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditModal({ open: true, tool: { ...tool } })}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
            title="ערוך"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleTogglePublish(tool)}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
            title={tool.published ? 'הסתר' : 'הצג'}
          >
            {tool.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setDeleteConfirm({ open: true, tool })}
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
          <h1 className="text-2xl font-bold text-white">ניהול כלים</h1>
          <p className="text-neutral-400 mt-1">{tools.length} כלים</p>
        </div>
        <button
          onClick={() => setEditModal({ open: true, tool: { ...emptyTool } })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          כלי חדש
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
                placeholder="חיפוש כלים..."
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
        data={filteredTools}
        loading={loading}
        emptyMessage="אין כלים עדיין"
        emptyAction={
          <button 
            onClick={() => setEditModal({ open: true, tool: { ...emptyTool } })}
            className="text-primary-400 hover:text-primary-300"
          >
            הוסף כלי ראשון
          </button>
        }
      />

      {/* Edit Modal */}
      <Modal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, tool: null })}
        title={editModal.tool?.id ? 'עריכת כלי' : 'כלי חדש'}
        maxWidth="lg"
      >
        {editModal.tool && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">שם (עברית)</label>
                <input
                  type="text"
                  value={editModal.tool.name_he}
                  onChange={(e) => updateEditTool('name_he', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">שם (אנגלית)</label>
                <input
                  type="text"
                  value={editModal.tool.name_en}
                  onChange={(e) => updateEditTool('name_en', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">תיאור (עברית)</label>
              <textarea
                value={editModal.tool.description_he}
                onChange={(e) => updateEditTool('description_he', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">קישור</label>
                <input
                  type="url"
                  value={editModal.tool.url}
                  onChange={(e) => updateEditTool('url', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">לוגו URL</label>
                <input
                  type="url"
                  value={editModal.tool.logo}
                  onChange={(e) => updateEditTool('logo', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">קטגוריה</label>
                <select
                  value={editModal.tool.category}
                  onChange={(e) => updateEditTool('category', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.filter(c => c.value !== 'all').map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">תמחור</label>
                <select
                  value={editModal.tool.pricing}
                  onChange={(e) => updateEditTool('pricing', e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {pricingOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">דירוג</label>
                <select
                  value={editModal.tool.rating}
                  onChange={(e) => updateEditTool('rating', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} כוכבים</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editModal.tool.featured}
                  onChange={(e) => updateEditTool('featured', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-300">מומלץ</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editModal.tool.published}
                  onChange={(e) => updateEditTool('published', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-300">פעיל</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-700">
              <button
                onClick={() => setEditModal({ open: false, tool: null })}
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
        onClose={() => setDeleteConfirm({ open: false, tool: null })}
        onConfirm={handleDelete}
        title="מחיקת כלי"
        message={`האם אתה בטוח שברצונך למחוק את "${deleteConfirm.tool?.name_he}"?`}
        confirmText="מחק"
        confirmColor="red"
      />
    </div>
  );
}
