import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search as SearchIcon, StickyNote, ChevronLeft, ChevronRight } from 'lucide-react';
import NoteCard from '../../components/Notes/List/NoteCard';
import Header from '../../components/Notes/List/Header';
import SearchBar from '../../components/Notes/List/Search';
import NotesGrid from '../../components/Notes/List/NotesGrid';
import Pagination from '../../components/Notes/List/Pagination';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'; 
import { getNotes, deleteNote as deleteNoteApi, setNotePin } from '../../services/notes';
import IsLoading from '../../components/Shared/IsLoading';
import PageHead from '../../components/Shared/PageHead';


const TABS = ['All', 'Pinned', 'Todo', 'In Progress', 'Done'];
const PER_PAGE = 6;

export default function NotesList() {
  const token = useSelector(state => state.auth.token);
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState(1);

  // Debounce search: wait 400ms after user stops typing before hitting the API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 when debounced search or tab changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tab]);

  const handleSetSearch = (value) => { 
    setSearch(value); 
  };
  const handleSetTabs = (value) => { 
    setTab(value); 
    setPage(1); 
  };

  const filter = {
    search: debouncedSearch,
    status: (tab == 'All' || tab == 'Pinned') ? '' : tab,
    limit: PER_PAGE,
    page: page,
    isPinned: tab === 'Pinned' ? true : ''
  };

  const { data: fetchedData, isLoading, isFetching, isError } = useQuery({
    queryKey: ['notes', { page, search: debouncedSearch, tab }],
    queryFn: () => getNotes(token, filter),
    placeholderData: keepPreviousData, // dont show loading state when switching pages
  });

  const notes = fetchedData?.notes || [];
  const totalPages = fetchedData?.pagination?.totalPages || 0;
  const safePage = fetchedData?.pagination?.page || 1;
  const totalNotes = fetchedData?.pagination?.totalNotes || 0;

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

  // Only show full-page loading on the very first load (no data yet)
  if (isLoading) return <IsLoading/>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load notes.</p>;

  return (
    <div className={isFetching ? 'opacity-60 transition-opacity duration-200' : 'transition-opacity duration-200'}>
      <PageHead Pagetitle="Notes List"
      description="View and manage your notes in Smart Notes App"
       />
      <Header totalNotes={totalNotes} search={search} tab={tab} />

   
      <SearchBar 
        search={search} 
        setSearch={handleSetSearch} 
        tab={tab} 
        setTab={handleSetTabs} 
        TABS={TABS} 
      />

      <NotesGrid 
        totalPages={totalPages}
        paginated={notes} 
        search={search} 
      />

   
      <Pagination 
        totalPages={totalPages} 
        safePage={safePage} 
        start={start} 
        totalNotes={totalNotes} 
        PER_PAGE={PER_PAGE} 
        goTo={goTo} 
        getPageNumbers={getPageNumbers} 
      />
    </div>
  );
}