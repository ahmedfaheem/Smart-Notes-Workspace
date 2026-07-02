import { StickyNote, FileCheck, FilePen, Pin } from 'lucide-react';

export default function Stats() {


    const stats = [
      { label: 'Total Notes',  value: 6, icon: <StickyNote className="w-5 h-5" />, color: 'text-indigo-500',  bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
      { label: 'Published',    value: 4, icon: <FileCheck  className="w-5 h-5" />, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
      { label: 'Drafts',       value: 2, icon: <FilePen    className="w-5 h-5" />, color: 'text-amber-500',   bg: 'bg-amber-50 dark:bg-amber-500/10' },
      { label: 'Pinned',       value: 2, icon: <Pin        className="w-5 h-5" />, color: 'text-rose-500',    bg: 'bg-rose-50 dark:bg-rose-500/10' },
    ];

  return (
     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
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
