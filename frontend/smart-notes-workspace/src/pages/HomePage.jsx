import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Pin, Search, Shield, Star, ChevronRight, Moon } from 'lucide-react';
import Hero from '../components/Home/Hero';
import NavBar from '../components/Home/NavBar';
import Features from '../components/Home/Features';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Home/Footer';
import { useSelector } from 'react-redux';



export default function HomePage() {
   
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);



  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">

      {/* ── Navbar ── */}
      <NavBar />

      {/* ── Hero ── */}
    <Hero />

      {/* ── Features ── */}
      <Features />

      {/* ── Dark Mode Highlight ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-[#111] to-gray-900 dark:from-[#0f0f0f] dark:via-[#1a1a2e] dark:to-[#0f0f0f] p-10 sm:p-16 border border-white/10 shadow-2xl">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-10 w-64 h-32 bg-purple-500/15 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                  <Moon className="w-3.5 h-3.5" />
                  Dark Mode First
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                  Crafted for late-night sessions and long focus sprints.
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                  Every color, shadow, and gradient is hand-tuned for both light and dark modes. Switch instantly — your eyes will thank you.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  Try it now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mini dark card preview */}
              <div className="flex-shrink-0 flex flex-col gap-3 w-full max-w-xs">
                {[
                  { title: 'Q3 Marketing Strategy', tag: 'published', pinned: true },
                  { title: 'Product Roadmap V2', tag: 'draft', pinned: false },
                ].map((item, i) => (
                  <div key={i} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 flex flex-col gap-2.5">
                    <div className="flex justify-between items-start">
                      <span className="text-white text-sm font-semibold truncate pr-4">{item.title}</span>
                      {item.pinned && <Pin className="w-3.5 h-3.5 text-indigo-400 fill-current flex-shrink-0" />}
                    </div>
                    <div className="flex gap-1.5">
                      <div className="h-2 rounded bg-white/10 w-full" />
                      <div className="h-2 rounded bg-white/10 w-2/3" />
                    </div>
                    <span className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${item.tag === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-400'}`}>
                      {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />
 
      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-20 rounded-full" />
            <div className="relative w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center text-2xl font-black mx-auto shadow-xl">N</div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-5 leading-tight">
            Start capturing your best ideas.
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
            Free to use. No credit card needed. Your workspace, your rules.
          </p>

          <Link
            to={isLoggedIn ? "/dashboard" : "/register"}
            className="group inline-flex items-center gap-2.5 bg-black dark:bg-white text-white dark:text-black font-semibold px-8 py-4 rounded-2xl text-base hover:opacity-90 active:scale-95 transition-all shadow-2xl shadow-black/15 dark:shadow-white/5"
          >
            Create your workspace
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

     {!isLoggedIn   &&  <p className="text-sm text-gray-400 mt-5">Already have an account? <Link to="/login" className="text-indigo-500 hover:underline font-medium">Sign in</Link></p>}
        </div>
      </section>

      {/* ── Footer ── */}
       <Footer />
    </div>
  );
}
