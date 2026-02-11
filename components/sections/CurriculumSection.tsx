import Image from 'next/image';
import { CurriculumSectionProps } from '@/lib/types/components';
import { SPACING } from '@/lib/utils/spacing';
import { CheckIcon } from '@/components/icons';

export default function CurriculumSection({
  items,
  image,
  className = '',
}: CurriculumSectionProps) {
  return (
    <section className={`${SPACING.section.py} bg-gradient-to-b from-transparent via-red-950/10 to-transparent ${className}`}>
      <div className={`${SPACING.container.maxWidth} mx-auto ${SPACING.container.px}`}>
        <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-16 items-center`}>
          {image && (
            <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden order-2 lg:order-1">
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
          <div className="order-1 lg:order-2">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
              Comprehensive Curriculum
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6 sm:mb-8">
              What You&apos;ll <span className="text-gradient">Learn</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 glass-card rounded-lg sm:rounded-xl p-3 sm:p-4 hover-lift"
                >
                  <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                    <CheckIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
                  </div>
                  <span className="text-white/80 text-xs sm:text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

