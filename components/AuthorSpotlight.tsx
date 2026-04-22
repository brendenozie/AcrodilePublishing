"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Feather, ArrowUpRight, BookOpen } from "lucide-react";

const AUTHORS = [
  {
    id: 1,
    name: "Abebe Selassie",
    role: "Fiction & Folklore",
    bio: "A master of contemporary African mythos, Selassie's work has been translated into 14 languages, bridging ancient oral traditions with modern prose.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
    quote: "Stories are the only vessels that can carry the past into the future without breaking.",
    accent: "from-emerald-900/20",
  },
  {
    id: 2,
    name: "Dr. Elena Vance",
    role: "Futurism & Tech",
    bio: "A leading voice in ethical AI, Dr. Vance explores the intersection of human consciousness and the digital frontier through her best-selling essays.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
    quote: "We aren't just building machines; we are writing the new mythology of mankind.",
    accent: "from-blue-900/20",
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Poetry & Visual Arts",
    bio: "Sarah's 'Digital Verse' series pioneered the use of interactive typography in modern poetry, winning the Acrodile Innovation Award in 2025.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800",
    quote: "The space between the letters is where the reader truly begins to breathe.",
    accent: "from-amber-900/20",
  },
];

export function AuthorSpotlight() {
  const [hoveredAuthor, setHoveredAuthor] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Ambient Glow that changes based on hovered author */}
      <AnimatePresence>
        {hoveredAuthor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 bg-gradient-to-br ${AUTHORS.find(a => a.id === hoveredAuthor)?.accent} to-transparent pointer-events-none transition-colors duration-700`}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Feather className="w-5 h-5 text-emerald-700" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-800">The Creators</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight">
              Meet the <span className="italic">Architects</span> of Acrodile.
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-right hidden md:block">
            Our authors are more than writers—they are visionaries shaping the next century of literature.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {AUTHORS.map((author) => (
            <motion.div
              key={author.id}
              onMouseEnter={() => setHoveredAuthor(author.id)}
              onMouseLeave={() => setHoveredAuthor(null)}
              className="group relative bg-[#FCF9F2] rounded-[2.5rem] p-8 border border-slate-100 transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
            >
              {/* Profile Image & Bio Toggle */}
              <div className="relative w-32 h-32 mb-8 mx-auto lg:mx-0">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-900/10 scale-110 group-hover:scale-125 transition-transform duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">{author.name}</h3>
                  <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest">{author.role}</p>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm">
                  {author.bio}
                </p>

                {/* The Signature Quote - Revealed on Hover */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="pt-6 border-t border-slate-200 mt-6"
                >
                  <Quote className="w-8 h-8 text-emerald-900/10 mb-2" />
                  <p className="italic text-slate-700 font-serif text-lg">
                    &ldquo;{author.quote}&rdquo;
                  </p>
                </motion.div>

                {/* Call to Action for the Author */}
                <div className="pt-4 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sm font-black text-slate-900 hover:text-emerald-700 transition-colors uppercase tracking-tighter">
                    <BookOpen className="w-4 h-4" />
                    View Bibliography
                  </button>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 group-hover:bg-emerald-900 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Aesthetic Numbering */}
              <span className="absolute top-8 right-10 text-8xl font-serif font-black text-slate-900/5 pointer-events-none">
                0{author.id}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}