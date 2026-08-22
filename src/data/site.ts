export interface SiteConfig {
  name: string;
  contactEmail: string;
  socials: {
    instagram: string;
    tiktok: string;
    youtube: string;
    facebook: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Aapan Podcast",
  contactEmail: "info@aapanpodcast.com",
  socials: {
    instagram: "https://instagram.com/aapan.podcast",
    tiktok: "https://tiktok.com/@aapan.podcast",
    youtube: "https://youtube.com/@AapanPodcast",
    facebook: "https://facebook.com/aapan.podcast"
  }
};
