import connectDB from '@/lib/db/mongodb';
import Class from '@/lib/models/Class';

export interface Class {
  slug: string;
  title: string;
  type: 'studio' | 'at-home';
  instrument: 'guitar' | 'piano' | 'singing';
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    heroImage: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  curriculum: Array<{
    text: string;
  }>;
  learningPaths: Array<{
    stage: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  practiceTips: {
    routineTips: string[];
    mistakes: string[];
  };
  cta: {
    title: string;
    description: string;
  };
  images: {
    heroImage: string;
    curriculumImage: string;
    teachingImage: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogUrl: string;
    ogImage: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
    canonical: string;
    robots: string;
  };
  seo?: {
    structuredData?: {
      jobTitle?: string;
      knowsAbout?: string[];
    };
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export async function getAllClasses(): Promise<Class[]> {
  try {
    await connectDB();
    const classes = await Class.find({}).lean();
    
    if (!classes || !Array.isArray(classes)) {
      return [];
    }
    
    // Convert Mongoose documents to plain objects matching Class interface
    return classes.map(classItem => {
      const { _id, __v, createdAt, updatedAt, ...classData } = classItem as any;
      return classData as Class;
    });
  } catch (error) {
    console.error('Error fetching classes from database:', error);
    return [];
  }
}

export async function getClass(slug: string): Promise<Class | undefined> {
  try {
    const classes = await getAllClasses();
    return classes.find((c) => c.slug === slug);
  } catch (error) {
    console.error('Error fetching class:', error);
    return undefined;
  }
}

export async function getAllClassSlugs(): Promise<string[]> {
  try {
    const classes = await getAllClasses();
    return classes.map((c) => c.slug);
  } catch (error) {
    console.error('Error fetching class slugs:', error);
    return [];
  }
}

export async function getAllClassSlugsWithDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    await connectDB();
    const classes = await Class.find({}).select('slug updatedAt').lean();
    
    if (!classes || !Array.isArray(classes)) {
      return [];
    }
    
    return classes.map((classItem: any) => ({
      slug: classItem.slug,
      updatedAt: classItem.updatedAt || new Date(),
    }));
  } catch (error) {
    console.error('Error fetching class slugs with dates:', error);
    return [];
  }
}

