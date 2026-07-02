import { Zap, Pin, Search, Shield } from 'lucide-react'
export default function Features() {

    const features = [
      {
        icon: <Zap className="w-5 h-5" />,
        title: 'Lightning Fast',
        desc: 'Capture thoughts instantly. Smart Notes is optimized for speed so your ideas never wait.',
        iconColor: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        ring: 'ring-amber-500/20',
      },
      {
        icon: <Pin className="w-5 h-5" />,
        title: 'Pin & Prioritize',
        desc: 'Keep your most important notes front and center with one-click pinning.',
        iconColor: 'text-indigo-500',
        bg: 'bg-indigo-50 dark:bg-indigo-500/10',
        ring: 'ring-indigo-500/20',
      },
      {
        icon: <Search className="w-5 h-5" />,
        title: 'Instant Search',
        desc: 'Find any note in milliseconds. Full-text search across your entire workspace.',
        iconColor: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        ring: 'ring-emerald-500/20',
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Secure & Private',
        desc: 'Your notes stay yours. End-to-end protection with granular publish controls.',
        iconColor: 'text-rose-500',
        bg: 'bg-rose-50 dark:bg-rose-500/10',
        ring: 'ring-rose-500/20',
      },
    ];

  return (
  <section id="features" className="py-24 px-6 bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-500 tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Everything you need, nothing you don't</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Thoughtfully crafted features that stay out of your way and let your ideas shine.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300">
                <div className={`w-11 h-11 rounded-2xl ${f.bg} ring-1 ${f.ring} flex items-center justify-center mb-5`}>
                  <span className={f.iconColor}>
                    {f.icon}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2 tracking-tight">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
