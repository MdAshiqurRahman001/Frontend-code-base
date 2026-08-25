/**
 * ==============================================================================
 * 📌 DELIVERABLES & CREATOR SHOWCASE SECTION
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Displays a gallery of high-quality creative deliverables produced on the platform.
 * ==============================================================================
 */

"use client";

import { Sparkles, Eye, Star, Heart, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const showcaseItems = [
  {
    id: 1,
    title: "Cinematic 4K Commercial Reel",
    category: "Video Production",
    creator: "David Miller",
    avatar: "/images/david_profile.png",
    rating: "5.0",
    escrow: "$4,500.00",
    bgColor: "from-blue-600 to-indigo-900",
    tag: "Trending Reel",
  },
  {
    id: 2,
    title: "FinTech Mobile App Redesign",
    category: "UI/UX & Design Systems",
    creator: "Sofia Chen",
    avatar: "/images/david_profile.png",
    rating: "4.9",
    escrow: "$6,200.00",
    bgColor: "from-purple-600 to-indigo-950",
    tag: "Editor's Choice",
  },
  {
    id: 3,
    title: "3D Product Animation & Motion",
    category: "3D & VFX",
    creator: "Marcus Jordan",
    avatar: "/images/david_profile.png",
    rating: "5.0",
    escrow: "$3,800.00",
    bgColor: "from-emerald-600 to-teal-950",
    tag: "High Demand",
  },
  {
    id: 4,
    title: "Global Brand Identity Package",
    category: "Brand Strategy",
    creator: "Elena Rostova",
    avatar: "/images/david_profile.png",
    rating: "5.0",
    escrow: "$5,100.00",
    bgColor: "from-amber-600 to-orange-950",
    tag: "Verified Talent",
  },
];

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 md:py-28 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Deliverables</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Deliverables Shipped on DevHub
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md">
            Explore recent milestones completed by top creators for high-growth startups and global consumer brands.
          </p>
        </div>

        {/* 4 Cards Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700/80 hover:border-indigo-500/50 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Preview Thumbnail Box */}
              <div
                className={`h-48 w-full bg-gradient-to-tr ${item.bgColor} p-4 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="flex justify-between items-center z-10">
                  <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px] font-bold text-amber-300">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="z-10">
                  <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-white line-clamp-1">
                    {item.title}
                  </h3>
                </div>

                {/* Subtle graphic wave */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>

              {/* Creator details bar */}
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8 border border-slate-700">
                    <AvatarImage src={item.avatar} alt={item.creator} />
                    <AvatarFallback className="bg-indigo-600 text-white text-[10px] font-bold">
                      {item.creator.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-bold text-white">{item.creator}</p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block">Milestone</span>
                  <span className="text-xs font-black text-emerald-400">{item.escrow}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
