import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL("https://mustafazahid.com"),
  title: "Book Qawwali Artists | Hire Qawwals for Weddings & Live Events",
  description: `Book professional Qawwali artists for weddings, mehndi nights, corporate events in Lahore. Authentic Sufi music & live performances. Contact: +92 322 407 1299`,
  keywords:
    "book Qawwali artists, hire Qawwals, Qawwali for wedding, live Qawwali performance, Qawwali group booking, Sufi singers, traditional Qawwali artists, Pakistani Qawwali",

  openGraph: {
    title: "Book Qawwali Artists | Hire Qawwals for Weddings & Events",
    description: `Hire professional Qawwali artists and groups for weddings, mehndi nights, corporate events, and private celebrations. 
Live Qawwali performances that bring authentic Sufi music to your event.`,
    url: "https://mustafazahid.com/qawwals",
    siteName: "Pakistani Music",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Book Qawwali Artists for Weddings & Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Book Qawwali Artists | Hire Qawwals for Weddings & Live Events",
    description: `Hire professional Qawwali artists and groups for weddings, mehndi nights, corporate events, and private events. 
Book live Qawwali performances with authentic Sufi music.`,
    images: ["/mz-logo.png"],
  },

  alternates: {
    canonical: "https://mustafazahid.com/qawwals",
  },
};

const qawwals = [
  // {
  //   slug: "Rahat-fateh-ali-khan",
  //   name: "Rahat Fateh Ali Khan",
  //   image: "/mz-logo.png",
  //   description: "Legendary Qawwali maestro",
  // },
  {
    slug: "book-rahat-fateh-ali-khan-for-wedding-event",
    name: "Rahat Fateh Ali Khan",
    image: "/RFAK.jpg",
    description: "Renowned Qawwali artist",
  },
];

export default function QawwalsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      <section className="relative py-22 lg:pt-32 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Live & Traditional Music
            </span>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Book <span className="text-gradient">Qawwali Singers</span>
            </h1>

            <p className="text-lg text-white/80 max-w-4xl mx-auto">
              Hire professional Qawwals for weddings, mehndi nights, Sufi
              gatherings, corporate events, and private celebrations. Our
              curated Qawwali performers deliver{" "}
              <strong>live Qawwali performances</strong> with soul-stirring
              vocals and rhythmic energy, ensuring every event feels authentic,
              memorable, and deeply moving. Trust our experienced Qawwali
              artists to make your celebration truly unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* About Qawwali Section */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-3xl p-8 lg:p-10 mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="">
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                  Qawwali Group Booking
                </span>

                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                  Book a <span className="text-gradient">Qawwali Group</span>{" "}
                  for Your Event
                </h2>

                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  Looking to <strong>book a Qawwali group</strong> for a
                  wedding, mehndi night, or Sufi gathering? Live Qawwali
                  performances bring spiritual depth, emotional connection, and
                  a powerful atmosphere that transforms any event into a
                  memorable experience.
                </p>

                <p className="text-white/80 text-lg leading-relaxed">
                  We help you <strong>hire professional Qawwals</strong> for
                  weddings, private events, corporate functions, and cultural
                  evenings. From intimate gatherings to large celebrations, our
                  Qawwali group booking service ensures an authentic{" "}
                  <strong>live Qawwali performance</strong> that resonates with
                  every guest.
                </p>
              </div>

              <div className=" relative aspect-[3/2] rounded-2xl overflow-hidden">
                <Image
                  src="/nfak2.jpg"
                  alt="Qawwali Performance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qawwals Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {qawwals.map((qawwal) => (
              <Link
                key={qawwal.slug}
                href={`/qawwals/${qawwal.slug}`}
                className="group glass-card rounded-2xl overflow-hidden hover-lift block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={qawwal.image}
                    alt={qawwal.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                    Qawwali
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {qawwal.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    {qawwal.description}
                  </p>
                  <div className="flex items-center gap-2 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                    <span>View Profile</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
