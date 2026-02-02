import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Music Blog | Articles, News & Tutorials",
  description: "Read articles, news & insights about Pakistani music industry, vocal techniques & music education. Latest music news, tutorials & artist features.",
  keywords: "music blog, Pakistani music news, music articles, music tutorials, vocal techniques, music industry news, Pakistani music history, music education",
  
  openGraph: {
    title: "Music Blog - Articles, News & Tutorials",
    description: "Read articles, news, and insights about music and the Pakistani music industry",
    url: "https://mustafazahid.com/blog",
    siteName: "Music Blog",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Music Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Music Blog - Articles & News",
    description: "Read articles, news, and insights about music",
    images: ["/mz-logo.png"],
  },
  
  alternates: {
    canonical: "https://mustafazahid.com/blog",
  },
};

const blogPosts = [
  {
    slug: "history-of-pakistani-music",
    title: "The History of Pakistani Music",
    excerpt: "Explore the rich history and evolution of Pakistani music from traditional to contemporary styles.",
    image: "/mz-logo.png",
    date: "2024-01-15",
    category: "Music History",
  },
  {
    slug: "vocal-techniques",
    title: "Essential Vocal Techniques for Singers",
    excerpt: "Learn professional vocal techniques used by industry experts to improve your singing.",
    image: "/mz-logo.png",
    date: "2024-01-10",
    category: "Tutorial",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
              Articles & News
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold">
              Music <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Insights, tutorials, and news about music and the industry
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {["All", "Music History", "Tutorial", "News", "Reviews"].map((category) => (
              <button
                key={category}
                className="px-6 py-2 glass-card rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-8">
              <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
                Featured
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
                Latest <span className="text-gradient">Articles</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass-card rounded-2xl overflow-hidden hover-lift block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mt-2 mb-3 group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 group-hover:text-red-400 transition-colors">
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Subscribe to our newsletter for the latest music news, tutorials, and articles.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

