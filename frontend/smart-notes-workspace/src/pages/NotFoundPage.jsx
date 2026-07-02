import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, FileSearch } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center px-6 transition-colors duration-300 relative overflow-hidden">

    
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-500/15 dark:via-purple-500/10 blur-3xl rounded-full" />
        <div className="absolute top-20 -left-20 w-64 h-64 bg-indigo-400/10 dark:bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-64 h-64 bg-purple-400/10 dark:bg-purple-400/10 rounded-full blur-3xl" />
      </div>

    
      <div className="relative mb-6 select-none">
        <span className="text-[160px] sm:text-[200px] font-black leading-none tracking-tighter bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 bg-clip-text text-transparent">
          404
        </span>
      
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 shadow-xl flex items-center justify-center">
            <FileSearch className="w-10 h-10 text-indigo-500" />
          </div>
        </div>
      </div>

    
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 text-center">
        Page not found
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg text-center max-w-sm mb-10 leading-relaxed">
        Looks like this page doesn't exist or was moved. Let's get you back on track.
      </p>

  
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-black/10 dark:shadow-white/5"
        >
          <Home className="w-4 h-4" />
          Back to home
        </Link>
      </div>

    
      <p className="mt-16 text-xs text-gray-400 dark:text-gray-600">
        Smart<span className="text-indigo-500">Notes</span> · Error 404
      </p>
    </div>
  );
}
