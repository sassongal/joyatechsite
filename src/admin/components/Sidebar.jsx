// src/admin/components/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  MessageSquareQuote,
  Image,
  Layers,
  Images,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'דאשבורד', exact: true },
  { path: '/admin/articles', icon: FileText, label: 'מאמרים' },
  { path: '/admin/tools', icon: Wrench, label: 'כלים' },
  { path: '/admin/testimonials', icon: MessageSquareQuote, label: 'המלצות' },
  { path: '/admin/portfolio', icon: Image, label: 'תיק עבודות' },
  { path: '/admin/carousels', icon: Layers, label: 'קרוסלות' },
  { path: '/admin/media', icon: Images, label: 'מדיה' },
  { type: 'divider' },
  { path: '/admin/settings', icon: Settings, label: 'הגדרות' },
  { path: '/admin/activity', icon: Activity, label: 'יומן פעילות' },
];

export default function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }) {
  const location = useLocation();

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-700">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className="font-bold text-white">Joya Admin</span>
          </div>
        )}
        
        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Desktop collapse button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            if (item.type === 'divider') {
              return <li key={index} className="my-4 border-t border-neutral-700" />;
            }

            const Icon = item.icon;
            const active = isActive(item.path, item.exact);

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? 'bg-primary-600 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-neutral-700">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white border border-neutral-600 hover:border-neutral-500 rounded-lg transition-colors"
          >
            צפה באתר
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-neutral-800 border-l border-neutral-700 z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          lg:static lg:translate-x-0
          flex flex-col
        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
