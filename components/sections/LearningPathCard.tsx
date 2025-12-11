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
    <div className={`glass-card rounded-2xl p-6 lg:p-8 hover-lift relative ${className}`}>
      <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-2xl flex items-center justify-center">
        <span className="text-red-400 text-xs font-semibold text-center leading-tight px-2">{duration}</span>
      </div>
      <div className="mb-6 pr-16">
        <h3 className="text-2xl font-bold text-white mb-3">{stage}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
      <ul className="space-y-2.5 pt-4 border-t border-white/10">
        {skills.map((skill, i) => (
          <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm">
            <CheckIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

