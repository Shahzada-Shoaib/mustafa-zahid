import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative py-6 sm:py-8 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-14 sm:w-16 md:max-w-[100px] lg:max-w-[120px]">
              <Image
                src="/mz-logo.png"
                alt="Mustafa Zahid Logo"
                width={120}
                height={120}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <a
              href="https://kodekraft.services/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors py-2 px-2 min-h-[44px] flex items-center touch-manipulation"
            >
              Powered by KodeKraft
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/70 text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Mustafa Zahid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
