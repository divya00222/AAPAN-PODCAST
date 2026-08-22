import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { guests, Guest } from "../data/podcastData";
import { GuestGrid, GuestProfile } from "../components/podcast/GuestComponents";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { ChevronRight, Home, Users, Sparkles, UserCheck } from "lucide-react";

export default function Guests() {
  useDocumentMetadata(
    "Aapan Podcast Guests — Meet Our Speakers",
    "Explore the profiles, career bios, and interview sessions of world-renowned ophthalmologists, administrative leaders, miss world participants, and innovators."
  );

  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const profileSectionRef = useRef<HTMLDivElement>(null);

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    // Smooth scroll to profile display segment
    setTimeout(() => {
      profileSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCloseProfile = () => {
    setSelectedGuest(null);
  };

  return (
    <div className="bg-background text-text-primary min-h-screen pb-32" id="guests-catalog-view">
      
      {/* Top Banner and Breadcrumbs */}
      <div className="bg-surface border-b border-border pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-text-primary font-bold">Guests</span>
          </nav>

          {/* Title */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-accent/15 font-mono">
              <Users className="w-3.5 h-3.5 animate-pulse" /> Community Directory
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
              Meet Our Guests
            </h1>
            <p className="text-text-muted text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
              Creators, entrepreneurs, experts and voices shaping the conversation. Click any profile to view their detailed bio, social channels, and matching long-form dialogue episodes.
            </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Profile Display Section (Smooth scrolls into view when guest is selected) */}
        <div ref={profileSectionRef} className="scroll-mt-24">
          {selectedGuest && (
            <div className="mb-12 animate-fade-in">
              <GuestProfile guest={selectedGuest} onClose={handleCloseProfile} />
            </div>
          )}
        </div>

        {/* Directory header */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted pb-4 border-b border-border">
          <span className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-accent" />
            Showing {guests.length} Verified Leaders
          </span>
          <span className="text-text-muted">Click to View Related Episodes</span>
        </div>

        {/* Guest Directory Grid */}
        <GuestGrid guestsList={guests} onSelectGuest={handleSelectGuest} />

      </div>
    </div>
  );
}
