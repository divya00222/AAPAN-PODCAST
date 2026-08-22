import React from "react";
import { motion } from "motion/react";
import { Short } from "../../data/podcastData";
import { Play, Eye, Clock, Youtube } from "lucide-react";

// 1. Reusable ShortCard Component
interface ShortCardProps {
  short: Short;
  key?: string;
}

export function ShortCard({ short }: ShortCardProps) {
  return (
    <article
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col h-full"
      id={`short-card-${short.id}`}
    >
      {/* 9:16 Video Thumbnail Container */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-background border-b border-border">
        {/* Thumbnail Image */}
        <img
          src={short.thumbnailUrl}
          alt={short.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Dynamic Dark Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Interactive Floating Details (Duration badge) */}
        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold text-accent border border-accent/10 flex items-center gap-1 shadow">
          <Clock className="w-3 h-3" /> {short.duration}
        </div>

        {/* Play Icon animation in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0.4 }}
            whileHover={{ scale: 1.15, opacity: 1 }}
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut",
              },
            }}
            className="p-4 bg-red-600 group-hover:bg-red-500 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer pointer-events-none"
          >
            <Play className="w-5 h-5 fill-current translate-x-0.5 stroke-[2.5]" />
          </motion.div>
        </div>

        {/* Bottom Content inside Thumbnail Overlay (Title and Views) */}
        <div className="absolute bottom-0 inset-x-0 p-4 space-y-2 text-white flex flex-col justify-end">
          <span className="inline-block bg-accent text-background text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md w-fit">
            SHORT
          </span>
          <h3 className="text-xs sm:text-sm font-bold leading-snug font-display line-clamp-3 text-shadow group-hover:text-accent transition-colors">
            {short.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted text-shadow">
            <Eye className="w-3.5 h-3.5 text-accent" /> {short.views} views
          </div>
        </div>
      </div>

      {/* Watch on YouTube button container */}
      <div className="p-3 bg-surface border-t border-border mt-auto">
        <a
          href={short.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all shadow-md shadow-red-900/10"
        >
          <Youtube className="w-3.5 h-3.5 fill-current" /> Watch on YouTube
        </a>
      </div>
    </article>
  );
}

// 2. Reusable ShortGrid Component
interface ShortGridProps {
  shortsList: Short[];
}

export function ShortGrid({ shortsList }: ShortGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8" id="shorts-display-grid">
      {shortsList.map((short) => (
        <ShortCard key={short.id} short={short} />
      ))}
    </div>
  );
}
