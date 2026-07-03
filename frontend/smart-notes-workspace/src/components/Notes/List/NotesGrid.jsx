import { StickyNote, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteCard from './NoteCard';
import { Plus } from 'lucide-react';
export default function NotesGrid({ totalPages, paginated, search }) {
  return (
   <>
       {totalPages === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4">
            {search ? <SearchIcon className="w-7 h-7 text-gray-400" /> : <StickyNote className="w-7 h-7 text-gray-400" />}
          </div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
            {search ? 'No results found' : 'No notes here'}
          </h3>
          <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">
            {search ? `No notes match "${search}". Try a different keyword.` : 'Create your first note to get started.'}
          </p>
          {!search && (
            <Link to="/dashboard/notes/create" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:underline">
              <Plus className="w-4 h-4" /> Create note
            </Link>
          )}
        </div>
      ) : (
       
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 min-h-[280px]">
            {paginated.map(note => (
              <NoteCard key={note._id} note={note}  />
            ))}
          </div>
        )}
        </>
  )
}
