// src/admin/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  Moon,
  Sun,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ onMenuClick, onSearchClick, isDarkMode, onToggleDarkMode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  // Mock notifications - will be replaced with real data
  const notifications = [
    { id: 1, text: 'מאמר חדש נוסף', time: 'לפני 5 דקות', unread: true },
    { id: 2, text: 'פנייה חדשה מהאתר', time: 'לפני שעה', unread: true },
    { id: 3, text: 'גיבוי יומי הושלם', time: 'לפני 3 שעות', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-4">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Button */}
        <button
          onClick={onSearchClick}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-neutral-700/50 border border-neutral-600 rounded-lg text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>חיפוש...</span>
          <kbd className="px-1.5 py-0.5 bg-neutral-600 text-xs rounded">⌘K</kbd>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg"
          title={isDarkMode ? 'מצב בהיר' : 'מצב כהה'}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute left-0 mt-2 w-80 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl z-50">
              <div className="p-3 border-b border-neutral-700">
                <h3 className="font-semibold text-white">התראות</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-neutral-500">
                    אין התראות חדשות
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-neutral-700 last:border-0 hover:bg-neutral-700/50 cursor-pointer ${
                        notification.unread ? 'bg-primary-500/5' : ''
                      }`}
                    >
                      <p className="text-sm text-white">{notification.text}</p>
                      <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-neutral-700">
                <button className="w-full py-2 text-sm text-primary-400 hover:text-primary-300">
                  צפה בכל ההתראות
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="hidden md:block text-sm font-medium text-white">
              {user?.displayName || user?.email?.split('@')[0] || 'Admin'}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showUserMenu && (
            <div className="absolute left-0 mt-2 w-56 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl z-50">
              <div className="p-3 border-b border-neutral-700">
                <p className="text-sm font-medium text-white">
                  {user?.displayName || 'Admin'}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.email}
                </p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/admin/settings');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-700 rounded-lg"
                >
                  <Settings className="w-4 h-4" />
                  הגדרות
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-neutral-700 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  התנתק
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
