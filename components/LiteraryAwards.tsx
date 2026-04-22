"use client";

import { motion } from "framer-motion";
import { 
  Trophy, 
  Newspaper, 
  Award, 
  Milestone, 
  ExternalLink,
  Quote
} from "lucide-react";

const AWARDS = [
  {
    year: "2025",
    title: "Publisher of the Year",
    organization: "Global Independent Press Association",
    description: "Awarded for pioneering the digital-physical hybrid reading experience.",
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    year: "2024",
    title: "Excellence in Typography",
    organization: "Designers Guild of Africa",
    description: "Recognized for the bespoke layout of 'The Acrodile Anthology'.",
    icon: <Award className="w-6 h-6" />,
  },
  {
    year: "2025",
    title: "Literary Innovation Award",
    organization: "BookTech Summit",
    description: "Honored for the seamless 'Open-in-Reader' cloud technology.",
    icon: <Milestone className="w-6 h-6" />,
  },
];

const PRESS_MENTIONS = [
  "“Acrodile is redefining the tactile beauty of books.” — The Times Literary",
  "“The future of publishing is split between ink and pixels.” — Wired",
  "“A sanctuary for modern storytellers.” — Guardian Culture",
  "“Their digital reader is a masterpiece of UX.” — TechCrunch",
];

export function LiteraryAwards() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
              A Legacy of <span className="italic">Excellence.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Quality is our only metric. We take pride in the recognition our authors and 
              technologists have received from the world&apos;s most prestigious institutions.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-7xl font-serif font-black text-emerald-900/10">12+</span>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-800">Global Accolades</span>
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {AWARDS.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-[#FCF9F2] border border-emerald-900/5 group hover:bg-emerald-900 hover:text-white transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-800 mb-6 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                {award.icon}
              </div>
              <span className="text-xs font-black text-emerald-700 group-hover:text-emerald-300 transition-colors uppercase tracking-widest">
                {award.organization} • {award.year}
              </span>
              <h3 className="text-xl font-serif font-bold mt-2 mb-4">
                {award.title}
              </h3>
              <p className="text-sm opacity-70 leading-relaxed">
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Press Marquee */}
        <div className="border-y border-slate-100 py-12 overflow-hidden relative">
          <div className="flex items-center gap-4 absolute left-0 top-1/2 -translate-y-1/2 bg-white pr-8 z-20">
            <Newspaper className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">In the Press</span>
          </div>
          
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 pl-40"
          >
            {[...PRESS_MENTIONS, ...PRESS_MENTIONS].map((mention, i) => (
              <span key={i} className="text-lg font-serif italic text-slate-400 hover:text-emerald-900 cursor-default transition-colors">
                {mention}
              </span>
            ))}
          </motion.div>
          
          {/* Fades for the marquee */}
          <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        {/* Featured Review Spotlight */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 max-w-4xl mx-auto text-center"
        >
          <Quote className="w-12 h-12 text-emerald-900/10 mx-auto mb-8" />
          <h4 className="text-2xl md:text-3xl font-serif text-slate-800 italic leading-relaxed">
            &ldquo;Acrodile isn&apos;t just selling books; they are curating a new era of intellectual prestige. 
            The attention to detail in their physical bindings and digital fluidity is unmatched.&rdquo;
          </h4>
          <div className="mt-8 flex flex-col items-center">
            <div className="w-12 h-[1px] bg-emerald-900/20 mb-4" />
            <p className="text-sm font-black uppercase tracking-widest text-slate-900">Julian Thorne</p>
            <p className="text-xs text-slate-400 uppercase tracking-tighter">Chief Editor, The Literary Review</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}