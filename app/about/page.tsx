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
              Discover Mustafa Zahid&apos;s journey as one of Pakistan&apos;s most celebrated vocalists, 
              with over 20 years of musical excellence and countless memorable Mustafa Zahid performances
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
                  Mustafa Zahid is a renowned Pakistani singer, songwriter, and musician, best known as 
                  the lead vocalist of the band <strong className="text-red-400">Roxen</strong>. 
                  With over 20 years of experience in the music industry, Mustafa Zahid has 
                  established himself as one of Pakistan&apos;s most celebrated vocalists. Mustafa Zahid&apos;s 
                  career spans two decades of musical excellence.
                </p>
                <p>
                  Starting his career in the early 2000s, Mustafa Zahid has released 
                  numerous hit Mustafa Zahid songs and albums that have resonated with audiences across 
                  South Asia and beyond. Mustafa Zahid&apos;s music blends contemporary sounds with traditional 
                  influences, creating a unique style that appeals to listeners of all ages. Mustafa Zahid Roxen 
                  collaboration has produced some of the most memorable tracks in Pakistani music.
                </p>
                <p>
                  Through work with Roxen and as a solo artist, Mustafa Zahid has contributed 
                  significantly to the Pakistani music industry with powerful vocals and 
                  meaningful lyrics. Mustafa Zahid songs have transcended borders, earning recognition 
                  and establishing Mustafa Zahid as a beloved figure in South Asian music with millions 
                  of dedicated fans worldwide.
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
                Mustafa Zahid&apos;s music is characterized by soulful melodies, powerful emotions, and 
                exceptional vocal talent. Mustafa Zahid&apos;s ability to blend contemporary 
                sounds with traditional Pakistani music influences has created a distinctive 
                style that sets Mustafa Zahid&apos;s work apart. Mustafa Zahid songs showcase 
                a unique fusion of modern and traditional elements.
              </p>
              <p>
                With 100+ Mustafa Zahid songs in the discography, Mustafa Zahid has explored various 
                genres while maintaining a signature sound. From romantic ballads like &quot;Tu Phir Aao&quot; 
                to energetic performances, each Mustafa Zahid song showcases the versatility and depth 
                of Mustafa Zahid&apos;s musical talent. Mustafa Zahid&apos;s discography reflects 
                his evolution as an artist over two decades.
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
                As the lead vocalist of <strong className="text-red-400">Roxen</strong>, 
                Mustafa Zahid has been instrumental in shaping the band&apos;s sound and 
                success. Mustafa Zahid Roxen collaboration has made Roxen one of Pakistan&apos;s most recognized music 
                groups, known for their powerful performances and memorable Mustafa Zahid songs.
              </p>
              <p>
                Mustafa Zahid&apos;s collaboration with Roxen has produced numerous hit tracks that have 
                become anthems for music lovers across Pakistan and the South Asian region. 
                Mustafa Zahid Roxen band&apos;s music continues to inspire and entertain audiences worldwide, 
                with Mustafa Zahid&apos;s distinctive voice being the hallmark of the band&apos;s success.
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
                Mustafa Zahid is available for live performances at weddings, mehndi nights, concerts, 
                corporate events, and private celebrations in Lahore and across Pakistan. 
                Book Mustafa Zahid for your event and experience years of musical excellence and professionalism 
                that Mustafa Zahid brings to every performance.
              </p>
              <p>
                To book Mustafa Zahid for live performances, contact us via WhatsApp at{" "}
                <a 
                  href="https://wa.me/+923224071299" 
                  className="text-red-400 hover:text-red-300 active:text-red-200 font-medium break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +92 322 407 1299
                </a>
                . Our team handles all Mustafa Zahid booking inquiries, availability checks, and 
                event coordination to ensure a seamless experience when you book Mustafa Zahid.
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

