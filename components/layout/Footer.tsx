import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative py-8 sm:py-10 md:py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
              <Image
                src="/mz-logo.png"
                alt="Mustafa Zahid Logo"
                width={120}
                height={120}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <a href="/#contact" className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors">
              Privacy
            </a>
            <a href="/#contact" className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors">
              Terms
            </a>
            <a href="/#contact" className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors">
              Press Kit
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

