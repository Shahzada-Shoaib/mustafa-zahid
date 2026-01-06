"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export default function MusicClassesPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Add structured data (JSON-LD) for SEO
  useEffect(() => {
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

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'music-classes-structured-data';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('music-classes-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Add canonical link for music classes page
  useEffect(() => {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://mustafazahid.com/music-classes');
  }, []);

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Music Education
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Professional <span className="text-gradient">Music Classes</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Choose from our range of music classes - Guitar, Singing, Piano. 
              Available both at our studio and at your home.
            </p>
          </div>
        </div>
      </section>

      {/* Dropdown Navigation */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex justify-center">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-6 py-4 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors font-semibold"
              >
                <span>Select Music Class</span>
                <svg
                  className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50">
                  {classes.map((classItem, index) => (
                    <Link
                      key={index}
                      href={classItem.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                    >
                      <div className="font-semibold text-white mb-1">{classItem.title}</div>
                      <div className="text-sm text-white/70">{classItem.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {classes.map((classItem, index) => (
              <Link
                key={index}
                href={classItem.href}
                className="group glass-card rounded-2xl p-6 lg:p-8 hover-lift block"
              >
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {classItem.title}
                </h3>
                <p className="text-white/70 mb-4">{classItem.description}</p>
                <div className="flex items-center gap-2 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                  <span>Learn More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

