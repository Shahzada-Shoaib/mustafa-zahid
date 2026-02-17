import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import { type Qawwal, getQawwal, getAllQawwalSlugs } from "@/lib/data/qawwals";

export async function generateStaticParams() {
  try {
    const slugs = await getAllQawwalSlugs();
    
    if (!Array.isArray(slugs)) {
      return [];
    }
    
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for qawwals:', error);
    return [];
  }
}

function generateStructuredData(qawwal: Qawwal) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: qawwal.name,
    jobTitle: qawwal.seo?.structuredData?.jobTitle || "Qawwali Singer",
    description: qawwal.bio,
    birthDate: qawwal.birthDate,
    birthPlace: {
      "@type": "Place",
      name: qawwal.birthplace,
    },
    url: `https://mustafazahid.com/qawwals/${qawwal.slug}`,
    image: `https://mustafazahid.com${qawwal.image}`,
    knowsAbout: qawwal.seo?.structuredData?.knowsAbout || [
      "Qawwali",
      "Sufi Music",
      "Traditional Music",
      "Pakistani Music",
    ],
    award: qawwal.awards.map((award) => `${award.name} - ${award.year}`),
  };
}

function generateFAQSchema(qawwal: Qawwal) {
  // Use custom FAQs if available, otherwise use default template
  const faqs = qawwal.seo?.faqs || [
    {
      question: `How can I book ${qawwal.name} for a wedding or live event?`,
      answer: `If you are looking to book ${qawwal.name} for a wedding, Qawwali night, or live performance, you can contact us directly via WhatsApp at +92 322 407 1299. We manage official bookings for ${qawwal.name} for weddings, corporate events, concerts, and private functions in Pakistan and internationally.`,
    },
    {
      question: `What is the booking price of ${qawwal.name}?`,
      answer: `The booking price of ${qawwal.name} depends on the event type, city, performance duration, and technical requirements. For the latest ${qawwal.name} booking charges and availability, please contact us on WhatsApp at +92 322 407 1299 for an accurate quote.`,
    },
    {
      question: `Can I hire ${qawwal.name} for a wedding Qawwali performance?`,
      answer: `Yes, ${qawwal.name} is available to hire for wedding Qawwali performances, mehndi nights, and spiritual gatherings. Clients frequently book ${qawwal.name} for weddings to create a soulful and unforgettable atmosphere. Contact us on WhatsApp to check date availability and performance details.`,
    },
    {
      question: `Is ${qawwal.name} available for corporate events and Qawwali nights?`,
      answer: `${qawwal.name} is available for corporate events, Sufi nights, cultural festivals, and private Qawwali gatherings. If you are planning to hire ${qawwal.name} for a corporate event or spiritual evening, reach out via WhatsApp at +92 322 407 1299 for booking details.`,
    },
  ];

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
  const qawwal = await getQawwal(slug);

  if (!qawwal) {
    return {
      title: "Qawwal Not Found",
      description: "The requested qawwal page could not be found.",
    };
  }

  return {
    metadataBase: new URL("https://mustafazahid.com"),
    title: qawwal.metadata.title,
    description: qawwal.metadata.description,
    keywords: qawwal.metadata.keywords,

    openGraph: {
      title: qawwal.metadata.ogTitle,
      description: qawwal.metadata.ogDescription,
      url: `https://mustafazahid.com/qawwals/${slug}`,
      siteName: "Mustafa Zahid - Music & Events",
      images: [
        {
          url: qawwal.image,
          width: 1200,
          height: 630,
          alt: `Book ${qawwal.name} for Event - ${qawwal.name} Qawwali Booking`,
        },
      ],
      locale: "en_US",
      type: "profile",
    },

    twitter: {
      card: "summary_large_image",
      title: qawwal.metadata.twitterTitle,
      description: qawwal.metadata.twitterDescription,
      images: [qawwal.image],
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
      canonical: `https://mustafazahid.com/qawwals/${slug}`,
    },
  };
}

export default async function QawwalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const qawwal = await getQawwal(slug);

  if (!qawwal) {
    notFound();
  }

  const bookingMessage = encodeURIComponent(
    `Hello, I would like to book ${qawwal.name} for an event. Please provide more information about availability and pricing.`
  );
  const whatsappLink = `https://wa.me/+923224071299?text=${bookingMessage}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData(qawwal)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(qawwal)),
        }}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <AnimatedBackground />
        <Header />

        {/* Hero Section with Booking CTA */}
        <section className="relative py-20 lg:pt-32 pb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative aspect-[2/2] rounded-3xl overflow-hidden group">
                <Image
                  src={qawwal.image}
                  alt={`${qawwal.name} - Qawwali Artist available for booking`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/90 backdrop-blur-sm rounded-full text-sm font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Available for Booking</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <span className="inline-block text-red-500 uppercase tracking-[0.3em] text-sm font-medium mb-4">
                    Qawwali Artist
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
                    {qawwal.name}
                  </h1>
                  <p className="text-xl text-white/90 leading-relaxed mb-6">
                    {qawwal.bio}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4 py-6 border-y border-white/10">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {qawwal.stats.performances}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Performances
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {qawwal.stats.recordings}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Recordings
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {qawwal.stats.awards}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Awards
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                      {new Date().getFullYear() - qawwal.careerStart}+
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Years
                    </div>
                  </div>
                </div>

                {/* Booking CTA - Hero */}
                <div className="pt-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-base font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Book {qawwal.name} Now</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
                  </a>
                  <p className="text-sm text-white/70 mt-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Available for Qawwali performances, concerts, and spiritual
                    gatherings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Banner */}
        <section className="py-8 bg-gradient-to-r from-red-950/30 via-red-900/20 to-red-950/30 border-y border-red-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: "Views", value: qawwal.stats.views },
                { label: "Streams", value: qawwal.stats.streams },
                { label: "Followers", value: qawwal.stats.followers },
                { label: "Recordings", value: `${qawwal.stats.recordings}` },
                { label: "Awards", value: `${qawwal.stats.awards}` },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="py-4 lg:py-8 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="glass-card rounded-3xl p-8 lg:p-12">
              <div className="mb-8">
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                  About {qawwal.name}
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                  Biography
                </h2>
              </div>
              <div className="prose prose-invert max-w-none space-y-6">
                {qawwal.fullBio.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-white/90 text-lg leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Achievements */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <h3 className="text-2xl md:text-3xl font-semibold mb-8">
                  Key Achievements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {qawwal.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-white/90">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Performances Section */}
        <section className="py-4 lg:py-8 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12 text-center">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Performances
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                Popular <span className="text-gradient">Qawwalis</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qawwal.performances.map((performance, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 hover-lift group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all">
                      <svg
                        className="w-7 h-7 text-red-400 group-hover:text-white transition-colors"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0013 13c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-3">
                      {performance.year && (
                        <span className="text-white/40 text-xs">
                          {performance.year}
                        </span>
                      )}
                      <span className="text-white/60 text-sm font-bold">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors mb-2">
                    {performance.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {performance.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        {/* {qawwal.gallery.length > 0 && (
          <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <div className="mb-12 text-center">
                <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                  Gallery
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                  Photo <span className="text-gradient">Gallery</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {qawwal.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden hover-lift group cursor-pointer">
                    <Image
                      src={image}
                      alt={`${qawwal.name} - Photo ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )} */}

        {/* Booking Section - Prominent CTA */}
        <section className="py-6 lg:py-8 bg-gradient-to-b from-transparent via-red-950/30 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="glass-card rounded-3xl p-8 lg:p-16 text-center border-2 border-red-500/20">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                  Book {qawwal.name} Now
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  Book <span className="text-gradient">{qawwal.name}</span> for
                  Your Event
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  {qawwal.name} is available for booking for Qawwali
                  performances, concerts, weddings, corporate events, and
                  spiritual gatherings. Experience the authentic beauty of
                  Qawwali by booking {qawwal.name} for your event. Contact us
                  now to discuss your event requirements and secure your
                  booking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-lg font-semibold hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-2xl shadow-red-900/40 hover:shadow-red-900/60 hover:scale-105"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Book via WhatsApp</span>
                  <svg
                    className="w-6 h-6 transition-transform group-hover:translate-x-1"
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
                </a>
                <a
                  href={`tel:+923224071299`}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border-2 border-white/20 hover:border-white/40"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Call Now: +92 322 407 1299</span>
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: "🎵",
                    title: "Qawwali Performances",
                    desc: "Authentic traditional Sufi music",
                  },
                  {
                    icon: "💒",
                    title: "Weddings",
                    desc: "Add spiritual depth to your celebration",
                  },
                  {
                    icon: "🏢",
                    title: "Corporate Events",
                    desc: "Cultural entertainment for business",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-12 text-center">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Frequently Asked Questions
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
                Booking <span className="text-gradient">Questions</span>
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: `How to book ${qawwal.name} for an event?`,
                  a: `To book ${qawwal.name} for your event, concert, or wedding, contact us via WhatsApp at +92 322 407 1299. We handle bookings for ${qawwal.name} for various events including Qawwali performances, concerts, weddings, and spiritual gatherings across Pakistan and internationally. Our team will assist you with all booking details and requirements.`,
                },
                {
                  q: `What is the booking price for ${qawwal.name}?`,
                  a: `The booking price for ${qawwal.name} varies depending on the type of event, location, and duration. For detailed pricing information and availability for ${qawwal.name} Qawwali booking, please contact us directly via WhatsApp at +92 322 407 1299. We provide transparent pricing and will work with you to create a package that fits your budget.`,
                },
                {
                  q: `Can I book ${qawwal.name} for a wedding?`,
                  a: `Yes, ${qawwal.name} is available for wedding bookings. ${qawwal.name} performs Qawwali at weddings and special events, adding spiritual depth and cultural richness to your celebration. Contact us via WhatsApp to discuss your wedding event requirements, preferred dates, and availability for ${qawwal.name} booking.`,
                },
                {
                  q: `Is ${qawwal.name} available for corporate events?`,
                  a: `Yes, ${qawwal.name} is available for corporate events, product launches, and business functions. For corporate event booking inquiries for ${qawwal.name} Qawwali performance, please contact us via WhatsApp at +92 322 407 1299. ${qawwal.name} brings cultural authenticity and entertainment to corporate gatherings.`,
                },
                {
                  q: `How can I contact ${qawwal.name} for booking?`,
                  a: `You can contact us to book ${qawwal.name} by sending a WhatsApp message to +92 322 407 1299. Our team will assist you with booking ${qawwal.name} for Qawwali performances, concerts, events, weddings, or corporate functions. We respond quickly and will help you with all the details you need for your event.`,
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 hover-lift"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="text-red-400 flex-shrink-0">
                      Q{index + 1}.
                    </span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-white/80 leading-relaxed pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
