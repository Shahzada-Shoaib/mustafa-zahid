import { SPACING } from '@/lib/utils/spacing';
import { CheckCircleIcon, WarningIcon } from '@/components/icons';

interface PracticeTipsSectionProps {
  title?: string;
  routineTitle?: string;
  mistakesTitle?: string;
  routineTips: string[];
  mistakes: string[];
  className?: string;
}

export default function PracticeTipsSection({
  title = "Effective Practice Strategies",
  routineTitle = "Daily Practice Routine",
  mistakesTitle = "Common Mistakes to Avoid",
  routineTips,
  mistakes,
  className = '',
}: PracticeTipsSectionProps) {
  return (
    <section className={`${SPACING.section.py} bg-gradient-to-b from-transparent via-red-950/10 to-transparent ${className}`}>
      <div className={`${SPACING.container.maxWidth} mx-auto ${SPACING.container.px}`}>
        <div className={`glass-card rounded-3xl ${SPACING.card.paddingLarge}`}>
          <div className="text-center mb-12">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
              Expert Guidance
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
              {title} <span className="text-gradient">Strategies</span>
            </h2>
          </div>
          <div className={`grid md:grid-cols-2 ${SPACING.gap.large}`}>
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
                {routineTitle}
              </h3>
              <ul className="space-y-3.5">
                {routineTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="text-red-500 font-semibold flex-shrink-0 text-sm">{i + 1}.</span>
                    <span className="leading-relaxed text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <WarningIcon className="w-5 h-5" />
                </div>
                {mistakesTitle}
              </h3>
              <ul className="space-y-3.5">
                {mistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="text-red-500 font-semibold flex-shrink-0 text-sm">{i + 1}.</span>
                    <span className="leading-relaxed text-sm">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

