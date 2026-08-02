import mongoose, { Document, Schema } from 'mongoose';

export type ProductStatus = 'available' | 'reserved' | 'sold';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  dimensions?: string;
  medium?: string;
  image: string;
  gallery: string[];
  status: ProductStatus;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true, default: 'Original Artwork' },
  dimensions: { type: String, trim: true },
  medium: { type: String, trim: true },
  image: { type: String, required: true },
  gallery: { type: [String], default: [] },
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
if (!ProductModel.schema.path('gallery')) {
  ProductModel.schema.add({ gallery: { type: [String], default: [] } });
}
export default ProductModel;
