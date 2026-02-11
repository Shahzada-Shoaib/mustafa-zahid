import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
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

const BlogPostSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  metadata: { type: MetadataSchema, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

