import React from "react";
import { Link } from "react-router-dom";
import { shorts } from "../data/podcastData";
import { ShortGrid } from "../components/podcast/ShortCard";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { ChevronRight, Home, Video, Tv } from "lucide-react";

export default function Shorts() {
  useDocumentMetadata(
    "Aapan Podcast Shorts — High-Impact Clips",
    "Stream vertical podcast highlights, takeaways, and inspirational ideas from the Aapan Podcast archive on any device."
  );

  return (
    <div className="bg-background text-text-primary min-h-screen pb-32" id="shorts-catalog-view">
      
      {/* Top Banner and Breadcrumbs */}
      <div className="bg-surface border-b border-border pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-text-primary font-bold">Shorts</span>
          </nav>

          {/* Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/10 text-red-500 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-red-500/15 font-mono">
              <Video className="w-3.5 h-3.5 animate-pulse" /> Vertical Clips
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
              Aapan Shorts
            </h1>
            <p className="text-text-muted text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
              Bite-sized knowledge, powerful ideas, and key takeaways from our deep conversations. Swipe, stream, and share our vertical highlights.
            </p>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-8 pb-4 border-b border-border">
          <span className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-red-500" />
            Displaying {shorts.length} High-Impact Clips
          </span>
          <a
            href="https://youtube.com/@AapanPodcast"
            target="_blank"
            rel="noreferrer"
            className="text-red-500 font-bold hover:text-red-400 transition-colors"
          >
            Watch Channel
          </a>
        </div>

        {/* Short Grid Component */}
        <ShortGrid shortsList={shorts} />

      </div>
    </div>
  );
}
