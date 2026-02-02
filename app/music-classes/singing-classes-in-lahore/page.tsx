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
  MicrophoneIcon,
  BookIcon,
  TargetIcon,
  MusicIcon,
  SparklesIcon,
  SmileIcon,
  PerformanceIcon,
} from "@/components/icons";
import { SPACING } from "@/lib/utils/spacing";

export const metadata: Metadata = {
  metadataBase: new URL("https://mustafazahid.com"),
  title:
    "Singing Classes in Lahore | Vocal Training & Professional Singing Lessons",
  description:
    "Professional singing classes in Lahore. Learn vocal techniques, breathing & performance skills. Expert instructors. Book now: +92 322 407 1299. Studio & home classes available.",
  keywords:
    "singing classes Lahore, vocal training Lahore, singing lessons Lahore, voice training Lahore, vocal techniques Lahore, singing instructor Lahore, learn to sing Lahore, professional singing lessons Lahore, voice coaching Lahore",

  openGraph: {
    title: "Singing Classes in Lahore | Professional Vocal Training",
    description:
      "Professional singing classes in Lahore. Learn vocal techniques & performance skills. Expert instructors. Book now: +92 322 407 1299",
    url: "https://mustafazahid.com/music-classes/singing-classes",
    siteName: "Music Classes",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Singing Classes in Lahore",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Singing Classes in Lahore | Vocal Training & Lessons",
    description:
      "Learn singing and vocal techniques from expert instructors in Lahore. Beginner to advanced voice training available.",
    images: ["/mz-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: "https://mustafazahid.com/music-classes/singing-classes-in-lahore",
  },
};


export default function SingingClassesPage() {
  const features = [
    {
      icon: <MicrophoneIcon />,
      title: "Vocal Techniques",
      description:
        "Master proper breathing, pitch control, and vocal range expansion through proven techniques.",
    },
    {
      icon: <BookIcon />,
      title: "Structured Curriculum",
      description:
        "Progressive learning path designed by professional vocal coaches, ensuring solid foundation at every level.",
    },
    {
      icon: <TargetIcon />,
      title: "Personalized Instruction",
      description:
        "Individual attention tailored to your voice type, learning style, and musical goals for maximum progress.",
    },
    {
      icon: <MusicIcon />,
      title: "Performance Skills",
      description:
        "Develop stage presence, microphone technique, and confidence for live performances and recordings.",
    },
  ];

  const curriculumItems = [
    {
      text: "Proper breathing techniques: diaphragmatic breathing and breath control",
    },
    { text: "Vocal warm-ups and exercises for flexibility and strength" },
    { text: "Pitch accuracy training and ear development" },
    { text: "Vocal range expansion through safe, progressive exercises" },
    { text: "Tone quality improvement and vocal color development" },
    { text: "Song interpretation and emotional expression" },
    { text: "Stage performance skills and audience engagement" },
    { text: "Microphone technique and live performance" },
    { text: "Recording studio techniques and vocal production" },
    { text: "Vocal health and maintenance practices" },
    { text: "Music theory for singers: scales, intervals, and harmony" },
    { text: "Performance anxiety management and confidence building" },
  ];

  const learningPaths = [
    {
      stage: "Beginner",
      duration: "Months 1-3",
      description:
        "Build a solid foundation with proper breathing, basic vocal exercises, and simple songs.",
      skills: [
        "Basic breathing techniques",
        "Simple vocal warm-ups",
        "Pitch matching",
        "Basic song performance",
      ],
    },
    {
      stage: "Intermediate",
      duration: "Months 4-6",
      description:
        "Expand your range, improve tone quality, and develop performance skills.",
      skills: [
        "Range expansion",
        "Tone quality improvement",
        "Song interpretation",
        "Basic stage presence",
      ],
    },
    {
      stage: "Advanced",
      duration: "Months 7+",
      description:
        "Master advanced techniques, performance skills, and develop your unique vocal style.",
      skills: [
        "Advanced vocal techniques",
        "Performance mastery",
        "Recording skills",
        "Vocal style development",
      ],
    },
  ];

  const benefits = [
    {
      icon: <SparklesIcon />,
      title: "Confidence Building",
      description:
        "Singing builds self-confidence and self-expression. Regular practice helps overcome stage fright and develop a strong, confident voice.",
    },
    {
      icon: <SmileIcon />,
      title: "Emotional Expression",
      description:
        "Vocal training provides a powerful outlet for emotional expression. Learn to convey feelings through your voice and connect with audiences.",
    },
    {
      icon: <PerformanceIcon />,
      title: "Versatile Skill",
      description:
        "Vocal skills are applicable across all music genres. From classical to pop, jazz to rock, your voice is your most versatile instrument.",
    },
  ];

  const practiceRoutine = [
    "Start with 10-15 minutes of vocal warm-ups to prepare your voice",
    "Practice breathing exercises to strengthen your diaphragm",
    "Work on pitch accuracy and ear training exercises",
    "Practice songs in your comfortable range before expanding",
    "End with cool-down exercises to protect your vocal cords",
  ];

  const commonMistakes = [
    "Singing without proper warm-up, risking vocal strain",
    "Pushing your voice beyond its natural range too quickly",
    "Neglecting breathing technique and relying on throat tension",
    "Not maintaining proper posture while singing",
    "Skipping vocal health practices and overusing your voice",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />

      <HeroSection
        badge="Professional Vocal Training"
        title="Master the Art of Singing"
        titleHighlight="Singing"
        description="Learn from expert vocal instructors in a structured, professional environment. Whether you're a complete beginner or looking to refine your skills, our comprehensive curriculum will guide you every step of the way."
        image={{
          src: "/music-listening.png",
          alt: "Professional Singing Classes",
        }}
      />

      <SectionContainer>
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Professional Vocal <span className="text-gradient">Education</span>
          </h2>
        </div>
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 ${SPACING.gap.grid}`}
        >
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
          src: "/piano-notes.jpg",
          alt: "Singing Curriculum",
        }}
      />

      <SectionContainer>
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
            Learning Progression
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Your Vocal Development{" "}
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-white/70 mt-2 max-w-2xl mx-auto">
            Our structured program takes you from beginner fundamentals to
            advanced mastery
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

      <SectionContainer>
        <div
          className={`grid lg:grid-cols-2 ${SPACING.gap.large} items-center`}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/cassette.jpg"
              alt="Singing Teaching Methodology"
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
                <h3 className="text-xl font-semibold text-white mb-3">
                  Comprehensive Training
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our singing classes provide a comprehensive approach to vocal
                  development that combines technical training with artistic
                  expression. You&apos;ll learn not just how to sing, but how to
                  use your voice as a powerful instrument for communication and
                  emotional expression.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Expert Instruction
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Each session is carefully structured to balance vocal
                  exercises, technique work, and song practice. Our instructors
                  provide real-time feedback, helping you understand what
                  you&apos;re doing right and how to improve areas that need
                  work.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Ongoing Support
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  You&apos;ll receive practice materials, vocal exercise
                  recordings, and personalized feedback between sessions.
                  Regular assessments track your progress in pitch accuracy,
                  range expansion, tone quality, and overall vocal development.
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
        title="Ready to Start Your Singing Journey?"
        description="Whether you're a complete beginner or looking to refine your skills, our professional singing classes provide the guidance and support you need. Contact us to learn more about our curriculum, schedule, and how we can help you achieve your vocal goals."
      />

      <Footer />
    </div>
  );
}
