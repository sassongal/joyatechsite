// src/admin/pages/MediaLibrary.jsx
import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';
import { storage } from '@/firebase-config';
import { 
  Upload, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  Image as ImageIcon,
  Folder,
  Loader2,
  Grid,
  List,
  Filter
} from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

export default function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFolder, setCurrentFolder] = useState('');
  const [folders, setFolders] = useState(['articles', 'portfolio', 'testimonials', 'carousels', 'uploads']);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, file: null });
  const [copiedUrl, setCopiedUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, [currentFolder]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const path = currentFolder || '';
      const listRef = ref(storage, path);
      const result = await listAll(listRef);
      
      // Get file details
      const filePromises = result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        let metadata = {};
        try {
          metadata = await getMetadata(itemRef);
        } catch (e) {
          console.error('Error getting metadata:', e);
        }
        
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url,
          size: metadata.size || 0,
          contentType: metadata.contentType || 'unknown',
          created: metadata.timeCreated || null,
        };
      });

      const files = await Promise.all(filePromises);
      setFiles(files.sort((a, b) => new Date(b.created) - new Date(a.created)));

      // Update folders from prefixes
      const folderNames = result.prefixes.map(p => p.name);
      if (folderNames.length > 0) {
        setFolders(Array.from(new Set([...folders, ...folderNames])));
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles?.length) return;
    
    setUploading(true);
    
    try {
      for (const file of uploadedFiles) {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`;
        const folder = currentFolder || 'uploads';
        const storageRef = ref(storage, `${folder}/${filename}`);
        
        const { uploadBytes } = await import('firebase/storage');
        await uploadBytes(storageRef, file);
      }
      
      fetchFiles();
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.file) return;
    
    try {
      const fileRef = ref(storage, deleteConfirm.file.fullPath);
      await deleteObject(fileRef);
      setDeleteConfirm({ open: false, file: null });
      fetchFiles();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">ספריית מדיה</h1>
          <p className="text-neutral-400 mt-1">{files.length} קבצים</p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors cursor-pointer">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          העלה קבצים
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Folders */}
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentFolder('')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              currentFolder === '' 
                ? 'bg-primary-600 text-white' 
                : 'bg-neutral-700/50 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            <Folder className="w-4 h-4" />
            הכל
          </button>
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setCurrentFolder(folder)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentFolder === folder 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-neutral-700/50 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <Folder className="w-4 h-4" />
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חיפוש קבצים..."
            className="w-full pr-10 pl-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-neutral-700 text-neutral-400 hover:text-white'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-neutral-700 text-neutral-400 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Files */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-12 text-center">
          <ImageIcon className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500">אין קבצים בתיקייה זו</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => (
            <div
              key={file.fullPath}
              className="group bg-neutral-800/50 border border-neutral-700 rounded-xl overflow-hidden hover:border-primary-500 transition-colors"
            >
              <div className="aspect-square relative">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopyUrl(file.url)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="העתק URL"
                  >
                    {copiedUrl === file.url ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ open: true, file })}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    title="מחק"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-neutral-400 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-neutral-600">{formatFileSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-400">קובץ</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-400">גודל</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-400">תאריך</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-400">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr key={file.fullPath} className="border-b border-neutral-700 last:border-0 hover:bg-neutral-700/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={file.url} alt="" className="w-10 h-10 rounded object-cover" />
                      <span className="text-sm text-white truncate max-w-xs">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-400">{formatFileSize(file.size)}</td>
                  <td className="px-4 py-3 text-sm text-neutral-400">
                    {file.created ? new Date(file.created).toLocaleDateString('he-IL') : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyUrl(file.url)}
                        className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                      >
                        {copiedUrl === file.url ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ open: true, file })}
                        className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, file: null })}
        onConfirm={handleDelete}
        title="מחיקת קובץ"
        message={`האם אתה בטוח שברצונך למחוק את "${deleteConfirm.file?.name}"?`}
        confirmText="מחק"
        confirmColor="red"
      />
    </div>
  );
}
