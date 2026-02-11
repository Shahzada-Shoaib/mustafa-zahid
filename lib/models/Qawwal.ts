import mongoose, { Schema, Document } from 'mongoose';

export interface IQawwal extends Document {
  slug: string;
  name: string;
  image: string;
  bio: string;
  fullBio: string[];
  birthDate: string;
  birthplace: string;
  careerStart: number;
  performances: Array<{ name: string; description: string; year?: number }>;
  awards: Array<{ name: string; year: number; category: string }>;
  collaborations: Array<{ artist: string; performance: string }>;
  stats: {
    performances: number;
    recordings: number;
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

const PerformanceSchema = new Schema({
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
  performance: { type: String, required: true },
}, { _id: false });

const StatsSchema = new Schema({
  performances: { type: Number, required: true },
  recordings: { type: Number, required: true },
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

const QawwalSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  bio: { type: String, required: true },
  fullBio: { type: [String], required: true },
  birthDate: { type: String, required: true },
  birthplace: { type: String, required: true },
  careerStart: { type: Number, required: true },
  performances: { type: [PerformanceSchema], default: [] },
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

export default mongoose.models.Qawwal || mongoose.model<IQawwal>('Qawwal', QawwalSchema);

