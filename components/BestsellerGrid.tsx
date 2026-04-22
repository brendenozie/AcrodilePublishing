"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ShoppingBag, 
  BookOpen, 
  Star, 
  ChevronRight, 
  Gamepad2,
  Package,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";

const BESTSELLERS = [
  {
    id: 1,
    title: "The Silent Canopy",
    author: "Elena Vance",
    price: 24.99,
    digitalPrice: 9.99,
    rating: 4.9,
    cover: "https://images.unsplash.com/photo-1587273011821-3941ad244643?q=80&w=600",
    tags: ["Nature", "Philosophy"],
    isNew: true
  },
  {
    id: 2,
    title: "Visions of 2050",
    author: "Acrodile Editorial",
    price: 32.00,
    digitalPrice: 12.50,
    rating: 5.0,
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?q=80&w=600",
    tags: ["Futurism", "Art"],
    isNew: false
  },
  {
    id: 3,
    title: "Echoes of the Savannah",
    author: "Kofi Arko",
    price: 19.95,
    digitalPrice: 7.99,
    rating: 4.8,
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600",
    tags: ["Fiction", "Heritage"],
    isNew: false
  },
  {
    id: 4,
    title: "The Digital Alchemist",
    author: "Sarah Chen",
    price: 28.50,
    digitalPrice: 0.00, // Free for members
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600",
    tags: ["Tech", "Poetry"],
    isNew: true
  }
];

export function BestsellerGrid() {
  const [viewMode, setViewMode] = useState<"physical" | "digital">("physical");

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header with Format Switcher */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-4">
              The <span className="italic">Bestseller</span> Shelf
            </h2>
            <p className="text-slate-500 font-medium">Curated masterpieces for the modern collector.</p>
          </div>

          {/* Toggle Logic */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setViewMode("physical")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                viewMode === "physical" ? "bg-white text-emerald-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Package className="w-4 h-4" />
              Physical Edition
            </button>
            <button 
              onClick={() => setViewMode("digital")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                viewMode === "digital" ? "bg-white text-blue-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Monitor className="w-4 h-4" />
              Digital Reader
            </button>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatePresence mode="wait">
            {BESTSELLERS.map((book) => (
              <motion.div
                key={`${book.id}-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                {/* Book Representation */}
                <div className="relative aspect-[3/4] mb-6 perspective-1000">
                  <motion.div 
                    whileHover={{ rotateY: -15, x: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`relative w-full h-full rounded-r-lg overflow-hidden shadow-xl transition-all ${
                      viewMode === "physical" ? "shadow-[10px_10px_30px_rgba(0,0,0,0.15)]" : "shadow-blue-900/10"
                    }`}
                  >
                    <Image 
                      src={book.cover} 
                      alt={book.title} 
                      fill 
                      className="object-cover"
                    />
                    
                    {/* Format Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <Button className={`w-full ${viewMode === "physical" ? "bg-emerald-600" : "bg-blue-600"} hover:scale-105 transition-transform`}>
                        {viewMode === "physical" ? "Add to Cart" : "Open in Reader"}
                      </Button>
                    </div>

                    {book.isNew && (
                      <div className="absolute top-4 left-0 bg-emerald-900 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-r-full">
                        New Release
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Digital Glow (Only in Digital Mode) */}
                  {viewMode === "digital" && (
                    <div className="absolute inset-0 bg-blue-400/20 blur-2xl -z-10 rounded-full" />
                  )}
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {book.title}
                    </h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold ml-1">{book.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{book.author}</p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-black text-slate-900">
                      ${viewMode === "physical" ? book.price : book.digitalPrice === 0 ? "FREE" : book.digitalPrice}
                    </span>
                    <div className="flex gap-1">
                      {book.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="text-[10px] border border-slate-200 px-2 py-0.5 rounded-md text-slate-400 uppercase font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-slate-900 text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all group">
            Browse Full Catalog
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}