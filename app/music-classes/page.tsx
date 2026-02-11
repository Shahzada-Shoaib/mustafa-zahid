"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default function MusicClassesPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Structured data moved to server-side (in JSX below)


  const classes = [
    {
      title: "Guitar Classes",
      href: "/music-classes/guitar-classes",
      description: "Learn guitar from professional instructors",
    },
    {
      title: "Singing Classes",
      href: "/music-classes/singing-classes",
      description: "Master vocal techniques and singing",
    },
    {
      title: "Piano Classes",
      href: "/music-classes/piano-classes",
      description: "Learn piano and keyboard skills",
    },
    {
      title: "Guitar Classes at Home",
      href: "/music-classes/guitar-classes-at-home",
      description: "Private guitar lessons at your home",
    },
    {
      title: "Singing Classes at Home",
      href: "/music-classes/singing-classes-at-home",
      description: "Personalized singing lessons at home",
    },
    {
      title: "Piano Classes at Home",
      href: "/music-classes/piano-classes-at-home",
      description: "One-on-one piano lessons at home",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Music Classes in Lahore",
    "description": "Professional music classes in Lahore - Guitar, Singing, and Piano. Available at studio or at home. Learn from expert instructors.",
    "url": "https://mustafazahid.com/music-classes",
    "image": "https://mustafazahid.com/mz-logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressCountry": "PK"
    },
    "offers": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Guitar Classes",
          "description": "Learn guitar from professional instructors"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Singing Classes",
          "description": "Master vocal techniques and singing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Piano Classes",
          "description": "Learn piano and keyboard skills"
        }
      }
    ],
    "telephone": "+923224071299"
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <AnimatedBackground />
      <Header />
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
              Music Education
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
              Professional <span className="text-gradient">Music Classes</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4">
              Choose from our range of music classes - Guitar, Singing, Piano. 
              Available both at our studio and at your home.
            </p>
          </div>
        </div>
      </section>

      {/* Dropdown Navigation */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-center">
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-red-600 text-white rounded-xl hover:bg-red-500 active:bg-red-700 transition-colors font-semibold text-sm sm:text-base min-h-[48px] touch-manipulation"
              >
                <span>Select Music Class</span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:w-80 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50 max-h-[60vh] sm:max-h-none overflow-y-auto">
                  {classes.map((classItem, index) => (
                    <Link
                      key={index}
                      href={classItem.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 sm:px-6 py-3 sm:py-4 hover:bg-white/10 active:bg-white/15 transition-colors border-b border-white/5 last:border-b-0 min-h-[64px] sm:min-h-[72px] flex flex-col justify-center touch-manipulation"
                    >
                      <div className="font-semibold text-white mb-1 text-sm sm:text-base">{classItem.title}</div>
                      <div className="text-xs sm:text-sm text-white/70">{classItem.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {classes.map((classItem, index) => (
              <Link
                key={index}
                href={classItem.href}
                className="group glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 hover-lift block touch-manipulation"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-red-400 transition-colors">
                  {classItem.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base mb-3 sm:mb-4">{classItem.description}</p>
                <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm font-medium group-hover:text-red-300 transition-colors min-h-[32px] sm:min-h-[36px]">
                  <span>Learn More</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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

