import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 ${className}`}
    >
      <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
        <Sun className="w-5 h-5" />
      </span>
      <span className={`absolute transition-all duration-300 ${isDark ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
        <Moon className="w-5 h-5" />
      </span>
    </button>
  );
}
