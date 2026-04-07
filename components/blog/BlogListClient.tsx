'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/data/blog';

interface BlogListClientProps {
  posts: BlogPost[];
  featuredPostSlug?: string;
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

export default function BlogListClient({ posts, featuredPostSlug }: BlogListClientProps) {
  // Exclude featured post from the main list
  const filteredPosts = posts.filter((post) => post.slug !== featuredPostSlug);

  if (posts.length === 0) {
    return (
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="glass-card rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">No Blog Posts Yet</h2>
            <p className="text-white/70">Check back soon for new articles and updates.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Blog posts — vertical list of horizontal cards */}
      {filteredPosts.length > 0 ? (
        <section className="pt-0 pb-8 sm:pb-10 lg:pb-12">
          <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-4 sm:mb-5">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                All <span className="text-gradient">Articles</span>
              </h2>
            </div>
            <ul className="flex flex-col gap-4 sm:gap-5">
              {filteredPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    className="group glass-card rounded-2xl sm:rounded-3xl overflow-hidden hover-lift flex flex-col sm:flex-row sm:items-stretch touch-manipulation border border-white/[0.06] outline-none focus-visible:ring-2 focus-visible:ring-red-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                  >
                    <div className="relative aspect-[16/10] sm:aspect-auto sm:w-[min(42%,280px)] sm:min-h-[200px] sm:max-w-[300px] shrink-0 overflow-hidden">
                      <Image
                        src={getValidImageUrl(post.image)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent sm:from-black/35 sm:via-transparent sm:to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600/90 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white font-medium">
                        {post.category}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/55 backdrop-blur-sm rounded-full text-[10px] sm:text-xs text-white">
                        {calculateReadingTime(post.content)} min read
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-4 sm:p-6 lg:p-7 min-h-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs text-white/55 mb-2 sm:mb-3">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                        <span className="text-white/30" aria-hidden>•</span>
                        <span>{post.author}</span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-red-400 text-xs sm:text-sm font-medium group-hover:text-red-300 transition-colors mt-auto">
                        Read article
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">No More Posts</h2>
              <p className="text-white/70 text-sm sm:text-base">New articles will appear here soon.</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

