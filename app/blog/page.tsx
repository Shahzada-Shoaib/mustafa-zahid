import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import { getAllBlogPosts } from "@/lib/data/blog";
import BlogListClient from "@/components/blog/BlogListClient";

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

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to validate and sanitize image URL
function getValidImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return '/mz-logo.png';
  }
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/')) {
    try {
      if (imageUrl.startsWith('http')) {
        new URL(imageUrl);
      }
      return imageUrl;
    } catch {
      return '/mz-logo.png';
    }
  }
  
  return '/mz-logo.png';
}

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();
  
  // Get all unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  const allCategories = ['All', ...categories];
  
  // Featured post (latest/first post)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
              Articles & News
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold">
              Music <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4">
              Insights, tutorials, and news about music and the industry
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post Hero */}
      {featuredPost && (
        <section className="py-6 sm:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <Link
              href={`/blog/${encodeURIComponent(featuredPost.slug)}`}
              className="group block"
            >
              <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden hover-lift">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden">
                    <Image
                      src={getValidImageUrl(featuredPost.image)}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/90 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white font-medium">
                      Featured
                    </div>
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <span className="inline-block px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white font-medium mb-2 sm:mb-3">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white/5 to-white/0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/60 mb-3 sm:mb-4">
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{calculateReadingTime(featuredPost.content)} min read</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{featuredPost.author}</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 group-hover:text-red-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-red-400 text-sm sm:text-base font-medium group-hover:text-red-300 transition-colors min-h-[44px] touch-manipulation">
                      <span>Read Article</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog List with Category Filtering */}
      <BlogListClient 
        posts={blogPosts} 
        categories={allCategories}
        featuredPostSlug={featuredPost?.slug}
      />

      {/* Newsletter Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Stay Updated
            </h2>
            <p className="text-white/80 mb-6 sm:mb-8 text-base sm:text-lg">
              Subscribe to our newsletter for the latest music news, tutorials, and articles.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-red-500 transition-colors"
              />
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-500 active:bg-red-700 transition-colors font-semibold text-sm sm:text-base min-h-[44px] touch-manipulation">
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
