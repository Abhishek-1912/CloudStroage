import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ShareIcon, StarIcon, TrashIcon } from './icons';

const navItems = [
  { to: '/drive', label: 'My Drive', Icon: HomeIcon },
  { to: '/shared', label: 'Shared with me', Icon: ShareIcon },
  { to: '/starred', label: 'Starred', Icon: StarIcon },
  { to: '/trash', label: 'Trash', Icon: TrashIcon },
];

export default function Sidebar({ onNavigate }) {
  const location = useLocation();

  return (
    <aside className="w-64 md:w-56 bg-white border-r border-slate-200 h-full md:h-[calc(100vh-4rem)] flex flex-col p-4">
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, Icon }) => {
          const active =
            location.pathname === to || (to === '/drive' && location.pathname.startsWith('/drive'));
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition ${
                active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}