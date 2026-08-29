import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
        <h1 className="text-lg font-semibold text-slate-900">Cloud Storage</h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-600 text-2xl leading-none px-2"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar: fixed on desktop, slide-down on mobile */}
      <aside
        className={`${
          open ? 'block' : 'hidden'
        } md:block w-full md:w-56 bg-white border-r border-slate-200 md:h-screen flex flex-col p-4`}
      >
        <h1 className="hidden md:block text-lg font-semibold text-slate-900 mb-6">
          Cloud Storage
        </h1>

        <nav className="flex-1 space-y-1">
          <Link
            to="/drive"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100"
          >
            My Drive
          </Link>
          <Link
            to="/trash"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50"
          >
            Trash
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="text-sm text-slate-500 hover:text-slate-800 text-left px-3 py-2"
        >
          Log out
        </button>
      </aside>
    </>
  );
}