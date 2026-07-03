import { Files, Pin, ListTodo, Timer, CheckCircle2 } from 'lucide-react';

export default function Stats({data}) {


  const totalNotes = data?.pagination?.totalNotes || 0;
  const pinnedNotes = data?.notes?.filter(note => note.isPinned).length || 0;
  const todoNotes = data?.notes?.filter(note => note.status === 'ToDo').length || 0;
  const inProgressNotes = data?.notes?.filter(note => note.status === 'In Progress').length || 0;
  const doneNotes = data?.notes?.filter(note => note.status === 'Done').length || 0;

   const stats = [
  { 
    label: 'Total Notes', 
    value: totalNotes, 
    icon: <Files className="w-5 h-5" />, 
    color: 'text-indigo-500',  
    bg: 'bg-indigo-50 dark:bg-indigo-500/10' 
  },
  { 
    label: 'Pinned',     
    value: pinnedNotes, 
    icon: <Pin className="w-5 h-5" />, 
    color: 'text-rose-500',    
    bg: 'bg-rose-50 dark:bg-rose-500/10' 
  },
  { 
    label: 'ToDo',    
    value: todoNotes, 
    icon: <ListTodo className="w-5 h-5" />, // Open checklist
    color: 'text-emerald-500', 
    bg: 'bg-emerald-50 dark:bg-emerald-500/10' 
  },
  { 
    label: 'In Progress',       
    value: inProgressNotes, 
    icon: <Timer className="w-5 h-5" />, // Active time
    color: 'text-amber-500',   
    bg: 'bg-amber-50 dark:bg-amber-500/10' 
  },
  { 
    label: 'Done',       
    value: doneNotes, 
    icon: <CheckCircle2 className="w-5 h-5" />, // Solid completion mark
    color: 'text-sky-500',     
    bg: 'bg-sky-50 dark:bg-sky-500/10' 
  },
];

  return (
     <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-3xl font-black tracking-tight mb-1">{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
  )
}
