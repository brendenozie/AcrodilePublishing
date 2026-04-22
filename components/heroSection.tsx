"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  ChevronRightIcon,
  LibraryIcon,
  GlobeIcon,
  SmartphoneIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";

export function HeroSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Parallax effects for the "Split World" books
  const physicalBookY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const digitalReaderY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig);
  const bgElementY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden bg-[#FCF9F2]"
    >
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cream-paper.png')` }} 
        />
        
        {/* Brand Color Orbs: Emerald & Gold */}
        <motion.div style={{ y: bgElementY }} className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-emerald-100/40 rounded-full blur-[120px]" />
        <motion.div style={{ y: bgElementY }} className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-4">
          
          {/* --- LEFT CONTENT: THE LITERARY MISSION --- */}
          <div className="flex-[1.2] text-center lg:text-left space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm backdrop-blur-sm"
            >
              <LibraryIcon className="w-4 h-4 text-emerald-700" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
                Acrodile Publishing House
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif tracking-tight text-slate-900 leading-[0.9]"
            >
              Stories that <br />
              <span className="italic text-emerald-900">Breathe.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              From the tactile weight of a hardcover in your hands to the seamless 
              glow of a digital masterpiece. We bridge the gap between 
              traditional ink and future pixels.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/shop">
                <Button size="lg" className="h-16 px-10 rounded-full bg-emerald-900 hover:bg-emerald-950 text-white shadow-2xl transition-all group">
                  <ShoppingBagIcon className="mr-2 w-5 h-5" />
                  <span className="font-semibold text-lg">Shop Hardcovers</span>
                </Button>
              </Link>
              
              <Link href="/reader">
                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-emerald-900/20 bg-white/50 backdrop-blur-md text-emerald-900 hover:bg-emerald-50 transition-all font-semibold">
                  <SmartphoneIcon className="mr-2 w-5 h-5" />
                  Read Digitally
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-10 pt-8 border-t border-emerald-900/10"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <GlobeIcon className="w-4 h-4 text-emerald-600" />
                  <span className="text-xl font-bold text-slate-900">Global</span>
                </div>
                <span className="text-[10px] tracking-widest font-bold text-slate-400 uppercase">Shipping</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <BookOpenIcon className="w-4 h-4 text-emerald-600" />
                  <span className="text-xl font-bold text-slate-900">500+</span>
                </div>
                <span className="text-[10px] tracking-widest font-bold text-slate-400 uppercase">Digital Titles</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4 text-emerald-600" />
                  <span className="text-xl font-bold text-slate-900">1.2k</span>
                </div>
                <span className="text-[10px] tracking-widest font-bold text-slate-400 uppercase">Active Readers</span>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT: THE VISUAL CONTRAST --- */}
          <div className="flex-1 relative w-full aspect-[4/5] lg:h-[700px]">
            
            {/* The Physical Book Representation */}
            <motion.div 
              style={{ y: physicalBookY }}
              className="absolute top-[5%] left-[5%] w-[70%] h-[80%] rounded-2xl overflow-hidden shadow-[20px_20px_60px_rgba(0,0,0,0.2)] z-20 border-[6px] border-white"
            >
              <Image 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
                alt="Premium Hardcover Edition" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs uppercase tracking-widest font-bold opacity-80">Now in Print</p>
                <p className="text-xl font-serif">The Acrodile Anthology</p>
              </div>
            </motion.div>

            {/* The Digital Reader Representation */}
            <motion.div 
              style={{ y: digitalReaderY }}
              className="absolute bottom-[5%] right-[0%] w-[65%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl z-30 border-[8px] border-slate-900 bg-white"
            >
              <div className="absolute top-0 w-full h-6 bg-slate-900 flex justify-center items-center">
                <div className="w-12 h-1 bg-slate-700 rounded-full" />
              </div>
              <div className="p-8 pt-12 space-y-4">
                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="pt-4 flex justify-between items-center">
                   <div className="h-8 w-8 rounded-full bg-emerald-100" />
                   <div className="h-2 w-20 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Badge: Live Counter */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute top-[45%] right-[-5%] bg-white p-4 rounded-2xl shadow-xl z-40 border border-emerald-50 flex flex-col items-center min-w-[120px]"
            >
              <div className="flex -space-x-2 mb-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={24} height={24} />
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-tighter">1,240 reading now</p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Aesthetic Scroll Line */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-900/40 rotate-90 mb-8">Scroll</span>
          <div className="w-[1px] h-20 bg-emerald-900/10 relative">
            <motion.div 
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-0 w-full bg-emerald-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}