import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search as SearchIcon, StickyNote, ChevronLeft, ChevronRight } from 'lucide-react';
import NoteCard from '../components/Notes/List/NoteCard';
import Header from '../components/Notes/List/Header';
import SearchBar from '../components/Notes/List/Search';
import NotesGrid from '../components/Notes/List/NotesGrid';
import Pagination from '../components/Notes/List/Pagination';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import { getNotes, deleteNote as deleteNoteApi, setNotePin } from '../services/notes';

const ALL_NOTES = [
  { id: 1,  title: 'Q3 Marketing Strategy',      content: 'Focus on inbound leads and content marketing. Key initiatives include SEO optimization, social media campaigns targeting millennials, and a quarterly newsletter.',    status: 'published', pinned: true,  createdAt: '2026-06-15', tag: 'Marketing'   },
  { id: 2,  title: 'Product Roadmap V2',           content: 'Implement dark mode, user profiles, and API integrations. Phase 1: Dark mode and accessibility. Phase 2: Profiles. Phase 3: REST API.',                               status: 'draft',     pinned: false, createdAt: '2026-06-20', tag: 'Product'     },
  { id: 3,  title: 'Design Sync Notes',            content: 'Refine the border-radius on cards. Team agreed on 24px as the standard. Also discussed the new color system with indigo as the primary accent.',                      status: 'published', pinned: false, createdAt: '2026-06-25', tag: 'Design'      },
  { id: 4,  title: 'Engineering Sprint 14',        content: 'Fix the sidebar collapse bug on mobile. Resolve hydration mismatch in SSR. Add unit tests for auth flow. Performance optimization for the notes list.',                status: 'draft',     pinned: true,  createdAt: '2026-06-28', tag: 'Engineering' },
  { id: 5,  title: 'Weekly Retrospective',         content: 'What went well: Shipped the new note editor on time. Improvements: Better async communication. Action items: Set up a shared board, schedule bi-weekly syncs.',        status: 'published', pinned: false, createdAt: '2026-07-01', tag: 'Team'        },
  { id: 6,  title: 'User Research Findings',       content: 'Interviewed 12 users. Top pain points: Cannot find old notes easily, no tagging system, mobile experience needs work. Recommended: full-text search and tagging.',     status: 'published', pinned: false, createdAt: '2026-07-02', tag: 'Research'    },
  { id: 7,  title: 'Brand Identity Refresh',       content: 'New logo concepts reviewed. Settled on minimalist wordmark. Color palette updated to include a warmer neutral and a stronger primary indigo.',                          status: 'published', pinned: false, createdAt: '2026-07-03', tag: 'Design'      },
  { id: 8,  title: 'API Integration Spec',         content: 'Document all REST endpoints needed for the mobile client. Auth flow uses JWT refresh tokens. Rate limiting set at 100 req/min per user.',                              status: 'draft',     pinned: false, createdAt: '2026-07-04', tag: 'Engineering' },
  { id: 9,  title: 'Content Calendar – July',      content: 'Blog posts scheduled: 4 SEO articles, 2 case studies, 1 product update. Social posts: 3 per week across LinkedIn and X. Newsletter drops on the 15th.',              status: 'published', pinned: false, createdAt: '2026-07-05', tag: 'Marketing'   },
  { id: 10, title: 'Onboarding Flow Redesign',     content: 'Cut the number of onboarding steps from 7 to 3. New flow: create account → pick a template → start writing. Remove email verification from the critical path.',      status: 'draft',     pinned: true,  createdAt: '2026-07-06', tag: 'Product'     },
  { id: 11, title: 'Q3 OKR Review',                content: 'Key results progress: DAU up 18% (target 25%). Churn reduced to 4.2% (target 3%). NPS score 48 (target 50). Identify blockers for the remaining gap.',               status: 'published', pinned: false, createdAt: '2026-07-07', tag: 'Team'        },
  { id: 12, title: 'Accessibility Audit Notes',    content: 'All buttons need aria-labels. Color contrast ratio must meet WCAG AA (4.5:1). Focus indicators missing on custom components. Screen-reader testing scheduled.',        status: 'draft',     pinned: false, createdAt: '2026-07-08', tag: 'Engineering' },
];


const TABS = ['All', 'Pinned', 'Todo', 'In Progress', 'Done'];
const PER_PAGE = 3;

export default function NotesList() {
  const token = useSelector(state => state.auth.token);
  const queryClient = useQueryClient();


  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState(1);


  const handleSetSearch = (value) => { 
    setSearch(value); 
    setPage(1); 
  };
  const handleSetTabs = (value) => { 
    setTab(value); 
    setPage(1); 
  };

  const filter= {
     search:search,
     status: (tab == 'All' || tab == 'Pinned') ? '' : tab,
     limit: PER_PAGE,
     page: page,
     isPinned: tab === 'Pinned' ? true : ''
    }

  const { data: fetchedData, isLoading, isError } = useQuery({
    queryKey: ['notes', { page, search, tab }],
    queryFn: () => getNotes(token, filter),
  });

 
  const notes = fetchedData?.notes || [];
  const totalPages = fetchedData?.pagination?.totalPages || 1;
  const safePage = fetchedData?.pagination?.page || 1;
  const totalNotes = fetchedData?.pagination?.totalNotes || 0;

  // 5. Mutations (For deleting and pinning)
  const togglePinMutation = useMutation({
    mutationFn: (noteData) =>  setNotePin(token, noteData.id, noteData.isPinned), 
    onSuccess: () =>{ 
       queryClient.invalidateQueries({ queryKey: ['notes'] });
     
    },
    onError: (error) => {
      console.error("Error toggling pin:", error);
    }
       });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNoteApi(token , id), // Replace with your actual API call
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  const togglePin = (id, isPinned) => {
     togglePinMutation.mutate({id, isPinned: !isPinned}); // Pass the toggled status to the mutation
     
  };

  const deleteNote = (id) => {
    deleteMutation.mutate(id); 
  };

  
  const start = (safePage - 1) * PER_PAGE;

  const goTo = (p) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    setPage(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3) return [1, 2, 3, 4, '…', totalPages];
    if (safePage >= totalPages - 2) return [1, '…', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '…', safePage - 1, safePage, safePage + 1, '…', totalPages];
  };


  if (isLoading) return <p className="text-center py-10 text-gray-500">Loading notes...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load notes.</p>;

  return (
    <>
      {/* Header */}
      {/* Note: I passed totalNotes here assuming Header displays "Found X notes" */}
      <Header totalNotes={totalNotes} search={search} tab={tab} />

      {/* Search + Tabs */}
      <SearchBar 
        search={search} 
        setSearch={handleSetSearch} 
        tab={tab} 
        setTab={handleSetTabs} 
        TABS={TABS} 
      />

      {/* Notes grid */}
      {/* Since the backend only gives us the 3 notes for this page, `notes` is our paginated data */}
      <NotesGrid 
        totalPages={totalPages}
        paginated={notes} 
        search={search} 
        deleteNote={deleteNote} 
        togglePin={togglePin} 
      />

      {/* Pagination */}
      <Pagination 
        totalPages={totalPages} 
        safePage={safePage} 
        start={start} 
        totalNotes={totalNotes} 
        PER_PAGE={PER_PAGE} 
        goTo={goTo} 
        getPageNumbers={getPageNumbers} 
      />
    </>
  );
}