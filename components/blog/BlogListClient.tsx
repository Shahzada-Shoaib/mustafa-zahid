'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/data/blog';

interface BlogListClientProps {
  posts: BlogPost[];
  categories: string[];
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

export default function BlogListClient({ posts, categories, featuredPostSlug }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts by category and exclude featured post
  const filteredPosts = posts.filter(post => {
    if (post.slug === featuredPostSlug) return false;
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  if (posts.length === 0) {
    return (
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
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
      {/* Category Filter */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                    : 'glass-card text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                {selectedCategory === 'All' ? 'All' : selectedCategory} <span className="text-gradient">Articles</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${encodeURIComponent(post.slug)}`}
                  className="group glass-card rounded-2xl overflow-hidden hover-lift block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={getValidImageUrl(post.image)}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-600/90 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                      {post.category}
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                      {calculateReadingTime(post.content)} min read
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-red-400 text-sm font-medium group-hover:text-red-300 transition-colors">
                      <span>Read More</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="glass-card rounded-3xl p-12 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">No Posts in This Category</h2>
              <p className="text-white/70 mb-6">Try selecting a different category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
              >
                View All Posts
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

