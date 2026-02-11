import { LearningPathCardProps } from '@/lib/types/components';
import { CheckIcon } from '@/components/icons';

export default function LearningPathCard({
  stage,
  duration,
  description,
  skills,
  className = '',
}: LearningPathCardProps) {
  return (
    <div className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover-lift relative ${className}`}>
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-500/10 rounded-bl-xl sm:rounded-bl-2xl flex items-center justify-center">
        <span className="text-red-400 text-[10px] sm:text-xs font-semibold text-center leading-tight px-1 sm:px-2">{duration}</span>
      </div>
      <div className="mb-4 sm:mb-6 pr-12 sm:pr-14 lg:pr-16">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{stage}</h3>
        <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{description}</p>
      </div>
      <ul className="space-y-2 sm:space-y-2.5 pt-3 sm:pt-4 border-t border-white/10">
        {skills.map((skill, i) => (
          <li key={i} className="flex items-start gap-2 sm:gap-2.5 text-white/70 text-xs sm:text-sm">
            <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

