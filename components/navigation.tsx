"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Feather, 
  Menu, 
  X, 
  ShoppingBag, 
  BookOpen, 
  Search,
  User,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "The Library", href: "#collections", hasDropdown: true },
  { name: "Authors", href: "#authors" },
  { name: "Publishing", href: "#process" },
  { name: "Society", href: "#membership" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div 
        className={`container mx-auto transition-all duration-500 rounded-[2rem] border ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl border-slate-200/50 shadow-lg shadow-emerald-900/5 px-8" 
            : "bg-transparent border-transparent px-4"
        }`}
      >
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-emerald-900 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
              <Feather className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight text-slate-900">
              Acrodile
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-slate-600 hover:text-emerald-800 transition-colors flex items-center gap-1 group"
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            
            <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-600 rounded-full border-2 border-white" />
            </button>

            <Button 
              variant="default" 
              className="bg-slate-900 hover:bg-emerald-900 text-white rounded-full px-6 py-5 font-bold text-xs uppercase tracking-widest hidden md:flex items-center gap-2 shadow-xl shadow-slate-900/10"
            >
              <BookOpen className="w-4 h-4" />
              Open Reader
            </Button>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-8 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif font-bold text-slate-900 border-b border-slate-50 pb-4"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-4">
                <Button className="w-full bg-emerald-900 h-14 rounded-2xl font-bold">
                  Enter Reader
                </Button>
                <Button variant="outline" className="w-full h-14 rounded-2xl font-bold border-slate-200">
                  <User className="w-4 h-4 mr-2" />
                  Society Login
                </Button>
              </div>
            </div>
            
            {/* Background Decor for Mobile Menu */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -z-10" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}