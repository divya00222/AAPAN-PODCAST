import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Episode, episodes } from "../data/podcastData";

interface AudioPlayerContextType {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  playEpisode: (episode: Episode) => void;
  pauseEpisode: () => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize or update audio source when currentEpisode changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    if (currentEpisode) {
      audio.src = currentEpisode.audioUrl;
      audio.load();
      if (isPlaying) {
        audio.play().catch((err) => console.log("Audio play error: ", err));
      }
    }

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentEpisode]);

  // Handle play/pause action on HTMLAudioElement
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentEpisode) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.log("Audio play error: ", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const playEpisode = (episode: Episode) => {
    if (currentEpisode?.id === episode.id) {
      setIsPlaying(true);
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };

  const pauseEpisode = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!currentEpisode && episodes.length > 0) {
      // Default to first episode if none selected
      setCurrentEpisode(episodes[0]);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const playNext = () => {
    if (!currentEpisode) return;
    const currentIndex = episodes.findIndex((ep) => ep.id === currentEpisode.id);
    if (currentIndex !== -1 && currentIndex < episodes.length - 1) {
      playEpisode(episodes[currentIndex + 1]);
    } else {
      // Loop back to first
      playEpisode(episodes[0]);
    }
  };

  const playPrevious = () => {
    if (!currentEpisode) return;
    const currentIndex = episodes.findIndex((ep) => ep.id === currentEpisode.id);
    if (currentIndex > 0) {
      playEpisode(episodes[currentIndex - 1]);
    } else {
      // Wrap to last
      playEpisode(episodes[episodes.length - 1]);
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        duration,
        currentTime,
        playEpisode,
        pauseEpisode,
        togglePlay,
        seekTo,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
};
