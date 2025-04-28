import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Mail } from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const links = [
    { to: '/admin/blogs', label: 'בלוג', icon: <FileText size={20} /> },
    { to: '/admin/services', label: 'שירותים', icon: <Briefcase size={20} /> },
    { to: '/admin/magazine', label: 'מגזין', icon: <LayoutDashboard size={20} /> },
    { to: '/admin/contacts', label: 'פניות', icon: <Mail size={20} /> },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col p-4">
      <div className="text-2xl font-bold mb-8">
        JoyaTech CMS
      </div>

      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-all ${
              location.pathname.startsWith(link.to) ? 'bg-gray-700' : ''
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* אפשר להוסיף עוד אפשרויות כאן בהמשך */}
    </aside>
  );
}
