import connectDB from '@/lib/db/mongodb';
import Singer from '@/lib/models/Singer';

export interface Singer {
  slug: string;
  name: string;
  image: string;
  genre: string;
  bio: string;
  fullBio: string[];
  birthDate: string;
  birthplace: string;
  careerStart: number;
  albums: Array<{
    name: string;
    year: number;
    description: string;
    cover?: string;
  }>;
  songs: Array<{ name: string; description: string; year?: number }>;
  awards: Array<{ name: string; year: number; category: string }>;
  collaborations: Array<{ artist: string; song: string }>;
  stats: {
    albums: number;
    songs: number;
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

export async function getAllSingers(): Promise<Singer[]> {
  try {
    await connectDB();
    const singers = await Singer.find({}).lean();
    
    if (!singers || !Array.isArray(singers)) {
      return [];
    }
    
    // Convert Mongoose documents to plain objects matching Singer interface
    return singers.map(singer => {
      const { _id, __v, createdAt, updatedAt, ...singerData } = singer as any;
      return singerData as Singer;
    });
  } catch (error) {
    console.error('Error fetching singers from database:', error);
    return [];
  }
  
  /* HARDCODED DATA - COMMENTED OUT - NOW USING DATABASE
  return [
    {
      slug: "hire-atif-aslam-for-concert",
      name: "Atif Aslam",
      image: "/atif-aslam.jpg",
      genre: "Pop, Rock",
      bio: "Atif Aslam is a renowned Pakistani singer, songwriter, and actor known for his soulful voice and hit songs that have captivated millions worldwide.",
      fullBio: [
        "Atif Aslam, born on March 12, 1983, in Wazirabad, Pakistan, is one of the most celebrated Pakistani singers of his generation. With a career spanning over two decades, Atif has established himself as a global icon in the music industry, known for his distinctive voice that blends emotion with power.",
        "His journey began in 2004 with the release of his debut album 'Jal Pari', which featured the breakthrough single 'Aadat'. This song catapulted him to fame overnight and marked the beginning of an illustrious career that would see him become one of Pakistan's most successful music exports to the world.",
        "Atif Aslam's distinctive voice, characterized by its emotional depth and versatility, has earned him millions of fans worldwide. He has successfully bridged the gap between Pakistani and Indian music industries, collaborating with numerous Bollywood projects while maintaining his roots in Pakistani music. His ability to convey deep emotions through his voice has made him a favorite among music lovers across South Asia and beyond.",
        "Throughout his career, Atif has released multiple chart-topping albums and singles, performed at prestigious venues globally, and received numerous awards and accolades. His ability to connect with audiences through his music has made him a sought-after performer for concerts, weddings, and corporate events across Pakistan and internationally. Whether it's a romantic ballad or an energetic rock number, Atif's performances never fail to mesmerize his audience.",
        "Beyond his musical achievements, Atif Aslam has also ventured into acting, further expanding his artistic repertoire. His dedication to his craft and his genuine connection with his fans have made him one of the most beloved artists in the Pakistani entertainment industry. Today, booking Atif Aslam for events has become a symbol of prestige and quality entertainment.",
      ],
      birthDate: "March 12, 1983",
      birthplace: "Wazirabad, Pakistan",
      careerStart: 2004,
      albums: [
        {
          name: "Jal Pari",
          year: 2004,
          description:
            "Debut album featuring hit singles like Aadat and Woh Lamhe that launched Atif's career",
        },
        {
          name: "Doorie",
          year: 2006,
          description:
            "Second studio album with popular tracks Doorie and Tere Bin that became instant classics",
        },
        {
          name: "Meri Kahani",
          year: 2008,
          description:
            "Third album showcasing Atif's evolving musical style and emotional depth",
        },
        {
          name: "Jal",
          year: 2014,
          description:
            "Collaborative album with the band Jal featuring powerful rock anthems",
        },
      ],
      songs: [
        {
          name: "Tere Bin",
          description:
            "One of Atif's most iconic romantic ballads that became a massive hit and remains a fan favorite",
          year: 2006,
        },
        {
          name: "Pehli Nazar Mein",
          description:
            "Popular Bollywood track that showcased Atif's versatility and emotional range",
          year: 2007,
        },
        {
          name: "Jeene Laga Hoon",
          description:
            "Chart-topping romantic song from the movie Ramaiya Vastavaiya that touched millions of hearts",
          year: 2013,
        },
        {
          name: "Aadat",
          description:
            "Breakthrough single that launched Atif's career to stardom and became a national anthem",
          year: 2004,
        },
        {
          name: "Woh Lamhe",
          description:
            "Emotional ballad that became a fan favorite and showcased Atif's vocal prowess",
          year: 2006,
        },
        {
          name: "Doorie",
          description:
            "Title track from his second album, showcasing his vocal range and emotional depth",
          year: 2006,
        },
      ],
      awards: [
        {
          name: "Lux Style Award",
          year: 2005,
          category: "Best Album - Jal Pari",
        },
        {
          name: "Filmfare Award",
          year: 2008,
          category: "Best Male Playback Singer",
        },
        {
          name: "Pakistani Music Award",
          year: 2010,
          category: "Best Singer of the Year",
        },
        {
          name: "International Achievement Award",
          year: 2015,
          category: "Outstanding Contribution to Music",
        },
      ],
      collaborations: [
        { artist: "Shreya Ghoshal", song: "Tera Hone Laga Hoon" },
        { artist: "Sunidhi Chauhan", song: "Dil Diyaan Gallan" },
        { artist: "Arijit Singh", song: "Jeena Jeena" },
      ],
      stats: {
        albums: 4,
        songs: 50,
        awards: 15,
        views: "2.5B+",
        streams: "500M+",
        followers: "10M+",
      },
      gallery: [
        "/mz-pic-2.JPG",
        "/mz-pic-3.JPG",
        "/mz-pic-4.JPG",
        "/mz-pic-5.jpg",
        "/mz-pic-6.jpg",
        "/mz-pic-7.jpg",
      ],
      milestones: [
        {
          year: 2004,
          event: "Released debut album 'Jal Pari' with hit single Aadat",
        },
        { year: 2006, event: "Bollywood debut with 'Woh Lamhe' from Zeher" },
        {
          year: 2008,
          event: "Won Filmfare Award for Best Male Playback Singer",
        },
        {
          year: 2010,
          event:
            "Performed at prestigious international venues including Royal Albert Hall",
        },
        {
          year: 2015,
          event:
            "Received International Achievement Award for music excellence",
        },
      ],
      achievements: [
        "First Pakistani artist to perform at Royal Albert Hall, London",
        "Multiple chart-topping singles in both Pakistan and India",
        "Recognized as one of the most influential voices in South Asian music",
        "Successfully bridged Pakistani and Indian music industries",
      ],
      metadata: {
        title: "Book Atif Aslam for Event | Atif Aslam Booking - Concerts, Weddings & Corporate Events",
        description: "Book Atif Aslam for your event, concert, or wedding. Atif Aslam booking available for concerts, weddings, corporate events, and live performances across Pakistan. Contact us via WhatsApp at +92 322 407 1299 to book Atif Aslam for your event. Professional booking services for Atif Aslam concerts and events.",
        keywords: "book atif aslam for event, atif aslam booking, hire atif aslam for concert, atif aslam event booking, book atif aslam pakistan, atif aslam concert booking, atif aslam live performance booking, book atif aslam for wedding, atif aslam corporate event booking, atif aslam booking price, how to book atif aslam, atif aslam contact for booking, atif aslam pakistani singer, atif aslam biography, atif aslam songs, atif aslam albums, pakistani music artist atif aslam",
        ogTitle: "Book Atif Aslam for Event | Atif Aslam Booking",
        ogDescription: "Book Atif Aslam for concerts, weddings, and corporate events. Atif Aslam booking available across Pakistan. Contact +92 322 407 1299 for Atif Aslam event booking.",
        twitterTitle: "Book Atif Aslam for Event | Atif Aslam Booking",
        twitterDescription: "Book Atif Aslam for concerts, weddings, and corporate events. Contact +92 322 407 1299 for booking.",
      },
      seo: {
        structuredData: {
          jobTitle: "Singer",
          knowsAbout: ["Pakistani Music", "Pop Music", "Rock Music", "Singing", "Bollywood Music"],
        },
        faqs: [
          {
            question: "How to book Atif Aslam for an event?",
            answer: "To book Atif Aslam for your event, concert, or wedding, contact us via WhatsApp at +92 322 407 1299. We handle bookings for Atif Aslam for various events including concerts, weddings, corporate events, and private performances across Pakistan and internationally.",
          },
          {
            question: "What is the booking price for Atif Aslam?",
            answer: "The booking price for Atif Aslam varies depending on the type of event, location, and duration. For detailed pricing information and availability, please contact us directly via WhatsApp at +92 322 407 1299.",
          },
          {
            question: "Can I book Atif Aslam for a wedding?",
            answer: "Yes, Atif Aslam is available for wedding bookings. Atif Aslam performs at weddings and special events, making your special day even more memorable. Contact us via WhatsApp to discuss your wedding event requirements and availability.",
          },
        ],
      },
    },
    {
      slug: "book-rdb-for-wedding",
      name: "RDB (Surj)",
      image: "/RDB-surj.jpg",
      genre: "Punjabi, Bhangra, Urban, Live Performance",
      bio: "RDB (Surj) is a legendary Punjabi music act known for electrifying live performances. A top choice for clients looking to book RDB for weddings, private events, and high-energy celebrations.",
      fullBio: [
        "RDB, short for Rhythm Dhol Bass, is a globally respected British Asian music brand now represented by Surj. Over the years, RDB has become one of the most searched Punjabi acts for people looking to book RDB for weddings and live events.",
        "RDB's music is deeply rooted in Punjabi culture while blending modern urban sounds, making it a perfect fit for weddings, mehndi nights, sangeet ceremonies, and private parties. Surj's live performances focus on crowd engagement, powerful dhol rhythms, and a dance-floor-ready playlist.",
        "Clients who hire RDB for wedding performances often look for energy, professionalism, and a proven track record. With decades of stage experience, RDB delivers all three, ensuring every event feels special and memorable.",
        "From intimate private celebrations to large-scale destination weddings, RDB tailors each performance to match the audience and event flow. This personalized approach is why event planners and families consistently choose RDB for wedding bookings.",
        "Today, RDB (Surj) continues to perform internationally and remains a trusted name for those searching to hire a Punjabi singer for weddings who can deliver both nostalgia and modern vibes.",
      ],
      birthDate: "N/A",
      birthplace: "United Kingdom",
      careerStart: 1999,
      albums: [
        {
          name: "Rhythm Dhol Bass",
          year: 2001,
          description:
            "Debut album that introduced RDB's signature Punjabi bhangra and urban fusion sound.",
        },
        {
          name: "Dangerous",
          year: 2003,
          description:
            "Breakthrough album that made RDB a household name in the UK Asian music scene.",
        },
        {
          name: "Sounds of the Underground",
          year: 2005,
          description:
            "An evolution of RDB's sound with club, hip-hop, and live performance energy.",
        },
      ],
      songs: [
        {
          name: "Aaja Nachle",
          description:
            "Iconic Punjabi party track that remains a favorite at weddings and live events.",
          year: 2003,
        },
        {
          name: "Dil Karda",
          description:
            "High-energy club anthem widely requested in RDB live wedding performances.",
          year: 2004,
        },
        {
          name: "Sadi Gali",
          description:
            "Crowd-favorite bhangra track known for instant dance-floor energy.",
          year: 2005,
        },
        {
          name: "Lak 28 Kudi Da",
          description:
            "Global Punjabi hit that later gained massive popularity through Bollywood.",
          year: 2009,
        },
      ],
      awards: [
        {
          name: "UK Asian Music Award",
          year: 2004,
          category: "Best Bhangra Act",
        },
        {
          name: "Brit Asia Award",
          year: 2006,
          category: "Outstanding Contribution to Punjabi Music",
        },
      ],
      collaborations: [
        { artist: "Manj Musik", song: "Classic RDB Catalog" },
        { artist: "Punjabi MC", song: "Live Shows & Stage Collaborations" },
        { artist: "UK Asian Artists", song: "Various Punjabi Fusion Projects" },
      ],
      stats: {
        albums: 3,
        songs: 30,
        awards: 6,
        views: "500M+",
        streams: "200M+",
        followers: "2M+",
      },
      gallery: [
        "/rdb-live-1.jpg",
        "/rdb-live-2.jpg",
        "/rdb-live-3.jpg",
        "/rdb-live-4.jpg",
      ],
      milestones: [
        {
          year: 1999,
          event: "Formation of RDB in the United Kingdom",
        },
        {
          year: 2003,
          event: "International breakthrough with Punjabi club and wedding anthems",
        },
        {
          year: 2009,
          event: "Global recognition through Bollywood Punjabi collaborations",
        },
        {
          year: 2015,
          event: "Surj continues RDB as the official live-performing artist",
        },
      ],
      achievements: [
        "One of the most searched Punjabi acts to book for weddings",
        "Pioneers of modern Punjabi bhangra and urban fusion music",
        "Highly trusted for wedding, private, and corporate event bookings",
        "Renowned for energetic, crowd-focused live performances",
      ],
      metadata: {
        title: "Book RDB (Surj) for Wedding | RDB Booking - Punjabi Music Events & Live Performances",
        description: "Book RDB (Surj) for your wedding, mehndi night, or private event. RDB booking available for weddings, Punjabi music events, and high-energy live performances across Pakistan. Contact us via WhatsApp at +92 322 407 1299 to book RDB for your event. Professional booking services for RDB concerts and Punjabi music events.",
        keywords: "book rdb for wedding, rdb booking, hire rdb for event, rdb wedding booking, book rdb pakistan, rdb concert booking, rdb live performance booking, book rdb for mehndi, rdb corporate event booking, rdb booking price, how to book rdb, rdb contact for booking, rdb punjabi singer, rdb biography, rdb songs, rdb albums, punjabi music artist rdb, book surj for wedding",
        ogTitle: "Book RDB (Surj) for Wedding | RDB Booking",
        ogDescription: "Book RDB (Surj) for weddings, mehndi nights, and Punjabi music events. RDB booking available across Pakistan. Contact +92 322 407 1299 for RDB event booking.",
        twitterTitle: "Book RDB (Surj) for Wedding | RDB Booking",
        twitterDescription: "Book RDB (Surj) for weddings, mehndi nights, and Punjabi music events. Contact +92 322 407 1299 for booking.",
      },
      seo: {
        structuredData: {
          jobTitle: "Punjabi Singer",
          knowsAbout: ["Punjabi Music", "Bhangra", "Urban Music", "Live Performance", "Wedding Entertainment"],
        },
        faqs: [
          {
            question: "How to book RDB (Surj) for an event?",
            answer: "To book RDB (Surj) for your wedding, mehndi night, or private event, contact us via WhatsApp at +92 322 407 1299. We handle bookings for RDB for various events including weddings, mehndi nights, sangeet ceremonies, and private parties across Pakistan and internationally.",
          },
          {
            question: "What is the booking price for RDB (Surj)?",
            answer: "The booking price for RDB (Surj) varies depending on the type of event, location, and duration. For detailed pricing information and availability, please contact us directly via WhatsApp at +92 322 407 1299.",
          },
          {
            question: "Can I book RDB (Surj) for a wedding?",
            answer: "Yes, RDB (Surj) is available for wedding bookings. RDB performs at weddings, mehndi nights, and special events, making your celebration even more memorable. Contact us via WhatsApp to discuss your wedding event requirements and availability.",
          },
        ],
      },
    },
  ];
  */
}

export async function getSinger(slug: string): Promise<Singer | undefined> {
  try {
    const singers = await getAllSingers();
    return singers.find((s) => s.slug === slug);
  } catch (error) {
    console.error('Error fetching singer:', error);
    return undefined;
  }
}

export async function getAllSingerSlugs(): Promise<string[]> {
  try {
    const singers = await getAllSingers();
    return singers.map((s) => s.slug);
  } catch (error) {
    console.error('Error fetching singer slugs:', error);
    return [];
  }
}

export async function getAllSingerSlugsWithDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    await connectDB();
    const singers = await Singer.find({}).select('slug updatedAt').lean();
    
    if (!singers || !Array.isArray(singers)) {
      return [];
    }
    
    return singers.map((singer: any) => ({
      slug: singer.slug,
      updatedAt: singer.updatedAt ? new Date(singer.updatedAt) : new Date(),
    }));
  } catch (error) {
    console.error('Error fetching singer slugs with dates:', error);
    return [];
  }
}

