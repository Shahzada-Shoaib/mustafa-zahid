import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative p-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
<div className="flex items-center gap-2 sm:gap-3">
  <div className="w-16 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
    <Image
      src="/mz-logo.png"
      alt="Mustafa Zahid Logo"
      width={120} // original image width
      height={120} // original image height
      className="w-full h-auto object-contain"
      priority
    />
  </div>
</div>


          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <a
              href="https://kodekraft.services/"
              className="text-white/70 hover:text-white text-xs sm:text-sm transition-colors"
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
