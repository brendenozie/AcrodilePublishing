"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Sparkles, 
  GraduationCap, 
  Globe, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Box
} from "lucide-react";

const BENEFITS = [
  "Lifetime access to Phase 01-04 Labs",
  "Industry-recognized Certification",
  "1-on-1 Mentor Support Sessions",
  "Global Alumni Network Access",
  "Starter Robotics/IoT Hardware Kit"
];

export function EnrollmentSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor - Blue accent reflecting the brand */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Badge className="bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 border-none px-4 py-1.5 rounded-full font-black tracking-widest text-[10px]">
            ADMISSIONS 2026
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Secure Your Seat in <br />
            <span className="text-blue-600">The Future Lab.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Whether you are a student starting Phase 01 or a professional seeking industrial certification, choose the pathway that powers your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          
          {/* --- OPTION 1: SCHOLARSHIP (The Impact Path) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group p-1 rounded-[3rem] bg-gradient-to-br from-blue-600 via-indigo-500 to-emerald-500 shadow-2xl transition-transform hover:scale-[1.02] duration-500"
          >
            <div className="h-full bg-white rounded-[2.9rem] p-10 md:p-14 flex flex-col">
              <div className="flex justify-between items-start mb-10">
                <div className="p-5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
                  <GraduationCap className="w-10 h-10" />
                </div>
                <Badge className="bg-emerald-500 text-white font-black px-4 py-1 animate-pulse border-none">
                  SCHOLARSHIPS OPEN
                </Badge>
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-3">Merit Scholarship</h3>
              <p className="text-slate-500 text-sm font-bold mb-10 leading-relaxed">
                Empowering high-potential innovators. We offer merit-based support covering up to 100% of tuition for the full 4-Phase Engineering Track.
              </p>

              <div className="space-y-5 mb-12 flex-grow">
                {[
                  "Full 4-Phase tuition coverage",
                  "Inclusive of Industrial Hardware Kit",
                  "Priority placement in Capstone Labs",
                  "Leadership & Soft Skills Workshops"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-black text-slate-700">
                    <div className="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center border border-emerald-200">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <Button className="w-full h-20 rounded-2xl bg-slate-900 text-white hover:bg-blue-700 transition-all text-xl font-black group shadow-xl shadow-slate-200">
                Apply for Scholarship
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* --- OPTION 2: FULL ENROLLMENT (Standard Path) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-14 rounded-[3rem] bg-slate-50 border border-slate-200 shadow-sm flex flex-col hover:bg-white hover:border-blue-100 transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="p-5 rounded-2xl bg-white shadow-sm text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <Box className="w-10 h-10" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Single Phase</p>
                <p className="text-4xl font-black text-slate-900 tracking-tighter">
                  KSH 25k<span className="text-sm font-bold text-slate-400">/start</span>
                </p>
              </div>
            </div>

            <h3 className="text-3xl font-black text-slate-900 mb-3">Professional Track</h3>
            <p className="text-slate-500 text-sm font-bold mb-10 leading-relaxed">
              Immediate entry into your chosen phase. Ideal for self-starters and professionals looking to master specific technical domains.
            </p>

            <div className="space-y-5 mb-12 flex-grow">
              {BENEFITS.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-black text-slate-600">
                  <div className="h-6 w-6 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                    <Check className="w-4 h-4 text-blue-600" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full h-20 rounded-2xl border-[3px] border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all text-xl font-black">
              Enroll in Phase 01
            </Button>
          {/* </div> */}
        </motion.div>

      {/* --- TRUST FOOTER --- */}
      <div className="mt-24 border-t border-slate-100 pt-16 flex flex-wrap justify-center gap-10 md:gap-20">
        {[
          { icon: ShieldCheck, text: "CBC Aligned Curriculum" },
          { icon: Globe, text: "Vision 2030 Integrated" },
          { icon: Zap, text: "Hands-on Hardware Labs" }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
            <item.icon className="w-5 h-5 text-blue-500" />
            {item.text}
          </div>
        ))}
      </div>
      </div>
      </div>
    </section>
  );
}