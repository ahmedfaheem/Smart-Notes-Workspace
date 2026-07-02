import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pin, Save, FileText } from 'lucide-react';
import BackNav from '../components/Notes/manipulate/BackNav';

const TAGS = ['Marketing', 'Product', 'Design', 'Engineering', 'Team', 'Research', 'Personal'];

export default function CreateNote() {
  const navigate = useNavigate();

  const [title,   setTitle]   = useState('');
  const [content, setContent] = useState('');
  const [status,  setStatus]  = useState('draft');
  const [pinned,  setPinned]  = useState(false);
  const [tag,     setTag]     = useState('');
  const [saved,   setSaved]   = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    // Simulate save — in a real app this would call an API
    setSaved(true);
    setTimeout(() => navigate('/dashboard/notes'), 1200);
  };
 
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back nav */}
            <BackNav  wordCount={wordCount} />
      

      <form onSubmit={handleSave}>
        {/* Card */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden mb-5">
          {/* Title */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-100 dark:border-white/5">
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full text-2xl font-bold bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none"
            />
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <textarea
              placeholder="Start writing your note..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={14}
              className="w-full bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-600 text-base leading-relaxed resize-none focus:outline-none"
            />
          </div>
        </div>

        {/* Options bar */}
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
          
          {/* Status */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-14">Status</span>
            <div className="flex bg-gray-100 dark:bg-white/5 rounded-xl p-1 gap-1">
              {['draft', 'published'].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                    status === s
                      ? s === 'published'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-white dark:bg-[#222] text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-white/10" />

          {/* Pin */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-14">Pin</span>
            <button
              type="button"
              onClick={() => setPinned(!pinned)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                pinned
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-transparent'
              }`}
            >
              <Pin className={`w-3.5 h-3.5 ${pinned ? 'fill-current' : ''}`} />
              {pinned ? 'Pinned' : 'Not pinned'}
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-white/10" />

          {/* Tag */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-14">Tag</span>
            <select
              value={tag}
              onChange={e => setTag(e.target.value)}
              className="flex-1 text-xs font-medium bg-gray-100 dark:bg-white/5 border-0 rounded-xl px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">No tag</option>
              {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard/notes"
            className="px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!title.trim() || saved}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {saved ? (
              <><FileText className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Note</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
