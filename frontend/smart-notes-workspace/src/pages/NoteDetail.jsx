import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pin, Pencil, Trash2, Calendar, Tag } from 'lucide-react';

const NOTES = [
  { id: 1, title: 'Q3 Marketing Strategy', content: 'Focus on inbound leads and content marketing. Key initiatives include SEO optimization, social media campaigns targeting millennials, and a quarterly newsletter.\n\nBudget allocation:\n- 40% digital ads\n- 30% content creation\n- 30% events\n\nExpected ROI: 3x within the quarter.', status: 'published', pinned: true,  createdAt: '2026-06-15', tag: 'Marketing' },
  { id: 2, title: 'Product Roadmap V2',    content: 'Implement dark mode, user profiles, and API integrations.\n\nPhase 1: Dark mode and accessibility improvements.\nPhase 2: User profiles with avatars and customization.\nPhase 3: REST API and third-party integrations including Slack and Notion.', status: 'draft',     pinned: false, createdAt: '2026-06-20', tag: 'Product' },
  { id: 3, title: 'Design Sync Notes',     content: 'Refine the border-radius on cards. Needs to be more rounded. Team agreed on 24px as the standard.\n\nAlso discussed the new color system — moving from gray-based to a more vibrant palette with indigo as the primary accent.', status: 'published', pinned: false, createdAt: '2026-06-25', tag: 'Design' },
  { id: 4, title: 'Engineering Sprint 14', content: 'Fix the sidebar collapse bug on mobile.\nResolve hydration mismatch in SSR.\nAdd unit tests for auth flow.\nPerformance optimization for the notes list with virtual scrolling.', status: 'draft',     pinned: true,  createdAt: '2026-06-28', tag: 'Engineering' },
  { id: 5, title: 'Weekly Retrospective',  content: 'What went well: Shipped the new note editor on time. Collaboration was smooth.\n\nImprovements: Need better async communication.\n\nAction items: Set up a shared board, schedule bi-weekly syncs.', status: 'published', pinned: false, createdAt: '2026-07-01', tag: 'Team' },
  { id: 6, title: 'User Research Findings', content: 'Interviewed 12 users. Top pain points:\n1) Cannot find old notes easily\n2) No tagging system\n3) Mobile experience needs work\n\nRecommended features: full-text search, tagging, and a mobile app.', status: 'published', pinned: false, createdAt: '2026-07-02', tag: 'Research' },
];

export default function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const found = NOTES.find(n => n.id === parseInt(id));

  const [pinned,    setPinned]    = useState(found?.pinned ?? false);
  const [deleted,   setDeleted]   = useState(false);

  if (!found || deleted) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 text-3xl">🗒️</div>
        <h3 className="font-semibold text-lg mb-2">Note not found</h3>
        <p className="text-sm text-gray-400 mb-6">This note may have been deleted or doesn't exist.</p>
        <Link to="/dashboard/notes" className="text-sm font-semibold text-indigo-500 hover:underline">
          ← Back to Notes
        </Link>
      </div>
    );
  }

  const note = { ...found, pinned };

  const handleDelete = () => {
    setDeleted(true);
    setTimeout(() => navigate('/dashboard/notes'), 800);
  };

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
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
            onClick={() => setPinned(!pinned)}
            title={pinned ? 'Unpin' : 'Pin'}
            className={`p-2.5 rounded-xl border transition-all ${
              pinned
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 border-indigo-200 dark:border-indigo-500/20'
                : 'bg-white dark:bg-[#111111] text-gray-400 border-gray-200 dark:border-white/10 hover:text-indigo-500'
            }`}
          >
            <Pin className={`w-4 h-4 ${pinned ? 'fill-current' : ''}`} />
          </button>
          <Link
            to={`/dashboard/notes/${id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
          >
            <Pencil className="w-4 h-4" /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all border border-red-100 dark:border-red-500/20"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Note card */}
      <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-white/5">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${
              note.status === 'published'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 ring-emerald-500/20'
                : 'bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-300 ring-slate-500/20'
            }`}>
              {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
            </span>
            {note.tag && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-500/20">
                <Tag className="w-3 h-3" /> {note.tag}
              </span>
            )}
            {pinned && (
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

        {/* Content */}
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
 
      {/* Footer nav */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
        <Link to="/dashboard/notes" className="hover:text-indigo-500 transition-colors">
          ← Back to all notes
        </Link>
        <Link to={`/dashboard/notes/${id}/edit`} className="hover:text-indigo-500 transition-colors">
          Edit this note →
        </Link>
      </div>
    </div>
  );
}
