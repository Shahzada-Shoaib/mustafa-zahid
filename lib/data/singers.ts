import connectDB from '@/lib/db/mongodb';
import Singer from '@/lib/models/Singer';

export interface Singer {
  slug: string;
  name: string;
  image: string;
  genre: string;
  bio: string;
  fullBio: string[];
  birthDate: string;
  birthplace: string;
  careerStart: number;
  gallery: string[];
  metadata: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
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

export async function getAllSingers(): Promise<Singer[]> {
  try {
    await connectDB();
    const singers = await Singer.find({}).lean();

    if (!singers || !Array.isArray(singers)) {
      return [];
    }

    return singers.map((singer) => {
      const { _id, __v, createdAt, updatedAt, ...singerData } = singer as any;
      return singerData as Singer;
    });
  } catch (error) {
    console.error('Error fetching singers from database:', error);
    return [];
  }
}

export async function getSinger(slug: string): Promise<Singer | undefined> {
  try {
    const singers = await getAllSingers();
    return singers.find((s) => s.slug === slug);
  } catch (error) {
    console.error('Error fetching singer:', error);
    return undefined;
  }
}

export async function getAllSingerSlugs(): Promise<string[]> {
  try {
    const singers = await getAllSingers();
    return singers.map((s) => s.slug);
  } catch (error) {
    console.error('Error fetching singer slugs:', error);
    return [];
  }
}

export async function getAllSingerSlugsWithDates(): Promise<{ slug: string; updatedAt: Date }[]> {
  try {
    await connectDB();
    const singers = await Singer.find({}).select('slug updatedAt').lean();

    if (!singers || !Array.isArray(singers)) {
      return [];
    }

    return singers.map((singer: any) => ({
      slug: singer.slug,
      updatedAt: singer.updatedAt ? new Date(singer.updatedAt) : new Date(),
    }));
  } catch (error) {
    console.error('Error fetching singer slugs with dates:', error);
    return [];
  }
}
