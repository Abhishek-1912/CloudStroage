import { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

export default function PageLayout({ children, showSearch = false, onSearch, onClear }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        showSearch={showSearch}
        onSearch={onSearch}
        onClear={onClear}
        onMenuToggle={() => setSidebarOpen((o) => !o)}
      />
      <div className="flex flex-1 min-h-0">
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}