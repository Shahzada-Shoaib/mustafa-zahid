import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Singing Classes at Home in Lahore | Private Vocal Lessons & Training",
  description: "Get private singing classes at your home in Lahore. One-on-one vocal training with expert instructors for beginners to advanced singers. Convenient home-based singing lessons. Book now for private singing classes in Lahore.",
  keywords: "singing classes at home Lahore, private singing lessons Lahore, home vocal training Lahore, singing tutor at home Lahore, voice lessons at home Lahore, home singing classes Lahore, private vocal instructor Lahore, one-on-one singing lessons Lahore, home singing training Lahore",

  openGraph: {
    title: "Singing Classes at Home in Lahore | Private Vocal Lessons",
    description: "Book private singing classes at your home in Lahore. One-on-one vocal training with expert instructors for beginners to advanced singers.",
    url: "https://mustafazahid.com/music-classes/singing-classes-at-home",
    siteName: "Music Classes",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Singing Classes at Home in Lahore",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Singing Classes at Home in Lahore | Private Vocal Lessons",
    description: "Get one-on-one private singing lessons at your home in Lahore. Learn vocal techniques and performance skills with expert instructors.",
    images: ["/mz-logo.png"],
  },

  alternates: {
    canonical: "https://mustafazahid.com/music-classes/singing-classes-at-home",
  },
};


export default function SingingClassesAtHomePage() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      title: "Learn in Your Space",
      description: "Practice in the comfort of your own home where you feel most relaxed. This familiar environment helps reduce performance anxiety and allows you to focus entirely on developing your voice without distractions."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728m0 0l-4.008-4.008m4.008 4.008L15 16.364M4.886 18.364a9 9 0 010-12.728m0 0l4.008 4.008m-4.008-4.008L9 7.636" />
        </svg>
      ),
      title: "Private Vocal Training",
      description: "Receive undivided attention from expert vocal instructors. One-on-one sessions ensure that every aspect of your voice development is carefully monitored and personalized to your unique vocal characteristics and goals."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Flexible Scheduling",
      description: "Choose lesson times that perfectly fit your schedule. Whether you're a working professional, student, or parent, we accommodate your availability to make vocal training convenient and sustainable."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672h13.677c.513 0 .923-.41.923-.923V18.92c0-.716-.372-1.377-1.027-1.728l-5.362-2.787a3.023 3.023 0 00-2.14 0l-5.362 2.787c-.655.35-1.027 1.012-1.027 1.728v1.83c0 .512.41.922.923.922z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Personalized Approach",
      description: "Every lesson is customized based on your voice type, range, and musical interests. Your instructor adapts teaching methods to your learning style, ensuring optimal progress and vocal health."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt -24 lg:pt-32 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Home Vocal Training
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Singing Classes <span className="text-gradient">at Home</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get private singing lessons at your home. Personalized vocal training 
              with expert instructors in your comfortable space.
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
            <div>
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Why Choose Home Classes
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Sing in Your <span className="text-gradient">Comfort Zone</span>
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 text-lg leading-relaxed">
                  Learning to sing at home provides a unique advantage for vocal development. In your 
                  familiar environment, you can focus entirely on technique without the self-consciousness 
                  that sometimes comes with studio settings.
                </p>
                <div className="space-y-3">
                  {[
                    "Practice in a space where you feel completely comfortable and relaxed",
                    "No travel time means more energy for singing and learning",
                    "Private sessions ensure complete focus on your vocal development",
                    "Flexible scheduling accommodates your work, school, or family life",
                    "Learn at your own pace without feeling rushed or compared to others",
                    "Your instructor can assess your home practice space and provide acoustic guidance"
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/music-listening1.png"
                alt="Singing Classes at Home"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/music-notes.jpg"
                alt="Home Singing Learning Experience"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                What to Expect
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Your Home Vocal Training <span className="text-gradient">Experience</span>
              </h2>
              <div className="space-y-4">
                <p className="text-white/80 text-lg leading-relaxed">
                  Home singing lessons offer a personalized approach to vocal development. Your instructor 
                  will arrive at your scheduled time, bringing all necessary teaching materials and equipment 
                  needed for your lesson.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  Each session is carefully structured to balance vocal exercises, technique work, and 
                  song practice. Your instructor will assess your home environment, provide guidance on 
                  creating an optimal practice space, and help you understand how room acoustics affect 
                  your singing.
                </p>
                <p className="text-white/80 text-lg leading-relaxed">
                  You&apos;ll receive personalized vocal exercises, practice recordings, and ongoing support 
                  between lessons. Your instructor will track your progress in pitch accuracy, range 
                  expansion, tone quality, and overall vocal health.
                </p>
              </div>
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
                title: "Reduced Performance Anxiety",
                description: "Singing in your own space eliminates the nervousness that can come with unfamiliar environments. This comfort level allows you to take vocal risks, experiment with your voice, and make mistakes without feeling self-conscious."
              },
              {
                title: "Optimal Vocal Health",
                description: "Your instructor can assess your home environment and provide guidance on humidity, temperature, and acoustic conditions that affect vocal health. You'll learn to create an optimal practice space in your own home."
              },
              {
                title: "Family Involvement",
                description: "Perfect for families with multiple singers or parents who want to observe and support their children's vocal development. Family members can learn about vocal health and how to support practice between lessons."
              },
              {
                title: "Consistent Practice Environment",
                description: "Since you're learning where you'll practice, your instructor can help you set up your practice space optimally. This consistency helps build muscle memory and makes practice more effective."
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
                Making the Most of Home <span className="text-gradient">Vocal Lessons</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Preparing for Your Lesson</h3>
                <ul className="space-y-3">
                  {[
                    "Stay well-hydrated throughout the day before your lesson",
                    "Warm up your voice gently 10-15 minutes before the instructor arrives",
                    "Ensure your practice space is quiet and free from distractions",
                    "Have water nearby to keep your vocal cords hydrated",
                    "Prepare questions about songs or techniques you're working on",
                    "Keep your practice materials and sheet music organized"
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
                    "Practice vocal exercises daily, even if just for 10-15 minutes",
                    "Record yourself singing to track progress and identify areas to improve",
                    "Review notes from your last lesson before practicing",
                    "Work on the specific exercises your instructor assigned",
                    "Never practice when your voice is tired or hoarse",
                    "Maintain good vocal health habits: hydration, rest, and proper technique"
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
              Ready for Home Singing Lessons?
            </h2>
            <p className="text-white/80 mb-8 text-lg leading-relaxed">
              Experience the convenience and effectiveness of learning to sing in your own home. 
              Our professional vocal instructors are ready to help you discover and develop your 
              unique voice with personalized, one-on-one instruction. Contact us today to learn 
              more about our home singing lessons and schedule your first session.
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

