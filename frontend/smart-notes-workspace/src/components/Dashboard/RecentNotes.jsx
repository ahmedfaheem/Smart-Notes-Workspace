import { Link } from "react-router-dom";
import { StickyNote, ArrowRight } from "lucide-react";
import NoteCard from "../Notes/List/NoteCard";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../services/notes";
import { useSelector } from "react-redux";

export default function RecentNotes({ data }) {

  let notes = data?.notes || [];
  notes = notes.slice(0, 3); 



  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold tracking-tight">Recent Notes</h3>
        <Link
          to="/dashboard/notes"
          className="text-sm text-indigo-500 hover:underline font-medium flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-600">
          <StickyNote className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No notes yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
            />
          ))}
        </div>
      )}
    </>
  );
}
