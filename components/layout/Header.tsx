"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface MusicClass {
  href: string;
  label: string;
}

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [musicClassesDropdownOpen, setMusicClassesDropdownOpen] =
    useState(false);
  const [musicClasses, setMusicClasses] = useState<MusicClass[]>([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initState = () => {
        setIsMounted(true);
        setScrollY(window.scrollY);
      };

      requestAnimationFrame(initState);

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrollY(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Only handle desktop dropdown, ignore mobile menu clicks
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        // Don't close if clicking inside mobile dropdown
        if (
          mobileDropdownRef.current &&
          !mobileDropdownRef.current.contains(target)
        ) {
          setMusicClassesDropdownOpen(false);
        }
      }
    };

    if (musicClassesDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [musicClassesDropdownOpen]);

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setClassesLoading(true);
        const response = await fetch('/api/classes');
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          // Format data for header dropdown
          const formattedClasses = result.data.map((classItem: any) => ({
            href: classItem.href || `/music-classes/${classItem.slug}`,
            label: classItem.label || classItem.title,
          }));
          setMusicClasses(formattedClasses);
        } else {
          // Fallback to empty array if fetch fails
          setMusicClasses([]);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
        setMusicClasses([]);
      } finally {
        setClassesLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/singers", label: "Singers" },
    { href: "/qawwals", label: "Qawwals" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav
      className={`my-2 sm:my-4 fixed top-0 w-full z-50 transition-all duration-500 ${
        isMounted && scrollY > 50
          ? "backdrop-blur-xl bg-black/80 py-1 sm:py-1.5 md:py-0.5 md:rounded-4xl"
          : "bg-transparent py-1 sm:py-1.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12 py-2 sm:py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <div className="w-16 sm:w-20 md:max-w-[100px] lg:max-w-[120px]">
              <Image
                src="/mz-logo.png"
                alt="Mustafa Zahid Logo"
                width={120}
                height={120}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </Link>

            {/* Music Classes Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() =>
                  setMusicClassesDropdownOpen(!musicClassesDropdownOpen)
                }
                className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group flex items-center gap-1"
              >
                Music Classes
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    musicClassesDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {musicClassesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                  {musicClasses.map((classItem) => (
                    <Link
                      key={classItem.href}
                      href={classItem.href}
                      onClick={() => setMusicClassesDropdownOpen(false)}
                      className="block px-6 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0 text-white/80 hover:text-white text-sm"
                    >
                      {classItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <a
            href="https://wa.me/+923224071299"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold uppercase tracking-wider rounded-full hover:from-red-500 hover:to-red-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-900/30"
          >
            <span>Book Now</span>
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if (!mobileMenuOpen) {
                setScrollY(100);
              }
            }}
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-red-500 active:text-red-400 transition-colors touch-manipulation"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "max-h-[700px] opacity-100 mt-3 sm:mt-4"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex flex-col gap-1 sm:gap-2 py-3 sm:py-4 border-t border-white/10 bg-black/60 backdrop-blur-md rounded-b-2xl">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 sm:py-2.5 text-white/90 hover:text-white active:text-white hover:bg-white/10 active:bg-white/15 rounded-lg transition-colors text-base sm:text-sm font-medium min-h-[44px] flex items-center touch-manipulation"
            >
              Home
            </Link>

            {/* Music Classes Mobile Dropdown */}
            <div ref={mobileDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMusicClassesDropdownOpen(!musicClassesDropdownOpen);
                }}
                className="w-full px-4 py-3 sm:py-2.5 text-white/90 hover:text-white active:text-white hover:bg-white/10 active:bg-white/15 rounded-lg transition-colors text-base sm:text-sm font-medium flex items-center justify-between min-h-[44px] touch-manipulation"
              >
                <span>Music Classes</span>
                <svg
                  className={`w-5 h-5 sm:w-4 sm:h-4 transition-transform ${
                    musicClassesDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {musicClassesDropdownOpen && (
                <div className="pl-4 sm:pl-6 mt-1 sm:mt-2 space-y-1">
                  {musicClasses.map((classItem) => (
                    <Link
                      key={classItem.href}
                      href={classItem.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                        setMusicClassesDropdownOpen(false);
                      }}
                      className="block px-4 py-2.5 sm:py-2 text-white/70 hover:text-white active:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors text-sm sm:text-xs min-h-[40px] flex items-center touch-manipulation"
                    >
                      {classItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 sm:py-2.5 text-white/90 hover:text-white active:text-white hover:bg-white/10 active:bg-white/15 rounded-lg transition-colors text-base sm:text-sm font-medium min-h-[44px] flex items-center touch-manipulation"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 sm:py-2.5 text-white/90 hover:text-white active:text-white hover:bg-white/10 active:bg-white/15 rounded-lg transition-colors text-base sm:text-sm font-medium min-h-[44px] flex items-center touch-manipulation"
            >
              Dashboard
            </Link>
            <a
              href="https://wa.me/+923224071299"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm sm:text-xs uppercase tracking-wider rounded-full hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-800 transition-all mt-2 sm:mt-3 min-h-[48px] touch-manipulation font-semibold"
            >
              <span>Book Now</span>
              <svg
                className="w-4 h-4 sm:w-3.5 sm:h-3.5"
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
    </nav>
  );
}
