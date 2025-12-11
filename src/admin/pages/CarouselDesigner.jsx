// src/admin/pages/CarouselDesigner.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { 
  Plus, 
  Save, 
  Loader2, 
  GripVertical, 
  Trash2,
  Image as ImageIcon,
  Settings,
  Eye,
  Layers,
  Play,
  Pause
} from 'lucide-react';
import Modal from '../components/Modal';
import ImageUploader from '../components/ImageUploader';

export default function CarouselDesigner() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCarousel, setSelectedCarousel] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, item: null });
  const [saving, setSaving] = useState(false);

  const emptyCarousel = {
    name: '',
    items: [],
    settings: {
      autoplay: true,
      interval: 5000,
      animation: 'slide',
      showDots: true,
      showArrows: true,
    },
    published: true,
  };

  const emptyItem = {
    id: '',
    type: 'image',
    image: '',
    title_he: '',
    title_en: '',
    subtitle_he: '',
    subtitle_en: '',
    link: '',
    order: 0,
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'carousels'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCarousels(data);
      if (data.length > 0 && !selectedCarousel) {
        setSelectedCarousel(data[0]);
      }
    } catch (error) {
      console.error('Error fetching carousels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCarousel = async (carousel) => {
    setSaving(true);
    try {
      const now = serverTimestamp();
      const data = {
        ...carousel,
        updatedAt: now,
      };

      if (carousel.id) {
        await updateDoc(doc(db, 'carousels', carousel.id), data);
      } else {
        data.createdAt = now;
        const docRef = await addDoc(collection(db, 'carousels'), data);
        carousel.id = docRef.id;
      }

      fetchCarousels();
    } catch (error) {
      console.error('Error saving carousel:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCarousel = async (id) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הקרוסלה?')) return;
    
    try {
      await deleteDoc(doc(db, 'carousels', id));
      setSelectedCarousel(null);
      fetchCarousels();
    } catch (error) {
      console.error('Error deleting carousel:', error);
    }
  };

  const handleAddItem = () => {
    if (!selectedCarousel) return;
    
    const newItem = {
      ...emptyItem,
      id: `item-${Date.now()}`,
      order: selectedCarousel.items?.length || 0,
    };
    
    setSelectedCarousel({
      ...selectedCarousel,
      items: [...(selectedCarousel.items || []), newItem]
    });
  };

  const handleUpdateItem = (index, field, value) => {
    const items = [...selectedCarousel.items];
    items[index] = { ...items[index], [field]: value };
    setSelectedCarousel({ ...selectedCarousel, items });
  };

  const handleRemoveItem = (index) => {
    const items = selectedCarousel.items.filter((_, i) => i !== index);
    setSelectedCarousel({ ...selectedCarousel, items });
  };

  const handleSettingChange = (field, value) => {
    setSelectedCarousel({
      ...selectedCarousel,
      settings: { ...selectedCarousel.settings, [field]: value }
    });
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">מעצב קרוסלות</h1>
          <p className="text-neutral-400 mt-1">צור וערוך קרוסלות מותאמות אישית</p>
        </div>
        <button
          onClick={() => setEditModal({ open: true, item: { ...emptyCarousel } })}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          קרוסלה חדשה
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Carousel List */}
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            קרוסלות
          </h2>
          
          <div className="space-y-2">
            {carousels.map(carousel => (
              <button
                key={carousel.id}
                onClick={() => setSelectedCarousel(carousel)}
                className={`w-full text-right p-3 rounded-lg transition-colors ${
                  selectedCarousel?.id === carousel.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-700/50 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <p className="font-medium">{carousel.name || 'ללא שם'}</p>
                <p className="text-xs mt-1 opacity-70">
                  {carousel.items?.length || 0} פריטים
                </p>
              </button>
            ))}
            
            {carousels.length === 0 && (
              <p className="text-neutral-500 text-sm text-center py-4">
                אין קרוסלות עדיין
              </p>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 space-y-6">
          {selectedCarousel ? (
            <>
              {/* Carousel Settings */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    הגדרות קרוסלה
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteCarousel(selectedCarousel.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleSaveCarousel(selectedCarousel)}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      שמור
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">שם</label>
                    <input
                      type="text"
                      value={selectedCarousel.name}
                      onChange={(e) => setSelectedCarousel({ ...selectedCarousel, name: e.target.value })}
                      className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">אנימציה</label>
                    <select
                      value={selectedCarousel.settings?.animation || 'slide'}
                      onChange={(e) => handleSettingChange('animation', e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="slide">החלקה</option>
                      <option value="fade">דעיכה</option>
                      <option value="zoom">זום</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">מרווח (ms)</label>
                    <input
                      type="number"
                      value={selectedCarousel.settings?.interval || 5000}
                      onChange={(e) => handleSettingChange('interval', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-end gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCarousel.settings?.autoplay}
                        onChange={(e) => handleSettingChange('autoplay', e.target.checked)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-300">אוטומטי</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCarousel.settings?.showDots}
                        onChange={(e) => handleSettingChange('showDots', e.target.checked)}
                        className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-300">נקודות</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">פריטים</h2>
                  <button
                    onClick={handleAddItem}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    הוסף פריט
                  </button>
                </div>

                <div className="space-y-4">
                  {(selectedCarousel.items || []).map((item, index) => (
                    <div key={item.id} className="bg-neutral-700/30 border border-neutral-600 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="cursor-grab text-neutral-500">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <ImageUploader
                              value={item.image}
                              onChange={(url) => handleUpdateItem(index, 'image', url)}
                              folder="carousels"
                            />
                          </div>
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={item.title_he}
                              onChange={(e) => handleUpdateItem(index, 'title_he', e.target.value)}
                              placeholder="כותרת (עברית)"
                              className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <input
                              type="text"
                              value={item.subtitle_he}
                              onChange={(e) => handleUpdateItem(index, 'subtitle_he', e.target.value)}
                              placeholder="תת-כותרת (עברית)"
                              className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <input
                              type="text"
                              value={item.link}
                              onChange={(e) => handleUpdateItem(index, 'link', e.target.value)}
                              placeholder="קישור"
                              className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                              dir="ltr"
                            />
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {(!selectedCarousel.items || selectedCarousel.items.length === 0) && (
                    <p className="text-neutral-500 text-center py-8">
                      אין פריטים. לחץ על "הוסף פריט" להתחיל.
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-12 text-center">
              <Layers className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-500">בחר קרוסלה או צור חדשה</p>
            </div>
          )}
        </div>
      </div>

      {/* New Carousel Modal */}
      <Modal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, item: null })}
        title="קרוסלה חדשה"
        maxWidth="sm"
      >
        {editModal.item && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">שם הקרוסלה</label>
              <input
                type="text"
                value={editModal.item.name}
                onChange={(e) => setEditModal({ ...editModal, item: { ...editModal.item, name: e.target.value } })}
                className="w-full px-3 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="לדוגמה: homepage_hero"
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setEditModal({ open: false, item: null })}
                className="px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={async () => {
                  await handleSaveCarousel(editModal.item);
                  setEditModal({ open: false, item: null });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                צור
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
