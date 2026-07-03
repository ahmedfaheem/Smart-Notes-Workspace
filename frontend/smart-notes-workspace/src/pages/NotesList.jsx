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
import IsLoading from '../components/Shared/IsLoading';



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


  if (isLoading) return <IsLoading/>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load notes.</p>;

  return (
    <>
      
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
    </>
  );
}