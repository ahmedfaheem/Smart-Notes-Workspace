import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, FileCheck, FilePen, Pin, Plus, ArrowRight } from 'lucide-react';
import NoteCard from '../components/Notes/List/NoteCard';
import Header from '../components/Dashboard/Header';
import Stats from '../components/Dashboard/Stats';
import RecentNotes from '../components/Dashboard/RecentNotes';

import { useSelector } from 'react-redux';


export default function DashboardPage() {
const data = useSelector((state) => state.auth);
  console.log(data);

  return (
    <>
      {/* Header */}
       <Header />

      {/* Stats */}
       <Stats />
       
      {/* Recent Notes */}
       <RecentNotes />
    </>
  );
}