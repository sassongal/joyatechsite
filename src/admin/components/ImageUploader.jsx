// src/admin/components/ImageUploader.jsx
import React, { useState, useCallback } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/firebase-config';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function ImageUploader({ 
  value, 
  onChange, 
  folder = 'uploads',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024 // 5MB
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('יש להעלות קובץ תמונה בלבד');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`גודל הקובץ חייב להיות קטן מ-${maxSize / 1024 / 1024}MB`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`;
      const storageRef = ref(storage, `${folder}/${filename}`);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      onChange(downloadURL);
    } catch (err) {
      console.error('Upload error:', err);
      setError('שגיאה בהעלאת הקובץ');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = async () => {
    if (value && value.includes('firebasestorage')) {
      try {
        const imageRef = ref(storage, value);
        await deleteObject(imageRef);
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }
    onChange('');
  };

  // Handle external URL input
  const handleUrlInput = () => {
    const url = prompt('הכנס URL של תמונה:');
    if (url) {
      onChange(url);
    }
  };

  if (value) {
    return (
      <div className="relative group">
        <img 
          src={value} 
          alt="" 
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
          <button
            onClick={handleRemove}
            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title="הסר תמונה"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive 
            ? 'border-primary-500 bg-primary-500/10' 
            : 'border-neutral-600 hover:border-neutral-500'
          }
          ${uploading ? 'pointer-events-none' : ''}
        `}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-2" />
            <p className="text-sm text-neutral-400">מעלה...</p>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
            <p className="text-sm text-neutral-400 mb-2">
              גרור תמונה לכאן או
            </p>
            <label className="inline-block px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors">
              בחר קובץ
              <input
                type="file"
                accept={accept}
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
          </>
        )}
      </div>

      {/* URL input option */}
      <button
        onClick={handleUrlInput}
        className="w-full text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
      >
        או הוסף URL של תמונה
      </button>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
