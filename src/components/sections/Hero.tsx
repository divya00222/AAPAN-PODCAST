import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { socialLinks, episodes, podcastStats } from "../../data/podcastData";
import { Play, Podcast, Youtube, Radio, ArrowUpRight, Sparkles } from "lucide-react";

export default function Hero() {
  // Find the latest episode or featured episode
  const latestEpisode = episodes.find((ep) => ep.isFeatured) || episodes[0];
  const watchUrl = latestEpisode ? latestEpisode.youtubeUrl : socialLinks.youtube;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      className="relative bg-gradient-to-b from-[#180106] via-[#0d0104] to-background pt-36 pb-16 lg:pt-44 lg:pb-24 overflow-hidden border-b border-border"
      id="home-hero"
    >
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/6 left-1/10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-[10px] font-extrabold uppercase tracking-widest font-mono"
            >
              <Radio className="w-3 h-3 animate-pulse" /> Nepali Podcast
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-[1.05] font-display"
            >
              Conversations <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#ffbe76]">
                That Matter.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-text-muted text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans"
            >
              We skip the surface-level talking points and rapid news cycles. Aapan Podcast invites Nepal&apos;s leading thinkers, scientists, builders, and visionaries for patient, unedited, long-form human dialogues that explore raw philosophies and deep systems.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href={watchUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-accent text-background hover:bg-accent-hover rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-accent/20 hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
                id="hero-watch-latest"
              >
                <Play className="w-4 h-4 fill-current" /> Watch Latest Episode
              </a>
              
              <Link
                to="/episodes"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-surface hover:bg-surface-light text-text-primary border border-border rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all"
                id="hero-explore-episodes"
              >
                Explore Episodes <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Guest Area & Mic Branding Details */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Soft decorative background glow */}
            <div className="absolute -inset-1.5 bg-accent/25 rounded-3xl blur-2xl opacity-40 pointer-events-none animate-pulse" />
            
            {/* Microphone inspired framing corners */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-accent/40 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent/40 pointer-events-none" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden border border-border bg-black/50 shadow-2xl"
            >
              {/* Local image asset placeholder */}
              <img 
                src="/src/assets/images/podcast_studio_visual_1787386775401.jpg" 
                alt="Aapan Podcast Production Studio" 
                className="w-full h-full object-cover select-none"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Decorative Mic Pill Badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-[9px] text-accent border border-accent/30 font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 animate-pulse" /> Kathmandu Studio
              </div>

              {/* Bottom detail card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-background/90 backdrop-blur-md rounded-xl border border-border shadow-xl">
                <span className="text-[9px] text-accent font-bold uppercase tracking-widest font-mono">ON AIR NOW</span>
                <h3 className="text-xs font-bold text-text-primary line-clamp-1 mt-0.5 font-display">
                  {latestEpisode ? latestEpisode.title : "Weekly Long-form Dialogue"}
                </h3>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Centralized Social Proof Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="border-t border-border mt-16 pt-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            {podcastStats.map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                  {i === 0 ? (
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-5 h-5 fill-current text-red-500"
                    >
                      <path d="M23.498 6.163c-.272-.997-1.047-1.783-2.028-2.057C19.679 3.54 12 3.54 12 3.54s-7.679 0-9.47.566c-.981.274-1.756 1.06-2.028 2.057C0 7.973 0 12 0 12s0 4.027.502 5.837c.272.997 1.047 1.783 2.028 2.057 1.791.566 9.47.566 9.47.566s7.679 0 9.47-.566c.981-.274 1.756-1.06 2.028-2.057.502-1.81.502-5.837.502-5.837s0-4.027-.502-5.837z" />
                      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff" />
                    </svg>
                  ) : i === 1 ? (
                    <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
                  ) : (
                    <Podcast className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span className="block text-xl font-black text-text-primary tracking-tight font-display">
                    {stat.value}
                  </span>
                  <span className="block text-[10px] font-mono text-text-muted uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

