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
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
              Official Website
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
              About <span className="text-gradient">Mustafa Zahid</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4">
              Biography, musical style, Roxen, and how live bookings work. This page goes deeper
              than the homepage overview.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6 sm:space-y-8">
          {/* Biography Section */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Biography & Career
              </h2>
              <div className="space-y-3 sm:space-y-4 text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg">
                <p>
                  Mustafa Zahid is a Pakistani singer, songwriter, and musician, best known as the
                  lead vocalist of <strong className="text-red-400">Roxen</strong>. Over more than
                  twenty years he has moved between band work and solo material while keeping a
                  recognisable emotional register.
                </p>
                <p>
                  He began recording and performing in the early 2000s, a period when Roxen was
                  finding its footing on radio and television. Tracks from that era, including fan
                  favourites that still surface in set lists, established him as a steady presence in
                  Pakistani pop-rock rather than a one-season name.
                </p>
                <p>
                  Alongside Roxen he has continued to write and perform material that travels well
                  beyond a single city or format. Audiences in South Asia and the diaspora still
                  stream older releases alongside newer work, which is why live shows often blend
                  catalogue deep cuts with the songs people know by heart.
                </p>
              </div>
            </div>
          </div>

          {/* Musical Style Section */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Musical Style & Legacy
            </h2>
            <div className="space-y-3 sm:space-y-4 text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg">
              <p>
                His sound leans on melody and vocal tone before production tricks. Contemporary
                arrangements sit on top of songwriting that still feels rooted in Urdu romantic
                tradition, so ballads and mid-tempo rock can live on the same album without jarring
                shifts.
              </p>
              <p>
                The discography spans more than a hundred songs across moods and tempos. Tu Phir Aao
                and Tera Mera Rishta Purana are the obvious entry points, but deeper listens reveal
                how much range there is between quiet studio takes and full-band crescendos.
              </p>
            </div>
          </div>

          {/* Roxen Band Section */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Roxen Band
            </h2>
            <div className="space-y-3 sm:space-y-4 text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg">
              <p>
                As Roxen&apos;s frontman he helped define the band&apos;s identity: guitar-led,
                lyric-forward, and built for both headphones and halls. Roxen became one of the
                groups casual listeners name when they talk about Pakistani rock from the 2000s
                onward.
              </p>
              <p>
                Collaborations inside the band produced several tracks that still travel as set-list
                anchors. On stage the Roxen catalogue and his solo work often share the same night,
                which is why fans treat a live date as a chance to hear both histories in one room.
              </p>
            </div>
          </div>

          {/* Booking Information */}
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Booking & Events
            </h2>
            <div className="space-y-3 sm:space-y-4 text-white/80 leading-relaxed text-sm sm:text-base lg:text-lg">
              <p>
                Live performances are available for weddings, mehndi nights, concerts, corporate
                events, and private celebrations in Lahore and across Pakistan. Each inquiry is
                handled individually so date, venue, and technical rider match the occasion.
              </p>
              <p>
                Message us on WhatsApp at{" "}
                <a 
                  href="https://wa.me/+923224071299" 
                  className="text-red-400 hover:text-red-300 active:text-red-200 font-medium break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +92 322 407 1299
                </a>
                {" "}
                with your preferred date, city, and event type. We reply with availability, a clear
                quote, and what happens next so you are not left chasing details. You can also{" "}
                <a
                  href="/#contact"
                  className="text-red-400 hover:text-red-300 active:text-red-200 font-medium"
                >
                  reach us from the homepage contact section
                </a>
                .
              </p>
              <div className="pt-3 sm:pt-4">
                <a
                  href="https://wa.me/+923224071299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm sm:text-base font-semibold hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-800 transition-all min-h-[48px] touch-manipulation"
                >
                  Book Now via WhatsApp
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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
          <div className="text-center text-white/50 text-xs sm:text-sm pt-4">
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

