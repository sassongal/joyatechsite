// src/admin/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { 
  Save, 
  Loader2, 
  Globe, 
  Mail, 
  Phone, 
  Share2,
  BarChart3,
  Bell,
  Shield
} from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Joya-Tech',
    siteDescription_he: '',
    siteDescription_en: '',
    contactEmail: '',
    contactPhone: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      whatsapp: '',
    },
    analytics: {
      gaId: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'settings', 'global');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSettings(prev => ({ ...prev, ...docSnap.data() }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        ...settings,
        updatedAt: serverTimestamp(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (path, value) => {
    setSettings(prev => {
      const parts = path.split('.');
      if (parts.length === 1) {
        return { ...prev, [path]: value };
      }
      return {
        ...prev,
        [parts[0]]: {
          ...prev[parts[0]],
          [parts[1]]: value,
        },
      };
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
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">הגדרות</h1>
          <p className="text-neutral-400 mt-1">הגדרות כלליות של האתר</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
            saved 
              ? 'bg-green-600 text-white' 
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          } disabled:opacity-50`}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <>נשמר!</>
          ) : (
            <>
              <Save className="w-4 h-4" />
              שמור
            </>
          )}
        </button>
      </div>

      {/* General */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          כללי
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">שם האתר</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSetting('siteName', e.target.value)}
              className="w-full px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">תיאור האתר (עברית)</label>
              <textarea
                value={settings.siteDescription_he}
                onChange={(e) => updateSetting('siteDescription_he', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">תיאור האתר (אנגלית)</label>
              <textarea
                value={settings.siteDescription_en}
                onChange={(e) => updateSetting('siteDescription_en', e.target.value)}
                rows={3}
                dir="ltr"
                className="w-full px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          פרטי קשר
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">אימייל</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting('contactEmail', e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">טלפון</label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => updateSetting('contactPhone', e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                dir="ltr"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          רשתות חברתיות
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries({
            facebook: 'Facebook',
            instagram: 'Instagram',
            linkedin: 'LinkedIn',
            twitter: 'Twitter',
            whatsapp: 'WhatsApp',
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
              <input
                type="url"
                value={settings.socialLinks?.[key] || ''}
                onChange={(e) => updateSetting(`socialLinks.${key}`, e.target.value)}
                className="w-full px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={`https://${key}.com/...`}
                dir="ltr"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          אנליטיקס
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Google Analytics ID</label>
          <input
            type="text"
            value={settings.analytics?.gaId || ''}
            onChange={(e) => updateSetting('analytics.gaId', e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="G-XXXXXXXXXX"
            dir="ltr"
          />
          <p className="text-xs text-neutral-500 mt-1">מזהה Google Analytics 4</p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          אזור מסוכן
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">ייצוא נתונים</p>
              <p className="text-sm text-neutral-400">ייצא את כל הנתונים כקובץ JSON</p>
            </div>
            <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors">
              ייצוא
            </button>
          </div>
          
          <div className="border-t border-red-500/30 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">מחיקת כל הנתונים</p>
                <p className="text-sm text-neutral-400">פעולה זו אינה הפיכה!</p>
              </div>
              <button 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                onClick={() => alert('פונקציונליות זו מושבתת מטעמי בטיחות')}
              >
                מחק הכל
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
