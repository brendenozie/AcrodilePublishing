"use client";

import { motion } from "framer-motion";
import { 
  Truck, 
  RefreshCcw, 
  MonitorSmartphone, 
  HelpCircle, 
  Search,
  ChevronRight,
  MessageCircle
} from "lucide-react";

const SUPPORT_CHANNELS = [
  {
    title: "Shipping & Logistics",
    desc: "Track your physical editions or manage international delivery preferences.",
    icon: <Truck className="w-6 h-6" />,
    cta: "Track Order",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "Digital Reader Help",
    desc: "Troubleshoot browser compatibility, offline mode, or font settings.",
    icon: <MonitorSmartphone className="w-6 h-6" />,
    cta: "Reader Guide",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Returns & Exchanges",
    desc: "Our 'Pristine Guarantee' ensures your books arrive in perfect condition.",
    icon: <RefreshCcw className="w-6 h-6" />,
    cta: "Start Return",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    title: "Direct Inquiry",
    desc: "Speak with our literary curators regarding bespoke orders or publishing.",
    icon: <MessageCircle className="w-6 h-6" />,
    cta: "Contact Us",
    color: "text-slate-600",
    bg: "bg-slate-50"
  }
];

export function ReaderSupport() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        
        {/* Header with Search Hook */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">
              Here to <span className="italic">Assist.</span>
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Whether you are waiting for a leather-bound classic or navigating our digital archives, our support team ensures your focus remains on the story.
            </p>
          </div>

          {/* Quick Search Bar */}
          <div className="w-full lg:w-96 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search help articles..." 
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all text-sm"
            />
          </div>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUPPORT_CHANNELS.map((channel, i) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2rem] border border-slate-100 hover:border-emerald-900/10 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl ${channel.bg} ${channel.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {channel.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">{channel.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
                {channel.desc}
              </p>

              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 group-hover:text-emerald-700 transition-colors">
                {channel.cta}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Floating Help Badge (Aesthetic Only) */}
        <div className="mt-16 py-8 px-10 rounded-3xl bg-[#FCF9F2] border border-emerald-900/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="relative">
                <HelpCircle className="w-10 h-10 text-emerald-900/20" />
                <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#FCF9F2]" />
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-none">Need immediate assistance?</p>
                <p className="text-xs text-slate-500 mt-1">Live concierge available Mon-Fri, 9am-5pm GMT</p>
              </div>
           </div>
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              Launch Live Chat
           </button>
        </div>
      </div>
    </section>
  );
}