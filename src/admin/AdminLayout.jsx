// src/admin/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import GlobalSearch from './components/GlobalSearch';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Admin is dark by default
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: () => setSearchOpen(true),
    onEscape: () => {
      if (searchOpen) setSearchOpen(false);
      else if (mobileMenuOpen) setMobileMenuOpen(false);
    },
  });

  // Load preferences from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('admin_sidebar_collapsed');
    if (savedCollapsed) {
      setSidebarCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  // Save sidebar state
  const handleToggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('admin_sidebar_collapsed', JSON.stringify(newState));
  };

  // Handle dark mode toggle
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Could be extended to apply light theme in the future
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [children]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white" dir="rtl">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
          isMobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        {/* Main content */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? 'lg:mr-16' : 'lg:mr-64'
        }`}>
          {/* Navbar */}
          <Navbar 
            onMenuClick={() => setMobileMenuOpen(true)}
            onSearchClick={() => setSearchOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />

          {/* Page content */}
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </div>
  );
}
