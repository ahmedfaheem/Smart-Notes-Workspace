import { Menu, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../Shared/ThemeToggle';

export default function Topbar({ openSidebar }) {
  const navigate = useNavigate();
  return (
    <header className="h-16 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <button onClick={openSidebar} className="lg:hidden text-gray-500 hover:text-black dark:hover:text-white transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            className="pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-white/5 border border-transparent focus:border-gray-300 dark:focus:border-white/20 rounded-lg w-64 focus:ring-0 transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => navigate('/dashboard/notes/create')}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Note
        </button>
      </div>
    </header>
  );
}

