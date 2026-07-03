import { Pin, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote as deleteNoteApi, setNotePin } from '../../../services/notes';
import { useSelector } from 'react-redux';

export default function NoteCard({ note}) {

  const token = useSelector(state => state.auth.token);
  const queryClient = useQueryClient();

   const togglePinMutation = useMutation({
    mutationFn: (noteData) =>  setNotePin(token, noteData.id, noteData.isPinned), 
    onSuccess: () =>{ 
       queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
       });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNoteApi(token , id), 
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  const togglePin = (id, isPinned) => {
     togglePinMutation.mutate({id, isPinned: !isPinned});
     
  };

  const deleteNote = (id) => {
    deleteMutation.mutate(id); 
  };


  return (
    <div className="group relative bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col h-56 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:-translate-y-1 overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <h4 className="font-semibold text-lg tracking-tight truncate pr-6 text-gray-900 dark:text-gray-100">{note.title}</h4>
        <button
          onClick={(e) => { e.stopPropagation(); togglePin(note._id, note.isPinned); }}
          className={`transition-colors duration-200 ${note.isPinned ? 'text-black dark:text-white' : 'text-gray-400 hover:text-indigo-500'}`}
        >
          <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 flex-1 relative z-10 leading-relaxed">{note.content}</p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-white/5 relative z-10">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          note.status === 'published'
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 ring-1 ring-emerald-500/20'
            : 'bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-300 ring-1 ring-slate-500/20'
        }`}>
          {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
        </span>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={(e) => { e.stopPropagation(); deleteNote(note._id); }}
            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <Link
            to={`/dashboard/notes/${note._id}`}
            onClick={e => e.stopPropagation()}
            className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}