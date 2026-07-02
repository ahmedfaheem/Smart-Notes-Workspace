import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, ArrowRight } from 'lucide-react';
import NoteCard from '../Notes/List/NoteCard';

export default function RecentNotes() {



    const RECENT_NOTES = [
      { id: 1, title: 'Q3 Marketing Strategy', content: 'Focus on inbound leads and content marketing. Key initiatives include SEO optimization and social media campaigns.', status: 'published', pinned: true },
      { id: 2, title: 'Product Roadmap V2', content: 'Implement dark mode, user profiles, and API integrations for the next major release.', status: 'draft', pinned: false },
      { id: 3, title: 'Design Sync Notes', content: 'Refine the border-radius on cards. Team agreed on 24px as the standard for all card components.', status: 'published', pinned: false },
    ];
    
      const [notes, setNotes] = useState(RECENT_NOTES);
    
      const togglePin  = (id) => setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
      const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  return (
   <>
    <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold tracking-tight">Recent Notes</h3>
        <Link to="/dashboard/notes" className="text-sm text-indigo-500 hover:underline font-medium flex items-center gap-1">
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-600">
          <StickyNote className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No notes yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {notes.map(note => (
            <NoteCard key={note.id} note={note} onDelete={deleteNote} onTogglePin={togglePin} />
          ))}
        </div>
      )}
   </>
  )
}
