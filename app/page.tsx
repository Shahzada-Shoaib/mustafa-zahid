'use client';
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ClientReviews from "@/components/sections/ClientReviews";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Ensure client-side only execution
    if (typeof window !== "undefined") {
      // Defer state updates to avoid synchronous setState warning
      const initState = () => {
        setIsMounted(true);
        setScrollY(window.scrollY);
      };

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(initState);

      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Handle ESC key for lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedImage]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Structured data moved to server-side (in JSX below)


  const songs = [
    {
      title: "Tu Phir Aao",
      description: "A beautiful romantic melody",
      year: "2010",
      image: "mz-pic-3.JPG",
      youtubeUrl:
        "https://www.youtube.com/watch?v=XHFn4ofMS5I&list=RDXHFn4ofMS5I&rco=1",
    },
    {
      title: "Tera Mera Rishta Purana",
      description: "A timeless classic",
      year: "2008",
      image: "mz-pic-4.JPG",
      youtubeUrl:
        "https://www.youtube.com/watch?v=0J0HZrDvbjY&list=RD0J0HZrDvbjY&start_radio=1",
    },
    {
      title: "Bhula Dena Mje",
      description: "An emotional heartfelt song",
      year: "2005",
      image: "mz-pic-5.jpg",
      youtubeUrl:
        "https://www.youtube.com/watch?v=g8LEktKv9hs&list=RDg8LEktKv9hs&rco=1",
    },
    {
      title: "Zarorat",
      description: "One of the most beloved tracks",
      year: "2013",
      image: "mz-pic-6.jpg",
      youtubeUrl:
        "https://www.youtube.com/watch?v=VMEXKJbsUmE&list=PLW5kSXGjYPCW9dU2ynegjiNxypWTsO5Fp",
    },
    {
      title: "Hum Jee Lenge",
      description: "A powerful emotional song",
      year: "2012",
      image: "mz-pic-7.jpg",
      youtubeUrl:
        "https://www.youtube.com/watch?v=WYtmISG_piI&list=PLW5kSXGjYPCW9dU2ynegjiNxypWTsO5Fp&index=12",
    },
    {
      title: "Kaisey Jiyen",
      description: "Soulful and moving composition",
      year: "2011",
      image: "mz-pic-10.jpg",
      youtubeUrl:
        "https://www.youtube.com/watch?v=0fpAWekduJ8&list=PLW5kSXGjYPCW9dU2ynegjiNxypWTsO5Fp&index=18",
    },
  ];

  const galleryImages = [
    {
      src: "/mz-pic-9.jpg",
      alt: "Mustafa Zahid Portrait - Thoughtful Expression",
      category: "Portrait",
    },
    {
      src: "/mz-pic-10.jpg",
      alt: "Mustafa Zahid Portrait - Serious Expression",
      category: "Portrait",
    },
    {
      src: "/mz-pic-11.jpg",
      alt: "Mustafa Zahid in Recording Studio",
      category: "Studio",
    },
    {
      src: "/mz-pic-12.jpg",
      alt: "Mustafa Zahid Live Performance on Stage",
      category: "Live",
    },
    {
      src: "/Mz-pic.jpg",
      alt: "Mustafa Zahid Stage Performance with Microphone",
      category: "Live",
    },
    {
      src: "/mz-pic-2.JPG",
      alt: "Mustafa Zahid Concert Performance",
      category: "Concert",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mustafa Zahid",
    "jobTitle": "Singer, Songwriter",
    "description": "Pakistani singer, songwriter, and lead vocalist of Roxen with over 20 years of experience",
    "url": "https://mustafazahid.com",
    "image": "https://mustafazahid.com/mz-logo.png",
    "sameAs": [
      "https://www.facebook.com/OfficialMustafaZahid/",
      "https://www.instagram.com/mustafazahids/",
      "https://www.youtube.com/channel/UCLdxVW6ThAB8k5YwiF7MD9w",
      "https://x.com/Mustafology"
    ],
    "knowsAbout": ["Music", "Singing", "Songwriting", "Live Performance", "Pakistani Music"],
    "memberOf": {
      "@type": "MusicGroup",
      "name": "Roxen"
    },
    "award": "Award-winning Pakistani vocalist",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Professional Singer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Pakistan"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Custom Cursor Effect - Hidden on mobile */}
      <style jsx global>{`
        :root {
          --color-primary: #dc2626;
          --color-primary-light: #ef4444;
          --color-primary-dark: #991b1b;
          --color-gold: #d4af37;
          --color-cream: #f5f0e6;
        }

        * {
          font-family: var(--font-outfit), sans-serif;
        }

        .font-display {
          font-family: var(--font-playfair-display), serif;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-music-note {
          animation: music-note-float 3s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .animate-sound-wave {
          animation: sound-wave 1.5s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
          will-change: transform;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }

        @keyframes music-note-float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
        }

        @keyframes sound-wave {
          0%,
          100% {
            transform: scaleY(0.3);
            opacity: 0.5;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(220,38,38,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.08)_0%,_transparent_50%)]"></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[120px]"></div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        ></div>

        {/* Animated Musical Notes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-music-note"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
            aria-hidden="true"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="text-red-500/30"
              aria-hidden="true"
            >
              <path
                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}

        {/* Animated Sound Waves */}
        <div
          className="absolute bottom-20 left-10 flex items-end gap-1 h-20"
          aria-hidden="true"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-red-500/40 rounded-t animate-sound-wave"
              style={{
                height: `${20 + i * 15}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute top-32 right-16 flex items-end gap-1 h-16"
          aria-hidden="true"
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-amber-500/30 rounded-t animate-sound-wave"
              style={{
                height: `${15 + i * 12}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 md:pt-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12 lg:pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div
              className={`pt-4 sm:pt-8 lg:pt-12 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left ${
                isMounted ? "animate-slide-in-left" : ""
              }`}
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] sm:leading-[0.9]">
                <span className="inline text-white">Mustafa </span>
                <span className="inline text-gradient">Zahid</span>
              </h1>

              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-lg leading-relaxed mx-auto lg:mx-0 space-y-3 sm:space-y-4">
                <p>
                  Mustafa Zahid is one of Pakistan&apos;s most celebrated vocalists, known for blending 
                  soulful melodies with powerful emotions. With over 20 years of 
                  experience and 100+ Mustafa Zahid songs, Mustafa Zahid has captivated audiences 
                  across South Asia and beyond. Mustafa Zahid&apos;s music career spans two decades, 
                  establishing him as the lead vocalist of Roxen and a prominent figure in Pakistani music.
                </p>
                <p>
                  Book Mustafa Zahid for live performances at{" "}
                  <strong className="text-white">
                    weddings, mehndi nights, concerts, corporate events, and
                    private performances in Lahore
                  </strong>
                  . Reserve your dates now to experience unforgettable Mustafa Zahid concerts 
                  and award-winning musical performances by one of Pakistan&apos;s finest vocalists.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="https://wa.me/+923224071299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm sm:text-base font-semibold hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-800 transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 hover:scale-105 active:scale-95 min-h-[48px] touch-manipulation"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Book Now</span>
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

              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 border-t border-white/10">
                {[
                  { value: "100+", label: "Songs" },
                  { value: "50M+", label: "Streams" },
                  { value: "20+", label: "Years" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/70 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero Image */}
            <div
              className={`relative mt-6 sm:mt-8 lg:mt-0 ${
                isMounted ? "animate-slide-in-right" : ""
              }`}
            >
              <div className="relative w-full aspect-[4/5] max-w-sm sm:max-w-md mx-auto">
                {/* Decorative Elements - Hidden on mobile */}
                <div
                  className="hidden sm:block absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 border border-red-500/30 rounded-full animate-rotate-slow"
                  aria-hidden="true"
                ></div>
                <div
                  className="hidden sm:block absolute -bottom-8 -left-8 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-xl"
                  aria-hidden="true"
                ></div>

                {/* Animated Vinyl Record - Smaller on mobile */}
                <div
                  className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-16 h-16 sm:w-24 sm:h-24 z-30 animate-rotate-slow hidden sm:block"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-red-500/40"
                    aria-hidden="true"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="50" cy="50" r="12" fill="currentColor" />
                    <circle cx="50" cy="50" r="6" fill="#0a0a0a" />
                    {[...Array(8)].map((_, i) => (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2={50 + 35 * Math.cos((i * Math.PI) / 4)}
                        y2={50 + 35 * Math.sin((i * Math.PI) / 4)}
                        stroke="currentColor"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}
                  </svg>
                </div>

                {/* Main Image Container */}
                <div className="relative lg:mt-12 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse-glow">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
                  <Image
                    src="/Mz-pic.jpg"
                    alt="Mustafa Zahid performing live - Book Pakistani singer and Roxen vocalist for concerts and events in Lahore"
                    fill
                    className="object-cover"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Animated Sound Waves Overlay - Hidden on mobile */}
                  <div
                    className="hidden sm:flex absolute bottom-20 left-4 items-end gap-1 h-12 z-20 opacity-60"
                    aria-hidden="true"
                  >
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-500 rounded-t animate-sound-wave"
                        style={{
                          height: `${10 + i * 8}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Badge with Animation - Smaller on mobile */}
                <div className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-2 sm:py-3 glass-card rounded-full flex items-center gap-2 sm:gap-3 z-20 animate-bounce-in">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-wider">
                      Now Playing
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-white">
                      Bhula Dena
                    </div>
                  </div>
                  {/* Animated Music Note */}
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 animate-music-note ml-1 sm:ml-2"
                    style={{ animationDelay: "0.5s" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>

                {/* Floating Music Notes - Hidden on mobile */}
                <div
                  className="hidden sm:block absolute -top-16 left-1/4 animate-music-note"
                  style={{ animationDelay: "1s" }}
                  aria-hidden="true"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-red-500/40"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div
                  className="hidden sm:block absolute -bottom-20 right-1/4 animate-music-note"
                  style={{ animationDelay: "1.5s" }}
                  aria-hidden="true"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-amber-500/40"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-2"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/70 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section with Sticky Layout */}
      <section id="about" className="relative py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Mobile Image - Shown only on mobile/tablet */}
            <div className="lg:hidden mb-6 sm:mb-8">
              <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <Image
                  src="/mz-pic-2.JPG"
                  alt="Mustafa Zahid in recording studio - Professional Pakistani singer and songwriter available for booking"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Sticky Image Column - Desktop only */}
            <div className="hidden lg:block lg:h-screen lg:sticky lg:top-0">
              <div className="h-full overflow-hidden rounded-4xl flex items-center py-12 lg:py-16">
                <div className="relative w-full aspect-[2/3] rounded-4xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <Image
                    src="/mz-pic-2.JPG"
                    alt="Mustafa Zahid in recording studio - Professional Pakistani singer and songwriter available for booking"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>
              {/* Decorative Text */}
              <div className="absolute bottom-2 left-8 z-20">
                <span className="text-9xl font-display font-bold text-white/25">
                  MZ
                </span>
              </div>
            </div>

            {/* Scrolling Content Column */}
            <div className="py-4 sm:py-6 lg:py-4 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Section Header */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
                  About Mustafa Zahid
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Mustafa Zahid: A Voice That
                  <br />
                  <span className="text-gradient">Moves Souls</span>
                </h2>
              </div>

              {/* Bio Cards */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover-lift">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        The Journey
                      </h3>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                        Mustafa Zahid is a renowned Pakistani singer, songwriter, and musician, 
                        best known as the lead vocalist of the band{" "}
                        <span className="text-red-400 font-medium">Roxen</span>. 
                        Starting his career in the early 2000s, Mustafa Zahid has 
                        released numerous hit Mustafa Zahid songs and albums, establishing 
                        himself as a prominent figure in the Pakistani music industry. Mustafa Zahid&apos;s 
                        journey with Roxen has made him one of the most recognized voices in Pakistani music.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover-lift">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-600/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        Musical Legacy
                      </h3>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                        Mustafa Zahid&apos;s music blends contemporary sounds with traditional
                        influences, creating a unique style that resonates with
                        listeners of all ages. Through powerful vocals and 
                        meaningful lyrics, Mustafa Zahid has contributed
                        significantly to the Pakistani music industry, 
                        earning recognition and awards for exceptional work. Mustafa Zahid songs 
                        like &quot;Tu Phir Aao&quot; and &quot;Tera Mera Rishta Purana&quot; have become timeless classics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover-lift">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        Global Impact
                      </h3>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                        Through work with Roxen and as a solo artist, Mustafa Zahid 
                        continues to inspire and entertain music lovers
                        worldwide. Mustafa Zahid songs have transcended borders, making
                        Mustafa Zahid a beloved figure in South Asian music with 
                        millions of streams and dedicated fans globally. Mustafa Zahid&apos;s 
                        impact extends beyond Pakistan, with fans across South Asia and beyond.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 sm:mt-12">
          <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              Explore More
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="/about"
                className="text-white/80 hover:text-red-400 active:text-red-300 transition-colors text-sm font-medium py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation"
              >
                Learn More About Mustafa Zahid →
              </a>
              <a
                href="/music-classes"
                className="text-white/80 hover:text-red-400 active:text-red-300 transition-colors text-sm font-medium py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation"
              >
                Music Classes in Lahore →
              </a>
              <a
                href="/singers"
                className="text-white/80 hover:text-red-400 active:text-red-300 transition-colors text-sm font-medium py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation"
              >
                Book Other Singers →
              </a>
              <a
                href="/qawwals"
                className="text-white/80 hover:text-red-400 active:text-red-300 transition-colors text-sm font-medium py-2 sm:py-0 min-h-[44px] sm:min-h-0 flex items-center touch-manipulation"
              >
                Book Qawwali Artists →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section with Sticky Header */}
      <section
        id="music"
        className="relative bg-gradient-to-b from-transparent via-red-950/20 to-transparent overflow-hidden py-8 sm:py-12 lg:py-16"
      >
        {/* Animated Sound Waves Background - Hidden on mobile */}
        <div
          className="hidden sm:flex absolute top-20 left-10 items-end gap-1 h-24 opacity-20"
          aria-hidden="true"
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-red-500 rounded-t animate-sound-wave"
              style={{
                height: `${15 + i * 12}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <div
          className="hidden sm:flex absolute bottom-20 right-16 items-end gap-1 h-20 opacity-20"
          aria-hidden="true"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-amber-500 rounded-t animate-sound-wave"
              style={{
                height: `${20 + i * 15}px`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Music Notes - Hidden on mobile */}
        <div
          className="hidden sm:block absolute top-1/4 right-20 animate-music-note"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-500/20"
            aria-hidden="true"
          >
            <path
              d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Sticky Section Header */}
        <div className="sticky z-30 py-4 sm:py-6 bg-black/80 backdrop-blur-xl border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div>
                  <span className="text-red-500 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-medium">
                    Discography
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Popular Songs by Mustafa Zahid
                  </h2>
                </div>
                {/* Animated Music Icon */}
                <div className="hidden md:block animate-bounce-in">
                  <svg
                    className="w-8 h-8 text-red-500/50"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0013 13c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Songs Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-5">
            {songs.map((song, index) => (
              <a
                key={index}
                href={song.youtubeUrl || undefined}
                target={song.youtubeUrl ? "_blank" : undefined}
                rel={song.youtubeUrl ? "noopener noreferrer" : undefined}
                className="group glass-card rounded-xl sm:rounded-2xl overflow-hidden hover-lift cursor-pointer block animate-bounce-in touch-manipulation"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={!song.youtubeUrl ? (e) => e.preventDefault() : undefined}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/${song.image}`}
                    alt={`${song.title} by Mustafa Zahid - Popular Pakistani song available for live performance booking`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 sm:group-active:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform shadow-2xl">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>

                  {/* YouTube Badge for Latest Songs */}
                  {song.youtubeUrl && (
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white font-medium flex items-center gap-1">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      Latest
                    </div>
                  )}

                  {/* Year Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white/80">
                    {song.year}
                  </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-red-400 transition-colors mb-2">
                    {song.title}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm">{song.description}</p>

                  {/* YouTube Link Button */}
                  {song.youtubeUrl && (
                    <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      Watch on YouTube
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000 ease-out"></div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section with Sticky Header */}
      <section id="gallery" className="relative py-8 sm:py-12">
        {/* Sticky Section Header */}
        <div className="sticky top-0 sm:top-6 z-30 py-3 sm:py-4 bg-black/80 backdrop-blur-xl border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-red-500 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-medium">
                  Visual Journey
                </span>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Gallery
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 sm:pt-6 lg:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img.src)}
                className={`group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover-lift touch-manipulation ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(img.src);
                  }
                }}
                aria-label={`View ${img.alt} in full size`}
              >
                <div className={`relative aspect-[4/5]`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105 rounded-xl sm:rounded-2xl"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 sm:group-active:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 sm:group-active:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 sm:group-active:translate-y-0 rounded-xl sm:rounded-2xl">
                    <span className="text-red-400 text-xs sm:text-sm uppercase tracking-wider mb-2">
                      {img.category}
                    </span>
                    <p className="text-white text-sm sm:text-base font-medium">
                      {img.alt.split(" - ")[1]}
                    </p>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 sm:group-active:opacity-100 transition-all">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10 min-h-[44px] touch-manipulation"
            aria-label="Close lightbox"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="relative max-w-7xl max-h-[95vh] sm:max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Gallery image full size"
              fill
              className="object-contain"
              sizes="95vw"
            />
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-black/50"></div>

        {/* Animated Musical Elements - Hidden on mobile */}
        <div
          className="hidden sm:block absolute top-20 right-20 animate-music-note"
          style={{ animationDelay: "0.5s" }}
          aria-hidden="true"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="text-red-500/20"
            aria-hidden="true"
          >
            <path
              d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div
          className="hidden sm:block absolute bottom-32 left-16 animate-music-note"
          style={{ animationDelay: "1.5s" }}
          aria-hidden="true"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            className="text-amber-500/20"
            aria-hidden="true"
          >
            <path
              d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-2"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Sound Waves - Hidden on mobile */}
        <div
          className="hidden sm:flex absolute top-1/2 right-10 items-end gap-1 h-16 opacity-20"
          aria-hidden="true"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-red-500 rounded-t animate-sound-wave"
              style={{
                height: `${12 + i * 10}px`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 items-start lg:items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-slide-in-left">
              <div>
                <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
                  Get In Touch
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 sm:mt-4 leading-tight">
                  Let&apos;s Create
                  <br />
                  <span className="text-gradient">Together</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-lg">
                For Mustafa Zahid bookings, collaborations, or inquiries, reach out through
                the following channels. Book Mustafa Zahid for your event and experience 
                music that resonates with audiences worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <a 
                  href="mailto:contact@mustafazahid.com" 
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 glass-card rounded-xl hover:bg-white/10 active:bg-white/15 transition-all group min-h-[64px] touch-manipulation"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm text-white/70">Email</div>
                    <div className="text-sm sm:text-base text-white font-medium break-all">contact@mustafazahid.com</div>
                  </div>
                </a>

                <a
                  href="tel:+923224071299"
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-6 glass-card rounded-xl hover:bg-white/10 active:bg-white/15 transition-all group min-h-[64px] touch-manipulation"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:text-white transition-colors"
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
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-white/70">Phone</div>
                    <div className="text-sm sm:text-base text-white font-medium">
                      +92 322 407 1299
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right - Social Links & CTA */}
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 animate-slide-in-right relative overflow-hidden">
              {/* Animated Vinyl Record Decoration - Hidden on mobile */}
              <div
                className="hidden sm:block absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 opacity-10 animate-rotate-slow"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-red-500"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="50" cy="50" r="15" fill="currentColor" />
                  <circle cx="50" cy="50" r="8" fill="#0a0a0a" />
                </svg>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 relative z-10">
                Connect on Social
              </h3>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-6">
                {[
                  {
                    name: "Facebook",
                    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    color: "bg-blue-600 hover:bg-blue-500",
                    url: "https://www.facebook.com/OfficialMustafaZahid/",
                  },
                  {
                    name: "Instagram",
                    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                    color:
                      "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400",
                    url: "https://www.instagram.com/mustafazahids/?hl=en",
                  },
                  {
                    name: "YouTube",
                    icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                    color: "bg-red-600 hover:bg-red-500",
                    url: "https://www.youtube.com/channel/UCLdxVW6ThAB8k5YwiF7MD9w",
                  },
                  {
                    name: "Twitter",
                    icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                    color: "bg-sky-500 hover:bg-sky-400",
                    url: "https://x.com/Mustafology",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 lg:p-6 rounded-xl ${social.color} transition-all hover:scale-105 active:scale-95 hover:shadow-lg min-h-[56px] sm:min-h-[64px] touch-manipulation`}
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                    <span className="text-white text-sm sm:text-base font-medium">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="pt-6 sm:pt-8 lg:pt-10 border-t border-white/10">
                <h4 className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">
                  Subscribe for Updates
                </h4>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                      setEmailStatus("error");
                      return;
                    }

                    try {
                      setEmailStatus("idle");
                      const response = await fetch('/api/newsletter', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      });

                      if (response.ok) {
                        setEmailStatus("success");
                        setEmail("");
                        setTimeout(() => setEmailStatus("idle"), 5000);
                      } else {
                        setEmailStatus("error");
                      }
                    } catch (error) {
                      console.error('Newsletter subscription error:', error);
                      setEmailStatus("error");
                    }
                  }}
                  className="space-y-2"
                >
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailStatus("idle");
                      }}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors"
                      aria-label="Email address for newsletter subscription"
                    />
                    <button
                      type="submit"
                      className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 active:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[48px] min-h-[44px] touch-manipulation"
                      aria-label="Subscribe to newsletter"
                    >
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                  {emailStatus === "success" && (
                    <p className="text-sm text-green-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Thank you! You&apos;ve been subscribed.
                    </p>
                  )}
                  {emailStatus === "error" && (
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Please enter a valid email address.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
              Common Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 sm:mt-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {[
              {
                q: "How can I book Mustafa Zahid for an event?",
                a: "You can book Mustafa Zahid for live performances by contacting us via WhatsApp at +92 322 407 1299. We handle Mustafa Zahid bookings for weddings, concerts, corporate events, and private performances across Pakistan. Our team will assist you with Mustafa Zahid&apos;s availability, pricing, and all booking details.",
              },
              {
                q: "What is the booking price for Mustafa Zahid events?",
                a: "Mustafa Zahid booking prices vary depending on the event type, location, duration, and technical requirements. For accurate pricing and Mustafa Zahid&apos;s availability, please contact us directly via WhatsApp at +92 322 407 1299. We provide transparent pricing and work with you to create a package that fits your budget for booking Mustafa Zahid.",
              },
              {
                q: "Is Mustafa Zahid available for weddings in Lahore?",
                a: "Yes, Mustafa Zahid is available for wedding bookings in Lahore and across Pakistan. Whether it's a mehndi night, wedding ceremony, or reception, we can arrange Mustafa Zahid live performances. Contact us to discuss your specific requirements and preferred dates for booking Mustafa Zahid.",
              },
              {
                q: "Can I book Mustafa Zahid for corporate events?",
                a: "Absolutely! Mustafa Zahid is available for corporate events, product launches, company celebrations, and business gatherings. We provide professional sound systems and can customize Mustafa Zahid&apos;s performance to match your event theme and requirements.",
              },
              {
                q: "How far in advance should I book?",
                a: "We recommend booking at least 2-3 months in advance, especially for popular dates and wedding seasons. However, we also accommodate last-minute bookings subject to availability. Contact us to check current availability for your preferred dates.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover-lift"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {faq.q}
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <ClientReviews />

      {/* Last Updated & E-A-T Signals */}
      <section className="relative py-6 sm:py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center text-white/50 text-xs sm:text-sm space-y-2">
            <p>
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p>
              Official website of Mustafa Zahid - Pakistani singer, songwriter, and lead vocalist of Roxen
            </p>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 active:bg-red-700 transition-all transform hover:scale-110 active:scale-95 shadow-2xl shadow-red-900/50 touch-manipulation ${
          isMounted && scrollY > 500
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Footer */}

      <Footer />
    </div>
  );
}
