export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
}

async function getAllBlogPosts(): Promise<BlogPost[]> {
  /**
   * TODO: Replace with database query when database is set up
   * Example: return await db.blogPost.findMany({ where: { published: true } });
   */
  
  return [
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
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const posts = await getAllBlogPosts();
    return posts.find((p) => p.slug === slug);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return undefined;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const posts = await getAllBlogPosts();
    return posts.map((p) => p.slug);
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

