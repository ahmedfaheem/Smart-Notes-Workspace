import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pin, Pencil, Trash2, Calendar, Tag } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNote } from '../../services/notes';
import { useSelector } from 'react-redux';
import { deleteNote as deleteNoteApi , setNotePin} from '../../services/notes';
import IsLoading from '../../components/Shared/IsLoading';
import PageHead from '../../components/Shared/PageHead';
export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const queryClient = useQueryClient(); 

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', { id }],
    queryFn: () => getNote(token, id),
  });

  const note = data?.note; 

   const {mutate: deleteMutation, isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError} = useMutation({
    mutationFn: (id) => deleteNoteApi(token , id), 
    onSuccess: () => {
   queryClient.invalidateQueries({ 
      queryKey: ['notes'], 
      refetchType: 'none' 
    });
      navigate('/dashboard/notes');
    }
  });

  
   const togglePinMutation = useMutation({ 
    mutationFn: (id)=> setNotePin(token, id, !note.isPinned),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', { id }] });
    },  
    })

  const handleDelete = (id) => {
    deleteMutation(id);
  };


  const handleTogglePin = (id) => {
    togglePinMutation.mutate(id);
   console.log("Toggling pin for note ID:", id); // Placeholder for actual toggle pin logic
  }

  const formattedDate = note?.createdAt 
    ? new Date(note.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';


return <>
   <PageHead Pagetitle={note?.title || 'Note Detail'}
      description={note?.content || 'View your note details in Smart Notes App'}
       />

   {isLoading &&  
    <IsLoading/>
    }
    
    {isError && !note  &&
     <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 text-3xl">🗒️</div>
        <h3 className="font-semibold text-lg mb-2">Note not found</h3>
        <p className="text-sm text-gray-400 mb-6">This note may have been deleted or doesn't exist.</p>
        <Link to="/dashboard/notes" className="text-sm font-semibold text-indigo-500 hover:underline">
          ← Back to Notes
        </Link>
      </div>
    }

    {isDeleteLoading &&
      <div className="flex items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 text-3xl animate-spin">⏳</div>
        <h3 className="font-semibold text-lg mb-2">Deleting note...</h3>
        <p className="text-sm text-gray-400">Please wait while we delete the note.</p>
      </div>
    }

    {isDeleteError && 
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 text-3xl">❌</div>
        <h3 className="font-semibold text-lg mb-2">Failed to delete note</h3>
        <p className="text-sm text-gray-400 mb-6">{deleteError?.message || 'An error occurred while trying to delete the note.'}</p>
        <button onClick={() => handleDelete(note._id)} className="text-sm font-semibold text-indigo-500 hover:underline">
          Retry Delete
        </button>
      </div>
    }

    
    {note &&
    <div className="max-w-3xl mx-auto">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/dashboard/notes"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> All Notes
        </Link>
        <div className="flex items-center gap-2">
          
          <button
            onClick={() => handleTogglePin(note._id)}
            title={note.isPinned ? 'Unpin' : 'Pin'}
            className={`p-2.5 rounded-xl border transition-all ${
              note.isPinned
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 border-indigo-200 dark:border-indigo-500/20'
                : 'bg-white dark:bg-[#111111] text-gray-400 border-gray-200 dark:border-white/10 hover:text-indigo-500'
            }`}
          >
            <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''}`} />
          </button>

          <Link
            to={`/dashboard/notes/${id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
          >
            <Pencil className="w-4 h-4" /> Edit
          </Link>
          
          <button
            onClick={() => handleDelete(note._id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-500/20"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden">
        
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-white/5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${
              note.status === 'Done'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 ring-emerald-500/20'
                : 'bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-300 ring-slate-500/20'
            }`}>
              {note.status}
            </span>

            {note.category && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
                <Tag className="w-3 h-3" /> {note.category}
              </span>
            )}

            {note.isPinned && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
                <Pin className="w-3 h-3 fill-current" /> Pinned
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 mb-3">
            {note.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </div>
        </div>

    
        <div className="px-8 py-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {note.content.split('\n').map((line, i) => (
              line === '' ? (
                <br key={i} />
              ) : (
                <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                  {line}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
 
     
      <div className="mt-6 flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
        <Link to="/dashboard/notes" className="hover:text-indigo-500 transition-colors">
          ← Back to all notes
        </Link>
        <Link to={`/dashboard/notes/${id}/edit`} className="hover:text-indigo-500 transition-colors">
          Edit this note →
        </Link>
      </div>
    </div>
    
    }
</>
 
}