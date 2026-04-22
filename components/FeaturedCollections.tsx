"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter } from "lucide-react";

// Mock Data for Genres & Books
const GENRES = [
  { id: "all", label: "All Collections", color: "bg-slate-100" },
  { id: "fiction", label: "Modern Fiction", color: "bg-emerald-50" },
  { id: "digital", label: "Digital Exclusives", color: "bg-blue-50" },
  { id: "poetry", label: "Poetry & Arts", color: "bg-amber-50" },
  { id: "non-fiction", label: "Thought Leadership", color: "bg-rose-50" },
];

const BOOKS = [
  { id: 1, title: "The Crocodile's Echo", author: "Abebe Selassie", genre: "fiction", type: "Physical", cover: "https://images.unsplash.com/photo-1543005187-9eb710d4470d?q=80&w=400" },
  { id: 2, title: "Binary Sunsets", author: "Sarah Chen", genre: "digital", type: "Online Only", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400" },
  { id: 3, title: "Rhythms of the Nile", author: "Kofi Arko", genre: "poetry", type: "Collector's Edition", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400" },
  { id: 4, title: "Future Architects", author: "Dr. Elena Vance", genre: "non-fiction", type: "Digital + Print", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400" },
  { id: 5, title: "Midnight in Nairobi", author: "Zane Malik", genre: "fiction", type: "Physical", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400" },
  { id: 6, title: "The AI Manuscript", author: "Acrodile Labs", genre: "digital", type: "Online Only", cover: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=400" },
];

export function FeaturedCollections() {
  const [activeGenre, setActiveGenre] = useState("all");

  const filteredBooks = activeGenre === "all" 
    ? BOOKS 
    : BOOKS.filter(book => book.genre === activeGenre);

  return (
    <section className="py-24 bg-[#FCF9F2]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Logic */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 italic">
              Curated Collections
            </h2>
            <p className="text-slate-600 max-w-md">
              Hand-picked masterpieces from the Acrodile vault, spanning physical hardcovers and immersive digital experiences.
            </p>
          </div>

          {/* Genre Pill Picker */}
          <div className="flex flex-wrap gap-2 p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-emerald-900/5">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setActiveGenre(genre.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeGenre === genre.id 
                    ? "bg-emerald-900 text-white shadow-lg" 
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Book Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="group relative bg-white rounded-[2rem] p-4 border border-emerald-900/5 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all"
              >
                {/* Book Cover Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-slate-100 mb-6">
                  <Image 
                    src={book.cover} 
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-900">
                    {book.type}
                  </div>
                </div>

                {/* Book Details */}
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-1 group-hover:text-emerald-800 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 uppercase tracking-tighter font-medium">
                    By {book.author}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" className="p-0 h-auto font-bold text-emerald-900 hover:bg-transparent group/btn">
                      Explore Edition
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-all">
                      <Filter className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-serif italic text-xl">No masterpieces found in this collection yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}