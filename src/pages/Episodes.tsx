import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { episodes } from "../data/podcastData";
import { EpisodeCard } from "../components/podcast/EpisodeCard";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Search, ChevronDown, SlidersHorizontal, Radio, Inbox, ArrowLeftRight, ChevronRight, Home } from "lucide-react";

export default function Episodes() {
  useDocumentMetadata(
    "Aapan Podcast Episodes — Watch & Listen",
    "Browse, search, and filter our library of deep Nepali podcast conversations spanning healthcare, engineering, public planning, and leadership."
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");

  // Standard/Example categories requested
  const categories = ["All", "Interviews", "Business", "Technology", "Culture", "Entertainment", "Education"];

  // Helper function to extract relative views number for comparison
  const getViewsCount = (viewsStr: string): number => {
    const cleanStr = viewsStr.toUpperCase().replace(/[^0-9.K]/g, "");
    if (cleanStr.includes("K")) {
      return parseFloat(cleanStr.replace("K", "")) * 1000;
    }
    return parseFloat(cleanStr) || 0;
  };

  // Perform client-side filter and sorting
  const filteredAndSortedEpisodes = useMemo(() => {
    let result = [...episodes];

    // 1. Text Search Filter (on title, description, or category)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q) ||
          ep.category.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((ep) => ep.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 3. Sorting
    if (selectedSort === "Latest") {
      // Sort by descending date (assuming newer date is first, or standard ISO sort or by episode id desc)
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (selectedSort === "Oldest") {
      result.sort((a, b) => a.id.localeCompare(b.id));
    } else if (selectedSort === "Most Viewed") {
      result.sort((a, b) => getViewsCount(b.views) - getViewsCount(a.views));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSort]);

  // Reset function
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSort("Latest");
  };

  return (
    <div className="bg-background text-text-primary min-h-screen pb-32" id="episodes-catalog-view">
      
      {/* Top Section with Breadcrumb */}
      <div className="bg-surface border-b border-border pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-text-primary font-bold">Episodes</span>
          </nav>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-accent/15 font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Podcast Library
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
              All Episodes
            </h1>
            <p className="text-text-muted text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
              Explore conversations, stories and ideas from Aapan Podcast. Delve into hours of unedited, long-form discussion with Nepalese visionaries and experts.
            </p>
          </div>
        </div>
      </div>

      {/* Main Filter bar and Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* FILTER BAR PANEL */}
        <div className="p-4 sm:p-5 bg-surface border border-border rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          
          {/* Left: Search input field */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              id="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, topic, or guest..."
              className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent/60 text-text-primary text-xs sm:text-sm transition-all placeholder:text-text-muted font-sans"
              aria-label="Search podcast episodes"
            />
          </div>

          {/* Right: Dropdowns Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-48">
              <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-background border border-border rounded-xl text-xs font-semibold text-text-primary focus:outline-none focus:border-accent/60 pr-10 cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-44">
              <label htmlFor="sort-filter" className="sr-only">Sort Episodes</label>
              <select
                id="sort-filter"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-background border border-border rounded-xl text-xs font-semibold text-text-primary focus:outline-none focus:border-accent/60 pr-10 cursor-pointer"
              >
                <option value="Latest">Latest Releases</option>
                <option value="Oldest">Oldest Releases</option>
                <option value="Most Viewed">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>

        </div>

        {/* METADATA RESULTS ROW */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-8 pb-4 border-b border-border">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            Found {filteredAndSortedEpisodes.length} episodes
          </span>
          {(searchQuery || selectedCategory !== "All" || selectedSort !== "Latest") && (
            <button
              onClick={handleResetFilters}
              className="text-accent font-bold hover:text-accent-hover transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* EPISODES GRID (Responsive: Desktop: 3col, Tablet: 2col, Mobile: 1col) */}
        {filteredAndSortedEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE DESIGN */
          <div className="text-center py-20 bg-surface border border-border rounded-3xl p-8 max-w-lg mx-auto shadow-xl">
            <Inbox className="w-12 h-12 text-border mx-auto mb-4" />
            <h3 className="text-lg font-bold text-text-primary font-display">No episodes found</h3>
            <p className="text-xs text-text-muted mt-2 max-w-sm mx-auto leading-relaxed font-sans">
              We couldn&apos;t find any podcast episodes matching your selected query or filters. Refine your search string or reset all options.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-5 py-2.5 bg-surface-light hover:bg-border text-text-primary text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-border flex items-center gap-2 mx-auto"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

