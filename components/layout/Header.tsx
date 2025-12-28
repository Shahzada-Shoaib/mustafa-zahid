"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [musicClassesDropdownOpen, setMusicClassesDropdownOpen] =
    useState(false);
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

  const musicClasses = [
    {
      href: "/music-classes/guitar-classes-in-lahore",
      label: "Guitar Classes",
    },
    { href: "/music-classes/singing-classes-in-lahore", label: "Singing Classes" },
    { href: "/music-classes/piano-classes-in-lahore", label: "Piano Classes" },
    {
      href: "/music-classes/guitar-classes-at-home-in-lahore",
      label: "Guitar Classes at Home",
    },
    {
      href: "/music-classes/singing-classes-at-home-in-lahore",
      label: "Singing Classes at Home",
    },
    {
      href: "/music-classes/piano-classes-at-home-in-lahore",
      label: "Piano Classes at Home",
    },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/singers", label: "Singers" },
    { href: "/qawwals", label: "Qawwals" },
    // { href: "/blog", label: "Blog" },
  ];

  return (
    //Commented code is
    <nav
      className={`my-4 fixed top-0 w-full z-50 transition-all duration-500 ${
        isMounted && scrollY > 50
          ? "backdrop-blur-xl py-0.5 sm:py-1 rounded-4xl"
          : "bg-transparent py-1 sm:py-1.5"
      }`}
    >
      {/* <nav className={`fixed top-0 w-full z-50 transition-all duration-500 'bg-black/90 backdrop-blur-xl py-0.5 sm:py-1'}`}> */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <div className="w-20 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
              <Image
                src="/mz-logo.png"
                alt="Mustafa Zahid Logo"
                width={120} // original image width
                height={120} // original image height
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
            // onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);

              // header ko black karne ke liye
              setScrollY(100);
            }}
            className="md:hidden p-2 sm:p-2.5 text-white hover:text-red-500 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="w-8 h-8 sm:w-6 sm:h-6"
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
                className="w-8 h-8 sm:w-6 sm:h-6"
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
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen
              ? "max-h-[600px] opacity-100 mt-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 py-4 border-t border-white/10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
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
                className="w-full px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium flex items-center justify-between"
              >
                <span>Music Classes</span>
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
                <div className="pl-4 mt-2 space-y-1">
                  {musicClasses.map((classItem) => (
                    <Link
                      key={classItem.href}
                      href={classItem.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileMenuOpen(false);
                        setMusicClassesDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
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
                className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/+923224071299"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm uppercase tracking-wider rounded-full hover:from-red-500 hover:to-red-600 transition-all mt-2"
            >
              <span>Book Now</span>
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
