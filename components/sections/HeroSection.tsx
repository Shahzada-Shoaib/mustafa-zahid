import Image from 'next/image';
import { HeroSectionProps } from '@/lib/types/components';
import { SPACING } from '@/lib/utils/spacing';

export default function HeroSection({
  badge,
  title,
  titleHighlight,
  description,
  image,
  ctaText = "Enroll Now",
  ctaHref = "https://wa.me/+923224071299",
  className = '',
}: HeroSectionProps) {
  return (
    <section className={`relative py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className={`${SPACING.container.maxWidth} mx-auto ${SPACING.container.px}`}>
        <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center`}>
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            {badge && (
              <span className="inline-block text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
                {badge}
              </span>
            )}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {title} {titleHighlight && <><br /><span className="text-gradient">{titleHighlight}</span></>}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-800 transition-all font-semibold text-sm sm:text-base lg:text-lg shadow-lg shadow-red-900/30 min-h-[48px] touch-manipulation"
              >
                {ctaText}
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
          {image && (
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden order-1 lg:order-2">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

