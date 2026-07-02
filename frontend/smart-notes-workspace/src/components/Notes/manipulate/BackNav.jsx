import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


export default function BackNav({ id, wordCount }) {
  return (
       <div className="flex items-center justify-between mb-8">
        <Link
          to={`/dashboard/notes/${id ? id : ''}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {id ? 'Note' : 'Notes'}
        </Link>
        <span className="text-xs text-gray-400">{wordCount} words</span>
      </div>
  )
}
