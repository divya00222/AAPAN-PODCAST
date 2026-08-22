import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Episode, Guest, Short, episodes, guests, shorts, socialLinks } from "../../data/podcastData";
import { FeaturedEpisode } from "../podcast/EpisodeCard";
import PodcastCard from "../podcast/PodcastCard";
import { ShortCard } from "../podcast/ShortCard";
import { GuestCard } from "../podcast/GuestComponents";
import { 
  Tv, 
  Flame, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  ChevronRight, 
  Youtube, 
  Radio, 
  Layers, 
  Award, 
  ArrowUpRight, 
  Mail, 
  Send, 
  CheckCircle2, 
  Users, 
  BookOpen, 
  Podcast, 
  Instagram, 
  Twitter, 
  Facebook 
} from "lucide-react";

// --- Helper: Parse view counts for sorting popular episodes ---
function parseViewCount(viewsStr: string): number {
  const numeric = viewsStr.replace(/[^0-9.]/g, "");
  const value = parseFloat(numeric);
  if (viewsStr.toLowerCase().includes("k")) {
    return value * 1000;
  }
  if (viewsStr.toLowerCase().includes("m")) {
    return value * 1000000;
  }
  return value || 0;
}

// 1. Latest Episode Section
export function LatestEpisodeSection() {
  const latestEp = episodes.find((ep) => ep.isFeatured) || episodes[0];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="section-latest-episode">
      <div className="text-center md:text-left space-y-2 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider border border-accent/15 font-mono">
          <Compass className="w-3.5 h-3.5" /> Spotlight Conversation
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary font-display">
          Listen to the Latest Conversation
        </h2>
      </div>
      <FeaturedEpisode episode={latestEp} />
    </section>
  );
}

// 2. Featured Episodes Section (Exactly 3 curated episodes)
export function FeaturedEpisodesSection() {
  const featuredList = episodes.slice(0, 3);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border" id="section-featured-episodes">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-1">
          <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-widest block">
            HANDPICKED DIALOGUES
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary font-display uppercase tracking-tight">
            Featured Conversations
          </h2>
        </div>
        <Link 
          to="/episodes"
          className="group flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent-hover transition-colors"
        >
          Browse All Episodes <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredList.map((ep) => (
          <PodcastCard key={ep.id} episode={ep} />
        ))}
      </div>
    </section>
  );
}

// 3. Podcast Categories Section
export function PodcastCategoriesSection() {
  const categoriesList = [
    { name: "Social Impact & Healthcare", icon: Award, desc: "Socio-medical innovations and grassroots community programs reshaping quality of life." },
    { name: "Governance & Leadership", icon: Layers, desc: "Analyzing institutional reforms, developmental grids, and strategic national engineering." },
    { name: "Architecture & Activism", icon: Sparkles, desc: "Converging cultural aesthetics with functional environmental engineering and modern planning." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border" id="section-categories">
      <div className="text-center space-y-2 mb-12">
        <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-widest">
          TOPIC HUBS
        </span>
        <h2 className="text-xl sm:text-2xl font-black font-display text-text-primary uppercase tracking-tight">
          Explore Conversations by Category
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoriesList.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-surface border border-border rounded-2xl hover:border-accent/40 transition-all duration-300"
            >
              <div className="p-3 bg-accent/10 text-accent rounded-xl w-fit mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-display text-text-primary mb-2">
                {cat.name}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed font-sans">
                {cat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 4. Popular Episodes Section (Exactly 4 episodes sorted by views/popularity count)
export function PopularEpisodesSection() {
  // Sort by popularity and select top 4
  const popularList = [...episodes]
    .sort((a, b) => parseViewCount(b.views) - parseViewCount(a.views))
    .slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border" id="section-popular-episodes">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-1">
          <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-widest block">
            MOST WATCHED
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary font-display uppercase tracking-tight">
            Popular Conversations
          </h2>
        </div>
        <Link 
          to="/episodes"
          className="group flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent-hover transition-colors"
        >
          All Episodes <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {popularList.map((ep) => (
          <PodcastCard key={ep.id} episode={ep} />
        ))}
      </div>
    </section>
  );
}

// 5. Shorts Preview Section (Exactly 4 shorts)
export function ShortsPreviewSection() {
  const list = shorts.slice(0, 4);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border" id="section-shorts-preview">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-1">
          <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-widest block">
            VERTICAL CLIPS
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary font-display uppercase tracking-tight">
            High-Impact Shorts
          </h2>
        </div>
        <Link 
          to="/shorts"
          className="group flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent-hover transition-colors"
        >
          All Shorts <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((short) => (
          <ShortCard key={short.id} short={short} />
        ))}
      </div>
    </section>
  );
}

// 6. Guests Preview Section (Exactly 4 guests)
export function GuestsPreviewSection() {
  const featuredGuests = guests.slice(0, 4);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border" id="section-guests-preview">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-1">
          <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-widest block">
            COMMUNITY DIRECTORY
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary font-display uppercase tracking-tight">
            Featured Speakers &amp; Leaders
          </h2>
        </div>
        <Link 
          to="/guests"
          className="group flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent-hover transition-colors"
        >
          Meet All Guests <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {featuredGuests.map((guest) => (
          <GuestCard key={guest.id} guest={guest} onSelect={() => {}} />
        ))}
      </div>
    </section>
  );
}

// 7. About Aapan Podcast Section (Compact editorial section with "Learn More" CTA)
export function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border" id="section-editorial-about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Typographic Header column */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-widest block">
            OUR BRAND MANIFESTO
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-text-primary uppercase leading-tight">
            Documenting the Minds Shaping Nepal&apos;s Tomorrow.
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
            Aapan Podcast is more than a conversational media channel — it is an archival audio platform built to gather the strategic blueprints, human struggles, and cultural insights of Nepal&apos;s leading social entrepreneurs, scientists, and creatives.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent text-background hover:bg-accent-hover font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-accent/10"
            >
              Learn More About Our Mission <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Supporting Editorial Column */}
        <div className="lg:col-span-7 bg-surface border border-border p-6 sm:p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="text-lg font-black font-display text-accent">01. Deep Dialogues</div>
            <p className="text-xs text-text-muted leading-relaxed font-sans">
              No clickbait. No rushed soundbites. We conduct deliberate, deep-dive conversations designed to document actionable ideas.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-black font-display text-accent">02. Verified Leaders</div>
            <p className="text-xs text-text-muted leading-relaxed font-sans">
              From world-renowned eye surgeons to public utility reformers, we host verified actors building real infrastructural change.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-black font-display text-accent">03. High Production</div>
            <p className="text-xs text-text-muted leading-relaxed font-sans">
              Committed to studio-grade acoustics and multi-cam visual fidelity, securing comfortable streaming across all screens.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-black font-display text-accent">04. Local Innovation</div>
            <p className="text-xs text-text-muted leading-relaxed font-sans">
              Highlighting home-grown intellectual capital, fostering technical research, wireless developments, and community architecture.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// 8. YouTube CTA (Large premium burgundy/black section)
export function YoutubeCTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="section-youtube-promo-banner">
      <div className="relative bg-gradient-to-r from-red-950 via-neutral-950 to-neutral-900 border border-red-900/30 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        
        {/* Visual background ambient ring */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-600/15 text-red-500 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border border-red-500/15">
            <Youtube className="w-3.5 h-3.5 fill-current" /> Live Broadcast Channel
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white uppercase leading-tight">
            Never Miss a Conversation.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl font-sans">
            We release fresh, unedited, cinematic-quality interviews twice every week. Subscribe to join over 150,000 active subscribers receiving direct, visual broadcasts of Nepali intellect.
          </p>

          <div className="pt-2">
            <a
              href="https://youtube.com/@AapanPodcast"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-900/40"
            >
              <Youtube className="w-4 h-4 fill-current" /> Subscribe on YouTube
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

// 9. Social Media (Standard, clean directory list)
export function SocialMediaSection() {
  const channels = [
    { name: "YouTube", icon: Youtube, url: socialLinks.youtube, color: "text-red-500 hover:bg-red-500/5 hover:border-red-500/30" },
    { name: "Spotify", icon: Podcast, url: socialLinks.spotify, color: "text-emerald-500 hover:bg-emerald-500/5 hover:border-emerald-500/30" },
    { name: "Apple Podcasts", icon: Radio, url: socialLinks.apple, color: "text-purple-500 hover:bg-purple-500/5 hover:border-purple-500/30" },
    { name: "Instagram", icon: Instagram, url: socialLinks.instagram, color: "text-pink-500 hover:bg-pink-500/5 hover:border-pink-500/30" },
    { name: "Twitter / X", icon: Twitter, url: socialLinks.twitter, color: "text-sky-500 hover:bg-sky-500/5 hover:border-sky-500/30" },
    { name: "Facebook", icon: Facebook, url: socialLinks.facebook, color: "text-blue-500 hover:bg-blue-500/5 hover:border-blue-500/30" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border" id="section-social-directory">
      <div className="text-center space-y-2 mb-8">
        <span className="text-[10px] text-accent font-mono font-bold uppercase tracking-widest">
          STREAM PLATFORMS
        </span>
        <h2 className="text-base sm:text-lg font-black font-display text-text-primary uppercase tracking-tight">
          Join Our Digital Assembly Anywhere
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {channels.map((ch, idx) => {
          const Icon = ch.icon;
          return (
            <a
              key={idx}
              href={ch.url}
              target="_blank"
              rel="noreferrer"
              className={`flex flex-col items-center justify-center p-5 bg-surface border border-border rounded-2xl transition-all duration-300 group ${ch.color}`}
            >
              <Icon className="w-5 h-5 mb-2 transition-transform group-hover:scale-110" />
              <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider group-hover:text-text-primary">
                {ch.name}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

// 10. Newsletter / Community CTA (with secure client-side check)
export function NewsletterCTASection() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setError("Please write a valid email format.");
      return;
    }

    setError("");
    setSuccess(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="section-newsletter-portal">
      <div className="bg-surface border border-border rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto text-center space-y-6 shadow-xl">
        <div className="p-3 bg-accent/10 text-accent rounded-full w-fit mx-auto">
          <Mail className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black font-display text-text-primary uppercase tracking-tight">
            Subscribe to Our Weekly Notebook
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-lg mx-auto font-sans">
            Get early updates on guest releases, exclusive transcripts, recommended reading lists, and high-impact wisdom straight to your inbox.
          </p>
        </div>

        {success ? (
          <div className="p-4 bg-accent/10 border border-accent/25 rounded-2xl max-w-md mx-auto space-y-1.5 animate-fade-in">
            <CheckCircle2 className="w-6 h-6 text-accent mx-auto" />
            <h4 className="text-sm font-bold text-text-primary">Subscription Successful</h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Form validated! The email has been recorded in our localized UI state and is completely set up to integrate with real mailing APIs.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setEmail("");
              }}
              className="text-[10px] font-mono text-accent font-bold hover:underline"
            >
              Reset form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto" noValidate>
            <div className="flex flex-col sm:flex-row gap-2 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. yourname@gmail.com"
                className="flex-grow px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-all"
                aria-label="Enter your email to subscribe"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-accent text-background hover:bg-accent-hover font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5 fill-current" /> Join Hub
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500 font-mono mt-2 text-left flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

// Simple fallback error icon helper since AlertCircle wasn't imported initially
function AlertCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}
