import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Book Singers & Music Artists | Hire Vocalists for Events",
  description: "Hire professional singers, music artists, and vocalists for weddings, mehndi nights, corporate events, and private celebrations. Book live performances by talented artists to make your event unforgettable.",
  keywords: "book singers, hire singers, live music performance, vocalists for weddings, music artists booking, hire artists for events, singers for mehndi, live event singers, wedding music performers",

  openGraph: {
    title: "Book Singers & Music Artists | Hire Vocalists for Events",
    description: "Hire professional singers and music artists for weddings, mehndi nights, corporate events, and private celebrations. Book live performances to make your events memorable.",
    url: "https://mustafazahid.com/singers",
    siteName: "Music Artists Booking",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Book Singers & Music Artists for Weddings & Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Book Singers & Music Artists | Hire Vocalists for Events",
    description: "Hire professional singers and music artists for weddings, corporate events, and private celebrations. Book live performances for unforgettable events.",
    images: ["/mz-logo.png"],
  },

  alternates: {
    canonical: "https://mustafazahid.com/singers",
  },
};


// This would typically come from a database or API
const singers = [
  {
    slug: "hire-atif-aslam-for-concert",
    name: "Atif Aslam",
    image: "/atif-aslam.jpg", // Replace with actual singer images
    genre: "Pop, Rock",
    description: "Renowned Pakistani singer and actor",
  },
  {
    slug: "book-rdb-for-wedding",
    name: "RDB",
    image: "/RDB-surj.jpg",
    genre: "Rhythm, Dhol, Bass",
    description: "Bollywood singer and song writer",
  },
];

export default function SingersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Music Artists
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Pakistani <span className="text-gradient">Singers</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore talented singers and music artists from Pakistan
            </p>
          </div>
        </div>
      </section>

      {/* Singers Grid */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {singers.map((singer) => (
              <Link
                key={singer.slug}
                href={`/singers/${singer.slug}`}
                className="group glass-card rounded-2xl overflow-hidden hover-lift block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={singer.image}
                    alt={singer.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                    {singer.genre}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {singer.name}
                  </h3>
                  <p className="text-white/70 text-sm">{singer.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                    <span>View Profile</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

