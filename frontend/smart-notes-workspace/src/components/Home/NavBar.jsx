import { Link } from "react-router-dom";
import ThemeToggle from "../Shared/ThemeToggle";

export default function NavBar() {
  return (
     <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center text-sm font-black shadow-md">N</div>
            <span>Smart<span className="text-indigo-500">Notes</span></span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-gray-900 dark:hover:text-white transition-colors">Reviews</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="hidden sm:inline-flex text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white px-4 py-2 transition-colors">
              Sign in
            </Link>
            <Link
              to="/register"
              className="bg-black dark:bg-white text-white dark:text-black text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
  )
}
