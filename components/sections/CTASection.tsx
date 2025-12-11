import { CTASectionProps } from '@/lib/types/components';
import { SPACING } from '@/lib/utils/spacing';

export default function CTASection({
  title,
  description,
  buttonText = "Contact Us Today",
  buttonHref = "https://wa.me/+923224071299",
  className = '',
}: CTASectionProps) {
  return (
    <section className={`${SPACING.section.py} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-card rounded-3xl ${SPACING.card.paddingXL} text-center`}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-white/80 mb-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
          <a
            href={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all font-semibold text-lg shadow-lg shadow-red-900/30"
          >
            {buttonText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

