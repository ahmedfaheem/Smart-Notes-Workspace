import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';


export default function Header({filtered, search, tab}) {
  return (
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Notes</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {filtered.length} {filtered.length === 1 ? 'note' : 'notes'}{search || tab !== 'All' ? ' found' : ' in your workspace'}
          </p>
        </div>
        <Link
          to="/dashboard/notes/create"
          className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Note
        </Link>
      </div>
  )
}
