import React from "react";
import Hero from "../components/sections/Hero";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import {
  LatestEpisodeSection,
  FeaturedEpisodesSection,
  PodcastCategoriesSection,
  PopularEpisodesSection,
  ShortsPreviewSection,
  GuestsPreviewSection,
  AboutSection,
  YoutubeCTASection,
  SocialMediaSection,
  NewsletterCTASection
} from "../components/sections/HomeSections";

export default function Home() {
  useDocumentMetadata(
    "Aapan Podcast — Nepali Conversations, Stories & Ideas",
    "Aapan Podcast documents the blueprints, struggles, and innovations of Nepal's leading minds across social impact, leadership, and community developments."
  );

  return (
    <div className="bg-background text-text-primary min-h-screen pb-24" id="home-view">
      
      {/* 2. Hero Header */}
      <Hero />

      {/* 3. Latest Episode */}
      <LatestEpisodeSection />

      {/* 4. Featured Episodes */}
      <FeaturedEpisodesSection />

      {/* 5. Podcast Categories */}
      <PodcastCategoriesSection />

      {/* 6. Popular Episodes */}
      <PopularEpisodesSection />

      {/* 7. Shorts Preview */}
      <ShortsPreviewSection />

      {/* 8. Guests Preview */}
      <GuestsPreviewSection />

      {/* 9. About Aapan Podcast Section */}
      <AboutSection />

      {/* 10. YouTube CTA Section */}
      <YoutubeCTASection />

      {/* 11. Social Media Directory Section */}
      <SocialMediaSection />

      {/* 12. Newsletter/Community CTA Section */}
      <NewsletterCTASection />

    </div>
  );
}
