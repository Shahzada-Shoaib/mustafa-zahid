"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsLoaded(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "music", "gallery", "contact"];
    const handleSectionChange = () => {
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleSectionChange);
    return () => window.removeEventListener("scroll", handleSectionChange);
  }, []);

  const songs = [
    { title: "Tum Hi Ho", description: "One of the most beloved tracks", year: "2013", image: "mustafa-zahid-stage-performance.jpg", youtubeUrl: "https://www.youtube.com/watch?v=VMEXKJbsUmE" },
    { title: "Tere Bina", description: "A soulful romantic ballad", year: "2010", image: "mustafa-zahid-live-performance.jpg", youtubeUrl: "https://www.youtube.com/watch?v=41E1VoaX5KE" },
    { title: "Aadat", description: "A powerful emotional song", year: "2005", image: "mustafa-zahid-concert-performance.jpg", youtubeUrl: "https://www.youtube.com/watch?v=g8LEktKv9hs" },
    { title: "Tere Bin", description: "Classic hit from Roxen", year: "2006", image: "mustafa-zahid-portrait-serious.jpg" },
    { title: "Dil Ki Baat", description: "Heartfelt melody", year: "2008", image: "mustafa-zahid-stage-performance.jpg" },
    { title: "Yaad", description: "Memorable composition", year: "2012", image: "mustafa-zahid-live-performance.jpg" },
  ];

  const galleryImages = [
    { src: "/mustafa-zahid-portrait-thoughtful.jpg", alt: "Mustafa Zahid Portrait - Thoughtful Expression", category: "Portrait" },
    { src: "/mustafa-zahid-portrait-serious.jpg", alt: "Mustafa Zahid Portrait - Serious Expression", category: "Portrait" },
    { src: "/mustafa-zahid-recording-studio.jpg", alt: "Mustafa Zahid in Recording Studio", category: "Studio" },
    { src: "/mustafa-zahid-live-performance.jpg", alt: "Mustafa Zahid Live Performance on Stage", category: "Live" },
    { src: "/mustafa-zahid-stage-performance.jpg", alt: "Mustafa Zahid Stage Performance with Microphone", category: "Live" },
    { src: "/mustafa-zahid-concert-performance.jpg", alt: "Mustafa Zahid Concert Performance", category: "Concert" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Custom Cursor Effect - Hidden on mobile */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        :root {
          --color-primary: #dc2626;
          --color-primary-light: #ef4444;
          --color-primary-dark: #991b1b;
          --color-gold: #d4af37;
          --color-cream: #f5f0e6;
        }
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.6); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-gradient { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
        .animate-music-note { animation: music-note-float 3s ease-in-out infinite; }
        .animate-sound-wave { animation: sound-wave 1.5s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
        
        @keyframes music-note-float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.8; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
        }
        
        @keyframes sound-wave {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        
        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--color-primary-light); }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(220,38,38,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.08)_0%,_transparent_50%)]"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[120px]"></div>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
        
        {/* Animated Musical Notes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-music-note"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-red-500/30">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/>
            </svg>
          </div>
        ))}
        
        {/* Animated Sound Waves */}
        <div className="absolute bottom-20 left-10 flex items-end gap-1 h-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-red-500/40 rounded-t animate-sound-wave"
              style={{
                height: `${20 + i * 15}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        
        <div className="absolute top-32 right-16 flex items-end gap-1 h-16">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-amber-500/30 rounded-t animate-sound-wave"
              style={{
                height: `${15 + i * 12}px`,
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-display text-xl font-bold group-hover:scale-110 transition-transform">
                MZ
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-display font-bold text-white">Mustafa</span>
                <span className="text-xl font-display font-bold text-red-500 ml-1">Zahid</span>
              </div>
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {["home", "about", "music", "gallery", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`relative px-5 py-2 text-sm uppercase tracking-widest transition-colors ${
                    activeSection === item ? 'text-red-500' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <a 
              href="https://wa.me/+923224071299" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm uppercase tracking-wider rounded-full hover:from-red-500 hover:to-red-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-900/30"
            >
              <span>Book Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isLoaded ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full relative">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-white/80 uppercase tracking-wider">Lead Vocalist of Roxen</span>
                {/* Animated Music Note */}
                <svg 
                  className="absolute -right-8 w-6 h-6 text-red-500/50 animate-music-note" 
                  style={{ animationDelay: '1s' }}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
              
              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9]">
                <span className="block text-white">Mustafa</span>
                <span className="block text-gradient">Zahid</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
                One of Pakistan's most celebrated voices, blending soulful melodies with powerful emotions. 
                Experience music that touches your heart.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/+923224071299" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0013 13c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                  <span>Listen Now</span>
                </a>
                <a 
                  href="#about" 
                  className="flex items-center gap-3 px-8 py-4 glass-card rounded-full font-medium text-white hover:bg-white/10 transition-all"
                >
                  <span>Discover More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-12 pt-8 border-t border-white/10">
                {[
                  { value: "100+", label: "Songs" },
                  { value: "50M+", label: "Streams" },
                  { value: "20+", label: "Years" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className={`relative ${isLoaded ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 border border-red-500/30 rounded-full animate-rotate-slow"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-xl"></div>
                
                {/* Animated Vinyl Record */}
                <div className="absolute -top-12 -right-12 w-24 h-24 z-30 animate-rotate-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-red-500/40">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="12" fill="currentColor"/>
                    <circle cx="50" cy="50" r="6" fill="#0a0a0a"/>
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
                <div className="relative w-full h-full rounded-3xl overflow-hidden animate-pulse-glow">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
                  <Image
                    src="/mustafa-zahid-portrait-thoughtful.jpg"
                    alt="Mustafa Zahid - Pakistani Singer and Lead Vocalist of Roxen"
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Animated Sound Waves Overlay */}
                  <div className="absolute bottom-20 left-4 flex items-end gap-1 h-12 z-20 opacity-60">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-500 rounded-t animate-sound-wave"
                        style={{
                          height: `${10 + i * 8}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating Badge with Animation */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 glass-card rounded-full flex items-center gap-3 z-20 animate-bounce-in">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">Now Playing</div>
                    <div className="text-sm font-medium text-white">Tum Hi Ho</div>
                  </div>
                  {/* Animated Music Note */}
                  <svg 
                    className="w-4 h-4 text-red-400 animate-music-note ml-2" 
                    style={{ animationDelay: '0.5s' }}
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                
                {/* Floating Music Notes */}
                <div className="absolute -top-16 left-1/4 animate-music-note" style={{ animationDelay: '1s' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-red-500/40">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="absolute -bottom-20 right-1/4 animate-music-note" style={{ animationDelay: '1.5s' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-amber-500/40">
                    <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-2" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section with Sticky Layout */}
      <section id="about" className="relative py-20 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20">
            {/* Sticky Image Column */}
            <div className="hidden lg:block lg:h-screen lg:sticky lg:top-0">
              <div className="h-full flex items-center py-20">
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <Image
                    src="/mustafa-zahid-recording-studio.jpg"
                    alt="Mustafa Zahid in Recording Studio"
                    fill
                    className="object-cover"
                  />
                  {/* Decorative Text */}
                  <div className="absolute bottom-8 left-8 z-20">
                    <span className="text-8xl font-display font-bold text-white/10">MZ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Content Column */}
            <div className="py-20 lg:py-40 space-y-20">
              {/* Section Header */}
              <div className="space-y-6">
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">About The Artist</span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  A Voice That<br />
                  <span className="text-gradient">Moves Souls</span>
                </h2>
              </div>

              {/* Bio Cards */}
              <div className="space-y-8">
                <div className="glass-card rounded-2xl p-8 hover-lift">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">The Journey</h3>
                      <p className="text-white/60 leading-relaxed">
                        Mustafa Zahid is a renowned Pakistani singer, songwriter, and musician, best known as the lead vocalist of the band <span className="text-red-400 font-medium">Roxen</span>. With his soulful voice and exceptional musical talent, he has captivated audiences across Pakistan and beyond.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-8 hover-lift">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Musical Legacy</h3>
                      <p className="text-white/60 leading-relaxed">
                        His music blends contemporary sounds with traditional influences, creating a unique style that resonates with listeners of all ages. Mustafa Zahid has contributed significantly to the Pakistani music industry with his powerful vocals and meaningful lyrics.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-8 hover-lift">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Global Impact</h3>
                      <p className="text-white/60 leading-relaxed">
                        Through his work with Roxen and as a solo artist, he continues to inspire and entertain music lovers worldwide. His songs have transcended borders, making him a beloved figure in South Asian music.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Awards/Achievements */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🏆", label: "Lux Style Awards" },
                  { icon: "🎵", label: "Best Male Singer" },
                  { icon: "🎸", label: "Best Rock Band" },
                  { icon: "💿", label: "Platinum Albums" },
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white/80 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section with Sticky Header */}
      <section id="music" className="relative bg-gradient-to-b from-transparent via-red-950/20 to-transparent overflow-hidden">
        {/* Animated Sound Waves Background */}
        <div className="absolute top-20 left-10 flex items-end gap-1 h-24 opacity-20">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-red-500 rounded-t animate-sound-wave"
              style={{
                height: `${15 + i * 12}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        
        <div className="absolute bottom-20 right-16 flex items-end gap-1 h-20 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-amber-500 rounded-t animate-sound-wave"
              style={{
                height: `${20 + i * 15}px`,
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating Music Notes */}
        <div className="absolute top-1/4 right-20 animate-music-note" style={{ animationDelay: '2s' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-red-500/20">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Sticky Section Header */}
        <div className="sticky top-16 z-30 py-6 bg-black/80 backdrop-blur-xl border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">Discography</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Popular Songs</h2>
                </div>
                {/* Animated Music Icon */}
                <div className="hidden md:block animate-bounce-in">
                  <svg className="w-8 h-8 text-red-500/50" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0013 13c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                  </svg>
                </div>
              </div>
              <a href="#" className="hidden md:flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors">
                <span className="text-sm">View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Songs Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song, index) => (
              <a
                key={index}
                href={song.youtubeUrl || "#"}
                target={song.youtubeUrl ? "_blank" : undefined}
                rel={song.youtubeUrl ? "noopener noreferrer" : undefined}
                className="group glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer block animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/${song.image}`}
                    alt={`${song.title} by Mustafa Zahid`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform shadow-2xl">
                      <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* YouTube Badge for Latest Songs */}
                  {song.youtubeUrl && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs text-white font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Latest
                    </div>
                  )}
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white/80">
                    {song.year}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors mb-2">{song.title}</h3>
                  <p className="text-white/50 text-sm">{song.description}</p>
                  
                  {/* YouTube Link Button */}
                  {song.youtubeUrl && (
                    <div className="mt-4 flex items-center gap-2 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
      <section id="gallery" className="relative">
        {/* Sticky Section Header */}
        <div className="sticky top-16 z-30 py-6 bg-black/80 backdrop-blur-xl border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">Visual Journey</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Gallery</h2>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {["All", "Portrait", "Live", "Studio"].map((cat, i) => (
                  <button 
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${i === 0 ? 'bg-red-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <div 
                key={index}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer hover-lift ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-[4/5]'}`}>
            <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <span className="text-red-400 text-sm uppercase tracking-wider mb-2">{img.category}</span>
                    <p className="text-white font-medium">{img.alt.split(' - ')[1]}</p>
                  </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 lg:py-32 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-black/50"></div>
        
        {/* Animated Musical Elements */}
        <div className="absolute top-20 right-20 animate-music-note" style={{ animationDelay: '0.5s' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-red-500/20">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="absolute bottom-32 left-16 animate-music-note" style={{ animationDelay: '1.5s' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-amber-500/20">
            <path d="M9 18V5l12-2v13M9 18c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-2" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Sound Waves */}
        <div className="absolute top-1/2 right-10 flex items-end gap-1 h-16 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-red-500 rounded-t animate-sound-wave"
              style={{
                height: `${12 + i * 10}px`,
                animationDelay: `${i * 0.12}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">Get In Touch</span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight">
                  Let's Create<br />
                  <span className="text-gradient">Together</span>
                </h2>
              </div>
              
              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                For bookings, collaborations, or inquiries, reach out through the following channels. 
                Let's make music that resonates.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <a href="mailto:contact@mustafazahid.com" className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <svg className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/50">Email</div>
                    <div className="text-white font-medium">contact@mustafazahid.com</div>
                  </div>
                </a>
                
                <a href="tel:+921234567890" className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-white/10 transition-all group">
                  <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    <svg className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-white/50">Phone</div>
                    <div className="text-white font-medium">+92 322 407 1299</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right - Social Links & CTA */}
            <div className="glass-card rounded-3xl p-8 lg:p-12 animate-slide-in-right relative overflow-hidden">
              {/* Animated Vinyl Record Decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-10 animate-rotate-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full text-red-500">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="15" fill="currentColor"/>
                  <circle cx="50" cy="50" r="8" fill="#0a0a0a"/>
                </svg>
              </div>
              
              <h3 className="font-display text-2xl font-bold text-white mb-8 relative z-10">Connect on Social</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { name: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", color: "bg-blue-600 hover:bg-blue-500", url: "https://www.facebook.com" },
                  { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", color: "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400", url: "https://www.instagram.com" },
                  { name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z", color: "bg-red-600 hover:bg-red-500", url: "https://www.youtube.com" },
                  { name: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", color: "bg-sky-500 hover:bg-sky-400", url: "https://www.twitter.com" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
            target="_blank"
            rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-xl ${social.color} transition-all hover:scale-105 hover:shadow-lg`}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                    <span className="text-white font-medium">{social.name}</span>
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="pt-8 border-t border-white/10">
                <h4 className="text-white font-medium mb-4">Subscribe for Updates</h4>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-all transform hover:scale-110 shadow-2xl shadow-red-900/50 ${
          scrollY > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-display text-lg font-bold">
                MZ
              </div>
              <span className="font-display text-xl font-bold text-white">Mustafa Zahid</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8">
              {["Privacy", "Terms", "Press Kit"].map((link, i) => (
                <a key={i} href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Mustafa Zahid. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
