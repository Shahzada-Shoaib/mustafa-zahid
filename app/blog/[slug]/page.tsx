import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

async function getBlogPost(slug: string) {
  const posts = [
    {
      slug: "history-of-pakistani-music",
      title: "The History of Pakistani Music",
      content: "<p>Full blog post content here about the history of Pakistani music...</p>",
      image: "/mz-logo.png",
      date: "2024-01-15",
      author: "Music Editor",
      category: "Music History",
      excerpt: "Explore the rich history and evolution of Pakistani music from traditional to contemporary styles.",
    },
    {
      slug: "vocal-techniques",
      title: "Essential Vocal Techniques for Singers",
      content: "<p>Full blog post content here about vocal techniques...</p>",
      image: "/mz-logo.png",
      date: "2024-01-10",
      author: "Music Editor",
      category: "Tutorial",
      excerpt: "Learn professional vocal techniques used by industry experts to improve your singing.",
    },
  ];
  
  return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    metadataBase: new URL('https://mustafazahid.com'),
    title: `${post.title} | Music Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    keywords: `${post.category}, music blog, ${post.title}`,
    
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      url: `https://mustafazahid.com/blog/${params.slug}`,
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
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: [post.image],
    },
    
    alternates: {
      canonical: `https://mustafazahid.com/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="mb-8">
          <span className="text-red-400 text-sm uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>{post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div 
          className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-p:leading-relaxed prose-p:text-lg prose-a:text-red-400 prose-strong:text-white prose-ul:text-white/80 prose-ol:text-white/80"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Articles */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Music Theory Basics", category: "Tutorial", image: "/mz-logo.png" },
              { title: "Pakistani Music Industry", category: "News", image: "/mz-logo.png" },
              { title: "Vocal Health Tips", category: "Tutorial", image: "/mz-logo.png" }
            ].map((article, index) => (
              <Link
                key={index}
                href="/blog"
                className="group glass-card rounded-xl overflow-hidden hover-lift block"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-red-400 text-xs uppercase tracking-wider">{article.category}</span>
                  <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-red-400 transition-colors">
                    {article.title}
                  </h3>
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

