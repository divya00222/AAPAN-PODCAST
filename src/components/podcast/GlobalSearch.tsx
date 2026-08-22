import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { episodes, guests, shorts, Episode, Guest, Short } from "../../data/podcastData";
import { Search, X, Radio, User, Video, CornerDownLeft, Sparkles, AlertCircle } from "lucide-react";

// 1. SearchButton Component (Global Trigger)
interface SearchButtonProps {
  onClick: () => void;
  id?: string;
  className?: string;
}

export function SearchButton({ onClick, id = "global-search-trigger", className }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      id={id}
      className={`p-2.5 bg-surface border border-border hover:border-accent/40 rounded-xl text-text-muted hover:text-accent hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${className}`}
      aria-label="Open Search Portal"
    >
      <Search className="w-4 h-4" />
      <span className="text-[10px] font-mono uppercase font-bold tracking-wider hidden sm:inline">Search</span>
      <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-mono text-text-muted bg-background border border-border rounded font-bold">
        <span>⌘</span>K
      </kbd>
    </button>
  );
}

// Helper to look up guest name for any episode
function getEpisodeGuestName(guestId: string): string {
  const g = guests.find((item) => item.id === guestId);
  return g ? g.name : "";
}

// 2. SearchResults Component (Grouped & Highlighted)
interface SearchResultsProps {
  episodesResults: Episode[];
  guestsResults: Guest[];
  shortsResults: Short[];
  query: string;
  onItemClick: () => void;
}

export function SearchResults({
  episodesResults,
  guestsResults,
  shortsResults,
  query,
  onItemClick
}: SearchResultsProps) {
  const totalCount = episodesResults.length + guestsResults.length + shortsResults.length;

  if (query.trim() && totalCount === 0) {
    return (
      <div className="text-center py-16 px-6 bg-surface border border-border rounded-2xl max-w-md mx-auto" id="search-empty-state">
        <AlertCircle className="w-10 h-10 text-text-muted mx-auto mb-3" />
        <h4 className="text-sm font-bold text-text-primary">No results found</h4>
        <p className="text-xs text-text-muted mt-1 leading-relaxed">
          We couldn&apos;t find anything matching &quot;{query}&quot;. Try reviewing spelling or searching for broad terms.
        </p>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="space-y-4 max-w-xl mx-auto text-center" id="search-recommendations-panel">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Popular search tags
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {["Cataract", "Hydropower", "Miss Nepal", "Feminism", "Innovation", "Kathmandu", "Sustainable"].map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1.5 bg-surface border border-border hover:border-accent/30 text-text-muted hover:text-accent rounded-xl text-xs font-mono font-bold transition-all"
            >
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto" id="search-results-viewport">
      
      {/* Result Tally header */}
      <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pb-2 border-b border-border">
        <span>SEARCH MATCHES FOR &quot;{query}&quot;</span>
        <span className="font-bold text-accent">{totalCount} items found</span>
      </div>

      {/* EPISODES SECTION */}
      {episodesResults.length > 0 && (
        <section className="space-y-3" aria-labelledby="episodes-search-section-title">
          <h4 id="episodes-search-section-title" className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-accent" /> Episodes ({episodesResults.length})
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {episodesResults.map((ep) => {
              const guestName = getEpisodeGuestName(ep.guestId);
              return (
                <Link
                  key={ep.id}
                  to={`/episodes/${ep.id}`}
                  onClick={onItemClick}
                  className="flex items-center gap-4 p-3 bg-surface border border-border hover:border-accent/40 rounded-xl hover:shadow-md transition-all group"
                >
                  <img
                    src={ep.coverImage}
                    alt={ep.title}
                    className="w-16 h-10 object-cover rounded-lg border border-border"
                  />
                  <div className="flex-grow min-w-0">
                    <span className="block text-[9px] font-mono text-accent uppercase tracking-widest font-bold">
                      {ep.category}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                      {ep.title}
                    </h5>
                    <span className="text-[10px] text-text-muted font-semibold">
                      with {guestName} • {ep.duration}
                    </span>
                  </div>
                  <CornerDownLeft className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* GUESTS SECTION */}
      {guestsResults.length > 0 && (
        <section className="space-y-3" aria-labelledby="guests-search-section-title">
          <h4 id="guests-search-section-title" className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-accent" /> Guests ({guestsResults.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guestsResults.map((guest) => (
              <Link
                key={guest.id}
                to="/guests"
                onClick={onItemClick}
                className="flex items-center gap-3 p-3 bg-surface border border-border hover:border-accent/40 rounded-xl hover:shadow-md transition-all group"
              >
                <img
                  src={guest.image}
                  alt={guest.name}
                  className="w-10 h-10 object-cover rounded-full border border-border"
                />
                <div className="min-w-0 flex-grow">
                  <h5 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                    {guest.name}
                  </h5>
                  <p className="text-[10px] text-text-muted truncate">
                    {guest.role}
                  </p>
                </div>
                <CornerDownLeft className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SHORTS SECTION */}
      {shortsResults.length > 0 && (
        <section className="space-y-3" aria-labelledby="shorts-search-section-title">
          <h4 id="shorts-search-section-title" className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-red-500" /> Shorts ({shortsResults.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shortsResults.map((short) => (
              <a
                key={short.id}
                href={short.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                onClick={onItemClick}
                className="flex items-center gap-3 p-3 bg-surface border border-border hover:border-accent/40 rounded-xl hover:shadow-md transition-all group"
              >
                <img
                  src={short.thumbnailUrl}
                  alt={short.title}
                  className="w-8 h-12 object-cover rounded border border-border"
                />
                <div className="min-w-0 flex-grow">
                  <h5 className="text-xs sm:text-sm font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                    {short.title}
                  </h5>
                  <p className="text-[10px] text-text-muted">
                    Short • {short.views} views
                  </p>
                </div>
                <CornerDownLeft className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

// 3. SearchModal Component (Comprehensive dialog container)
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Dynamic filter lists
  const filteredEpisodes = query.trim()
    ? episodes.filter((ep) => {
        const str = query.toLowerCase().trim();
        const guest = guests.find((g) => g.id === ep.guestId);
        const guestName = guest ? guest.name.toLowerCase() : "";
        
        return (
          ep.title.toLowerCase().includes(str) ||
          ep.description.toLowerCase().includes(str) ||
          ep.summary.toLowerCase().includes(str) ||
          ep.category.toLowerCase().includes(str) ||
          guestName.includes(str)
        );
      })
    : [];

  const filteredGuests = query.trim()
    ? guests.filter((g) => {
        const str = query.toLowerCase().trim();
        return (
          g.name.toLowerCase().includes(str) ||
          g.role.toLowerCase().includes(str) ||
          g.bio.toLowerCase().includes(str)
        );
      })
    : [];

  const filteredShorts = query.trim()
    ? shorts.filter((sh) => {
        const str = query.toLowerCase().trim();
        return (
          sh.title.toLowerCase().includes(str) ||
          sh.views.toLowerCase().includes(str)
        );
      })
    : [];

  // Close on Escape shortcut key & listen to keyboard Cmd+K shortcut globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-background/98 backdrop-blur-md flex flex-col pt-16 sm:pt-24 pb-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Global Search Console"
      id="search-overlay-portal"
    >
      <div className="w-full max-w-4xl mx-auto space-y-8 flex flex-col h-full">
        
        {/* Header Action Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold">
            <Radio className="w-4 h-4 animate-pulse" /> AAPAN SEARCH CONSOLE
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-surface hover:bg-surface-light border border-border hover:border-text-muted text-text-muted hover:text-text-primary rounded-xl transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            aria-label="Close search portal"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big search field box */}
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 sm:w-6 sm:h-6" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type keywords, guests, or categories..."
            className="w-full pl-13 pr-12 py-4.5 bg-surface border-2 border-border focus:border-accent rounded-2xl focus:outline-none text-base sm:text-lg font-medium transition-colors shadow-xl placeholder:text-text-muted"
            aria-label="Type your search query"
          />
          {query.trim() && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary bg-background border border-border rounded-lg transition-all text-[10px] font-mono cursor-pointer"
              aria-label="Clear query text"
            >
              Clear
            </button>
          )}
        </div>

        {/* Grouped results view */}
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <SearchResults
            episodesResults={filteredEpisodes}
            guestsResults={filteredGuests}
            shortsResults={filteredShorts}
            query={query}
            onItemClick={onClose}
          />
        </div>

      </div>
    </div>
  );
}
