import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Podcast, Radio, Youtube, Instagram, Twitter } from "lucide-react";
import { socialLinks } from "../../data/podcastData";
import { SearchModal } from "../podcast/GlobalSearch";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Episodes", path: "/episodes" },
    { name: "Shorts", path: "/shorts" },
    { name: "Guests", path: "/guests" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global search keyboard shortcuts Cmd+K and Ctrl+K
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-background/20 py-4" 
          : "bg-transparent border-b border-transparent py-5"
      }`}
      id="main-navigation-bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 md:gap-6 lg:gap-8" id="navbar-container">
          {/* Logo / Brand (navbar-brand) */}
          <div className="flex-shrink-0" id="navbar-brand">
            <Link to="/" className="flex items-center gap-3 group" id="nav-brand">
              <div className="p-2 bg-primary border border-border rounded-xl text-accent shadow-lg shadow-primary/20 group-hover:bg-surface-light group-hover:text-accent-hover transition-colors duration-300">
                <Radio className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-wider uppercase font-display text-text-primary group-hover:text-accent transition-colors duration-300">
                  Aapan <span className="text-accent">Podcast</span>
                </span>
                <span className="text-[9px] text-text-muted tracking-widest uppercase font-mono">
                  Nepali Voices & Ideas
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (navbar-links) */}
          <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-1 min-w-0" id="navbar-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative py-2 whitespace-nowrap ${
                  isActive(item.path)
                    ? "text-accent"
                    : "text-text-muted hover:text-text-primary"
                }`}
                id={`nav-link-${item.name.toLowerCase()}`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Quick Actions & Tools (navbar-actions) */}
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border flex-shrink-0" id="navbar-actions">
            {/* Search icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-text-muted hover:text-accent hover:bg-surface-light rounded-lg transition-all duration-200 cursor-pointer flex-shrink-0"
              aria-label="Search Episodes"
              id="search-trigger"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* YouTube button */}
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md whitespace-nowrap flex-shrink-0"
              id="btn-youtube-navbar"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-3.5 h-3.5 fill-current text-white"
                id="youtube-svg-navbar"
              >
                <path d="M23.498 6.163c-.272-.997-1.047-1.783-2.028-2.057C19.679 3.54 12 3.54 12 3.54s-7.679 0-9.47.566c-.981.274-1.756 1.06-2.028 2.057C0 7.973 0 12 0 12s0 4.027.502 5.837c.272.997 1.047 1.783 2.028 2.057 1.791.566 9.47.566 9.47.566s7.679 0 9.47-.566c.981-.274 1.756-1.06 2.028-2.057.502-1.81.502-5.837.502-5.837s0-4.027-.502-5.837z" />
                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff" />
              </svg> YouTube
            </a>

            {/* Spotify / Social Icon */}
            <a
              href={socialLinks.spotify}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-text-muted hover:text-green-500 hover:bg-surface-light rounded-lg transition-all flex-shrink-0"
              aria-label="Listen on Spotify"
            >
              <Podcast className="w-4.5 h-4.5" />
            </a>

            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-text-muted hover:text-pink-500 hover:bg-surface-light rounded-lg transition-all flex-shrink-0"
              aria-label="Follow on Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-text-muted hover:text-text-primary hover:bg-surface-light rounded-lg transition-all cursor-pointer"
              aria-label="Search"
              id="search-trigger-mobile"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-light focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              id="menu-toggle"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 border-b border-border animate-fadeIn" id="mobile-menu">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-accent/10 text-accent border-l-4 border-accent pl-3"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface"
                }`}
                id={`mobile-nav-link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border px-4 space-y-3">
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-bold tracking-wider rounded-lg text-sm uppercase shadow-md hover:bg-red-500 transition-all"
                id="mobile-btn-youtube"
              >
                <Youtube className="w-5 h-5 fill-current" /> Watch on YouTube
              </a>
              <Link
                to="/episodes"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-background font-bold tracking-wider rounded-lg text-sm uppercase shadow-md hover:bg-accent-hover transition-all"
                id="mobile-btn-listen"
              >
                <Podcast className="w-5 h-5" /> Listen Podcast
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Search Console */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}

