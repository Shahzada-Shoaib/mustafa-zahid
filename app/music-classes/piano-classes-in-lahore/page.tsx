import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Piano Classes | Learn Piano & Keyboard | Professional Piano Lessons",
  description: "Join professional piano classes. Learn piano and keyboard from expert instructors. Beginner to advanced level piano lessons. Enroll now for piano training in Pakistan.",
  keywords: "piano classes, piano lessons, learn piano, keyboard lessons, piano training, piano instructor, piano classes Karachi, piano lessons Lahore, piano classes Pakistan, beginner piano lessons, keyboard classes",
  
  openGraph: {
    title: "Piano Classes - Professional Piano & Keyboard Lessons",
    description: "Learn piano and keyboard from expert instructors. Beginner to advanced level classes available.",
    url: "https://mustafazahid.com/music-classes/piano-classes",
    siteName: "Music Classes",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Piano Classes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Piano Classes - Professional Piano Lessons",
    description: "Learn piano and keyboard from expert instructors",
    images: ["/mz-logo.png"],
  },
  
  alternates: {
    canonical: "https://mustafazahid.com/music-classes/piano-classes",
  },
};

export default function PianoClassesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
                Professional Piano Training
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Master the Art of <span className="text-gradient">Piano</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                Learn from expert piano instructors in a structured, professional environment. 
                Whether you&apos;re a complete beginner or looking to advance your skills, 
                our comprehensive curriculum will guide you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://wa.me/+923224071299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all font-semibold text-lg shadow-lg shadow-red-900/30"
                >
                  Enroll Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/piano.jpg"
                alt="Professional Piano Classes"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Professional Piano <span className="text-gradient">Education</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 002.163 2.163l1.32.377a1.803 1.803 0 01-.99 3.467l-2.31.66A2.25 2.25 0 019 19.553V15.75z" />
                  </svg>
                ),
                title: "Classical & Contemporary",
                description: "Explore classical tradition while mastering contemporary styles, from Bach to modern pop and jazz."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
                title: "Complete Music Theory",
                description: "Master music theory from the ground up - reading sheet music, harmony, and composition."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 001.504-3.069M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
                title: "Expert Instruction",
                description: "Learn from experienced piano teachers who are active performers and educators."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "Progressive Development",
                description: "Carefully designed curriculum that builds skills systematically at every level."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 lg:p-8 hover-lift text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/notes.jpg"
                alt="Piano Curriculum"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
                Comprehensive Curriculum
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-8">
                What You&apos;ll <span className="text-gradient">Learn</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {[
    "Proper piano posture, hand position, and finger technique",
    "Reading sheet music: notes, rhythms, and musical notation",
    "Basic scales, chords, and arpeggios",
    "Music theory fundamentals: keys, intervals, and harmony",
    "Classical repertoire from beginner to advanced levels",
    "Contemporary styles: pop, jazz, blues, and film music",
    "Chord progressions and accompaniment techniques",
    "Improvisation and creative expression",
    "Performance skills and stage presence",
    "Composition and songwriting on piano",
    "Piano maintenance and care",
    "Recording and production techniques"
  ].map((item, index) => (
    <div
      key={index}
      className="flex items-start gap-3 glass-card rounded-xl p-4 hover-lift"
    >
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
        <svg
          className="w-3 h-3 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-white/80 text-sm leading-relaxed">
        {item}
      </span>
    </div>
  ))}
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
              Learning Progression
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              Your Piano Learning <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-white/70 mt-2 max-w-2xl mx-auto">
              Our structured program takes you from beginner fundamentals to advanced mastery
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                stage: "Beginner",
                duration: "Months 1-3",
                description: "Establish proper technique, learn to read music, and play simple pieces.",
                skills: ["Proper hand position and posture", "Reading basic music notation", "Simple scales and chords", "Playing basic melodies"]
              },
              {
                stage: "Intermediate",
                duration: "Months 4-9",
                description: "Expand your repertoire with more complex pieces and advanced techniques.",
                skills: ["Advanced finger techniques", "Complex chord progressions", "Music theory application", "Playing with expression"]
              },
              {
                stage: "Advanced",
                duration: "Months 10+",
                description: "Master challenging repertoire, develop your unique style, and explore composition.",
                skills: ["Master-level repertoire", "Improvisation and composition", "Performance techniques", "Musical interpretation"]
              }
            ].map((level, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 lg:p-8 hover-lift relative"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-2xl flex items-center justify-center">
                  <span className="text-red-400 text-xs font-semibold text-center leading-tight px-2">{level.duration}</span>
                </div>
                <div className="mb-6 pr-16">
                  <h3 className="text-2xl font-bold text-white mb-3">{level.stage}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{level.description}</p>
                </div>
                <ul className="space-y-2.5 pt-4 border-t border-white/10">
                  {level.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm">
                      <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-relaxed">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Teaching Methodology Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/piano1.jpg"
                alt="Piano Teaching Methodology"
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
                  <h3 className="text-xl font-semibold text-white mb-3">Comprehensive Education</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Our piano classes offer a comprehensive musical education that combines technical 
                    skill development with artistic expression. You&apos;ll learn to read music, understand 
                    theory, develop proper technique, and express yourself musically.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Expert Instruction</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Each lesson is structured to balance technical exercises, repertoire learning, 
                    and music theory. Our instructors provide immediate feedback, helping you correct 
                    mistakes early and develop good habits from the start.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Ongoing Support</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    You&apos;ll receive sheet music, practice assignments, and access to supplementary 
                    materials. Regular progress assessments ensure you&apos;re advancing at an appropriate 
                    pace and mastering each concept before moving forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Tips Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <span className="text-red-500 uppercase tracking-[0.3em] text-xs font-medium">
                Expert Tips
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
                Effective Piano Practice <span className="text-gradient">Strategies</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Daily Practice Routine
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "Start with 5-10 minutes of finger exercises and scales",
                    "Practice sight-reading with new, easier pieces",
                    "Work on your current piece, focusing on difficult sections",
                    "Review previously learned pieces to maintain repertoire",
                    "End with playing pieces you enjoy for motivation",
                    "Use a metronome to develop steady rhythm"
                  ].map((tip, i) => (
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2.25m0 4.75h.01m-6.938 4.13c.155.25.39.46.716.62l2.74 1.58c.55.32 1.16.32 1.71 0l2.74-1.58c.326-.16.561-.37.716-.62m-6.938-4.13V9.75m0 0c0-.414.336-.75.75-.75h4.5c.414 0 .75.336.75.75v4.5c0 .414-.336.75-.75.75h-4.5a.75.75 0 01-.75-.75zm6.938 4.13V9.75m0 0c0-.414.336-.75.75-.75h4.5c.414 0 .75.336.75.75v4.5c0 .414-.336.75-.75.75h-4.5a.75.75 0 01-.75-.75z" />
                    </svg>
                  </div>
                  Common Mistakes to Avoid
                </h3>
                <ul className="space-y-3.5">
                  {[
                    "Practicing too fast before mastering slow, accurate playing",
                    "Neglecting proper hand position and posture",
                    "Skipping music theory and only focusing on playing",
                    "Not using a metronome, leading to inconsistent tempo",
                    "Practicing only easy pieces and avoiding challenges",
                    "Ignoring dynamics and musical expression"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <span className="text-red-500 font-semibold flex-shrink-0 text-sm">{i + 1}.</span>
                      <span className="leading-relaxed text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-10 lg:p-14 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Start Your Piano Journey Today
            </h2>
            <p className="text-white/80 mb-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Whether you&apos;re starting from scratch or looking to advance your skills, our professional 
              piano classes provide the comprehensive training you need. Contact us to learn more about 
              our teaching methods, curriculum, and how we can help you achieve your musical aspirations.
            </p>
            <a
              href="https://wa.me/+923224071299"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all font-semibold text-lg shadow-lg shadow-red-900/30"
            >
              Contact Us Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
