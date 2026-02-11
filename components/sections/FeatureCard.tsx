import { FeatureCardProps } from '@/lib/types/components';
import { SPACING } from '@/lib/utils/spacing';

export default function FeatureCard({
  icon,
  title,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover-lift text-center ${className}`}>
      <div className="flex justify-center mb-3 sm:mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
          {icon}
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{title}</h3>
      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  );
}

