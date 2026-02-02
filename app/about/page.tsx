import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://mustafazahid.com"),
  title: "About | Mustafa Zahid Official Website",
  description: "This is the official website of Mustafa Zahid. Manage bookings, inquiries, and queries for events, performances, and collaborations. Your trusted platform for connecting with Mustafa Zahid.",
  keywords: "Mustafa Zahid official website, Mustafa Zahid booking, contact Mustafa Zahid, Mustafa Zahid inquiries, official website",
  
  openGraph: {
    title: "About | Mustafa Zahid Official Website",
    description: "The official website of Mustafa Zahid. Manage bookings, inquiries, and queries for events and performances.",
    url: "https://mustafazahid.com/about",
    siteName: "Mustafa Zahid Official",
    images: [
      {
        url: "https://mustafazahid.com/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Mustafa Zahid Official Website",
      },
    ],
    
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About | Mustafa Zahid Official Website",
    description: "The official website of Mustafa Zahid. Manage bookings, inquiries, and queries for events and performances.",
    images: ["/mz-logo.png"],
  },

  alternates: {
    canonical: "https://mustafazahid.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Official Website
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              About <span className="text-gradient">Mustafa Zahid</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Welcome to the official website of Mustafa Zahid
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-3xl p-8 lg:p-12 space-y-6">
            <div className="space-y-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                Official Website
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                This is the official website of Mustafa Zahid, a renowned Pakistani singer, 
                songwriter, and lead vocalist of the band Roxen. This platform serves as the 
                primary channel for managing all bookings, inquiries, and queries related to 
                Mustafa Zahid's professional engagements.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                Booking & Inquiries
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                Whether you're looking to book Mustafa Zahid for a concert, event, wedding, 
                or any other special occasion, this website provides a streamlined process 
                for all booking requests and inquiries. Our team manages all queries 
                efficiently to ensure timely responses and smooth coordination for your events.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                Your Trusted Platform
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                This official website is your direct connection to Mustafa Zahid's team. 
                All official communications, booking confirmations, and event-related 
                information are managed through this platform. We are committed to providing 
                professional service and ensuring that all your queries are addressed 
                promptly and accurately.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                Get in Touch
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                For any bookings, inquiries, or questions, please feel free to reach out 
                through the contact information provided on this website. We look forward 
                to hearing from you and helping make your event a memorable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

