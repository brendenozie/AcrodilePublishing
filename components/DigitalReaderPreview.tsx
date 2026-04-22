"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Settings2, 
  BookOpenCheck,
  Smartphone,
  Tablet
} from "lucide-react";

const PREVIEW_PAGES = [
  {
    id: 1,
    title: "Chapter I: The Emergence",
    content: "The river did not speak, but it remembered. For centuries, the banks of the Nile had held the secrets of the Acrodile—a lineage of storytellers who wrote not on paper, but on the very fabric of time. Amara leaned closer to the glowing script...",
    pageNumber: "04"
  },
  {
    id: 2,
    title: "Chapter II: Binary Rhythms",
    content: "In the digital silence of the new era, the script began to pulse. It wasn't just ink anymore; it was code. A language that bridged the gap between the ancient clay tablets and the silicon wafers of the future. The transition was seamless, yet world-shaking.",
    pageNumber: "05"
  },
  {
    id: 3,
    title: "Chapter III: The Infinite Archive",
    content: "Every story ever told now lived in the cloud, yet it felt as heavy and significant as a leather-bound tome. Amara realized that the medium changed, but the breath within the words remained the same. She reached out to touch the screen...",
    pageNumber: "06"
  }
];

export function DigitalReaderPreview() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    if (currentPage + newDirection >= 0 && currentPage + newDirection < PREVIEW_PAGES.length) {
      setDirection(newDirection);
      setCurrentPage(currentPage + newDirection);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Copy */}
          <div className="flex-1 space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">The Acrodile Reader</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">
              A Reading Experience <br />
              <span className="italic text-emerald-400">That Glows.</span>
            </h2>
            
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              Our proprietary digital engine preserves the beauty of typography while adding the power of the web. No apps, no downloads—just instant immersion from any device.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold">Custom UI</p>
                  <p className="text-xs text-slate-500">Fonts, colors, & night mode.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <BookOpenCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold">Progress Sync</p>
                  <p className="text-xs text-slate-500">Pick up where you left off.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Interactive Tablet */}
          <div className="flex-1 relative perspective-1000 w-full max-w-[500px]">
            <div className="relative bg-[#1a1a1a] p-4 rounded-[3rem] shadow-2xl border-[12px] border-[#0a0a0a] aspect-[3/4] flex flex-col">
              
              {/* Internal Reader UI */}
              <div className="flex justify-between items-center px-4 py-2 border-b border-slate-800/50 mb-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Acrodile Cloud Reader</span>
                <div className="flex gap-3">
                   <Settings2 className="w-3 h-3 text-slate-500" />
                   <Maximize2 className="w-3 h-3 text-slate-500" />
                </div>
              </div>

              {/* The "Page" Container */}
              <div className="flex-1 relative overflow-hidden bg-[#fdfaf3] rounded-xl text-slate-900 p-8 shadow-inner">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      rotateY: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    style={{ transformOrigin: "left center" }}
                    className="absolute inset-0 p-8 flex flex-col backface-hidden"
                  >
                    <h4 className="text-sm font-bold text-emerald-800 mb-6 uppercase tracking-tighter">
                      {PREVIEW_PAGES[currentPage].title}
                    </h4>
                    <p className="font-serif text-lg leading-relaxed text-slate-800">
                      {PREVIEW_PAGES[currentPage].content}
                    </p>
                    <div className="mt-auto flex justify-center">
                      <span className="text-xs font-mono text-slate-400">
                        — {PREVIEW_PAGES[currentPage].pageNumber} —
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-6 px-4">
                <button 
                  onClick={() => paginate(-1)}
                  disabled={currentPage === 0}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-2">
                  {PREVIEW_PAGES.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentPage ? "bg-emerald-400 w-4" : "bg-slate-700"}`} 
                    />
                  ))}
                </div>
                <button 
                  onClick={() => paginate(1)}
                  disabled={currentPage === PREVIEW_PAGES.length - 1}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Device Shadow/Glow */}
            <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl -z-10 rounded-[4rem]" />
          </div>
          
        </div>
      </div>
    </section>
  );
}