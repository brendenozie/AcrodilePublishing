"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Feather, 
  Globe, 
  ArrowUpRight 
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const FOOTER_LINKS = {
    Collections: [
      { name: "New Releases", href: "#" },
      { name: "Digital Archives", href: "#" },
      { name: "The Collector's Tier", href: "#" },
      { name: "Bestsellers", href: "#" },
    ],
    Publishing: [
      { name: "Submit Manuscript", href: "#" },
      { name: "The Process", href: "#" },
      { name: "Author Spotlights", href: "#" },
      { name: "Literary Awards", href: "#" },
    ],
    Company: [
      { name: "Our Heritage", href: "#" },
      { name: "Acrodile Society", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Careers", href: "#" },
    ],
    Assistance: [
      { name: "Reader Support", href: "#" },
      { name: "Shipping Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Top Section: Brand Statement & Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-white/5">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Feather className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">
                Acrodile <span className="italic text-emerald-400">Publishing</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Cultivating the next century of classics through a seamless blend of tactile 
              craftsmanship and digital innovation. Join our pursuit of the infinite library.
            </p>

            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-slate-400 hover:text-white text-sm transition-colors flex items-center group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 ml-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <p>© {currentYear} Acrodile Publishing House</p>
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>International Edition</span>
            </div>
          </div>

          <div className="flex gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-widest cursor-default"
            >
              System Status: Operational
            </motion.div>
            
            {/* Scroll to Top Logic could be added here */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Back to Zenith ↑
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Text in background */}
      <div className="absolute -bottom-10 left-0 w-full opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[15rem] font-serif font-black text-center leading-none">
          ACRODILE
        </h2>
      </div>
    </footer>
  );
}