import React from "react";
import { Link } from "react-router-dom";
import { Guest, episodes } from "../../data/podcastData";
import { EpisodeCard } from "./EpisodeCard";
import { UserCheck, Sparkles, Tv, Twitter, Linkedin, Instagram, Youtube, ArrowUpRight, X } from "lucide-react";

// Helper function to count episodes for a given guest ID
export function getGuestEpisodeCount(guestId: string): number {
  return episodes.filter((ep) => ep.guestId === guestId).length;
}

// 1. Reusable GuestCard Component
interface GuestCardProps {
  guest: Guest;
  onSelect: (guest: Guest) => void;
  key?: string;
}

export function GuestCard({ guest, onSelect }: GuestCardProps) {
  const count = getGuestEpisodeCount(guest.id);

  return (
    <div
      onClick={() => onSelect(guest)}
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-2xl transition-all duration-300 flex flex-col h-full cursor-pointer"
      id={`guest-card-${guest.id}`}
    >
      {/* Portrait frame */}
      <div className="relative aspect-square overflow-hidden bg-background">
        <img
          src={guest.image}
          alt={guest.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Dark overlay that deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

        {/* View episodes callout revealed on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-4 py-2 bg-accent text-background text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-1.5 transition-transform translate-y-3 group-hover:translate-y-0 duration-300">
            View Episodes <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Floating Episode Counter Badge */}
        <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-accent border border-accent/15 flex items-center gap-1 shadow-md">
          <Tv className="w-3.5 h-3.5" /> {count} {count === 1 ? "Episode" : "Episodes"}
        </div>
      </div>

      {/* Guest Info details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest font-mono">
          Featured Speaker
        </span>
        <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors mt-1 font-display">
          {guest.name}
        </h3>
        <p className="text-xs text-text-muted mt-0.5 font-semibold line-clamp-1">
          {guest.role}
        </p>
        <p className="text-xs text-text-muted leading-relaxed mt-3 line-clamp-2 font-sans flex-grow">
          {guest.bio}
        </p>
      </div>
    </div>
  );
}

// 2. Reusable GuestGrid Component
interface GuestGridProps {
  guestsList: Guest[];
  onSelectGuest: (guest: Guest) => void;
}

export function GuestGrid({ guestsList, onSelectGuest }: GuestGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8" id="guests-display-grid">
      {guestsList.map((guest) => (
        <GuestCard key={guest.id} guest={guest} onSelect={onSelectGuest} />
      ))}
    </div>
  );
}

// 3. Reusable GuestProfile Component (Detailed view of selected guest and their episodes)
interface GuestProfileProps {
  guest: Guest;
  onClose: () => void;
}

export function GuestProfile({ guest, onClose }: GuestProfileProps) {
  // Find all actual episodes matching this guest
  const guestEpisodes = episodes.filter((ep) => ep.guestId === guest.id);

  return (
    <div 
      className="p-6 sm:p-8 bg-surface border border-border rounded-3xl space-y-8 shadow-2xl relative"
      id={`guest-detailed-profile-${guest.id}`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-background hover:bg-surface-light border border-border rounded-xl text-text-muted hover:text-text-primary transition-all cursor-pointer"
        aria-label="Close Profile"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start pb-6 border-b border-border">
        {/* Big Portrait */}
        <img
          src={guest.image}
          alt={guest.name}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl object-cover border border-border shrink-0 shadow-lg"
          loading="lazy"
        />

        {/* Info */}
        <div className="space-y-3 flex-grow">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-wider border border-accent/15 font-mono">
              <UserCheck className="w-3.5 h-3.5" /> Verified Creator Profile
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text-primary font-display pt-1">
              {guest.name}
            </h2>
            <p className="text-sm font-semibold text-accent font-mono">{guest.role}</p>
          </div>

          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans max-w-3xl">
            {guest.bio}
          </p>

          {/* Social connections */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="text-[10px] font-mono uppercase text-text-muted tracking-widest">Connect:</span>
            {guest.socials.twitter && (
              <a
                href={guest.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-text-secondary hover:text-accent flex items-center gap-1"
              >
                <Twitter className="w-3.5 h-3.5 fill-current" /> Twitter
              </a>
            )}
            {guest.socials.linkedin && (
              <a
                href={guest.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-text-secondary hover:text-accent flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current" /> LinkedIn
              </a>
            )}
            {guest.socials.instagram && (
              <a
                href={guest.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-text-secondary hover:text-accent flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
            )}
            {guest.socials.youtube && (
              <a
                href={guest.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-text-secondary hover:text-accent flex items-center gap-1"
              >
                <Youtube className="w-3.5 h-3.5 fill-current" /> YouTube
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Related episodes grid */}
      <div className="space-y-6">
        <h3 className="text-base sm:text-lg font-bold font-display text-text-primary flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" /> Conversations with {guest.name} ({guestEpisodes.length})
        </h3>

        {guestEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guestEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-background border border-border rounded-2xl text-center text-text-muted text-xs">
            No long-form episodes are published yet for this guest. Check back soon!
          </div>
        )}
      </div>

    </div>
  );
}
