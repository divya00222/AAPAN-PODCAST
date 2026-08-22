import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { episodes, guests } from "../data/podcastData";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { EpisodeCard, getEpisodeNumber } from "../components/podcast/EpisodeCard";
import { 
  Play, 
  Pause, 
  Calendar, 
  Clock, 
  Radio, 
  ArrowLeft, 
  Sparkles,
  Youtube,
  Tv,
  Share2,
  Copy,
  Facebook,
  Twitter,
  MessageSquare,
  Home,
  Check,
  ChevronRight
} from "lucide-react";

// Robust utility to convert standard YouTube links to embeddable URLs
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
  }
  return null;
}

export default function EpisodeDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentEpisode, isPlaying, playEpisode, pauseEpisode } = useAudioPlayer();
  const [copied, setCopied] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  // Find active episode record
  const episode = episodes.find((ep) => ep.id === id);

  useDocumentMetadata(
    episode ? `${episode.title} — Aapan Podcast` : "Episode Not Found — Aapan Podcast",
    episode ? episode.summary : "The requested podcast episode could not be found."
  );

  if (!episode) {
    return (
      <div className="bg-background text-text-primary min-h-screen flex flex-col items-center justify-center p-8 pb-32" id="invalid-episode-404">
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-full text-accent mb-6 animate-pulse">
          <Radio className="w-12 h-12" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-display text-text-primary">Episode Not Found</h1>
        <p className="text-text-muted text-sm mt-3 max-w-sm text-center leading-relaxed font-sans">
          The podcast recording you are looking for does not exist in our system. It may have been archived or moved.
        </p>
        <Link
          to="/episodes"
          className="mt-8 px-6 py-3 bg-accent text-background font-extrabold tracking-wider rounded-xl text-xs uppercase hover:bg-accent-hover transition-all flex items-center gap-2 shadow-lg shadow-accent/15"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const guest = guests.find((g) => g.id === episode.guestId);
  const isCurrent = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;

  const handlePlayToggle = () => {
    if (isCurrentlyPlaying) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  };

  // Convert standard link to embeddable structure
  const embedUrl = getYouTubeEmbedUrl(episode.youtubeUrl);

  // Find exactly 3 related episodes (excluding current, prefer same category or just next 3)
  const relatedEpisodes = episodes
    .filter((ep) => ep.id !== episode.id)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === episode.category && b.category !== episode.category) return -1;
      if (a.category !== episode.category && b.category === episode.category) return 1;
      return 0;
    })
    .slice(0, 3);

  // Fallback / Example Key topics for display (4-6 tags)
  const keyTopics = [
    "Socio-Economic Development",
    "Sustained Civic Dialogue",
    "Philosophy of Public Policy",
    "Empowering Nepali Identity",
    "Systemic Problem Solving",
    "Leadership & Legacy"
  ];

  // Clipboard copy helper
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Social Share helpers
  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(episode.title);

  return (
    <div className="bg-background text-text-primary min-h-screen pb-32" id="episode-detail-view">
      
      {/* 1. Breadcrumbs */}
      <div className="bg-surface border-b border-border pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-text-muted">
            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <Link to="/episodes" className="hover:text-accent transition-colors">
              Episodes
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-text-primary font-bold truncate max-w-xs sm:max-w-md">
              {episode.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back button */}
        <div className="mb-8">
          <Link 
            to="/episodes" 
            className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-accent transition-all uppercase tracking-widest font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Episodes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Hero content, Description, Bio, Topics */}
          <main className="lg:col-span-8 space-y-10">
            
            {/* 2. Episode Hero Header and Media area */}
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
                <span className="px-3 py-1 bg-surface border border-border rounded-full text-[10px] text-accent font-bold uppercase tracking-wider">
                  {episode.category}
                </span>
                <span className="text-border">•</span>
                <span className="text-accent font-black">
                  {getEpisodeNumber(episode.id)}
                </span>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {episode.publishDate}
                </span>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {episode.duration}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight font-display text-text-primary">
                {episode.title}
              </h1>

              {/* Quick Play Audio Action strip */}
              <div className="p-4 bg-surface border border-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePlayToggle}
                    className="p-4 bg-accent text-background hover:bg-accent-hover rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                    aria-label={isCurrentlyPlaying ? "Pause Episode" : "Play Episode"}
                  >
                    {isCurrentlyPlaying ? (
                      <Pause className="w-5 h-5 fill-current stroke-[2.5]" />
                    ) : (
                      <Play className="w-5 h-5 fill-current translate-x-0.5 stroke-[2.5]" />
                    )}
                  </button>
                  <div>
                    <span className="block text-[10px] text-text-muted uppercase tracking-widest font-mono">Audio Broadcast</span>
                    <span className="block text-sm font-bold text-text-secondary mt-0.5">
                      {isCurrentlyPlaying ? "Currently playing" : "Listen via player on site"}
                    </span>
                  </div>
                </div>
                
                <a
                  href={episode.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Youtube className="w-4 h-4 fill-current" /> Watch on YouTube
                </a>
              </div>
            </header>

            {/* YouTube embed area with strict no-autoplay and lazy load, falling back to thumbnail */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-black border border-border shadow-2xl">
              {embedUrl && playVideo ? (
                <iframe
                  src={`${embedUrl}&autoplay=1`}
                  title={`${episode.title} YouTube Video Player`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <img
                    src={episode.coverImage}
                    alt={episode.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none transition-transform duration-700 hover:scale-102"
                    loading="lazy"
                  />
                  <span className="self-start bg-black/80 border border-border text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg text-red-500 flex items-center gap-1.5 z-10">
                    <Tv className="w-3.5 h-3.5 text-red-500" /> video release
                  </span>

                  <div className="self-center flex flex-col items-center text-center space-y-4 z-10">
                    <button
                      onClick={() => setPlayVideo(true)}
                      className="p-5 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
                      aria-label="Play Video Episode"
                    >
                      <Play className="w-8 h-8 fill-current translate-x-0.5 stroke-[2.5]" />
                    </button>
                    <div className="space-y-1">
                      <span className="block text-sm font-bold text-text-primary drop-shadow-md font-display">Watch Full Discussion</span>
                      <span className="block text-xs text-text-muted font-mono">Loads secure YouTube iframe player interactively</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-text-muted font-mono z-10">
                    <span>HD Broadcast</span>
                    <a 
                      href={episode.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-red-500 hover:underline flex items-center gap-1"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Detailed Episode Description */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-display text-text-primary border-b border-border pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> Conversation Overview
              </h2>
              <div className="text-text-secondary text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                <p className="font-medium text-text-primary">{episode.summary}</p>
                <p>{episode.description}</p>
              </div>
            </section>

            {/* 4. Guest Information Card */}
            {guest && (
              <section className="p-6 bg-surface border border-border rounded-2xl space-y-5">
                <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest font-mono">Special Guest Profile</span>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src={guest.image}
                    alt={guest.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-border shrink-0"
                    loading="lazy"
                  />
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-text-primary font-display">{guest.name}</h3>
                      <p className="text-xs font-mono text-accent mt-0.5">{guest.role}</p>
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">{guest.bio}</p>
                    
                    {/* Socials */}
                    <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/80">
                      <span className="text-[9px] font-mono uppercase text-text-muted tracking-widest">Connect:</span>
                      {guest.socials.twitter && (
                        <a 
                          href={guest.socials.twitter} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
                        >
                          Twitter
                        </a>
                      )}
                      {guest.socials.linkedin && (
                        <a 
                          href={guest.socials.linkedin} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                      {guest.socials.instagram && (
                        <a 
                          href={guest.socials.instagram} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 5. Key Topics Tags */}
            <section className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-text-muted font-mono">
                Key Topics Examined
              </h4>
              <div className="flex flex-wrap gap-2">
                {keyTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-surface border border-border text-xs text-text-secondary rounded-lg font-medium hover:border-accent/20 transition-all select-none"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </section>

          </main>

          {/* RIGHT COLUMN: Sidebar (Share, Related Episodes) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* 7. Share Section */}
            <div className="p-6 bg-surface border border-border rounded-3xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted font-mono flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5 text-accent" /> Share Conversation
              </h4>
              <p className="text-xs text-text-muted">
                Spread these ideas with your friends, colleagues, and community.
              </p>
              
              <div className="grid grid-cols-2 gap-2 pt-2">
                {/* Copy Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-1.5 p-2.5 bg-background hover:bg-surface-light border border-border hover:border-accent/20 text-xs font-bold text-text-secondary hover:text-text-primary rounded-xl transition-all cursor-pointer"
                  id="btn-copy-episode-link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500 animate-bounce" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Link
                    </>
                  )}
                </button>

                {/* Facebook share link */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 bg-background hover:bg-surface-light border border-border hover:border-blue-500/20 text-xs font-bold text-text-secondary hover:text-blue-500 rounded-xl transition-all"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" /> Facebook
                </a>

                {/* Twitter / X share link */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 bg-background hover:bg-surface-light border border-border hover:border-text-primary text-xs font-bold text-text-secondary hover:text-text-primary rounded-xl transition-all"
                  aria-label="Share on X"
                >
                  <Twitter className="w-3.5 h-3.5 fill-current" /> X / Twitter
                </a>

                {/* WhatsApp share link */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 bg-background hover:bg-surface-light border border-border hover:border-green-500/20 text-xs font-bold text-text-secondary hover:text-green-500 rounded-xl transition-all"
                  aria-label="Share on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Production Quality Specs Box */}
            <div className="p-6 bg-surface border border-border rounded-3xl space-y-3 text-xs text-text-muted">
              <h5 className="font-bold text-[10px] uppercase tracking-widest text-text-primary font-mono mb-2">Show Details</h5>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span>Total Views</span>
                <span className="font-mono font-bold text-text-secondary">{episode.views}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/60">
                <span>Audio Standard</span>
                <span className="font-semibold text-text-secondary">320kbps MP3</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Studio Location</span>
                <span className="font-semibold text-text-secondary">Kathmandu, NP</span>
              </div>
            </div>

            {/* 6. Related Episodes Showcase */}
            <section className="space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" /> Related Conversations
              </h4>
              
              <div className="space-y-4">
                {relatedEpisodes.map((rec) => (
                  <div 
                    key={rec.id}
                    className="group bg-surface border border-border rounded-xl p-3 flex gap-3.5 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={rec.coverImage}
                      alt={rec.title}
                      className="w-14 h-14 object-cover rounded-lg border border-border shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex flex-col justify-between py-0.5">
                      <h5 className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight font-display">
                        <Link to={`/episodes/${rec.id}`}>{rec.title}</Link>
                      </h5>
                      <span className="block text-[9px] text-text-muted font-mono uppercase mt-1">
                        {rec.duration} • {rec.publishDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </aside>

        </div>

        {/* 8. Back to episodes bottom link */}
        <div className="mt-16 pt-8 border-t border-border flex justify-center">
          <Link
            to="/episodes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface hover:bg-surface-light text-text-primary border border-border rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Full Archive
          </Link>
        </div>

      </div>
    </div>
  );
}
