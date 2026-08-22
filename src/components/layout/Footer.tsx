import React, { useState } from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../../data/podcastData";
import { Youtube, Instagram, Twitter, Facebook, ArrowUpRight, Radio, Heart } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-background text-text-secondary border-t border-border" id="app-footer">
      {/* Top Banner / Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-text-primary tracking-tight sm:text-3xl font-display">
              Get weekly insights delivered straight to your inbox.
            </h3>
            <p className="mt-4 text-text-muted max-w-md text-sm sm:text-base leading-relaxed">
              Subscribe to the Aapan Newsletter for deep recaps, recommended reading lists, and exclusive behind-the-scenes content from our guests.
            </p>
          </div>
          <div>
            {subscribed ? (
              <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl text-center animate-fadeIn">
                <span className="text-accent font-bold block mb-1">🎉 Welcome to the inner circle!</span>
                <span className="text-sm text-text-muted">We will send you our next reflection on Sunday morning.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-5 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:border-accent/50 text-text-primary flex-grow text-sm transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-accent text-background font-bold tracking-wide rounded-xl text-sm uppercase hover:bg-accent-hover transition-all shadow-lg shadow-accent/10 shrink-0"
                >
                  Join Newsletter
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-primary border border-border text-accent rounded-lg">
              <Radio className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-wider text-text-primary uppercase font-display">
              Aapan <span className="text-accent">Podcast</span>
            </span>
          </Link>
          <p className="text-xs text-text-muted leading-relaxed">
            Nepali stories, intellectual dialogues, and philosophical perspectives. Aapan Podcast uncovers the deep motivations of change-makers shaping South Asia.
          </p>
          <div className="flex gap-4">
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noreferrer referrer"
              className="p-2.5 bg-surface border border-border hover:bg-surface-light text-text-muted hover:text-accent rounded-xl transition-all"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer referrer"
              className="p-2.5 bg-surface border border-border hover:bg-surface-light text-text-muted hover:text-accent rounded-xl transition-all"
              aria-label="Instagram Page"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noreferrer referrer"
              className="p-2.5 bg-surface border border-border hover:bg-surface-light text-text-muted hover:text-accent rounded-xl transition-all"
              aria-label="Twitter Profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer referrer"
              className="p-2.5 bg-surface border border-border hover:bg-surface-light text-text-muted hover:text-accent rounded-xl transition-all"
              aria-label="Facebook Page"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Directory Links */}
        <div>
          <h4 className="text-sm font-semibold tracking-wider text-text-primary uppercase mb-5 font-display">Explore Directory</h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <Link to="/episodes" className="hover:text-accent transition-colors flex items-center gap-1.5">
                All Episodes <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>
            </li>
            <li>
              <Link to="/shorts" className="hover:text-accent transition-colors flex items-center gap-1.5">
                High-impact Shorts <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>
            </li>
            <li>
              <Link to="/guests" className="hover:text-accent transition-colors flex items-center gap-1.5">
                Meet the Guests <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-accent transition-colors flex items-center gap-1.5">
                Advanced Episode Search <ArrowUpRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscription Channels */}
        <div>
          <h4 className="text-sm font-semibold tracking-wider text-text-primary uppercase mb-5 font-display">Listen Everywhere</h4>
          <ul className="space-y-3.5 text-xs">
            <li>
              <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                YouTube Podcasts
              </a>
            </li>
            <li>
              <a href={socialLinks.spotify} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                Spotify Audio Stream
              </a>
            </li>
            <li>
              <a href={socialLinks.apple} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                Apple Podcasts
              </a>
            </li>
            <li>
              <a href="#rss" className="hover:text-accent transition-colors">
                Direct RSS Feed
              </a>
            </li>
          </ul>
        </div>

        {/* Brand Statement */}
        <div>
          <h4 className="text-sm font-semibold tracking-wider text-text-primary uppercase mb-5 font-display">Our Philosophy</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            We believe that short soundbites don&apos;t capture life&apos;s true depths. That&apos;s why Aapan Podcast hosts long-form, uninterrupted conversations that let complex ideas breathe and authentic human stories unfurl.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-background border-t border-border text-[11px] text-text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; {new Date().getFullYear()} Aapan Podcast. All Rights Reserved. Made for modern thinkers.
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by intellectual integrity &</span>
            <Heart className="w-3 h-3 text-accent fill-accent" />
            <span>in Nepal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
