import { FeatureCardProps } from '@/lib/types/components';
import { SPACING } from '@/lib/utils/spacing';

export default function FeatureCard({
  icon,
  title,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div className={`glass-card rounded-2xl ${SPACING.card.padding} hover-lift text-center ${className}`}>
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

