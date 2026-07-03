import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, FileCheck, FilePen, Pin, Plus, ArrowRight } from 'lucide-react';
import NoteCard from '../components/Notes/List/NoteCard';
import Header from '../components/Dashboard/Header';
import Stats from '../components/Dashboard/Stats';
import RecentNotes from '../components/Dashboard/RecentNotes';
import { useQuery } from '@tanstack/react-query';
import { getNotes } from '../services/notes';
import { useSelector } from 'react-redux';
import IsLoading from '../components/Shared/IsLoading';
import ErrorLoad from '../components/Shared/ErrorLoad';

export default function DashboardPage() {

    const token = useSelector(state => state.auth.token);
   const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: () => getNotes(token),
    });

  return (
    <>


       {isLoading && <IsLoading/> }
   
       {isError && !data && <ErrorLoad />}

       {data && !isLoading && !isError && (<>
         <Header />
         <Stats data={data} />
         <RecentNotes data={data} />
         </>
       )}

    </>
  );
}