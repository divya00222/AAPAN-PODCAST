export interface Guest {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface Episode {
  id: string;
  title: string;
  guestId: string;
  duration: string;
  publishDate: string;
  youtubeUrl: string;
  audioUrl: string;
  description: string;
  summary: string;
  coverImage: string;
  category: string;
  views: string;
  isFeatured: boolean;
}

export interface Short {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
}

export const socialLinks = {
  youtube: "https://youtube.com/@AapanPodcast",
  spotify: "https://open.spotify.com/show/aapan-podcast",
  apple: "https://podcasts.apple.com/show/aapan-podcast",
  instagram: "https://instagram.com/aapan.podcast",
  twitter: "https://twitter.com/aapan_podcast",
  facebook: "https://facebook.com/aapan.podcast",
};

export const guests: Guest[] = [
  {
    id: "g1",
    name: "Dr. Sanduk Ruit",
    role: "Ophthalmologist & Founder of Tilganga Institute",
    bio: "Dr. Sanduk Ruit is an world-renowned Nepali ophthalmologist who has restored sight to over 130,000 people across Asia and Africa using an innovative, ultra-low-cost cataract surgery technique. Often referred to as the 'God of Sight', his life's work demonstrates how local innovation can solve global healthcare crises.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
    socials: {
      linkedin: "https://linkedin.com",
    }
  },
  {
    id: "g2",
    name: "Kulman Ghising",
    role: "Managing Director, Nepal Electricity Authority (NEA)",
    bio: "Kulman Ghising is widely celebrated in Nepal for his transformative leadership that eliminated systemic electricity shortages (loadshedding) in the country. His approach to public infrastructure management, financial discipline, and engineering planning has become a case study for administrative efficiency in South Asia.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "g3",
    name: "Shrinkhala Khatiwada",
    role: "Architect & Social Entrepreneur",
    bio: "Shrinkhala Khatiwada is an architect, Miss Nepal World 2018, and advocate for sustainable community planning. Having completed her graduate studies at Harvard University, she works on community-led design initiatives, rural healthcare facility architecture, and sustainable tourism frameworks in remote Nepal.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "g4",
    name: "Ani Choying Drolma",
    role: "Buddhist Nun, Humanitarian & Musician",
    bio: "Ani Choying Drolma is a world-famous Buddhist nun and singer who uses her divine chanting and music to support humanitarian causes. Through her Nuns' Welfare Foundation, she fights for female education, healthcare, and safe shelters. Her voice has brought traditional Tibetan Buddhist chants to the global stage.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
    socials: {
      youtube: "https://youtube.com",
      instagram: "https://instagram.com"
    }
  },
  {
    id: "g5",
    name: "Dr. Mahabir Pun",
    role: "Founder, National Innovation Center (NIC) Nepal",
    bio: "Dr. Mahabir Pun is a Magsaysay Award-winning pioneer who connected remote mountain communities of Nepal to the wireless internet in the early 2000s. Today, through the National Innovation Center, he empowers young Nepali scientists and engineers to prototype and manufacture local solutions to national challenges.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    }
  }
];

export const episodes: Episode[] = [
  {
    id: "ep1",
    title: "Bringing Light to the Darkest Corners: The Mission of Dr. Sanduk Ruit",
    guestId: "g1",
    duration: "1h 14m",
    publishDate: "August 15, 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    description: "In this deeply emotional and inspiring episode, Dr. Sanduk Ruit joins Aapan Podcast to discuss his childhood in remote Olangchunggola, his journey to medical school, and the development of the micro-surgery technique that broke monopoly prices of lenses. We explore what it means to lead with empathy and how he maintains focus in the face of incredible professional skepticism.",
    summary: "A masterclass in empathy, global health equity, and resilient leadership from the world-famous ophthalmologist.",
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=450",
    category: "Social Impact & Healthcare",
    views: "45K views",
    isFeatured: true
  },
  {
    id: "ep2",
    title: "How to Light a Nation: Behind Kulman Ghising's Operational Blueprints",
    guestId: "g2",
    duration: "1h 32m",
    publishDate: "August 08, 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=example2",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    description: "Kulman Ghising unpacks the technical, administrative, and political challenges of reforming the Nepal Electricity Authority (NEA). He explains the step-by-step strategy for handling transmission choke points, removing internal corrupt structures, and optimizing reservoir-based hydropower systems to end decades of loadshedding.",
    summary: "An inside look into organizational restructuring, public trust building, and modern energy engineering.",
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800&h=450",
    category: "Governance & Leadership",
    views: "62K views",
    isFeatured: true
  },
  {
    id: "ep3",
    title: "Designing for the Vulnerable: Architecture, Identity, & Miss World Journey",
    guestId: "g3",
    duration: "58m",
    publishDate: "August 01, 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=example3",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    description: "Architect Shrinkhala Khatiwada discusses her design philosophy centered around sustainable regional materials, her Miss World advocacy program, and how her time at Harvard University reshaped her approach to solving public spatial planning crises in South Asia.",
    summary: "Unpacking the convergence of architectural theory, community-led impact, and public service branding.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=450",
    category: "Architecture & Activism",
    views: "29K views",
    isFeatured: false
  },
  {
    id: "ep4",
    title: "Spiritual Harmony, Voice, and the Pursuit of True Liberation",
    guestId: "g4",
    duration: "1h 05m",
    publishDate: "July 25, 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=example4",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    description: "Ani Choying Drolma shares her spiritual evolution from a tumultuous childhood in Kathmandu to finding solace in Nagi Gompa. She reflects on her international musical success, the power of sacred mantras, and how she navigates her spiritual vows while managing complex global charities.",
    summary: "An evocative dialogue on healing trauma, Buddhist philosophy, and art as active humanitarian aid.",
    coverImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800&h=450",
    category: "Culture & Philosophy",
    views: "38K views",
    isFeatured: false
  },
  {
    id: "ep5",
    title: "Connecting the Himalayas: Dr. Mahabir Pun's Bold Fight for Innovation",
    guestId: "g5",
    duration: "1h 21m",
    publishDate: "July 18, 2026",
    youtubeUrl: "https://www.youtube.com/watch?v=example5",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    description: "In this lively and unfiltered episode, Dr. Mahabir Pun shares his legendary struggles to bring Wi-Fi connections to the villages of Annapurna. We talk about his newest crusade: raising resources for research and development to build local industries and stop the brain drain of Nepali talent.",
    summary: "The historical struggle of wireless innovation and the current roadmap to industrialize scientific research in Nepal.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=450",
    category: "Science & Technology",
    views: "51K views",
    isFeatured: false
  }
];

export const shorts: Short[] = [
  {
    id: "sh1",
    title: "How Dr. Sanduk Ruit lowered lens costs from $150 to just $3!",
    youtubeUrl: "https://youtube.com/shorts/sample1",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300&h=500",
    duration: "58s",
    views: "120K"
  },
  {
    id: "sh2",
    title: "The exact night loadshedding ended in Kathmandu | Kulman Ghising",
    youtubeUrl: "https://youtube.com/shorts/sample2",
    thumbnailUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=300&h=500",
    duration: "45s",
    views: "210K"
  },
  {
    id: "sh3",
    title: "Shrinkhala Khatiwada's design advice for rural health clinics",
    youtubeUrl: "https://youtube.com/shorts/sample3",
    thumbnailUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300&h=500",
    duration: "52s",
    views: "95K"
  },
  {
    id: "sh4",
    title: "Why Ani Choying Drolma chose music for her monastic mission",
    youtubeUrl: "https://youtube.com/shorts/sample4",
    thumbnailUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=300&h=500",
    duration: "50s",
    views: "145K"
  }
];

export interface PodcastStat {
  value: string;
  label: string;
}

export const podcastStats: PodcastStat[] = [
  { value: "6K+", label: "Subscribers" },
  { value: "300+", label: "Videos Released" },
  { value: "Nepali", label: "Conversations" }
];

