import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'gradient';
}

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export interface LearningPathCardProps {
  stage: string;
  duration: string;
  description: string;
  skills: string[];
  className?: string;
}

export interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export interface HeroSectionProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export interface CurriculumItem {
  text: string;
}

export interface CurriculumSectionProps {
  items: CurriculumItem[];
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
}

