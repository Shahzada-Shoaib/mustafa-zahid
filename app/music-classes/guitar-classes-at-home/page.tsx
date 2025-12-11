import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Guitar Classes at Home | Private Guitar Lessons | Home Guitar Training",
  description: "Get private guitar classes at your home. One-on-one guitar lessons with expert instructors. Convenient home-based guitar training for all levels. Book now for guitar lessons at home in Pakistan.",
  keywords: "guitar classes at home, private guitar lessons, home guitar training, guitar tutor at home, guitar lessons at home, home guitar classes Karachi, private guitar instructor, guitar classes at home Lahore, home guitar lessons Pakistan",
  
  openGraph: {
    title: "Guitar Classes at Home - Private Guitar Lessons",
    description: "Get private guitar classes at your home. One-on-one lessons with expert instructors.",
    url: "https://mustafazahid.com/music-classes/guitar-classes-at-home",
    siteName: "Music Classes",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Guitar Classes at Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Guitar Classes at Home - Private Lessons",
    description: "Get private guitar classes at your home",
    images: ["/mz-logo.png"],
  },
  
  alternates: {
    canonical: "https://mustafazahid.com/music-classes/guitar-classes-at-home",
  },
};

export default function GuitarClassesAtHomePage() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      title: "Learn in Your Space",
      description: "No need to travel - our expert instructors come directly to your home, saving you time and creating a comfortable learning environment where you can focus entirely on your musical development."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      title: "One-on-One Attention",
      description: "Receive undivided attention from your instructor. Every lesson is tailored to your specific needs, learning style, and musical goals, ensuring maximum progress in minimal time."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Flexible Scheduling",
      description: "Choose lesson times that fit perfectly into your schedule. Whether you prefer morning sessions before work or evening lessons after school, we accommodate your lifestyle."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Accelerated Learning",
      description: "With personalized instruction and no distractions, you'll progress faster than in group settings. Your instructor can immediately address your specific challenges and build on your strengths."
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
              Home Guitar Training
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Guitar Classes <span className="text-gradient">at Home</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get private guitar lessons at your home. One-on-one training with 
              expert instructors in the comfort of your own space.
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/mz-pic-9.jpg"
                alt="Guitar Classes at Home"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div>
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Why Choose Home Classes
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Learn in Your <span className="text-gradient">Comfort Zone</span>
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 text-lg leading-relaxed">
                  Learning guitar at home offers unique advantages that can significantly enhance your 
                  musical journey. In the comfort of your own space, you can focus entirely on learning 
                  without the distractions of a studio environment.
                </p>
                <div className="space-y-3">
                  {[
                    "Practice on your own guitar, building familiarity with your instrument",
                    "No travel time means more time for learning and practice",
                    "Comfortable environment reduces performance anxiety and nervousness",
                    "Flexible scheduling accommodates your work, school, or family commitments",
                    "Learn at your own pace without feeling rushed or compared to others",
                    "Your instructor can assess your practice space and provide setup guidance"
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
                Your Home Learning <span className="text-gradient">Experience</span>
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 text-lg leading-relaxed">
                  When you choose home guitar lessons, you&apos;re investing in a personalized learning 
                  experience designed around your needs. Your instructor will arrive at your scheduled 
                  time, bringing all necessary teaching materials and equipment.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Each lesson is structured to maximize your progress while remaining flexible enough to 
                  address your immediate questions and challenges. Your instructor will assess your guitar 
                  setup, provide guidance on instrument care, and help you create an optimal practice 
                  environment in your home.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  You&apos;ll receive personalized practice assignments, video resources, and ongoing 
                  support between lessons. Your instructor will track your progress closely and adjust 
                  the curriculum to match your learning pace and musical interests.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/mz-pic-6.jpg"
                alt="Home Guitar Learning Experience"
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
                title: "Convenience & Time Savings",
                description: "Eliminate travel time and expenses. Your instructor comes to you, allowing you to use that saved time for practice or other activities. This is especially valuable for busy professionals, students, and families with tight schedules."
              },
              {
                title: "Comfortable Learning Environment",
                description: "Learn in a space where you feel relaxed and confident. This comfort level can significantly reduce performance anxiety, allowing you to focus better and make mistakes without feeling self-conscious."
              },
              {
                title: "Personalized Instruction",
                description: "With one-on-one attention, your instructor can immediately identify and address your specific challenges. Lessons are tailored to your learning style, pace, and musical goals, ensuring maximum efficiency."
              },
              {
                title: "Family-Friendly Option",
                description: "Perfect for families with multiple learners or parents who want to observe lessons. Children especially benefit from learning in a familiar environment, and parents can be more involved in their musical education."
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
                Making the Most of Home <span className="text-gradient">Lessons</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Preparing for Your Lesson</h3>
                <ul className="space-y-3">
                  {[
                    "Set up a dedicated practice space with good lighting",
                    "Ensure your guitar is tuned and ready before the lesson",
                    "Have a notebook or device ready to take notes",
                    "Eliminate distractions - turn off phones and TV",
                    "Prepare questions about songs or techniques you're working on",
                    "Keep your practice materials organized and accessible"
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
                    "Review notes from your last lesson before practicing",
                    "Record yourself playing to track progress",
                    "Work on the specific exercises your instructor assigned",
                    "Don't skip warm-up exercises - they prevent injury",
                    "Stay in touch with your instructor if you have questions"
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
              Ready for Home Guitar Lessons?
            </h2>
            <p className="text-white/80 mb-8 text-lg leading-relaxed">
              Experience the convenience and effectiveness of learning guitar in your own home. 
              Our professional instructors are ready to help you achieve your musical goals with 
              personalized, one-on-one instruction tailored to your needs. Contact us today to 
              learn more about our home guitar lessons and schedule your first session.
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

