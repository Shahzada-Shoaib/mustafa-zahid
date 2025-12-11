import type { Metadata } from "next";
import Image from "next/image";
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
import { 
  GuitarIcon, 
  BookIcon, 
  TargetIcon, 
  MusicIcon,
  SparklesIcon,
  SmileIcon,
  PerformanceIcon
} from "@/components/icons";
import { SPACING } from "@/lib/utils/spacing";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Guitar Classes | Learn Guitar Online & Offline | Professional Guitar Lessons",
  description: "Join professional guitar classes. Learn acoustic and electric guitar from expert instructors. Beginner to advanced level guitar lessons available. Enroll now for guitar training in Pakistan.",
  keywords: "guitar classes, guitar lessons, learn guitar, guitar training, acoustic guitar, electric guitar, guitar instructor, guitar classes Karachi, guitar lessons Lahore, guitar classes Pakistan, beginner guitar lessons",
  
  openGraph: {
    title: "Guitar Classes - Professional Guitar Lessons",
    description: "Learn guitar from expert instructors. Beginner to advanced level guitar classes available.",
    url: "https://mustafazahid.com/music-classes/guitar-classes",
    siteName: "Music Classes",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Guitar Classes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Guitar Classes - Professional Guitar Lessons",
    description: "Learn guitar from expert instructors",
    images: ["/mz-logo.png"],
  },
  
  alternates: {
    canonical: "https://mustafazahid.com/music-classes/guitar-classes",
  },
};

export default function GuitarClassesPage() {
  const features = [
    {
      icon: <GuitarIcon />,
      title: "Acoustic & Electric",
      description: "Comprehensive training covering both acoustic and electric guitar techniques, from fingerstyle to lead guitar."
    },
    {
      icon: <BookIcon />,
      title: "Structured Curriculum",
      description: "Progressive learning path designed by professional musicians, ensuring solid foundation at every level."
    },
    {
      icon: <TargetIcon />,
      title: "Personalized Instruction",
      description: "Individual attention tailored to your learning style, pace, and musical goals for maximum progress."
    },
    {
      icon: <MusicIcon />,
      title: "Complete Music Theory",
      description: "Master music theory, chord construction, scales, and rhythm patterns alongside practical playing skills."
    }
  ];

  const curriculumItems = [
    { text: "Proper guitar posture, hand positioning, and finger placement techniques" },
    { text: "Fundamental chord shapes, progressions, and strumming patterns" },
    { text: "Advanced fingerpicking, arpeggios, and classical techniques" },
    { text: "Music theory fundamentals: scales, intervals, and harmony" },
    { text: "Reading guitar tabs and standard musical notation" },
    { text: "Learning popular songs across different genres" },
    { text: "Improvisation techniques and solo playing" },
    { text: "Performance skills and stage presence" },
    { text: "Guitar maintenance and care" },
    { text: "Recording techniques and studio basics" }
  ];

  const learningPaths = [
    {
      stage: "Beginner",
      duration: "Months 1-3",
      description: "Build a solid foundation with proper technique, basic chords, and simple songs.",
      skills: ["Basic chords (C, G, D, E, A)", "Simple strumming patterns", "Reading guitar tabs", "Proper posture and technique"]
    },
    {
      stage: "Intermediate",
      duration: "Months 4-6",
      description: "Expand your repertoire with barre chords, fingerpicking, and music theory.",
      skills: ["Barre chords and power chords", "Fingerpicking techniques", "Music theory basics", "Song arrangement"]
    },
    {
      stage: "Advanced",
      duration: "Months 7+",
      description: "Master advanced techniques, improvisation, and composition.",
      skills: ["Solo improvisation", "Advanced music theory", "Composition and songwriting", "Performance skills"]
    }
  ];

  const benefits = [
    {
      icon: <SparklesIcon />,
      title: "Cognitive Benefits",
      description: "Enhances memory, improves concentration, and develops hand-eye coordination. Research shows playing an instrument stimulates multiple brain areas simultaneously."
    },
    {
      icon: <SmileIcon />,
      title: "Emotional Expression",
      description: "Provides a powerful outlet for emotional expression and stress relief. Music allows you to channel feelings in a creative and therapeutic way."
    },
    {
      icon: <PerformanceIcon />,
      title: "Versatile Instrument",
      description: "One of the most versatile instruments, suitable for virtually every music genre. Explore endless musical possibilities and find your unique voice."
    }
  ];

  const practiceRoutine = [
    "Start with 5-10 minutes of warm-up exercises to prevent injury",
    "Practice scales and chord changes for muscle memory",
    "Dedicate time to learning new songs and techniques",
    "End with playing songs you enjoy to maintain motivation",
    "Aim for consistent daily practice rather than long sporadic sessions"
  ];

  const commonMistakes = [
    "Skipping proper posture and hand positioning basics",
    "Practicing too fast before mastering slow, accurate playing",
    "Neglecting music theory and only focusing on tabs",
    "Not using a metronome to develop timing and rhythm",
    "Avoiding difficult techniques instead of breaking them down"
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      <HeroSection
        badge="Professional Guitar Training"
        title="Master the Art of Guitar"
        titleHighlight="Guitar"
        description="Learn from expert instructors in a structured, professional environment. Whether you're a complete beginner or looking to advance your skills, our comprehensive curriculum will guide you every step of the way."
        image={{
          src: "/mz-pic-11.jpg",
          alt: "Professional Guitar Classes"
        }}
      />

      <SectionContainer>
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Professional Guitar <span className="text-gradient">Education</span>
          </h2>
        </div>
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 ${SPACING.gap.grid}`}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </SectionContainer>

      <CurriculumSection
        items={curriculumItems}
        image={{
          src: "/mz-pic-3.JPG",
          alt: "Guitar Curriculum"
        }}
      />

      <SectionContainer>
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
            Learning Progression
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Your Guitar Learning <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-white/70 mt-2 max-w-2xl mx-auto">
            Our structured program takes you from beginner fundamentals to advanced mastery
          </p>
        </div>
        <div className={`grid md:grid-cols-3 ${SPACING.gap.grid}`}>
          {learningPaths.map((level, index) => (
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

      <SectionContainer background="gradient">
        <div className={`grid lg:grid-cols-2 ${SPACING.gap.large} items-center`}>
          <div>
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
              Benefits
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-8">
              Why Learn <span className="text-gradient">Guitar?</span>
            </h2>
            <div className="space-y-5">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="/mz-pic-11.jpg"
              alt="Guitar Learning Benefits"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className={`grid lg:grid-cols-2 ${SPACING.gap.large} items-center`}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/mz-pic-6.jpg"
              alt="Guitar Teaching Methodology"
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
                  Our guitar classes provide a comprehensive learning experience that goes beyond just playing songs. 
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
        routineTips={practiceRoutine}
        mistakes={commonMistakes}
      />

      <CTASection
        title="Ready to Start Your Guitar Journey?"
        description="Whether you're a complete beginner or looking to refine your skills, our professional guitar classes provide the guidance and support you need. Contact us to learn more about our curriculum, schedule, and how we can help you achieve your musical goals."
      />

      <Footer />
    </div>
  );
}
