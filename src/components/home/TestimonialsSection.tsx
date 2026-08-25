/**
 * ==============================================================================
 * 📌 TESTIMONIALS & CASE STUDIES SECTION
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Customer reviews and quotes from creative directors and agency leads.
 * ==============================================================================
 */

"use client";

import { Star, Quote, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "DevHub Studio revolutionized our production pipeline. With automated milestone escrow, our enterprise clients feel completely secure, and our creators get paid within 24 hours of deliverable approval.",
    author: "Alexandra Vance",
    role: "Head of Creative Production",
    company: "HyperScale Media",
    avatar: "/images/david_profile.png",
    rating: 5,
  },
  {
    quote:
      "The RTK Query and dynamic architecture make this the most responsive creator management dashboard we've ever deployed. The transaction transparency has saved our finance team 15+ hours weekly.",
    author: "Julian Reynolds",
    role: "Managing Partner",
    company: "StudioX Global",
    avatar: "/images/david_profile.png",
    rating: 5,
  },
  {
    quote:
      "Direct WebSocket messaging and file versioning built right into the milestone tracker eliminated dozens of lost revision requests. A true game-changer for agency workflows.",
    author: "Maya Patel",
    role: "Design Director",
    company: "InnovateLab Brand Co.",
    avatar: "/images/david_profile.png",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Agency Results</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Loved by Fast-Moving Creative Teams
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            See how top creative executives rely on DevHub Studio to scale client production and manage global talent.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:border-slate-200 transition-all duration-300 relative"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-indigo-200 mb-4" />

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <Avatar className="h-10 w-10 border border-slate-200">
                  <AvatarImage src={item.avatar} alt={item.author} />
                  <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">
                    {item.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{item.author}</h4>
                  <p className="text-[10px] text-slate-500">
                    {item.role}, <span className="font-semibold text-slate-700">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
