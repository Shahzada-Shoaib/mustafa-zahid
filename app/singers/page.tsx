import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import { getAllSingers } from "@/lib/data/singers";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Book Singers & Music Artists | Hire Vocalists for Events",
  description: "Book professional singers & music artists for weddings, mehndi nights, corporate events in Lahore. Live performances available. Contact: +92 322 407 1299",
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


// Helper function to validate and sanitize image URL
function getValidImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return '/mz-logo.png';
  }
  
  // Check if it's a valid URL (starts with http/https) or a valid relative path (starts with /)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/')) {
    try {
      // Try to construct URL to validate
      if (imageUrl.startsWith('http')) {
        new URL(imageUrl);
      }
      return imageUrl;
    } catch {
      return '/mz-logo.png';
    }
  }
  
  return '/mz-logo.png';
}

export default async function SingersPage() {
  const singers = await getAllSingers();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
              Music Artists
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
              Pakistani <span className="text-gradient">Singers</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4">
              Explore talented singers and music artists from Pakistan
            </p>
          </div>
        </div>
      </section>

      {/* Singers Grid */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {singers.map((singer) => (
              <Link
                key={singer.slug}
                href={`/singers/${singer.slug}`}
                className="group glass-card rounded-xl sm:rounded-2xl overflow-hidden hover-lift block touch-manipulation"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={getValidImageUrl(singer.image)}
                    alt={singer.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white font-medium">
                    {singer.genre}
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {singer.name}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">{singer.bio}</p>
                  <div className="mt-3 sm:mt-4 flex items-center gap-2 text-red-400 text-xs sm:text-sm font-medium group-hover:text-red-300 transition-colors min-h-[32px] sm:min-h-[36px]">
                    <span>View Profile</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

