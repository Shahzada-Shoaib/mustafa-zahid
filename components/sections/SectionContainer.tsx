import { ReactNode } from 'react';
import { SPACING } from '@/lib/utils/spacing';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'gradient';
  spacing?: 'default' | 'small' | 'large';
}

export default function SectionContainer({
  children,
  className = '',
  background = 'default',
  spacing = 'default',
}: SectionContainerProps) {
  const spacingClass = 
    spacing === 'small' ? SPACING.section.pySmall :
    spacing === 'large' ? SPACING.section.pyLarge :
    SPACING.section.py;

  const backgroundClass = background === 'gradient' 
    ? 'bg-gradient-to-b from-transparent via-red-950/10 to-transparent'
    : '';

  return (
    <section className={`${spacingClass} ${backgroundClass} ${className}`}>
      <div className={`${SPACING.container.maxWidth} mx-auto ${SPACING.container.px}`}>
        {children}
      </div>
    </section>
  );
}

