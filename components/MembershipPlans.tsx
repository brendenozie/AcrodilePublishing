"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Crown, 
  BookOpen, 
  Zap, 
  Infinity as InfinityIcon,
  Truck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    name: "The Reader",
    tier: "Free",
    price: 0,
    desc: "Experience the foundation of the Acrodile library.",
    features: ["Access to 10+ public titles", "Basic web reader", "Community forums", "Standard shipping"],
    cta: "Start Reading",
    highlight: false,
    color: "bg-slate-50",
  },
  {
    name: "Digital Society",
    tier: "Pro",
    price: 12,
    desc: "Unlimited pixels for the modern intellectual.",
    features: ["Unlimited digital reading", "Offline mode access", "Exclusive digital-only titles", "No ads in reader"],
    cta: "Join the Society",
    highlight: true,
    color: "bg-emerald-900",
  },
  {
    name: "The Collector",
    tier: "Elite",
    price: 29,
    desc: "The ultimate bridge between ink and code.",
    features: ["Everything in Pro", "1 Physical book/month", "Free global express shipping", "Early author Q&As"],
    cta: "Become a Collector",
    highlight: false,
    color: "bg-slate-900",
  },
];

export function MembershipPlans() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24 bg-[#FCF9F2]">
      <div className="container mx-auto px-6">
        
        {/* Header Logic */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200"
          >
            <Crown className="w-4 h-4 text-emerald-800" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900">Tiered Access</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-serif text-slate-900">
            Choose Your <span className="italic text-emerald-900">Passport.</span>
          </h2>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-sm font-bold ${!isAnnual ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-slate-200 p-1 relative transition-colors"
            >
              <motion.div 
                animate={{ x: isAnnual ? 24 : 0 }}
                className="w-6 h-6 bg-emerald-600 rounded-full shadow-md"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${isAnnual ? "text-slate-900" : "text-slate-400"}`}>Annual</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-900 text-white text-[10px] font-black uppercase tracking-tighter">Save 20%</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 ${
                plan.highlight 
                ? "bg-emerald-900 text-white border-emerald-800 shadow-2xl scale-105 z-10" 
                : "bg-white text-slate-900 border-slate-100 hover:border-emerald-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg">
                  Most Coveted
                </div>
              )}

              <div className="mb-8">
                <p className={`text-xs font-black uppercase tracking-widest mb-2 ${plan.highlight ? "text-emerald-300" : "text-emerald-700"}`}>
                  {plan.tier} Tier
                </p>
                <h3 className="text-3xl font-serif font-bold">{plan.name}</h3>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black">
                  ${isAnnual ? Math.floor(plan.price * 0.8) : plan.price}
                </span>
                <span className={`text-sm font-medium ${plan.highlight ? "text-emerald-300" : "text-slate-400"}`}>
                  / month
                </span>
              </div>

              <p className={`text-sm mb-8 leading-relaxed ${plan.highlight ? "text-emerald-100" : "text-slate-500"}`}>
                {plan.desc}
              </p>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-1 p-0.5 rounded-full ${plan.highlight ? "bg-emerald-700" : "bg-emerald-50"}`}>
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-emerald-300" : "text-emerald-700"}`} />
                    </div>
                    <span className="text-sm font-medium opacity-90">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.highlight ? "secondary" : "outline"} 
                className={`w-full h-14 rounded-2xl font-bold text-base transition-all active:scale-95 ${
                  plan.highlight 
                  ? "bg-white text-emerald-900 hover:bg-emerald-50" 
                  : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Footnote */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-400">
           <div className="flex items-center gap-2">
              <InfinityIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tighter">Cancel anytime</span>
           </div>
           <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tighter">Global Express available</span>
           </div>
           <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tighter">Gift options available</span>
           </div>
        </div>
      </div>
    </section>
  );
}