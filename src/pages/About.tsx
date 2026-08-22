import React from "react";
import { Info, Sparkles, Radio, CheckCircle } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

export default function About() {
  useDocumentMetadata(
    "About Aapan Podcast",
    "Discover the foundational values, editorial principles, and acoustic standards guiding our weekly deep-dive Nepali interview catalog."
  );

  const principles = [
    {
      title: "The Long-Form Mandate",
      desc: "We reject the quick 5-minute soundbites that dominate social media feeds. We believe complex ideas and true human struggles require hours of deep, unedited thought to breathe and unfurl naturally.",
    },
    {
      title: "Radical Empathy & Respect",
      desc: "Our platform is not a theater for hostile debates or gotcha questions. We listen deeply, seek common ground, and give our guests the space to elaborate on their lifetime philosophies with complete dignity.",
    },
    {
      title: "High-Fidelity Integrity",
      desc: "From microphone pre-amps to acoustic design, we treat podcasting as fine art. We believe pristine audio and visual representation reflect our respect for the guest's voice and the listener's time.",
    },
  ];

  return (
    <div className="bg-background text-text-primary min-h-screen pb-32" id="about-view">
      
      {/* Editorial Header */}
      <div className="bg-surface border-b border-border pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider border border-accent/15">
            <Info className="w-3.5 h-3.5" /> Brand Identity
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
            About Aapan Podcast
          </h1>
          <p className="text-text-muted text-sm max-w-xl leading-relaxed font-sans">
            The backstory, principles, and technical commitments guiding Nepal&apos;s premium long-form intellectual interview program.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Core narrative essay */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2 font-display">
            <Radio className="w-5 h-5 text-accent animate-pulse" /> Our Origin Story
          </h2>
          <div className="text-text-secondary text-sm sm:text-base leading-relaxed space-y-4 font-sans">
            <p>
              Launched in the heart of Kathmandu, Nepal, <strong>Aapan Podcast</strong> was born out of a shared frustration with the noise of modern digital streams. In an age of sensational headlines, 15-second attention spans, and pre-rehearsed talking points, we saw a massive void: a lack of space for patient, thorough, and highly intellectual human dialogue.
            </p>
            <p>
              In Maithili, Bhojpuri, and various regional contexts, the word <em>&quot;Aapan&quot;</em> translates to <strong>&quot;Our&quot;</strong> or <strong>&quot;Mine&quot;</strong>. It represents a warm space of belonging, trust, and shared roots. That is our core mission: to make intellectual inquiry feel local, authentic, and universally ours.
            </p>
            <p>
              We don&apos;t chase immediate trends or viral clickbait. Instead, we invite national treasures, rigorous scientists, bold engineers, and policy architects to sit with us for hours. We invite you to sit with us, slow down, and listen.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-8 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2 font-display">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" /> Core Principles We Live By
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((pr, idx) => (
              <div 
                key={idx} 
                className="bg-surface border border-border rounded-2xl p-6 space-y-3 hover:border-accent/30 hover:shadow-lg transition-all duration-300 premium-card-hover"
              >
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-text-primary">
                    {pr.title}
                  </h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-sans">
                  {pr.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical specifications */}
        <div className="p-8 bg-surface border border-border rounded-3xl space-y-6">
          <h2 className="text-lg font-bold text-text-primary uppercase tracking-wider font-mono">
            Production & Delivery Specifications
          </h2>
          <p className="text-xs text-text-muted leading-relaxed font-sans">
            Every interview is captured in-person inside our acoustically-treated studio in Kathmandu, employing professional standard broadcast setups. We export audio using high-bitrate stereo codecs to ensure you hear every breath, sigh, and tone of voice precisely as if you were sitting next to us.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 text-xs font-mono">
            <div className="space-y-1">
              <span className="block text-[10px] uppercase text-text-muted">Microphones</span>
              <span className="block font-bold text-text-secondary">Shure SM7B</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] uppercase text-text-muted">Pre-Amps</span>
              <span className="block font-bold text-text-secondary">Focusrite ISA One</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] uppercase text-text-muted">Video Capture</span>
              <span className="block font-bold text-text-secondary">4K Blackmagic Cinema</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] uppercase text-text-muted">Audio Delivery</span>
              <span className="block font-bold text-text-secondary">320kbps MP3 Stereo</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
