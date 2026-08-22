import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Episode, guests } from "../../data/podcastData";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { Play, Pause, Calendar, Clock, Youtube, ArrowRight, ArrowUpRight, Tv } from "lucide-react";

// Formatting utility for Episode ID
export function getEpisodeNumber(id: string): string {
  const num = id.replace(/[^0-9]/g, "");
  return `EPISODE ${num.padStart(2, "0")}`;
}

// 1. Reusable PlayButton Component
interface PlayButtonProps {
  episode: Episode;
  className?: string;
}

export function PlayButton({ episode, className = "" }: PlayButtonProps) {
  const { currentEpisode, isPlaying, playEpisode, pauseEpisode } = useAudioPlayer();
  const isCurrent = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentlyPlaying) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-4 bg-accent hover:bg-accent-hover text-background rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer ${className}`}
      aria-label={isCurrentlyPlaying ? "Pause episode" : "Play episode"}
    >
      {isCurrentlyPlaying ? (
        <Pause className="w-6 h-6 fill-current stroke-[2.5]" />
      ) : (
        <Play className="w-6 h-6 fill-current translate-x-0.5 stroke-[2.5]" />
      )}
    </button>
  );
}

// 2. Reusable EpisodeMeta Component
interface EpisodeMetaProps {
  episode: Episode;
  className?: string;
}

export function EpisodeMeta({ episode, className = "" }: EpisodeMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted ${className}`}>
      <span className="text-accent font-black uppercase tracking-wider">
        {getEpisodeNumber(episode.id)}
      </span>
      <span className="text-border">•</span>
      <span className="flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        {episode.publishDate}
      </span>
      <span className="text-border">•</span>
      <span className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        {episode.duration}
      </span>
    </div>
  );
}

// 3. Reusable Standard EpisodeCard Component
interface EpisodeCardProps {
  episode: Episode;
  key?: string;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  const guest = guests.find((g) => g.id === episode.guestId);
  const { currentEpisode, isPlaying } = useAudioPlayer();
  const isCurrent = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;

  return (
    <article 
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full premium-card-hover"
      id={`reusable-card-${episode.id}`}
    >
      {/* Thumbnail with hover interaction */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-background">
        <img
          src={episode.coverImage}
          alt={episode.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayButton episode={episode} />
        </div>
        {/* Badge */}
        <span className="absolute top-4 left-4 bg-surface/90 text-text-secondary border border-border text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
          {episode.category}
        </span>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow">
        <EpisodeMeta episode={episode} className="mb-3" />
        
        <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2 font-display">
          <Link to={`/episodes/${episode.id}`}>{episode.title}</Link>
        </h3>

        {guest && (
          <div className="flex items-center gap-3 mt-4 mb-4 pt-4 border-t border-border">
            <img
              src={guest.image}
              alt={guest.name}
              className="w-7 h-7 rounded-full object-cover border border-border"
            />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-text-secondary truncate">{guest.name}</span>
              <span className="block text-[10px] text-text-muted truncate">{guest.role}</span>
            </div>
          </div>
        )}

        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 flex-grow">
          {episode.summary}
        </p>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-accent font-bold uppercase tracking-widest flex items-center gap-1">
            {isCurrentlyPlaying ? "On Air" : "Show Details"}
          </span>
          <Link
            to={`/episodes/${episode.id}`}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// 4. Reusable FeaturedEpisode Component (Large Horizontal Feature Card)
interface FeaturedEpisodeProps {
  episode: Episode;
}

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  const guest = guests.find((g) => g.id === episode.guestId);
  
  return (
    <div 
      className="bg-surface border border-border rounded-3xl overflow-hidden p-5 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center hover:border-accent/40 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
      id={`featured-card-${episode.id}`}
    >
      {/* LEFT: Large 16:9 Thumbnail with Overlay & Animations */}
      <div className="lg:col-span-5 relative aspect-[16/9] w-full rounded-2xl overflow-hidden group bg-background border border-border">
        {/* Animated scale on parent hover */}
        <img
          src={episode.coverImage}
          alt={episode.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Hover subtle dark overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Play Button Overlay - Animated with Framer Motion */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          >
            <PlayButton episode={episode} className="scale-110 md:scale-125 shadow-accent/25" />
          </motion.div>
        </div>

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-[9px] text-accent border border-accent/20 font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
          <Tv className="w-3 h-3 text-accent" /> {episode.category}
        </div>
      </div>

      {/* RIGHT: Detailed Meta & Interactive Links */}
      <div className="lg:col-span-7 space-y-5">
        <EpisodeMeta episode={episode} />

        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-text-primary hover:text-accent transition-colors leading-snug font-display">
          <Link to={`/episodes/${episode.id}`}>{episode.title}</Link>
        </h3>

        {/* Guest Banner if Available */}
        {guest && (
          <div className="flex items-center gap-3.5 p-3.5 bg-background/50 backdrop-blur-sm rounded-xl border border-border">
            <img
              src={guest.image}
              alt={guest.name}
              className="w-10 h-10 rounded-full object-cover border border-border"
            />
            <div>
              <span className="block text-[9px] text-accent font-bold uppercase tracking-widest font-mono">Special Guest</span>
              <span className="block text-sm font-bold text-text-primary leading-tight mt-0.5">{guest.name}</span>
              <span className="block text-xs text-text-muted mt-0.5">{guest.role}</span>
            </div>
          </div>
        )}

        <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
          {episode.description}
        </p>

        {/* Buttons Row with YouTube + View details */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Watch on YouTube button */}
          <a
            href={episode.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
            id={`yt-btn-${episode.id}`}
          >
            <Youtube className="w-4 h-4 fill-current" /> Watch on YouTube
          </a>

          {/* View Episode detail button */}
          <Link
            to={`/episodes/${episode.id}`}
            className="inline-flex items-center gap-1.5 px-5 py-3 bg-background hover:bg-surface-light border border-border rounded-xl text-xs font-bold text-text-secondary hover:text-text-primary uppercase tracking-wider transition-colors"
            id={`detail-btn-${episode.id}`}
          >
            View Episode <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
