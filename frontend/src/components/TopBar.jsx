import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/authService';
import { SearchIcon, CogIcon } from './icons';

export default function TopBar({ onSearch, onClear, showSearch = false, onMenuToggle }) {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) onClear();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const initial = (user?.name || user?.email || '?').charAt(0).toUpperCase();

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center gap-3 px-4 md:px-6 shrink-0">
      <button onClick={onMenuToggle} className="md:hidden text-slate-600 text-2xl leading-none px-1">
        ☰
      </button>

      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.5 15a3.5 3.5 0 01-.35-6.982A5.001 5.001 0 0115 8a3.5 3.5 0 010 7H5.5z" />
          </svg>
        </div>
        <span className="hidden sm:block font-semibold text-slate-900">Cloud Storage</span>
      </div>

      {showSearch ? (
        <form
          onSubmit={handleSubmit}
          className="flex-1 max-w-xl mx-auto flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2"
        >
          <SearchIcon className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in Drive"
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
          {query && (
            <button type="button" onClick={handleClear} className="text-xs text-slate-400 hover:text-slate-700">
              Clear
            </button>
          )}
        </form>
      ) : (
        <div className="flex-1" />
      )}

      <div className="flex items-center gap-3 shrink-0 relative" ref={menuRef}>
        <CogIcon className="w-5 h-5 text-slate-400" />
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium"
        >
          {initial}
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-11 bg-white border border-slate-200 rounded-lg shadow-lg py-2 w-56 z-20">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-800 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}