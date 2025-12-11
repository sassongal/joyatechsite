// src/admin/components/GlobalSearch.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { 
  Search, 
  X, 
  FileText, 
  Wrench, 
  MessageSquare, 
  Image,
  Settings,
  Loader2,
  ArrowRight,
  Command
} from 'lucide-react';

const typeConfig = {
  articles: { icon: FileText, label: 'מאמרים', path: '/admin/articles' },
  tools: { icon: Wrench, label: 'כלים', path: '/admin/tools' },
  testimonials: { icon: MessageSquare, label: 'המלצות', path: '/admin/testimonials' },
  portfolio: { icon: Image, label: 'פורטפוליו', path: '/admin/portfolio' },
};

export default function GlobalSearch({ isOpen, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search across collections
  const performSearch = useCallback(async (term) => {
    if (term.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchTerm = term.toLowerCase();
    const allResults = [];

    try {
      // Search in each collection
      for (const [collectionName, config] of Object.entries(typeConfig)) {
        const q = query(
          collection(db, collectionName),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        
        const snapshot = await getDocs(q);
        
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          const title = data.title_he || data.name_he || data.name || '';
          const titleEn = data.title_en || data.name_en || '';
          
          if (
            title.toLowerCase().includes(searchTerm) ||
            titleEn.toLowerCase().includes(searchTerm)
          ) {
            allResults.push({
              id: doc.id,
              type: collectionName,
              title: title || titleEn,
              subtitle: config.label,
              icon: config.icon,
              path: `${config.path}/${doc.id}`,
            });
          }
        });
      }

      setResults(allResults.slice(0, 10));
      setSelectedIndex(0);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleSelect = (result) => {
    navigate(result.path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 border-b border-neutral-700">
          <Search className="w-5 h-5 text-neutral-500" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="חיפוש מאמרים, כלים, המלצות..."
            className="flex-1 py-4 bg-transparent text-white placeholder-neutral-500 focus:outline-none"
          />
          {loading && <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />}
          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSelect(result)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-right transition-colors ${
                      index === selectedIndex
                        ? 'bg-primary-600/20 text-white'
                        : 'text-neutral-300 hover:bg-neutral-700/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === selectedIndex ? 'bg-primary-600' : 'bg-neutral-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      <p className="text-sm text-neutral-500">{result.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </button>
                );
              })}
            </div>
          ) : searchQuery.length >= 2 && !loading ? (
            <div className="py-12 text-center text-neutral-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>לא נמצאו תוצאות עבור "{searchQuery}"</p>
            </div>
          ) : (
            <div className="py-8 px-4">
              <p className="text-sm text-neutral-500 mb-4">חיפוש מהיר</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(typeConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => navigate(config.path)}
                      className="flex items-center gap-2 p-3 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-lg text-neutral-300 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{config.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-700 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-neutral-700 rounded">↑↓</kbd>
              ניווט
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-neutral-700 rounded">Enter</kbd>
              בחר
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-neutral-700 rounded">Esc</kbd>
              סגור
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
