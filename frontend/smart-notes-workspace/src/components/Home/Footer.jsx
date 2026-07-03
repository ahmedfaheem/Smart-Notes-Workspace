
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function Footer() {
      const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
     <footer className="border-t border-gray-100 dark:border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
            <div className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center text-xs font-black">N</div>
            SmartNotes
          </div>
          <p>© 2026 SmartNotes.</p>
          <div className="flex gap-5">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
         
            {!isLoggedIn && (
              <>
                <Link to="/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">Sign in</Link>
                <Link to="/register" className="hover:text-gray-900 dark:hover:text-white transition-colors">Sign up</Link>
              </>
            )}
            {isLoggedIn && (
              <Link to="/dashboard/profile" className="hover:text-gray-900 dark:hover:text-white transition-colors">Profile</Link>
            )}
          </div>
        </div>
      </footer>
  )
}
