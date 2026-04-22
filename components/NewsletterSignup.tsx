"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Gift, 
  Send 
} from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // Logic to connect to your newsletter API would go here
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="relative bg-slate-900 rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl">
          
          {/* Background Textures & Glows */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-900/50 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: The Hook */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  Join the Acrodile Society
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                For those who live <br /> 
                <span className="italic text-emerald-400">Between the Lines.</span>
              </h2>

              <p className="text-slate-400 text-lg max-w-md">
                Society members receive early access to limited edition hardcovers, exclusive digital chapters, and invitations to private author dialogues.
              </p>

              {/* Benefit List */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Lock className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Early access to New Releases (48h before public)</p>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Gift className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">Exclusive monthly &quot;Society-Only&quot; digital titles</p>
                </div>
              </div>
            </div>

            {/* Right Column: The Action */}
            <div className="relative">
              {!isSubscribed ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-inner"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">
                        Member Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="reading@acrodile.com"
                          className="w-full h-16 pl-12 pr-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-900/20 group"
                    >
                      Initialize Membership
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-[10px] text-center text-slate-500 uppercase tracking-tighter">
                      By joining, you agree to our <span className="underline cursor-pointer hover:text-white">Literary Privacy Policy</span>
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 backdrop-blur-xl p-12 rounded-[2.5rem] border border-emerald-500/20 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-white italic">Welcome to the Society.</h3>
                  <p className="text-slate-400 text-sm">
                    A confirmation manuscript has been dispatched to <br />
                    <span className="text-emerald-400 font-bold">{email}</span>.
                  </p>
                </motion.div>
              )}

              {/* Decorative Envelope Silhouette */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-white/5 rounded-full pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}