import { LayoutDashboard, User, LogOut, X, StickyNote, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
export default function Sidebar({ isMobileOpen, closeSidebar }) {
  const location = useLocation();

  const getLinkClass = (path, exact = false) => {
    const isActive = exact
      ? location.pathname === path
      : location.pathname === path || location.pathname.startsWith(path + '/');
    return `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
    }`;
  };
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout()); 
    navigate('/login');
  }

  return (
    <aside className={`w-64 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-[#111111] flex flex-col transition-transform duration-300 z-50 absolute lg:relative h-full ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-white/10 justify-between">
        <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity">
          <div className="w-7 h-7 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center text-xs font-black">N</div>
          <span>Smart<span className="text-indigo-500">Notes</span></span>
        </Link>
        <button onClick={closeSidebar} className="lg:hidden text-gray-500"><X className="w-5 h-5" /></button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <Link to="/dashboard" className={getLinkClass('/dashboard', true)} onClick={closeSidebar}>
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </Link>
        <Link to="/dashboard/notes" className={getLinkClass('/dashboard/notes')} onClick={closeSidebar}>
          <StickyNote className="w-4 h-4" /> Notes
        </Link>
        <Link to="/dashboard/profile" className={getLinkClass('/dashboard/profile', true)} onClick={closeSidebar}>
          <User className="w-4 h-4" /> Profile
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-1">
        <Link to="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <Home className="w-4 h-4" /> Home
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
          <LogOut className="w-4 h-4" />
           Log out
        </button>
      </div>
    </aside>
  );
}