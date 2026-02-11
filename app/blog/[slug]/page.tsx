import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import { getBlogPost, getAllBlogSlugs, getAllBlogPosts } from "@/lib/data/blog";

// Use dynamic rendering to avoid build-time database issues
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    
    if (!Array.isArray(slugs)) {
      return [];
    }
    
    return slugs.map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return [];
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getBlogPost(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    metadataBase: new URL('https://mustafazahid.com'),
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
    
    openGraph: {
      title: post.metadata.ogTitle,
      description: post.metadata.ogDescription,
      url: `https://mustafazahid.com/blog/${encodeURIComponent(slug)}`,
      siteName: "Music Blog",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    
    twitter: {
      card: "summary_large_image",
      title: post.metadata.twitterTitle,
      description: post.metadata.twitterDescription,
      images: [post.image],
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
      canonical: `https://mustafazahid.com/blog/${encodeURIComponent(slug)}`,
    },
  };
}

function generateArticleSchema(post: Awaited<ReturnType<typeof getBlogPost>>) {
  if (!post) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://mustafazahid.com${post.image}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mustafa Zahid",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mustafazahid.com/mz-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mustafazahid.com/blog/${post.slug}`
    },
    "articleBody": post.content.replace(/<[^>]*>/g, '').substring(0, 500) + "..."
  };
}

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to validate image URL
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

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, exclude current)
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // If not enough posts in same category, fill with other posts
  if (relatedPosts.length < 3) {
    const otherPosts = allPosts
      .filter(p => p.slug !== post.slug && !relatedPosts.some(rp => rp.slug === p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...otherPosts);
  }

  const articleSchema = generateArticleSchema(post);
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white active:text-white mb-6 sm:mb-8 transition-colors group min-h-[44px] touch-manipulation"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Back to Blog</span>
          </Link>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8">
            <Image
              src={getValidImageUrl(post.image)}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 xl:p-12">
              <div className="max-w-4xl">
                <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600/90 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white font-medium mb-3 sm:mb-4">
                  {post.category}
                </span>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base text-white/90">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{post.author}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12 lg:pb-16">
        <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12">
          <div 
            className="prose prose-invert max-w-none 
              prose-headings:text-white prose-headings:font-display
              prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4 sm:prose-h1:mb-6 prose-h1:mt-6 sm:prose-h1:mt-8
              prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:mt-6 sm:prose-h2:mt-8
              prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-2 sm:prose-h3:mb-3 prose-h3:mt-4 sm:prose-h3:mt-6
              prose-p:text-white/90 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base lg:prose-p:text-lg prose-p:mb-4 sm:prose-p:mb-6
              prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300 active:prose-a:text-red-200 prose-a:font-medium prose-a:break-words
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-white/90 prose-ul:mb-4 sm:prose-ul:mb-6 prose-ul:space-y-2 prose-ul:text-sm sm:prose-ul:text-base
              prose-ol:text-white/90 prose-ol:mb-4 sm:prose-ol:mb-6 prose-ol:space-y-2 prose-ol:text-sm sm:prose-ol:text-base
              prose-li:marker:text-red-400
              prose-blockquote:border-l-red-500 prose-blockquote:pl-4 sm:prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/80 prose-blockquote:text-sm sm:prose-blockquote:text-base
              prose-img:rounded-xl sm:prose-img:rounded-2xl prose-img:my-6 sm:prose-img:my-8 prose-img:w-full prose-img:h-auto
              prose-code:text-red-400 prose-code:bg-white/10 prose-code:px-1.5 sm:prose-code:px-2 prose-code:py-0.5 sm:prose-code:py-1 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm
              prose-pre:bg-white/5 prose-pre:rounded-xl prose-pre:text-xs sm:prose-pre:text-sm prose-pre:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-8 sm:mb-12 text-center">
              <span className="text-red-500 uppercase tracking-[0.3em] text-xs sm:text-sm font-medium">
                Continue Reading
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4">
                Related <span className="text-gradient">Articles</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${encodeURIComponent(relatedPost.slug)}`}
                  className="group glass-card rounded-xl sm:rounded-2xl overflow-hidden hover-lift block touch-manipulation"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={getValidImageUrl(relatedPost.image)}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-600/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white font-medium">
                      {relatedPost.category}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/60 mb-2 sm:mb-3">
                      <span>{new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{calculateReadingTime(relatedPost.content)} min read</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm font-medium group-hover:text-red-300 transition-colors min-h-[32px] sm:min-h-[36px]">
                      <span>Read More</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
