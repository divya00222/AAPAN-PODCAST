import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { guests } from "../../data/podcastData";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  X, 
  Radio, 
  ExternalLink 
} from "lucide-react";

export default function AudioPlayer() {
  const {
    currentEpisode,
    isPlaying,
    duration,
    currentTime,
    pauseEpisode,
    togglePlay,
    seekTo,
    playNext,
    playPrevious,
  } = useAudioPlayer();

  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  if (!currentEpisode || isClosed) return null;

  const guest = guests.find((g) => g.id === currentEpisode.guestId);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    // Update active audio elements
    const audios = document.querySelectorAll("audio");
    audios.forEach((a) => (a.volume = val));
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const audios = document.querySelectorAll("audio");
    audios.forEach((a) => (a.volume = nextMuted ? 0 : volume));
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-surface/98 backdrop-blur-md border-t border-border text-text-primary shadow-2xl animate-slideUp"
      id="global-audio-player"
    >
      {/* Progress Bar (Scrubber) */}
      <div className="relative group w-full h-1 bg-surface-light">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeekChange}
          className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer z-10"
          aria-label="Seek track position"
        />
        <div 
          className="absolute top-0 left-0 h-1 bg-accent transition-all"
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform shadow-md"
          style={{ left: `calc(${(currentTime / (duration || 1)) * 100}% - 6px)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Episode Info */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <img
            src={currentEpisode.coverImage}
            alt={currentEpisode.title}
            className="w-12 h-12 object-cover rounded-lg border border-border shrink-0 shadow-md"
          />
          <div className="min-w-0">
            <Link 
              to={`/episodes/${currentEpisode.id}`}
              className="text-sm font-semibold text-text-primary hover:text-accent truncate block transition-colors leading-tight font-display"
            >
              {currentEpisode.title}
            </Link>
            <p className="text-xs text-text-muted truncate mt-0.5">
              Featuring {guest?.name || "Special Guest"}
            </p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-1/3 shrink-0">
          <div className="flex items-center gap-5">
            <button
              onClick={playPrevious}
              className="p-1.5 text-text-muted hover:text-text-primary transition-all rounded-lg"
              aria-label="Previous Episode"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 bg-accent hover:bg-accent-hover text-background rounded-full transition-all shadow-lg shadow-accent/10 hover:scale-105"
              aria-label={isPlaying ? "Pause Episode" : "Play Episode"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current stroke-[2.5]" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-0.5 stroke-[2.5]" />
              )}
            </button>

            <button
              onClick={playNext}
              className="p-1.5 text-text-muted hover:text-text-primary transition-all rounded-lg"
              aria-label="Next Episode"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] font-mono text-text-muted">
            <span>{formatTime(currentTime)}</span>
            <span className="text-border">/</span>
            <span>{formatTime(duration)}</span>
            <span className="px-1.5 py-0.5 bg-surface border border-border text-text-muted text-[9px] rounded uppercase font-bold tracking-widest ml-1 flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-accent animate-pulse" /> MP3 Stream
            </span>
          </div>
        </div>

        {/* Right Side: Volume & Exit */}
        <div className="hidden md:flex items-center justify-end gap-6 w-full md:w-1/3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleMute}
              className="p-1 text-text-muted hover:text-text-primary transition-all"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 accent-accent h-1 bg-surface-light rounded-lg cursor-pointer"
              aria-label="Volume slider"
            />
          </div>

          <a
            href={currentEpisode.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-text-muted hover:text-red-500 hover:bg-surface-light/40 rounded-lg transition-all flex items-center gap-1 text-xs font-semibold"
            title="Watch full episode on YouTube"
          >
            Watch <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsClosed(true)}
            className="p-1.5 text-text-muted hover:text-text-secondary hover:bg-surface-light/40 rounded-lg transition-all border border-border"
            aria-label="Minimize Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
