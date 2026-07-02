import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
export default function Hero() {
    
  const fakeNotes = [
    {
      title: "Q3 Marketing Strategy",
      color: "bg-indigo-500",
      pinned: true,
      tag: "published",
      tagColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      title: "Product Roadmap V2",
      color: "bg-purple-500",
      pinned: false,
      tag: "draft",
      tagColor: "text-slate-600 bg-slate-50 dark:bg-white/5",
    },
    {
      title: "Design Sync Notes",
      color: "bg-pink-500",
      pinned: false,
      tag: "published",
      tagColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
    },
  ];

  return (
    <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
      {/* Gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent dark:from-indigo-500/20 dark:via-purple-500/10 blur-3xl rounded-full" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-400/15 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-20 w-72 h-72 bg-purple-400/10 dark:bg-purple-400/15 rounded-full blur-3xl" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 ring-1 ring-indigo-500/10">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        Now with dark mode &amp; pinned notes
      </div>

      {/* Headline */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] max-w-4xl mx-auto mb-6">
        Your ideas,{" "}
        <span className="relative">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            organized
          </span>
          <svg
            className="absolute -bottom-2 left-0 w-full"
            viewBox="0 0 300 12"
            fill="none"
          >
            <path
              d="M2 8 Q75 2 150 8 Q225 14 298 8"
              stroke="url(#ul)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="ul"
                x1="0"
                y1="0"
                x2="300"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6366f1" />
                <stop offset="0.5" stopColor="#a855f7" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </span>{" "}
        beautifully.
      </h1>

      <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
        Smart Notes is your distraction-free workspace for capturing, pinning,
        and publishing ideas — with a design that adapts to you.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          to="/register"
          className="group inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-semibold px-7 py-3.5 rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-black/10 dark:shadow-white/5 text-base"
        >
          Start for free
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium px-7 py-3.5 rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-base"
        >
          Sign in
          <ChevronRight className="w-4 h-4 opacity-50" />
        </Link>
      </div>

      {/* Hero mockup */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="relative bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/60">
          {/* Fake topbar */}
          <div className="h-12 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-[#0A0A0A]/70 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 mx-4 h-6 bg-gray-100 dark:bg-white/5 rounded-lg" />
          </div>
          {/* Fake content */}
          <div className="flex">
            {/* Fake sidebar */}
            <div className="hidden sm:flex w-48 border-r border-gray-200 dark:border-white/10 flex-col p-3 gap-1.5 bg-white dark:bg-[#111111]">
              <div className="h-8 bg-gray-100 dark:bg-white/5 rounded-lg" />
              <div className="h-8 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg" />
              <div className="h-8 bg-gray-100 dark:bg-white/5 rounded-lg" />
            </div>
            {/* Fake notes grid */}
            <div className="flex-1 p-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
              {fakeNotes.map((card, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl p-3 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-6 h-6 rounded-lg ${card.color} opacity-80`}
                    />
                    {card.pinned && (
                      <div className="w-3 h-3 rounded-full bg-indigo-400" />
                    )}
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-white/10 rounded w-3/4" />
                  <div className="h-2.5 bg-gray-100 dark:bg-white/5 rounded w-full" />
                  <div className="h-2.5 bg-gray-100 dark:bg-white/5 rounded w-2/3" />
                  <div
                    className={`mt-1 self-start text-xs font-medium px-2 py-0.5 rounded-full ring-1 ring-current/20 ${card.tagColor}`}
                  >
                    {card.tag}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Reflection */}
        <div className="h-16 mx-8 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent rounded-b-3xl blur-sm -mt-1 opacity-50" />
      </div>
    </section>
  );
}
