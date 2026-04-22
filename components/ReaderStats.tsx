"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  Globe2, 
  BookMarked, 
  Users2, 
  MapPin,
  TrendingUp
} from "lucide-react";

// Hook for counting animation
const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export function ReaderStats() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Abstract Map Background Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text and Narrative */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Live Community Data</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-serif leading-tight">
              A World Bound by <br />
              <span className="italic text-emerald-400">Every Word.</span>
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              Acrodile isn&apos;t just a publisher; we are a global movement. Our stories are being read across borders, languages, and time zones—uniting a new generation of thinkers.
            </p>

            <div className="flex items-center gap-6 pt-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=reader${i}`} alt="Reader" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                    +12k
                  </div>
               </div>
               <p className="text-sm text-slate-400 font-medium">Join 12,000+ active monthly readers.</p>
            </div>
          </div>

          {/* Right Side: The Stat Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Stat 1: Total Books */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-emerald-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <BookMarked className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-bold mb-1">
                <Counter value={45000} />+
              </h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Books in Circulation</p>
            </motion.div>

            {/* Stat 2: Active Readers */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-blue-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-bold mb-1">
                <Counter value={12800} />
              </h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Active Digital Readers</p>
            </motion.div>

            {/* Stat 3: Global Reach */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-amber-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-bold mb-1">
                <Counter value={84} />
              </h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Countries Reached</p>
            </motion.div>

            {/* Stat 4: Physical Locations */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-indigo-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-bold mb-1">
                <Counter value={150} />+
              </h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Partner Bookstores</p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px]" />
    </section>
  );
}