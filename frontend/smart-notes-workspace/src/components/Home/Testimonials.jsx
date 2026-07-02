
import { Star } from "lucide-react";
export default function Testimonials() {
  const testimonials = [
    {
      name: "Sara M.",
      role: "Product Designer",
      text: "The cleanest note-taking app I have ever used. Dark mode is gorgeous.",
      stars: 5,
    },
    {
      name: "Alex K.",
      role: "Software Engineer",
      text: "Finally an app that gets out of my way. Super fast and the pinning feature is a game changer.",
      stars: 5,
    },
    {
      name: "Nour H.",
      role: "Content Creator",
      text: "Switched from three different tools. Smart Notes does it all, beautifully.",
      stars: 5,
    },
  ];
  return (
    <section
      id="testimonials"
      className="py-24 px-6 bg-gray-50/50 dark:bg-white/[0.02]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-500 tracking-widest uppercase mb-3">
            Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Loved by note-takers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:shadow-xl hover:shadow-gray-200/60 dark:hover:shadow-black/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {Array(t.stars)
                  .fill(0)
                  .map((_, si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
