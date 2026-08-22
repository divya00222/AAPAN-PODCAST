import React from "react";
import { Link } from "react-router-dom";
import { Episode, guests } from "../../data/podcastData";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { Play, Pause, Calendar, Clock, ArrowRight } from "lucide-react";

interface PodcastCardProps {
  key?: string;
  episode: Episode;
}

export default function PodcastCard({ episode }: PodcastCardProps) {
  const { currentEpisode, isPlaying, playEpisode, pauseEpisode } = useAudioPlayer();
  const guest = guests.find((g) => g.id === episode.guestId);

  const isCurrent = currentEpisode?.id === episode.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrentlyPlaying) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  };

  return (
    <article 
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 flex flex-col h-full premium-card-hover"
      id={`episode-card-${episode.id}`}
    >
      {/* Cover Image Wrapper */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-background">
        <img
          src={episode.coverImage}
          alt={episode.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay Hover Play Button */}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handlePlayToggle}
            className="p-4 bg-accent text-background hover:bg-accent-hover rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95 cursor-pointer"
            aria-label={isCurrentlyPlaying ? "Pause episode" : "Play episode"}
          >
            {isCurrentlyPlaying ? (
              <Pause className="w-6 h-6 fill-current stroke-[2.5]" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5 stroke-[2.5]" />
            )}
          </button>
        </div>
        {/* Badge */}
        <span className="absolute top-4 left-4 bg-surface/90 text-text-secondary border border-border text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
          {episode.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date & Duration Row */}
        <div className="flex items-center gap-4 text-xs font-mono text-text-muted mb-3.5">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-text-muted" />
            {episode.publishDate}
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-text-muted" />
            {episode.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2 font-display">
          <Link to={`/episodes/${episode.id}`}>{episode.title}</Link>
        </h3>

        {/* Guest info row */}
        {guest && (
          <div className="flex items-center gap-3 mt-4 mb-4 pt-4 border-t border-border">
            <img
              src={guest.image}
              alt={guest.name}
              className="w-7 h-7 rounded-full object-cover border border-border"
            />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-text-secondary truncate">
                {guest.name}
              </span>
              <span className="block text-[10px] text-text-muted truncate">
                {guest.role}
              </span>
            </div>
          </div>
        )}

        {/* Summary Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2 flex-grow">
          {episode.summary}
        </p>

        {/* Bottom Action bar */}
        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          <button
            onClick={handlePlayToggle}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              isCurrent
                ? "text-accent"
                : "text-text-secondary hover:text-accent"
            }`}
          >
            {isCurrentlyPlaying ? (
              <>
                <span className="w-2.5 h-2.5 flex gap-0.5 items-end">
                  <span className="w-0.5 h-full bg-accent animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <span className="w-0.5 h-3/4 bg-accent animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <span className="w-0.5 h-1/2 bg-accent animate-bounce" style={{ animationDelay: "0.3s" }} />
                </span>
                Listening...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Listen Episode
              </>
            )}
          </button>

          <Link
            to={`/episodes/${episode.id}`}
            className="text-text-muted hover:text-text-primary transition-colors"
            title="Read episode details"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
