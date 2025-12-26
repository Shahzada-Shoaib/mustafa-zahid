import type { Metadata } from "next";
import Link from "next/link"; 
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Qawwals | Traditional Qawwali Artists & Performers",
  description: "Explore traditional Qawwali artists and performers. Discover the rich heritage of Qawwali music including Nusrat Fateh Ali Khan, Rahat Fateh Ali Khan, and other legendary Qawwals.",
  keywords: "Qawwali, Qawwals, Sufi music, traditional music, Pakistani Qawwali, Rahat Fateh Ali Khan, Rahat Fateh Ali Khan, Sufi singers, Qawwali artists",
  
  openGraph: {
    title: "Qawwals - Traditional Qawwali Artists",
    description: "Explore traditional Qawwali artists and performers. Discover the rich heritage of Qawwali music.",
    url: "https://mustafazahid.com/qawwals",
    siteName: "Pakistani Music",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Qawwali Artists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Qawwals - Traditional Qawwali Artists",
    description: "Explore traditional Qawwali artists and performers",
    images: ["/mz-logo.png"],
  },
  
  alternates: {
    canonical: "https://mustafazahid.com/qawwals",
  },
};

const qawwals = [
  {
    slug: "Rahat-fateh-ali-khan",
    name: "Rahat Fateh Ali Khan",
    image: "/mz-logo.png",
    description: "Legendary Qawwali maestro",
  },
  {
    slug: "rahat-fateh-ali-khan",
    name: "Rahat Fateh Ali Khan",
    image: "/mz-logo.png",
    description: "Renowned Qawwali artist",
  },
];

export default function QawwalsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Traditional Music
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Qawwali <span className="text-gradient">Artists</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover the rich heritage of Qawwali music and its legendary performers
            </p>
          </div>
        </div>
      </section>

      {/* About Qawwali Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-3xl p-8 lg:p-10 mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                  About Qawwali
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                  The Art of <span className="text-gradient">Qawwali</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  Qawwali is a form of Sufi devotional music that originated in South Asia. 
                  It is characterized by its powerful vocals, rhythmic patterns, and spiritual themes.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  These legendary artists have preserved and evolved this traditional art form, 
                  bringing it to audiences worldwide.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/mz-pic-2.JPG"
                  alt="Qawwali Performance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qawwals Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {qawwals.map((qawwal) => (
              <Link
                key={qawwal.slug}
                href={`/qawwals/${qawwal.slug}`}
                className="group glass-card rounded-2xl overflow-hidden hover-lift block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={qawwal.image}
                    alt={qawwal.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                    Qawwali
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {qawwal.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{qawwal.description}</p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
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

