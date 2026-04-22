"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle, MessageSquareQuote } from "lucide-react";
import Image from "next/image";

const REVIEWS = [
  {
    id: 1,
    content: "The transition from the physical hardcover to the digital reader was flawless. I started reading on the train and finished the last chapter in bed on my tablet. Truly a new era for bibliophiles.",
    author: "Eleanor Rigby",
    title: "The Silent Canopy",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=eleanor",
    verified: true,
  },
  {
    id: 2,
    content: "Acrodile doesn't just publish books; they curate experiences. The paper quality of the physical editions is a tactile dream, and the digital reader's typography is the best I've seen.",
    author: "Marcus Thorne",
    title: "Visions of 2050",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=marcus",
    verified: true,
  },
  {
    id: 3,
    content: "As an author and a reader, I value the integrity Acrodile brings to the craft. Their platform feels like a sanctuary for stories that actually matter.",
    author: "Dr. Julian Voss",
    title: "The Digital Alchemist",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=julian",
    verified: false,
  },
  {
    id: 4,
    content: "Finally, a publisher that treats digital reading with the same respect as print. No distracting ads, just pure, beautiful literature.",
    author: "Amara Okoro",
    title: "Echoes of the Savannah",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=amara",
    verified: true,
  },
];

export function BookReviews() {
  return (
    <section className="py-24 bg-[#FCF9F2] relative overflow-hidden">
      {/* Decorative Ink Splatter Background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/5 rounded-full blur-[120px] -z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-amber-500 fill-current" />
              ))}
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6">
            Voices from the <span className="italic">Society.</span>
          </h2>
          <p className="text-slate-600">
            Don’t just take our word for it. Join the thousands of readers who have 
            discovered the Acrodile difference.
          </p>
        </div>

        {/* Testimonial Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/10">
                  <Image 
                    src={review.avatar} 
                    alt={review.author} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-1">
                    {review.author}
                    {review.verified && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    Reviewed: <span className="text-emerald-800">{review.title}</span>
                  </p>
                </div>
              </div>

              <div className="relative">
                <MessageSquareQuote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-900/5" />
                <p className="text-slate-700 leading-relaxed italic font-serif text-lg relative z-10">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Verified Reader</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Proof Bar */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-slate-900">As featured in:</p>
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/NYTimes.svg" alt="NYT" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/The_Guardian.svg" alt="Guardian" className="h-5" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Wired_logo.svg" alt="Wired" className="h-3" />
        </div>
      </div>
    </section>
  );
}