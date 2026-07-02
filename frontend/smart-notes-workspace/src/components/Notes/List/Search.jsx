import { Search as SearchIcon } from 'lucide-react';

export default function Search({ search, setSearch, tab, setTab, TABS }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-indigo-400 dark:focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex bg-gray-100 dark:bg-white/5 rounded-xl p-1 gap-1">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                tab === t
                  ? 'bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
  )
}
