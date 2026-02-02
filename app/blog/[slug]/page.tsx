import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import { getBlogPost, getAllBlogSlugs } from "@/lib/data/blog";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
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
      url: `https://mustafazahid.com/blog/${slug}`,
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
      canonical: `https://mustafazahid.com/blog/${slug}`,
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

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(post);

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
            priority
            sizes="(max-width: 768px) 100vw, 800px"
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

