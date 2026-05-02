import mongoose, { Schema, Document } from 'mongoose';

export interface ISinger extends Document {
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

const StructuredDataSchema = new Schema({
  jobTitle: { type: String },
  knowsAbout: { type: [String] },
}, { _id: false });

const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { _id: false });

const SEOSchema = new Schema({
  structuredData: { type: StructuredDataSchema },
  faqs: { type: [FAQSchema] },
}, { _id: false });

const SingerSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  genre: { type: String, required: true },
  bio: { type: String, required: true },
  fullBio: { type: [String], required: true },
  birthDate: { type: String, required: true },
  birthplace: { type: String, required: true },
  careerStart: { type: Number, required: true },
  gallery: { type: [String], default: [] },
  metadata: { type: MetadataSchema, required: true },
  seo: { type: SEOSchema },
}, {
  timestamps: true,
});

export default mongoose.models.Singer || mongoose.model<ISinger>('Singer', SingerSchema);
