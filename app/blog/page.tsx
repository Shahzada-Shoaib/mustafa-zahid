import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import { getAllBlogPosts } from "@/lib/data/blog";
import BlogListClient from "@/components/blog/BlogListClient";

// Use dynamic rendering so listings reflect CMS updates without rebuild
export const dynamic = "force-dynamic";

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

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-6 sm:pt-14 sm:pb-8 lg:pt-16 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center space-y-3 sm:space-y-4">
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

      {/* Blog list */}
      <BlogListClient 
        posts={blogPosts}
      />

      <Footer />
    </div>
  );
}
