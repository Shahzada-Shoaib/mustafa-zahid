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
  albums: Array<{
    name: string;
    year: number;
    description: string;
    cover?: string;
  }>;
  songs: Array<{ name: string; description: string; year?: number }>;
  awards: Array<{ name: string; year: number; category: string }>;
  collaborations: Array<{ artist: string; song: string }>;
  stats: {
    albums: number;
    songs: number;
    awards: number;
    views: string;
    streams: string;
    followers: string;
  };
  gallery: string[];
  milestones: Array<{ year: number; event: string }>;
  achievements: string[];
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

const AlbumSchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  cover: { type: String },
}, { _id: false });

const SongSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number },
}, { _id: false });

const AwardSchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
}, { _id: false });

const CollaborationSchema = new Schema({
  artist: { type: String, required: true },
  song: { type: String, required: true },
}, { _id: false });

const StatsSchema = new Schema({
  albums: { type: Number, required: true },
  songs: { type: Number, required: true },
  awards: { type: Number, required: true },
  views: { type: String, required: true },
  streams: { type: String, required: true },
  followers: { type: String, required: true },
}, { _id: false });

const MilestoneSchema = new Schema({
  year: { type: Number, required: true },
  event: { type: String, required: true },
}, { _id: false });

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
  albums: { type: [AlbumSchema], default: [] },
  songs: { type: [SongSchema], default: [] },
  awards: { type: [AwardSchema], default: [] },
  collaborations: { type: [CollaborationSchema], default: [] },
  stats: { type: StatsSchema, required: true },
  gallery: { type: [String], default: [] },
  milestones: { type: [MilestoneSchema], default: [] },
  achievements: { type: [String], default: [] },
  metadata: { type: MetadataSchema, required: true },
  seo: { type: SEOSchema },
}, {
  timestamps: true,
});

export default mongoose.models.Singer || mongoose.model<ISinger>('Singer', SingerSchema);

