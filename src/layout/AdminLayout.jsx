import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link to="/admin/blogs" className="text-xl font-bold">
          JoyaTech Admin
        </Link>
        <nav className="flex gap-4">
          <Link to="/admin/blogs" className="hover:underline">
            בלוג
          </Link>
          <Link to="/admin/services" className="hover:underline">
            שירותים
          </Link>
          {/* אפשר להוסיף כאן עוד בהמשך */}
        </nav>
      </header>

      {/* Admin Content */}
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} JoyaTech CMS
      </footer>
    </div>
  );
}
