import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://mustafazahid.com"),
  title: "About Mustafa Zahid | Pakistani Singer & Roxen Vocalist | Career & Biography",
  description: "Learn about Mustafa Zahid - Pakistani singer, songwriter, and lead vocalist of Roxen. 20+ years of musical excellence, 100+ songs, and award-winning performances. Book for events in Lahore.",
  keywords: "Mustafa Zahid biography, Mustafa Zahid career, Roxen band, Pakistani singer Mustafa Zahid, Mustafa Zahid songs, Mustafa Zahid albums, book Mustafa Zahid Lahore",
  
  openGraph: {
    title: "About | Mustafa Zahid Official Website",
    description: "Learn about Mustafa Zahid - Pakistani singer, songwriter, and Roxen vocalist. 20+ years experience. Book for events in Lahore.",
    url: "https://mustafazahid.com/about",
    siteName: "Mustafa Zahid Official",
    images: [
      {
        url: "https://mustafazahid.com/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Mustafa Zahid Official Website",
      },
    ],
    
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About | Mustafa Zahid Official Website",
    description: "Learn about Mustafa Zahid - Pakistani singer, songwriter, and Roxen vocalist. 20+ years experience.",
    images: ["/mz-logo.png"],
  },

  alternates: {
    canonical: "https://mustafazahid.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Official Website
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              About <span className="text-gradient">Mustafa Zahid</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover the journey of one of Pakistan&apos;s most celebrated vocalists, 
              with over 20 years of musical excellence and countless memorable performances
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
          {/* Biography Section */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 space-y-6">
            <div className="space-y-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Biography & Career
              </h2>
              <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                <p>
                  A renowned Pakistani singer, songwriter, and musician, best known as 
                  the lead vocalist of the band <strong className="text-red-400">Roxen</strong>. 
                  With over 20 years of experience in the music industry, the artist has 
                  established himself as one of Pakistan&apos;s most celebrated vocalists.
                </p>
                <p>
                  Starting his career in the early 2000s, the performer has released 
                  numerous hit songs and albums that have resonated with audiences across 
                  South Asia and beyond. The music blends contemporary sounds with traditional 
                  influences, creating a unique style that appeals to listeners of all ages.
                </p>
                <p>
                  Through work with Roxen and as a solo artist, the singer has contributed 
                  significantly to the Pakistani music industry with powerful vocals and 
                  meaningful lyrics. Songs have transcended borders, earning recognition 
                  and establishing the artist as a beloved figure in South Asian music.
                </p>
              </div>
            </div>
          </div>

          {/* Musical Style Section */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Musical Style & Legacy
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed text-lg">
              <p>
                The music is characterized by soulful melodies, powerful emotions, and 
                exceptional vocal talent. The artist&apos;s ability to blend contemporary 
                sounds with traditional Pakistani music influences has created a distinctive 
                style that sets the work apart.
              </p>
              <p>
                With 100+ songs in the discography, the performer has explored various 
                genres while maintaining a signature sound. From romantic ballads to 
                energetic performances, each song showcases the versatility and depth 
                of the artist&apos;s musical talent.
              </p>
            </div>
          </div>

          {/* Roxen Band Section */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Roxen Band
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed text-lg">
              <p>
                As the lead vocalist of <strong className="text-red-400">Roxen</strong>, 
                the artist has been instrumental in shaping the band&apos;s sound and 
                success. Roxen has become one of Pakistan&apos;s most recognized music 
                groups, known for their powerful performances and memorable songs.
              </p>
              <p>
                The collaboration with Roxen has produced numerous hit tracks that have 
                become anthems for music lovers across Pakistan and the South Asian region. 
                The band&apos;s music continues to inspire and entertain audiences worldwide.
              </p>
            </div>
          </div>

          {/* Booking Information */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Booking & Events
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed text-lg">
              <p>
                Available for live performances at weddings, mehndi nights, concerts, 
                corporate events, and private celebrations in Lahore and across Pakistan. 
                The artist brings years of experience and professionalism to every event.
              </p>
              <p>
                To book live performances, contact us via WhatsApp at{" "}
                <a 
                  href="https://wa.me/+923224071299" 
                  className="text-red-400 hover:text-red-300 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +92 322 407 1299
                </a>
                . Our team handles all booking inquiries, availability checks, and 
                event coordination to ensure a seamless experience.
              </p>
              <div className="pt-4">
                <a
                  href="https://wa.me/+923224071299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-base font-semibold hover:from-red-500 hover:to-red-600 transition-all"
                >
                  Book Now via WhatsApp
                  <svg
                    className="w-5 h-5"
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
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-white/50 text-sm pt-4">
            <p>
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

