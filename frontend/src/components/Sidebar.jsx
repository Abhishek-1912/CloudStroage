import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="w-56 bg-white border-r border-slate-200 h-screen flex flex-col p-4">
      <h1 className="text-lg font-semibold text-slate-900 mb-6">Cloud Storage</h1>

      <nav className="flex-1 space-y-1">
        <Link
          to="/drive"
          className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100"
        >
          My Drive
        </Link>
        <Link
          to="/trash"
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
  );
}