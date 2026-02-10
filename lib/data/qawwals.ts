export interface Qawwal {
  slug: string;
  name: string;
  image: string;
  bio: string;
  fullBio: string[];
  birthDate: string;
  birthplace: string;
  careerStart: number;
  performances: Array<{ name: string; description: string; year?: number }>;
  awards: Array<{ name: string; year: number; category: string }>;
  collaborations: Array<{ artist: string; performance: string }>;
  stats: {
    performances: number;
    recordings: number;
    awards: number;
    views: string;
    streams: string;
    followers: string;
  };
  gallery: string[];
  milestones: Array<{ year: number; event: string }>;
  achievements: string[];
  metadata: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  seo?: {
    structuredData?: {
      jobTitle?: string;
      knowsAbout?: string[];
    };
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

async function getAllQawwals(): Promise<Qawwal[]> {
  /**
   * TODO: Replace with database query when database is set up
   * Example: return await db.qawwal.findMany({ where: { published: true } });
   */
  
  return [
    {
      slug: "nusrat-fateh-ali-khan",
      name: "Nusrat Fateh Ali Khan",
      image: "/mz-logo.png",
      bio: "Nusrat Fateh Ali Khan was a legendary Pakistani Qawwali singer, considered one of the greatest voices ever recorded, who brought traditional Sufi music to international audiences.",
      fullBio: [
        "Nusrat Fateh Ali Khan, born on October 13, 1948, in Faisalabad, Pakistan, was a legendary Qawwali singer who brought traditional Sufi music to international audiences. Widely regarded as one of the greatest voices ever recorded, Nusrat Fateh Ali Khan's influence on Qawwali and world music is immeasurable. His powerful voice, spiritual depth, and innovative approach to traditional Qawwali made him a global icon, earning him the title 'Shahenshah-e-Qawwali' (King of Qawwali).",
        "He began his career in 1965, following in the footsteps of his father and uncle, who were both renowned Qawwali performers. Nusrat's journey was one of dedication to preserving and evolving the rich tradition of Qawwali music. His performances were not just musical events but spiritual experiences that touched the hearts and souls of millions around the world.",
        "Throughout his career, Nusrat Fateh Ali Khan performed at prestigious venues worldwide, collaborated with international artists, and recorded hundreds of Qawwali performances. His music transcended cultural boundaries, introducing millions to the spiritual beauty of Sufi music. His ability to convey deep spiritual emotions through his voice made him a beloved figure across cultures and religions.",
        "Even after his passing in 1997, Nusrat Fateh Ali Khan's legacy continues through his extensive discography and the continued popularity of Qawwali music globally. His recordings remain highly sought after, and his influence can be heard in contemporary music across genres. Today, booking Nusrat Fateh Ali Khan's music and performances continues to be a way to experience the timeless beauty of Qawwali.",
        "Nusrat's contribution to music extends beyond Qawwali. He collaborated with artists from various genres, bringing Qawwali to new audiences and demonstrating its universal appeal. His work has inspired countless musicians and continues to be a source of spiritual and musical inspiration for people around the world.",
      ],
      birthDate: "October 13, 1948",
      birthplace: "Faisalabad, Pakistan",
      careerStart: 1965,
      performances: [
        {
          name: "Allah Hoo",
          description:
            "One of the most iconic Qawwali performances, showcasing spiritual devotion and vocal mastery",
          year: 1983,
        },
        {
          name: "Mast Qalandar",
          description:
            "Celebrated Qawwali dedicated to the Sufi saint Lal Shahbaz Qalandar, a timeless classic",
          year: 1988,
        },
        {
          name: "Tumhe Dillagi",
          description:
            "Beautiful Qawwali expressing love and spiritual longing with emotional depth",
          year: 1990,
        },
        {
          name: "Afreen Afreen",
          description:
            "Popular Qawwali that became a global hit and remains a fan favorite worldwide",
          year: 1995,
        },
        {
          name: "Dum Mast Qalandar",
          description:
            "Energetic and powerful Qawwali performance that showcases Nusrat's vocal range",
          year: 1992,
        },
        {
          name: "Sanu Ik Pal Chain",
          description:
            "Emotional Qawwali about spiritual peace and tranquility that touches the soul",
          year: 1994,
        },
      ],
      awards: [
        {
          name: "Pride of Performance",
          year: 1987,
          category: "Government of Pakistan",
        },
        {
          name: "UNESCO Music Prize",
          year: 1995,
          category: "Cultural Heritage",
        },
        { name: "Legacy Award", year: 1997, category: "Lifetime Achievement" },
        {
          name: "International Qawwali Award",
          year: 1996,
          category: "Outstanding Contribution",
        },
      ],
      collaborations: [
        { artist: "Eddie Vedder", performance: "The Long Road" },
        { artist: "Michael Brook", performance: "Night Song" },
        { artist: "Peter Gabriel", performance: "Passion Sources" },
      ],
      stats: {
        performances: 200,
        recordings: 125,
        awards: 20,
        views: "1.2B+",
        streams: "300M+",
        followers: "15M+",
      },
      gallery: [
        "/mz-pic-10.jpg",
        "/mz-pic-11.jpg",
        "/mz-pic-12.jpg",
        "/mz-pic-2.JPG",
        "/mz-pic-3.JPG",
        "/mz-pic-4.JPG",
      ],
      milestones: [
        {
          year: 1965,
          event: "Began professional Qawwali career following family tradition",
        },
        {
          year: 1971,
          event:
            "First international performance, introducing Qawwali globally",
        },
        {
          year: 1985,
          event: "Released first international album, reaching new audiences",
        },
        {
          year: 1995,
          event: "Received UNESCO Music Prize for cultural contribution",
        },
        {
          year: 1997,
          event: "Passed away, leaving behind a rich musical legacy",
        },
      ],
      achievements: [
        "First Qawwali artist to achieve international recognition and fame",
        "Introduced Qawwali music to Western audiences through collaborations",
        "Recorded over 125 albums, preserving traditional Qawwali for future generations",
        "Recognized as one of the greatest voices in music history",
      ],
      metadata: {
        title: "Book Nusrat Fateh Ali Khan | Nusrat Fateh Ali Khan Qawwali Booking - Concerts, Weddings & Events",
        description: "Book Nusrat Fateh Ali Khan for your event, concert, or wedding. Nusrat Fateh Ali Khan Qawwali booking available for concerts, weddings, corporate events, and spiritual gatherings across Pakistan. Contact us via WhatsApp at +92 322 407 1299 to book Nusrat Fateh Ali Khan for your event. Professional booking services for Nusrat Fateh Ali Khan Qawwali performances.",
        keywords: "book nusrat fateh ali khan for event, nusrat fateh ali khan booking, hire nusrat fateh ali khan for qawwali, nusrat fateh ali khan event booking, book nusrat fateh ali khan pakistan, nusrat fateh ali khan qawwali booking, book nusrat fateh ali khan for wedding, nusrat fateh ali khan sufi music booking, nusrat fateh ali khan booking price, how to book nusrat fateh ali khan, nusrat fateh ali khan contact for booking, nusrat fateh ali khan qawwali, nusrat fateh ali khan sufi music, nusrat fateh ali khan biography, nusrat fateh ali khan performances, traditional qawwali artist nusrat fateh ali khan",
        ogTitle: "Book Nusrat Fateh Ali Khan | Nusrat Fateh Ali Khan Qawwali Booking",
        ogDescription: "Book Nusrat Fateh Ali Khan for Qawwali performances, concerts, weddings, and corporate events. Nusrat Fateh Ali Khan booking available across Pakistan. Contact +92 322 407 1299 for Nusrat Fateh Ali Khan event booking.",
        twitterTitle: "Book Nusrat Fateh Ali Khan | Nusrat Fateh Ali Khan Qawwali Booking",
        twitterDescription: "Book Nusrat Fateh Ali Khan for Qawwali performances, concerts, and weddings. Contact +92 322 407 1299 for booking.",
      },
      seo: {
        structuredData: {
          jobTitle: "Qawwali Singer",
          knowsAbout: ["Qawwali", "Sufi Music", "Traditional Music", "Pakistani Music", "Spiritual Music"],
        },
        faqs: [
          {
            question: "How can I book Nusrat Fateh Ali Khan for a wedding or live event?",
            answer: "If you are looking to book Nusrat Fateh Ali Khan for a wedding, Qawwali night, or live performance, you can contact us directly via WhatsApp at +92 322 407 1299. We manage official bookings for Nusrat Fateh Ali Khan for weddings, corporate events, concerts, and private functions in Pakistan and internationally.",
          },
          {
            question: "What is the booking price of Nusrat Fateh Ali Khan?",
            answer: "The booking price of Nusrat Fateh Ali Khan depends on the event type, city, performance duration, and technical requirements. For the latest Nusrat Fateh Ali Khan booking charges and availability, please contact us on WhatsApp at +92 322 407 1299 for an accurate quote.",
          },
          {
            question: "Can I hire Nusrat Fateh Ali Khan for a wedding Qawwali performance?",
            answer: "Yes, Nusrat Fateh Ali Khan is available to hire for wedding Qawwali performances, mehndi nights, and spiritual gatherings. Clients frequently book Nusrat Fateh Ali Khan for weddings to create a soulful and unforgettable atmosphere. Contact us on WhatsApp to check date availability and performance details.",
          },
          {
            question: "Is Nusrat Fateh Ali Khan available for corporate events and Qawwali nights?",
            answer: "Nusrat Fateh Ali Khan is available for corporate events, Sufi nights, cultural festivals, and private Qawwali gatherings. If you are planning to hire Nusrat Fateh Ali Khan for a corporate event or spiritual evening, reach out via WhatsApp at +92 322 407 1299 for booking details.",
          },
        ],
      },
    },
    {
      slug: "book-rahat-fateh-ali-khan-for-wedding-event",
      name: "Rahat Fateh Ali Khan",
      image: "/RFAK.jpg",
      bio: "Rahat Fateh Ali Khan is one of the most celebrated Qawwali and playback singers in the world. Widely searched and booked for weddings, corporate events, and live concerts, he is known for soulful performances that leave a lasting emotional impact.",
      fullBio: [
        "Rahat Fateh Ali Khan, born on December 9, 1974, in Faisalabad, Pakistan, is an internationally renowned Qawwali and playback singer. As the nephew and musical heir of the legendary Nusrat Fateh Ali Khan, Rahat has carried forward the rich legacy of Qawwali while expanding his reach to global audiences.",
        "Over the years, Rahat Fateh Ali Khan has become one of the most in-demand artists for those looking to book Rahat Fateh Ali Khan for weddings, Sufi nights, and large-scale live events. His powerful voice, spiritual depth, and emotional delivery make his performances deeply moving and unforgettable.",
        "Rahat's musical journey began under the guidance of Nusrat Fateh Ali Khan, and he made his professional debut in the 1990s. He later rose to massive popularity through Bollywood playback singing, becoming a household name across Pakistan, India, and internationally.",
        "Today, Rahat Fateh Ali Khan is frequently hired for destination weddings, corporate events, concerts, and private performances. Clients who hire Rahat Fateh Ali Khan for wedding events often seek a soulful, elegant, and spiritually uplifting musical experience.",
        "Whether performing classical Qawwali, Sufi kalams, or Bollywood hits, Rahat Fateh Ali Khan delivers a world-class live performance. Booking Rahat Fateh Ali Khan guarantees an atmosphere filled with emotion, devotion, and musical excellence.",
      ],
      birthDate: "December 9, 1974",
      birthplace: "Faisalabad, Pakistan",
      careerStart: 1990,
      performances: [
        {
          name: "Tere Mast Mast Do Nain",
          description:
            "Iconic Bollywood performance that established Rahat Fateh Ali Khan as a leading playback singer.",
          year: 2010,
        },
        {
          name: "Mann Ki Lagan",
          description:
            "Soulful and spiritual performance loved for its emotional depth.",
          year: 2012,
        },
        {
          name: "Jag Ghoomeya",
          description:
            "Powerful vocal performance showcasing Rahat's command over emotion and melody.",
          year: 2015,
        },
        {
          name: "O Re Piya",
          description:
            "Emotionally rich performance highlighting Rahat Fateh Ali Khan's signature vocal style.",
          year: 2011,
        },
        {
          name: "Tum Jo Aaye",
          description:
            "Romantic and soulful performance popular at weddings and live concerts.",
          year: 2013,
        },
        {
          name: "Dil To Bachcha Hai",
          description:
            "Melodic and expressive performance showcasing versatility.",
          year: 2014,
        },
      ],
      awards: [
        {
          name: "Filmfare Award",
          year: 2010,
          category: "Best Male Playback Singer",
        },
        {
          name: "Pakistani Music Award",
          year: 2012,
          category: "Best Qawwali Artist",
        },
        {
          name: "International Qawwali Award",
          year: 2015,
          category: "Excellence in Music",
        },
        {
          name: "Legacy Award",
          year: 2018,
          category: "Preserving Qawwali Tradition",
        },
      ],
      collaborations: [
        { artist: "A.R. Rahman", performance: "Jag Ghoomeya" },
        { artist: "Shreya Ghoshal", performance: "Tere Mast Mast Do Nain" },
        { artist: "Sunidhi Chauhan", performance: "O Re Piya" },
      ],
      stats: {
        performances: 150,
        recordings: 80,
        awards: 15,
        views: "800M+",
        streams: "200M+",
        followers: "12M+",
      },
      gallery: [
        "/mz-pic-3.JPG",
        "/mz-pic-4.JPG",
        "/mz-pic-5.jpg",
        "/mz-pic-6.jpg",
        "/mz-pic-7.jpg",
        "/mz-pic-8.jpg",
      ],
      milestones: [
        {
          year: 1990,
          event:
            "Professional debut under the guidance of Nusrat Fateh Ali Khan",
        },
        {
          year: 2000,
          event:
            "International tours that introduced Qawwali to global audiences",
        },
        {
          year: 2010,
          event: "Won Filmfare Award for Best Male Playback Singer",
        },
        {
          year: 2015,
          event: "Received International Qawwali Award for excellence",
        },
        {
          year: 2018,
          event: "Honored for preserving and promoting Qawwali tradition",
        },
      ],
      achievements: [
        "One of the most searched artists to book for weddings and Sufi events",
        "Successfully carried forward the legacy of Nusrat Fateh Ali Khan",
        "Global recognition in Qawwali and Bollywood playback singing",
        "Highly respected for soulful and spiritually uplifting live performances",
      ],
      metadata: {
        title: "Book Rahat Fateh Ali Khan for Wedding | Rahat Fateh Ali Khan Qawwali Booking - Concerts, Weddings & Events",
        description: "Book Rahat Fateh Ali Khan for your event, concert, or wedding. Rahat Fateh Ali Khan Qawwali booking available for concerts, weddings, corporate events, and spiritual gatherings across Pakistan. Contact us via WhatsApp at +92 322 407 1299 to book Rahat Fateh Ali Khan for your event. Professional booking services for Rahat Fateh Ali Khan Qawwali performances.",
        keywords: "book rahat fateh ali khan for event, rahat fateh ali khan booking, hire rahat fateh ali khan for qawwali, rahat fateh ali khan event booking, book rahat fateh ali khan pakistan, rahat fateh ali khan qawwali booking, book rahat fateh ali khan for wedding, rahat fateh ali khan sufi music booking, rahat fateh ali khan booking price, how to book rahat fateh ali khan, rahat fateh ali khan contact for booking, rahat fateh ali khan qawwali, rahat fateh ali khan sufi music, rahat fateh ali khan biography, rahat fateh ali khan performances, traditional qawwali artist rahat fateh ali khan",
        ogTitle: "Book Rahat Fateh Ali Khan for Wedding | Rahat Fateh Ali Khan Qawwali Booking",
        ogDescription: "Book Rahat Fateh Ali Khan for Qawwali performances, concerts, weddings, and corporate events. Rahat Fateh Ali Khan booking available across Pakistan. Contact +92 322 407 1299 for Rahat Fateh Ali Khan event booking.",
        twitterTitle: "Book Rahat Fateh Ali Khan for Wedding | Rahat Fateh Ali Khan Qawwali Booking",
        twitterDescription: "Book Rahat Fateh Ali Khan for Qawwali performances, concerts, and weddings. Contact +92 322 407 1299 for booking.",
      },
      seo: {
        structuredData: {
          jobTitle: "Qawwali Singer",
          knowsAbout: ["Qawwali", "Sufi Music", "Traditional Music", "Pakistani Music", "Bollywood Playback Singing"],
        },
        faqs: [
          {
            question: "How can I book Rahat Fateh Ali Khan for a wedding or live event?",
            answer: "If you are looking to book Rahat Fateh Ali Khan for a wedding, Qawwali night, or live performance, you can contact us directly via WhatsApp at +92 322 407 1299. We manage official bookings for Rahat Fateh Ali Khan for weddings, corporate events, concerts, and private functions in Pakistan and internationally.",
          },
          {
            question: "What is the booking price of Rahat Fateh Ali Khan?",
            answer: "The booking price of Rahat Fateh Ali Khan depends on the event type, city, performance duration, and technical requirements. For the latest Rahat Fateh Ali Khan booking charges and availability, please contact us on WhatsApp at +92 322 407 1299 for an accurate quote.",
          },
          {
            question: "Can I hire Rahat Fateh Ali Khan for a wedding Qawwali performance?",
            answer: "Yes, Rahat Fateh Ali Khan is available to hire for wedding Qawwali performances, mehndi nights, and spiritual gatherings. Clients frequently book Rahat Fateh Ali Khan for weddings to create a soulful and unforgettable atmosphere. Contact us on WhatsApp to check date availability and performance details.",
          },
          {
            question: "Is Rahat Fateh Ali Khan available for corporate events and Qawwali nights?",
            answer: "Rahat Fateh Ali Khan is available for corporate events, Sufi nights, cultural festivals, and private Qawwali gatherings. If you are planning to hire Rahat Fateh Ali Khan for a corporate event or spiritual evening, reach out via WhatsApp at +92 322 407 1299 for booking details.",
          },
        ],
      },
    },
  ];
}

export async function getQawwal(slug: string): Promise<Qawwal | undefined> {
  try {
    const qawwals = await getAllQawwals();
    return qawwals.find((q) => q.slug === slug);
  } catch (error) {
    console.error('Error fetching qawwal:', error);
    return undefined;
  }
}

export async function getAllQawwalSlugs(): Promise<string[]> {
  try {
    const qawwals = await getAllQawwals();
    return qawwals.map((q) => q.slug);
  } catch (error) {
    console.error('Error fetching qawwal slugs:', error);
    return [];
  }
}

