// src/admin/hooks/useKeyboardShortcuts.js
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Global keyboard shortcuts for admin dashboard
 * 
 * Shortcuts:
 * - Cmd/Ctrl + K: Open search
 * - Cmd/Ctrl + S: Save (triggers callback)
 * - Cmd/Ctrl + N: New item (triggers callback)
 * - Cmd/Ctrl + /: Show shortcuts help
 * - Escape: Close modal/go back
 * - G then H: Go to home (dashboard)
 * - G then A: Go to articles
 * - G then T: Go to tools
 * - G then M: Go to media
 * - G then S: Go to settings
 */

export function useKeyboardShortcuts({ 
  onSave, 
  onNew, 
  onSearch,
  onEscape,
  enabled = true 
}) {
  const navigate = useNavigate();
  
  // Track "g" key for navigation shortcuts
  let gPressed = false;
  let gTimeout = null;

  const handleKeyDown = useCallback((event) => {
    if (!enabled) return;

    // Ignore if typing in an input
    const target = event.target;
    const isInputFocused = 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.isContentEditable;

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdKey = isMac ? event.metaKey : event.ctrlKey;

    // Cmd/Ctrl + K: Search
    if (cmdKey && event.key === 'k') {
      event.preventDefault();
      onSearch?.();
      return;
    }

    // Cmd/Ctrl + S: Save (allow in inputs)
    if (cmdKey && event.key === 's') {
      event.preventDefault();
      onSave?.();
      return;
    }

    // Escape: Close/Go back
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape?.();
      return;
    }

    // Following shortcuts only work when not in input
    if (isInputFocused) return;

    // Cmd/Ctrl + N: New
    if (cmdKey && event.key === 'n') {
      event.preventDefault();
      onNew?.();
      return;
    }

    // Cmd/Ctrl + /: Show help
    if (cmdKey && event.key === '/') {
      event.preventDefault();
      showShortcutsHelp();
      return;
    }

    // G + key navigation
    if (event.key === 'g' && !gPressed) {
      gPressed = true;
      gTimeout = setTimeout(() => {
        gPressed = false;
      }, 1000);
      return;
    }

    if (gPressed) {
      clearTimeout(gTimeout);
      gPressed = false;

      switch (event.key) {
        case 'h':
          navigate('/admin');
          break;
        case 'a':
          navigate('/admin/articles');
          break;
        case 't':
          navigate('/admin/tools');
          break;
        case 'm':
          navigate('/admin/media');
          break;
        case 's':
          navigate('/admin/settings');
          break;
        case 'c':
          navigate('/admin/carousels');
          break;
        case 'p':
          navigate('/admin/portfolio');
          break;
        default:
          break;
      }
    }
  }, [enabled, onSave, onNew, onSearch, onEscape, navigate]);

  const showShortcutsHelp = () => {
    // Could be replaced with a modal
    alert(`
קיצורי מקלדת:

⌘/Ctrl + K: חיפוש
⌘/Ctrl + S: שמירה
⌘/Ctrl + N: פריט חדש
⌘/Ctrl + /: עזרה
Escape: סגור/חזור

ניווט מהיר (לחץ G ואז):
G → H: דאשבורד
G → A: מאמרים
G → T: כלים
G → M: מדיה
G → S: הגדרות
G → C: קרוסלות
G → P: פורטפוליו
    `);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (gTimeout) clearTimeout(gTimeout);
    };
  }, [handleKeyDown]);

  return { showShortcutsHelp };
}

export default useKeyboardShortcuts;
