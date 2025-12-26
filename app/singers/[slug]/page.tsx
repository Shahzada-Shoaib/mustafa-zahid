import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

interface Singer {
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
}

async function getSinger(slug: string): Promise<Singer | undefined> {
  const singers: Singer[] = [
    {
      slug: "atif-aslam",
      name: "Atif Aslam",
      image: "/mz-logo.png",
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
    },
    {
      slug: "ali-zafar",
      name: "Ali Zafar",
      image: "/mz-logo.png",
      genre: "Pop, Rock",
      bio: "Ali Zafar is a multi-talented Pakistani singer, songwriter, actor, and painter who has made significant contributions to Pakistani music and entertainment industry.",
      fullBio: [
        "Ali Zafar, born on May 18, 1980, in Lahore, Pakistan, is a multi-talented artist who has excelled as a singer, songwriter, actor, and painter. His diverse talents and charismatic personality have made him one of Pakistan's most beloved entertainers, known for his unique style that blends traditional Pakistani music with contemporary pop elements.",
        "Ali began his music career in the early 2000s, quickly gaining recognition for his distinctive voice and innovative approach to music. His debut album 'Huqa Pani' released in 2003, featured the hit single 'Channo', which became an instant classic and established him as a major force in Pakistani music. The song's catchy melody and Ali's energetic performance made it a national anthem that continues to be loved by fans across generations.",
        "Beyond his musical achievements, Ali Zafar has also made a significant impact in the entertainment industry as an actor, appearing in both Pakistani and Bollywood films. His versatility as an artist has allowed him to build a strong international fanbase. Whether performing on stage or acting on screen, Ali brings a unique energy and charm that captivates audiences.",
        "Known for his energetic live performances and ability to connect with audiences, Ali Zafar is frequently booked for concerts, corporate events, and private performances. His professional approach and dedication to his craft have made him a preferred choice for event organizers across Pakistan and beyond. Booking Ali Zafar for your event guarantees an unforgettable experience filled with music, energy, and entertainment.",
        "Throughout his career, Ali has maintained his artistic integrity while evolving with the times. His commitment to quality music and memorable performances has earned him numerous awards and the respect of his peers. Today, Ali Zafar continues to be one of the most sought-after performers in Pakistan, with his booking in high demand for various events and occasions.",
      ],
      birthDate: "May 18, 1980",
      birthplace: "Lahore, Pakistan",
      careerStart: 2003,
      albums: [
        {
          name: "Huqa Pani",
          year: 2003,
          description:
            "Debut album featuring the iconic track Channo that became a national sensation",
        },
        {
          name: "Masty",
          year: 2006,
          description:
            "Second album showcasing Ali's musical evolution and versatility",
        },
        {
          name: "Jhoom",
          year: 2011,
          description:
            "Third studio album with hit singles that demonstrated his artistic growth",
        },
        {
          name: "Balo Batiyan",
          year: 2016,
          description:
            "Latest album demonstrating his continued innovation in music",
        },
      ],
      songs: [
        {
          name: "Channo",
          description:
            "Iconic debut single that became a national anthem and launched Ali's career",
          year: 2003,
        },
        {
          name: "Jhoom",
          description:
            "Energetic track that showcases Ali's dynamic vocal style and stage presence",
          year: 2011,
        },
        {
          name: "Rockstar",
          description:
            "Popular song from his acting debut film that became a massive hit",
          year: 2011,
        },
        {
          name: "Rangeen",
          description:
            "Colorful and vibrant track loved by fans for its upbeat energy",
          year: 2013,
        },
        {
          name: "Sajni",
          description:
            "Romantic ballad that highlights Ali's vocal versatility and emotional depth",
          year: 2006,
        },
        {
          name: "Dekha",
          description:
            "Melodic track that became a fan favorite and showcased his songwriting skills",
          year: 2011,
        },
      ],
      awards: [
        {
          name: "Lux Style Award",
          year: 2004,
          category: "Best Album - Huqa Pani",
        },
        {
          name: "Pakistani Music Award",
          year: 2007,
          category: "Best Male Singer",
        },
        { name: "Filmfare Award", year: 2011, category: "Best Male Debut" },
        {
          name: "International Music Award",
          year: 2014,
          category: "Excellence in Music",
        },
      ],
      collaborations: [
        { artist: "Shreya Ghoshal", song: "Madhubala" },
        { artist: "Sunidhi Chauhan", song: "Jab Tak" },
        { artist: "Harshdeep Kaur", song: "Allah Hu" },
      ],
      stats: {
        albums: 4,
        songs: 45,
        awards: 12,
        views: "1.8B+",
        streams: "350M+",
        followers: "8M+",
      },
      gallery: [
        "/mz-pic-8.jpg",
        "/mz-pic-9.jpg",
        "/mz-pic-10.jpg",
        "/mz-pic-11.jpg",
        "/mz-pic-12.jpg",
        "/Mz-pic.jpg",
      ],
      milestones: [
        {
          year: 2003,
          event: "Released debut album 'Huqa Pani' with hit single Channo",
        },
        {
          year: 2006,
          event: "Acting debut in Pakistani cinema with 'Chalay Thay Saath'",
        },
        {
          year: 2011,
          event:
            "Bollywood debut in 'Tere Bin Laden' and 'Mere Brother Ki Dulhan'",
        },
        {
          year: 2014,
          event: "Received International Music Award for excellence",
        },
        {
          year: 2016,
          event:
            "Released latest album 'Balo Batiyan' showcasing artistic growth",
        },
      ],
      achievements: [
        "First Pakistani artist to achieve mainstream success in Bollywood",
        "Multi-talented artist excelling in music, acting, and painting",
        "Known for his energetic and engaging live performances",
        "Successfully maintained artistic integrity while achieving commercial success",
      ],
    },
  ];

  return singers.find((s) => s.slug === slug);
}

function generateStructuredData(singer: Singer) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: singer.name,
    jobTitle: "Singer",
    description: singer.bio,
    birthDate: singer.birthDate,
    birthPlace: {
      "@type": "Place",
      name: singer.birthplace,
    },
    url: `https://mustafazahid.com/singers/${singer.slug}`,
    image: `https://mustafazahid.com${singer.image}`,
    knowsAbout: ["Pakistani Music", "Pop Music", "Rock Music", "Singing"],
    award: singer.awards.map((award) => `${award.name} - ${award.year}`),
  };
}

function generateFAQSchema(singer: Singer) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How to book ${singer.name} for an event?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `To book ${singer.name} for your event, concert, or wedding, contact us via WhatsApp at +92 322 407 1299. We handle bookings for ${singer.name} for various events including concerts, weddings, corporate events, and private performances across Pakistan and internationally.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the booking price for ${singer.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The booking price for ${singer.name} varies depending on the type of event, location, and duration. For detailed pricing information and availability, please contact us directly via WhatsApp at +92 322 407 1299.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I book ${singer.name} for a wedding?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, ${singer.name} is available for wedding bookings. ${singer.name} performs at weddings and special events, making your special day even more memorable. Contact us via WhatsApp to discuss your wedding event requirements and availability.`,
        },
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const singer = await getSinger(slug);

  if (!singer) {
    return {
      title: "Singer Not Found",
      description: "The requested singer page could not be found.",
    };
  }

  const bookingKeywords = [
    `book ${singer.name} for event`,
    `${singer.name} booking`,
    `hire ${singer.name} for concert`,
    `${singer.name} event booking`,
    `book ${singer.name} pakistan`,
    `${singer.name} concert booking`,
    `${singer.name} live performance booking`,
    `book ${singer.name} for wedding`,
    `${singer.name} corporate event booking`,
    `${singer.name} booking price`,
    `how to book ${singer.name}`,
    `${singer.name} contact for booking`,
  ].join(", ");

  return {
    metadataBase: new URL("https://mustafazahid.com"),
    title: `Book ${singer.name} for Event | ${singer.name} Booking - Concerts, Weddings & Corporate Events`,
    description: `Book ${singer.name} for your event, concert, or wedding. ${singer.name} booking available for concerts, weddings, corporate events, and live performances across Pakistan. Contact us via WhatsApp at +92 322 407 1299 to book ${singer.name} for your event. Professional booking services for ${singer.name} concerts and events.`,
    keywords: `${bookingKeywords}, ${singer.name} pakistani singer, ${singer.name} biography, ${singer.name} songs, ${singer.name} albums, pakistani music artist ${singer.name}`,

    openGraph: {
      title: `Book ${singer.name} for Event | ${singer.name} Booking`,
      description: `Book ${singer.name} for concerts, weddings, and corporate events. ${singer.name} booking available across Pakistan. Contact +92 322 407 1299 for ${singer.name} event booking.`,
      url: `https://mustafazahid.com/singers/${slug}`,
      siteName: "Mustafa Zahid - Music & Events",
      images: [
        {
          url: singer.image,
          width: 1200,
          height: 630,
          alt: `Book ${singer.name} for Event - ${singer.name} Booking`,
        },
      ],
      locale: "en_US",
      type: "profile",
    },

    twitter: {
      card: "summary_large_image",
      title: `Book ${singer.name} for Event | ${singer.name} Booking`,
      description: `Book ${singer.name} for concerts, weddings, and corporate events. Contact +92 322 407 1299 for booking.`,
      images: [singer.image],
    },

    alternates: {
      canonical: `https://mustafazahid.com/singers/${slug}`,
    },
  };
}

export default async function SingerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const singer = await getSinger(slug);

  if (!singer) {
    notFound();
  }

  const bookingMessage = encodeURIComponent(
    `Hello, I would like to book ${singer.name} for an event. Please provide more information about availability and pricing.`
  );
  const whatsappLink = `https://wa.me/+923224071299?text=${bookingMessage}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(singer)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(singer)),
        }}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <AnimatedBackground />
        <Header />

        {/* Hero Section with Booking CTA */}
        <section className=" relative py-2 lg:pt-32 lg:pb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent"></div>
          <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative aspect-[2/2] rounded-3xl overflow-hidden group">
                <Image
                  src={singer.image}
                  alt={`${singer.name} - Pakistani Singer available for booking`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Available for Booking</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="inline-block text-red-500 uppercase tracking-[0.3em] text-sm font-medium mb-4">
                    {singer.genre}
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
                    {singer.name}
                  </h1>
                  <p className="text-xl text-white/90 leading-relaxed mb-6">
                    {singer.bio}
                  </p>
                </div>

              

                {/* Booking CTA - Hero */}
                <div className="pt-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-base font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Book {singer.name} Now</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                  <p className="text-sm text-white/70 mt-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Available for concerts, weddings, and corporate events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Banner */}
        <section className="py-8 bg-gradient-to-r from-red-950/30 via-red-900/20 to-red-950/30 border-y border-red-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: "Views", value: singer.stats.views },
                { label: "Streams", value: singer.stats.streams },
                { label: "Followers", value: singer.stats.followers },
                { label: "Albums", value: `${singer.stats.albums}` },
                { label: "Awards", value: `${singer.stats.awards}` },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="py-6 lg:py-6 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="glass-card rounded-3xl p-8 lg:p-12">
              <div className="mb-8">
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                  About {singer.name}
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                  Biography
                </h2>
              </div>
              <div className="prose prose-invert max-w-none space-y-6">
                {singer.fullBio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-white/90 text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>


              {/* Key Achievements */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="text-2xl md:text-3xl font-semibold mb-8">
                  Key Achievements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {singer.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-white/90">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Songs Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12 text-center">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Hit Songs
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                Popular <span className="text-gradient">Tracks</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {singer.songs.map((song, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 hover-lift group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all">
                      <svg
                        className="w-7 h-7 text-red-400 group-hover:text-white transition-colors"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0013 13c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-3">
                      {song.year && (
                        <span className="text-white/40 text-xs">
                          {song.year}
                        </span>
                      )}
                      <span className="text-white/60 text-sm font-bold">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors mb-2">
                    {song.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {song.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        {singer.gallery.length > 0 && (
          <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <div className="mb-12 text-center">
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                  Gallery
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                  Photo <span className="text-gradient">Gallery</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {singer.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden hover-lift group cursor-pointer"
                  >
                    <Image
                      src={image}
                      alt={`${singer.name} - Photo ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Booking Section - Prominent CTA */}
        <section className="py-6 lg:py-10 bg-gradient-to-b from-transparent via-red-950/30 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="glass-card rounded-3xl p-8 lg:p-16 text-center border-2 border-red-500/20">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  Book {singer.name} Now
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  Book <span className="text-gradient">{singer.name}</span> for
                  Your Event
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  {singer.name} is available for booking for concerts, weddings,
                  corporate events, and private performances. Make your event
                  unforgettable by booking {singer.name} today. Contact us now
                  to discuss your event requirements and secure your booking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-lg font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-2xl shadow-red-900/40 hover:shadow-red-900/60 hover:scale-105"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Book via WhatsApp</span>
                  <svg
                    className="w-6 h-6 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <a
                  href={`tel:+923224071299`}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border-2 border-white/20 hover:border-white/40"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Call Now: +92 322 407 1299</span>
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: "🎵",
                    title: "Concerts",
                    desc: "Live performances that mesmerize audiences",
                  },
                  {
                    icon: "💒",
                    title: "Weddings",
                    desc: "Make your special day unforgettable",
                  },
                  {
                    icon: "🏢",
                    title: "Corporate Events",
                    desc: "Professional entertainment for business",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12 text-center">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Frequently Asked Questions
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                Booking <span className="text-gradient">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: `How to book ${singer.name} for an event?`,
                  a: `To book ${singer.name} for your event, concert, or wedding, contact us via WhatsApp at +92 322 407 1299. We handle bookings for ${singer.name} for various events including concerts, weddings, corporate events, and private performances across Pakistan and internationally. Our team will assist you with all booking details and requirements.`,
                },
                {
                  q: `What is the booking price for ${singer.name}?`,
                  a: `The booking price for ${singer.name} varies depending on the type of event, location, duration, and specific requirements. For detailed pricing information and availability, please contact us directly via WhatsApp at +92 322 407 1299. We provide transparent pricing and will work with you to create a package that fits your budget.`,
                },
                {
                  q: `Can I book ${singer.name} for a wedding?`,
                  a: `Yes, ${singer.name} is available for wedding bookings. ${singer.name} performs at weddings and special events, making your special day even more memorable. Contact us via WhatsApp to discuss your wedding event requirements, preferred dates, and availability. We ensure that ${singer.name}'s performance adds magic to your celebration.`,
                },
                {
                  q: `Is ${singer.name} available for corporate events?`,
                  a: `Yes, ${singer.name} is available for corporate events, product launches, and business functions. For corporate event booking inquiries, please contact us via WhatsApp at +92 322 407 1299. ${singer.name} brings professionalism and entertainment to corporate gatherings, making them memorable for your clients and employees.`,
                },
                {
                  q: `How can I contact ${singer.name} for booking?`,
                  a: `You can contact us to book ${singer.name} by sending a WhatsApp message to +92 322 407 1299. Our team will assist you with booking ${singer.name} for concerts, events, weddings, or corporate functions. We respond quickly and will help you with all the details you need for your event.`,
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 hover-lift"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="text-red-400 flex-shrink-0">
                      Q{index + 1}.
                    </span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-white/80 leading-relaxed pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
