import React, { useState } from "react";
import { episodes, guests, shorts } from "../data/podcastData";
import { SearchResults } from "../components/podcast/GlobalSearch";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Search as SearchIcon, Radio, Sparkles, SlidersHorizontal, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Search() {
  useDocumentMetadata(
    "Search Aapan Podcast",
    "Discover past interviews, specific clips, topic categories, and guests through our unified database index."
  );

  const [query, setQuery] = useState("");

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

  const totalCount = filteredEpisodes.length + filteredGuests.length + filteredShorts.length;

  return (
    <div className="bg-background text-text-primary min-h-screen pb-32" id="search-view">
      
      {/* Search Header Container */}
      <div className="bg-surface border-b border-border pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider border border-accent/15 font-mono">
              <SearchIcon className="w-3.5 h-3.5" /> Exploration Console
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight font-display">
              Search Episodes &amp; Guests
            </h1>
            <p className="text-text-muted text-xs sm:text-sm font-sans max-w-lg mx-auto">
              Find long-form interviews, vertical shorts, or verified creator profiles instantly by typing keywords, topics, or speaker names.
            </p>
          </div>

          {/* Large custom search input */}
          <div className="relative max-w-2xl mx-auto" id="search-input-wrapper">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, keyword, or guest (e.g. Ruit, Kulman, design...)"
              className="w-full pl-13 pr-12 py-4.5 bg-background border-2 border-border rounded-2xl focus:outline-none focus:border-accent/50 text-text-primary text-sm sm:text-base transition-colors shadow-lg placeholder:text-text-muted"
              aria-label="Search podcast archives"
              autoFocus
            />
            {query.trim() && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-accent hover:text-accent-hover cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Results Metadata Header */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-8 pb-4 border-b border-border">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            {query.trim() ? (
              <>Found {totalCount} matches for &quot;{query}&quot;</>
            ) : (
              <>Ready for query exploration</>
            )}
          </span>
          {query.trim() && (
            <button
              onClick={() => setQuery("")}
              className="text-accent font-bold hover:text-accent-hover cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Reusable search results viewport */}
        <div className="animate-fadeIn">
          <SearchResults
            episodesResults={filteredEpisodes}
            guestsResults={filteredGuests}
            shortsResults={filteredShorts}
            query={query}
            onItemClick={() => {}}
          />
        </div>

      </div>
    </div>
  );
}
