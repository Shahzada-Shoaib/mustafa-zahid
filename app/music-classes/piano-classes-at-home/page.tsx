import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Piano Classes at Home | Private Piano Lessons | Home Piano Training",
  description: "Get private piano classes at your home. One-on-one piano lessons with expert instructors. Convenient home-based piano training for all levels. Book now for piano lessons at home in Pakistan.",
  keywords: "piano classes at home, private piano lessons, home piano training, piano tutor at home, keyboard lessons at home, home piano classes Karachi, private piano instructor, piano classes at home Lahore, home piano lessons Pakistan",
  
  openGraph: {
    title: "Piano Classes at Home - Private Piano Lessons",
    description: "Get private piano classes at your home. One-on-one lessons with expert instructors.",
    url: "https://mustafazahid.com/music-classes/piano-classes-at-home",
    siteName: "Music Classes",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Piano Classes at Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Piano Classes at Home - Private Lessons",
    description: "Get private piano classes at your home",
    images: ["/mz-logo.png"],
  },
  
  alternates: {
    canonical: "https://mustafazahid.com/music-classes/piano-classes-at-home",
  },
};

export default function PianoClassesAtHomePage() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      title: "Learn on Your Piano",
      description: "Practice on the exact piano you'll use daily, building familiarity and muscle memory. Learning on your own instrument means you'll develop technique specific to your piano's touch and sound."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 002.163 2.163l1.32.377a1.803 1.803 0 01-.99 3.467l-2.31.66A2.25 2.25 0 019 19.553V15.75z" />
        </svg>
      ),
      title: "Instrument Familiarity",
      description: "Develop a deep connection with your piano from day one. Your instructor can assess your instrument's condition, provide tuning guidance, and help you understand your piano's unique characteristics."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      title: "Private Instruction",
      description: "Receive undivided attention from expert piano teachers. One-on-one lessons ensure every technique, every note, and every concept is thoroughly understood before moving forward."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Family-Friendly Schedule",
      description: "Choose lesson times that work for your entire family. Perfect for parents who want to observe their children's lessons or for families with multiple piano students."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Home Piano Training
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Piano Classes <span className="text-gradient">at Home</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get private piano lessons at your home. One-on-one training with 
              expert instructors in your comfortable space.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 lg:p-8 hover-lift text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Home Classes */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/mz-pic-8.jpg"
                alt="Piano Classes at Home"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Why Choose Home Classes
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Learn on Your <span className="text-gradient">Own Piano</span>
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 text-lg leading-relaxed">
                  Learning piano at home offers unique advantages that can significantly accelerate your 
                  progress. When you learn on your own instrument, you develop technique and muscle memory 
                  that directly applies to your daily practice.
                </p>
                <div className="space-y-3">
                  {[
                    "Practice on the exact piano you'll use every day, building consistent technique",
                    "No travel time means more time for learning and practice",
                    "Comfortable, familiar environment reduces performance anxiety",
                    "Flexible scheduling accommodates family routines and busy schedules",
                    "Learn at your own pace without feeling rushed or compared to others",
                    "Your instructor can assess your piano's condition and provide maintenance guidance"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                What to Expect
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Your Home Piano Learning <span className="text-gradient">Experience</span>
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 text-lg leading-relaxed">
                  Home piano lessons provide a comprehensive musical education tailored to your needs. 
                  Your instructor will arrive at your scheduled time, bringing all necessary teaching 
                  materials and equipment.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Each lesson balances technical exercises, repertoire learning, and music theory. Your 
                  instructor will assess your piano&apos;s condition, provide guidance on instrument 
                  care and tuning, and help you understand how your specific piano&apos;s touch and 
                  sound affect your playing.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  You&apos;ll receive personalized practice assignments, sheet music, and access to 
                  supplementary learning materials. Regular progress assessments ensure you&apos;re 
                  mastering each concept before advancing to more challenging material.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/mz-pic-5.jpg"
                alt="Home Piano Learning Experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Home Learning Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Advantages
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
              Benefits of Learning <span className="text-gradient">at Home</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                title: "Instrument Consistency",
                description: "Learning on your own piano means you develop technique specific to your instrument's touch, weight, and sound. This consistency accelerates progress because you're always practicing on the same piano you learn on."
              },
              {
                title: "Family Learning Environment",
                description: "Perfect for families with multiple piano students or parents who want to observe and support their children's musical education. Family members can learn about piano care and how to support practice between lessons."
              },
              {
                title: "Piano Assessment & Care",
                description: "Your instructor can assess your piano's condition, provide guidance on tuning, maintenance, and optimal placement in your home. You'll learn to care for your instrument properly, ensuring it stays in excellent condition."
              },
              {
                title: "Comfortable Practice Space",
                description: "Since you're learning where you'll practice, your instructor can help you set up an optimal practice environment. This includes proper lighting, seating height, and piano placement for the best learning experience."
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 lg:p-8 hover-lift"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/80 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Tips Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-3xl p-8 lg:p-10">
            <div className="text-center mb-12">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Expert Tips
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
                Making the Most of Home <span className="text-gradient">Piano Lessons</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Preparing for Your Lesson</h3>
                <ul className="space-y-3">
                  {[
                    "Ensure your piano is tuned and in good condition",
                    "Set up proper lighting so you can see the music clearly",
                    "Adjust your bench to the correct height before the lesson",
                    "Have all your practice materials and sheet music ready",
                    "Eliminate distractions - turn off phones and TV",
                    "Prepare questions about pieces or techniques you're working on"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <span className="text-red-500 font-bold">{i + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Between Lessons</h3>
                <ul className="space-y-3">
                  {[
                    "Practice daily, even if just for 15-20 minutes",
                    "Start each practice session with scales and finger exercises",
                    "Review notes from your last lesson before practicing",
                    "Work on the specific pieces and exercises assigned",
                    "Use a metronome to develop steady rhythm",
                    "Record yourself playing to track progress and identify areas to improve"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <span className="text-red-500 font-bold">{i + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready for Home Piano Lessons?
            </h2>
            <p className="text-white/80 mb-8 text-lg leading-relaxed">
              Experience the convenience and effectiveness of learning piano in your own home on your 
              own instrument. Our professional piano instructors are ready to help you achieve your 
              musical goals with personalized, one-on-one instruction. Contact us today to learn more 
              about our home piano lessons and schedule your first session.
            </p>
            <a
              href="https://wa.me/+923224071299"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-500 hover:to-red-600 transition-all font-semibold text-lg"
            >
              Contact Us
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

