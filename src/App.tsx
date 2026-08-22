import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AudioPlayer from "./components/layout/AudioPlayer";

// Pages
import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import EpisodeDetail from "./pages/EpisodeDetail";
import Shorts from "./pages/Shorts";
import Guests from "./pages/Guests";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";

export default function App() {
  return (
    <AudioPlayerProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-accent selection:text-background font-sans">
          
          {/* Global Header Navigation */}
          <Navbar />

          {/* Main Routing Stage */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/episodes/:id" element={<EpisodeDetail />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/guests" element={<Guests />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              
              {/* Fallback wildcard routing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Global Footer Banner */}
          <Footer />

          {/* Persistent global media player */}
          <AudioPlayer />
          
        </div>
      </BrowserRouter>
    </AudioPlayerProvider>
  );
}
