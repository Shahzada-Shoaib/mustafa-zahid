import { BenefitCardProps } from '@/lib/types/components';

export default function BenefitCard({
  icon,
  title,
  description,
  className = '',
}: BenefitCardProps) {
  return (
    <div className={`glass-card rounded-xl p-5 lg:p-6 hover-lift ${className}`}>
      <h3 className="text-lg lg:text-xl font-semibold text-white mb-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 flex-shrink-0">
          {icon}
        </div>
        {title}
      </h3>
      <p className="text-white/80 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

