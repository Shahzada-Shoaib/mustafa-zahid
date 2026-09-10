import mongoose, { Schema, Document } from 'mongoose';
import { BLOG_SECTION_LAYOUTS } from '@/lib/utils/blogContent';
import type { BlogSection } from '@/lib/utils/blogContent';

export type { BlogSection } from '@/lib/utils/blogContent';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  content: string;
  sections: BlogSection[];
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
  createdAt?: Date;
  updatedAt?: Date;
}

const MetadataSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String, required: true },
  ogTitle: { type: String, required: true },
  ogDescription: { type: String, required: true },
  twitterTitle: { type: String, required: true },
  twitterDescription: { type: String, required: true },
}, { _id: false });

const BlogSectionSchema = new Schema<BlogSection>({
  id: { type: String, required: true },
  heading: { type: String, default: '' },
  headingLevel: {
    type: String,
    enum: ['h1', 'h2', 'h3'],
    default: 'h2',
  },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  imageCaption: { type: String, default: '' },
  imagePosition: {
    type: String,
    enum: ['before', 'after'],
    default: 'after',
  },
  layout: {
    type: String,
    enum: BLOG_SECTION_LAYOUTS,
    default: 'stacked',
  },
}, { _id: false });

const BlogPostSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  sections: { type: [BlogSectionSchema], default: [] },
  image: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  metadata: { type: MetadataSchema, required: true },
}, {
  timestamps: true,
});

const existingBlogPostModel = mongoose.models.BlogPost;

// Next.js can retain the previously compiled model during development. Teach
// that model about structured sections without requiring a server restart.
if (existingBlogPostModel && !existingBlogPostModel.schema.path('sections')) {
  existingBlogPostModel.schema.add({
    sections: { type: [BlogSectionSchema], default: [] },
  });
}

export default existingBlogPostModel || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
