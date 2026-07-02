import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pin, Save } from 'lucide-react';
import BackNav from '../components/Notes/manipulate/BackNav';
 
const NOTES = [
  { id: 1, title: 'Q3 Marketing Strategy', content: 'Focus on inbound leads and content marketing. Key initiatives include SEO optimization, social media campaigns targeting millennials, and a quarterly newsletter.\n\nBudget allocation:\n- 40% digital ads\n- 30% content creation\n- 30% events\n\nExpected ROI: 3x within the quarter.', status: 'published', pinned: true,  tag: 'Marketing' },
  { id: 2, title: 'Product Roadmap V2',    content: 'Implement dark mode, user profiles, and API integrations.\n\nPhase 1: Dark mode and accessibility improvements.\nPhase 2: User profiles with avatars and customization.\nPhase 3: REST API and third-party integrations including Slack and Notion.', status: 'draft',     pinned: false, tag: 'Product' },
  { id: 3, title: 'Design Sync Notes',     content: 'Refine the border-radius on cards. Needs to be more rounded. Team agreed on 24px as the standard.\n\nAlso discussed the new color system - moving from gray-based to a more vibrant palette with indigo as the primary accent.', status: 'published', pinned: false, tag: 'Design' },
  { id: 4, title: 'Engineering Sprint 14', content: 'Fix the sidebar collapse bug on mobile.\nResolve hydration mismatch in SSR.\nAdd unit tests for auth flow.\nPerformance optimization for the notes list with virtual scrolling.', status: 'draft',     pinned: true,  tag: 'Engineering' },
  { id: 5, title: 'Weekly Retrospective',  content: 'What went well: Shipped the new note editor on time. Collaboration was smooth.\n\nImprovements: Need better async communication.\n\nAction items: Set up a shared board, schedule bi-weekly syncs.', status: 'published', pinned: false, tag: 'Team' },
  { id: 6, title: 'User Research Findings', content: 'Interviewed 12 users. Top pain points:\n1) Cannot find old notes easily\n2) No tagging system\n3) Mobile experience needs work\n\nRecommended features: full-text search, tagging, and a mobile app.', status: 'published', pinned: false, tag: 'Research' },
];

const TAGS = ['Marketing', 'Product', 'Design', 'Engineering', 'Team', 'Research', 'Personal'];

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = NOTES.find(n => n.id === parseInt(id)) || NOTES[0];

  const [title,   setTitle]   = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [status,  setStatus]  = useState(note.status);
  const [pinned,  setPinned]  = useState(note.pinned);
  const [tag,     setTag]     = useState(note.tag || '');
  const [saved,   setSaved]   = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaved(true);
    setTimeout(() => navigate(`/dashboard/notes/${id}`), 1200);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back nav */}
      <BackNav id={id} wordCount={wordCount} />

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
            to={`/dashboard/notes/${id}`}
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
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
