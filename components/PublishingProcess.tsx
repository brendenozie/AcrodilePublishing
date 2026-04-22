"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  FileText, 
  Layers, 
  PenTool, 
  Truck, 
  Globe, 
  CheckCircle2 
} from "lucide-react";

const STEPS = [
  {
    title: "The Manuscript",
    desc: "Every masterpiece begins as a raw spark. We review each manuscript for soul, depth, and innovation.",
    icon: <FileText className="w-8 h-8" />,
    tag: "Selection",
    color: "bg-amber-500",
  },
  {
    title: "Editorial Alchemy",
    desc: "Our world-class editors work side-by-side with authors to polish prose while preserving the unique voice.",
    icon: <PenTool className="w-8 h-8" />,
    tag: "Refinement",
    color: "bg-emerald-600",
  },
  {
    title: "Visual Design",
    desc: "From tactile cover textures to responsive digital layouts, we dress your story in prestige.",
    icon: <Layers className="w-8 h-8" />,
    tag: "Aesthetics",
    color: "bg-blue-600",
  },
  {
    title: "The Acrodile Launch",
    desc: "Simultaneous release across our global physical supply chain and our proprietary digital reader.",
    icon: <Globe className="w-8 h-8" />,
    tag: "Distribution",
    color: "bg-indigo-700",
  },
];

export function PublishingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll-linked animation for the progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-[#FCF9F2] relative overflow-hidden">
      {/* Background Text Decor */}
      <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[20rem] font-serif font-black">INK</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/5 border border-emerald-900/10 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">The Path to Publication</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6 leading-tight">
            From Idea to <span className="italic">Immortality.</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Acrodile isn&apos;t just a store; it&apos;s an incubator for the world&apos;s next great classics. 
            Here is how we bring your vision to the bookshelf.
          </p>
        </div>

        {/* The Process Rail */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2" />
          <motion.div 
            style={{ scaleX }}
            className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-emerald-600 -translate-y-1/2 origin-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Step Circle */}
                <div className="mb-8 relative z-10 flex justify-center lg:justify-start">
                  <div className={`w-20 h-20 rounded-3xl ${step.color} text-white flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                    {step.icon}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 lg:right-auto lg:-left-3 w-8 h-8 bg-white rounded-full border-4 border-[#FCF9F2] shadow-md flex items-center justify-center text-[10px] font-black text-slate-900">
                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center lg:text-left space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
                    {step.tag}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] mx-auto lg:mx-0">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Submission */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 p-12 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] -z-0" />
          
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-3xl font-serif mb-2">Have a manuscript?</h4>
            <p className="text-slate-400">Join our next cohort of visionary authors.</p>
          </div>
          
          <button className="relative z-10 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 group">
            Submit Your Work
            <Truck className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}