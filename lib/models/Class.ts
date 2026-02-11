import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  slug: string;
  title: string;
  type: 'studio' | 'at-home';
  instrument: 'guitar' | 'piano' | 'singing';
  
  // Hero Section
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    heroImage: string;
  };
  
  // Features
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  
  // Curriculum
  curriculum: Array<{
    text: string;
  }>;
  
  // Learning Paths
  learningPaths: Array<{
    stage: string;
    duration: string;
    description: string;
    skills: string[];
  }>;
  
  // Benefits
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  
  // Practice Tips
  practiceTips: {
    routineTips: string[];
    mistakes: string[];
  };
  
  // CTA Section
  cta: {
    title: string;
    description: string;
  };
  
  // Images
  images: {
    heroImage: string;
    curriculumImage: string;
    teachingImage: string;
  };
  
  // Complete Metadata
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
  
  // SEO (optional)
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

const HeroSchema = new Schema({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  titleHighlight: { type: String, required: true },
  description: { type: String, required: true },
  heroImage: { type: String, required: true },
}, { _id: false });

const FeatureSchema = new Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const CurriculumItemSchema = new Schema({
  text: { type: String, required: true },
}, { _id: false });

const LearningPathSchema = new Schema({
  stage: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], required: true },
}, { _id: false });

const BenefitSchema = new Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const PracticeTipsSchema = new Schema({
  routineTips: { type: [String], required: true },
  mistakes: { type: [String], required: true },
}, { _id: false });

const CTASchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { _id: false });

const ImagesSchema = new Schema({
  heroImage: { type: String, required: true },
  curriculumImage: { type: String, required: true },
  teachingImage: { type: String, required: true },
}, { _id: false });

const MetadataSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String, required: true },
  ogTitle: { type: String, required: true },
  ogDescription: { type: String, required: true },
  ogUrl: { type: String, required: true },
  ogImage: { type: String, required: true },
  twitterTitle: { type: String, required: true },
  twitterDescription: { type: String, required: true },
  twitterImage: { type: String, required: true },
  canonical: { type: String, required: true },
  robots: { type: String, required: true },
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

const ClassSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ['studio', 'at-home'] },
  instrument: { type: String, required: true, enum: ['guitar', 'piano', 'singing'] },
  hero: { type: HeroSchema, required: true },
  features: { type: [FeatureSchema], default: [] },
  curriculum: { type: [CurriculumItemSchema], default: [] },
  learningPaths: { type: [LearningPathSchema], default: [] },
  benefits: { type: [BenefitSchema], default: [] },
  practiceTips: { type: PracticeTipsSchema, required: true },
  cta: { type: CTASchema, required: true },
  images: { type: ImagesSchema, required: true },
  metadata: { type: MetadataSchema, required: true },
  seo: { type: SEOSchema },
}, {
  timestamps: true,
});

export default mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);

