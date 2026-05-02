import { BenefitCardProps } from '@/lib/types/components';
import { renderInlineMarkdownLinks } from '@/lib/utils/inlineMarkdownLinks';

export default function BenefitCard({
  icon,
  title,
  description,
  className = '',
}: BenefitCardProps) {
  return (
    <div className={`glass-card rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 hover-lift ${className}`}>
      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0">
          {icon}
        </div>
        {title}
      </h3>
      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
        {renderInlineMarkdownLinks(description)}
      </p>
    </div>
  );
}

