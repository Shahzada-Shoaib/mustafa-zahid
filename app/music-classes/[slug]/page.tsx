import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import HeroSection from "@/components/sections/HeroSection";
import SectionContainer from "@/components/sections/SectionContainer";
import FeatureCard from "@/components/sections/FeatureCard";
import CurriculumSection from "@/components/sections/CurriculumSection";
import LearningPathCard from "@/components/sections/LearningPathCard";
import BenefitCard from "@/components/sections/BenefitCard";
import PracticeTipsSection from "@/components/sections/PracticeTipsSection";
import CTASection from "@/components/sections/CTASection";
import { type Class, getClass, getAllClassSlugs } from "@/lib/data/classes";
import { SPACING } from "@/lib/utils/spacing";
import {
  GuitarIcon,
  PianoIcon,
  MicrophoneIcon,
  BookIcon,
  TargetIcon,
  MusicIcon,
  SparklesIcon,
  SmileIcon,
  PerformanceIcon,
  HomeIcon,
  UserIcon,
  ClockIcon,
} from "@/components/icons";

// Use dynamic rendering to avoid build-time database issues
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const slugs = await getAllClassSlugs();
    
    if (!Array.isArray(slugs)) {
      return [];
    }
    
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for classes:', error);
    return [];
  }
}

function getIconComponent(iconName: string) {
  const iconMap: { [key: string]: React.ReactNode } = {
    'GuitarIcon': <GuitarIcon />,
    'PianoIcon': <PianoIcon />,
    'MicrophoneIcon': <MicrophoneIcon />,
    'BookIcon': <BookIcon />,
    'TargetIcon': <TargetIcon />,
    'MusicIcon': <MusicIcon />,
    'SparklesIcon': <SparklesIcon />,
    'SmileIcon': <SmileIcon />,
    'PerformanceIcon': <PerformanceIcon />,
    'HomeIcon': <HomeIcon />,
    'UserIcon': <UserIcon />,
    'ClockIcon': <ClockIcon />,
  };
  
  return iconMap[iconName] || <MusicIcon />;
}

function generateStructuredData(classData: Class) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": classData.title,
    "description": classData.hero.description,
    "url": classData.metadata.canonical || `https://mustafazahid.com/music-classes/${classData.slug}`,
    "image": classData.images.heroImage,
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": classData.title,
        "description": classData.hero.description,
      },
    },
  };
}

function generateFAQSchema(classData: Class) {
  const faqs = classData.seo?.faqs || [];
  
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const classData = await getClass(slug);

  if (!classData) {
    return {
      title: "Class Not Found",
      description: "The requested class page could not be found.",
    };
  }

  // Parse robots meta
  const robotsValue = classData.metadata.robots || 'index, follow';
  const robotsParts = robotsValue.split(',').map(s => s.trim());
  const robots: { index?: boolean; follow?: boolean; googleBot?: any } = {};
  
  if (robotsParts.includes('index')) robots.index = true;
  if (robotsParts.includes('noindex')) robots.index = false;
  if (robotsParts.includes('follow')) robots.follow = true;
  if (robotsParts.includes('nofollow')) robots.follow = false;
  
  robots.googleBot = {
    index: robots.index !== false,
    follow: robots.follow !== false,
    'max-image-preview': 'large',
    'max-snippet': -1,
  };

  return {
    metadataBase: new URL("https://mustafazahid.com"),
    title: classData.metadata.title,
    description: classData.metadata.description,
    keywords: classData.metadata.keywords,

    openGraph: {
      title: classData.metadata.ogTitle,
      description: classData.metadata.ogDescription,
      url: classData.metadata.ogUrl || classData.metadata.canonical,
      siteName: "Music Classes",
      images: [
        {
          url: classData.metadata.ogImage || classData.images.heroImage,
          width: 1200,
          height: 630,
          alt: classData.metadata.ogTitle || classData.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: classData.metadata.twitterTitle,
      description: classData.metadata.twitterDescription,
      images: [classData.metadata.twitterImage || classData.images.heroImage],
    },

    robots: robots,

    alternates: {
      canonical: classData.metadata.canonical,
    },
  };
}

export default async function ClassPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const classData = await getClass(slug);

  if (!classData) {
    notFound();
  }

  const structuredData = generateStructuredData(classData);
  const faqSchema = generateFAQSchema(classData);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <AnimatedBackground />
      <Header />
      
      <HeroSection
        badge={classData.hero.badge}
        title={classData.hero.title}
        titleHighlight={classData.hero.titleHighlight}
        description={classData.hero.description}
        image={{
          src: classData.images.heroImage,
          alt: classData.title
        }}
      />

      <SectionContainer>
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Professional {classData.instrument.charAt(0).toUpperCase() + classData.instrument.slice(1)} <span className="text-gradient">Education</span>
          </h2>
        </div>
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 ${SPACING.gap.grid}`}>
          {classData.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={getIconComponent(feature.icon)}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </SectionContainer>

      <CurriculumSection
        items={classData.curriculum}
        image={{
          src: classData.images.curriculumImage,
          alt: `${classData.title} Curriculum`
        }}
      />

      <SectionContainer>
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
            Learning Progression
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Your {classData.instrument.charAt(0).toUpperCase() + classData.instrument.slice(1)} Learning <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-white/70 mt-2 max-w-2xl mx-auto">
            Our structured program takes you from beginner fundamentals to advanced mastery
          </p>
        </div>
        <div className={`grid md:grid-cols-3 ${SPACING.gap.grid}`}>
          {classData.learningPaths.map((level, index) => (
            <LearningPathCard
              key={index}
              stage={level.stage}
              duration={level.duration}
              description={level.description}
              skills={level.skills}
            />
          ))}
        </div>
      </SectionContainer>

      {classData.benefits.length > 0 && (
        <SectionContainer>
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
              Benefits
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Why Learn <span className="text-gradient">{classData.instrument.charAt(0).toUpperCase() + classData.instrument.slice(1)}</span>
            </h2>
          </div>
          <div className={`grid md:grid-cols-3 ${SPACING.gap.grid}`}>
            {classData.benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                icon={getIconComponent(benefit.icon)}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </SectionContainer>
      )}

      <SectionContainer>
        <div className={`grid lg:grid-cols-2 ${SPACING.gap.large} items-center`}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src={classData.images.teachingImage}
              alt={`${classData.title} Teaching Methodology`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
              Our Approach
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-8">
              What to <span className="text-gradient">Expect</span>
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Comprehensive Learning</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our {classData.instrument} classes provide a comprehensive learning experience that goes beyond just playing songs. 
                  You&apos;ll develop a deep understanding of music, build technical proficiency, and discover your unique musical voice.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Expert Instruction</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Each session combines theory with practical application. Our experienced instructors provide personalized 
                  feedback and adapt teaching methods to your learning style, ensuring you understand not just what to play, but why it works.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Ongoing Support</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  You&apos;ll have access to practice materials, video resources, and ongoing support between sessions. 
                  Regular progress assessments help track your development and adjust the learning path as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <PracticeTipsSection
        routineTips={classData.practiceTips.routineTips}
        mistakes={classData.practiceTips.mistakes}
      />

      <CTASection
        title={classData.cta.title}
        description={classData.cta.description}
      />

      <Footer />
    </div>
  );
}

