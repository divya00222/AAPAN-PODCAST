import React from "react";
import { Link } from "react-router-dom";
import { SocialLinks, ContactForm } from "../components/contact/ContactComponents";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { ChevronRight, Home, Mail, Compass } from "lucide-react";

export default function Contact() {
  useDocumentMetadata(
    "Contact Aapan Podcast",
    "Submit guest speaker nominations, press inquiries, or business sponsorships directly to our production desk."
  );

  return (
    <div className="bg-background text-text-primary min-h-screen pb-32" id="contact-portal-view">
      
      {/* Top Banner and Breadcrumbs */}
      <div className="bg-surface border-b border-border pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-border" />
            <span className="text-text-primary font-bold">Contact</span>
          </nav>

          {/* Heading */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-accent/15 font-mono">
              <Mail className="w-3.5 h-3.5 animate-pulse" /> Contact Directory
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
              Let&apos;s Start a Conversation.
            </h1>
            <p className="text-text-muted text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
              Have questions, collaboration proposals, or guest suggestions? We are always open to hearing from our audience and potential brand partners. Get in touch with us!
            </p>
          </div>

        </div>
      </div>

      {/* Two Column Layout (Responsive: Desktop: 2col, Tablet/Mobile: 1col) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Contact info list & social channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-accent/15 text-accent rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" /> Connections
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-display text-text-primary">
                Reach Out Directly
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                Follow our official accounts for regular clips, updates, and sneak peeks into upcoming episodes. We typically respond within 24–48 business hours.
              </p>
            </div>

            {/* Reusable social list */}
            <SocialLinks />
          </div>

          {/* RIGHT COLUMN: Validated interactive message form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>

    </div>
  );
}
