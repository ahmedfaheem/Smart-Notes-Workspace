import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, FileCheck, FilePen, Pin, Plus, ArrowRight } from 'lucide-react';
import NoteCard from '../components/Notes/List/NoteCard';
import Header from '../components/Dashboard/Header';
import Stats from '../components/Dashboard/Stats';
import RecentNotes from '../components/Dashboard/RecentNotes';




export default function DashboardPage() {


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