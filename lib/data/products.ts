import connectDB from '@/lib/db/mongodb';
import Product from '@/lib/models/Product';

export interface ProductData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  dimensions?: string;
  medium?: string;
  image: string;
  gallery: string[];
  status: 'available' | 'reserved' | 'sold';
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

function serialize(product: Record<string, unknown>): ProductData {
  return { ...product, _id: String(product._id) } as ProductData;
}

export async function getAllProducts(): Promise<ProductData[]> {
  await connectDB();
  const products = await Product.find({}).sort({ featured: -1, createdAt: -1 }).lean();
  return products.map((product) => serialize(product as Record<string, unknown>));
}

export async function getProduct(slug: string): Promise<ProductData | null> {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  return product ? serialize(product as Record<string, unknown>) : null;
}

export async function getAllProductSlugsWithDates() {
  await connectDB();
  const products = await Product.find({}).select('slug updatedAt').lean();
  return products.map((product: any) => ({ slug: product.slug, updatedAt: product.updatedAt || new Date() }));
}
