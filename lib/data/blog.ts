import connectDB from '@/lib/db/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  metadata: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    const posts = await BlogPost.find({}).lean();
    
    if (!posts || !Array.isArray(posts)) {
      return [];
    }
    
    // Convert Mongoose documents to plain objects matching BlogPost interface
    return posts.map(post => {
      const { _id, __v, createdAt, updatedAt, ...postData } = post as any;
      return postData as BlogPost;
    });
  } catch (error) {
    console.error('Error fetching blog posts from database:', error);
    return [];
  }
  
  /* HARDCODED DATA - COMMENTED OUT - NOW USING DATABASE
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
      metadata: {
        title: "The History of Pakistani Music | Music Blog",
        description: "Explore the rich history and evolution of Pakistani music from traditional to contemporary styles. Learn about the cultural heritage and musical traditions of Pakistan.",
        keywords: "Music History, pakistani music, music blog, history of pakistani music, traditional music, contemporary music, pakistani music industry, music culture",
        ogTitle: "The History of Pakistani Music",
        ogDescription: "Explore the rich history and evolution of Pakistani music from traditional to contemporary styles.",
        twitterTitle: "The History of Pakistani Music",
        twitterDescription: "Explore the rich history and evolution of Pakistani music from traditional to contemporary styles.",
      },
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
      metadata: {
        title: "Essential Vocal Techniques for Singers | Music Blog",
        description: "Learn professional vocal techniques used by industry experts to improve your singing. Master breathing, pitch control, and vocal health for better performance.",
        keywords: "Tutorial, vocal techniques, singing tips, music blog, vocal training, singing lessons, vocal health, singing techniques, professional singing",
        ogTitle: "Essential Vocal Techniques for Singers",
        ogDescription: "Learn professional vocal techniques used by industry experts to improve your singing.",
        twitterTitle: "Essential Vocal Techniques for Singers",
        twitterDescription: "Learn professional vocal techniques used by industry experts to improve your singing.",
      },
    },
  ];
  */
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

