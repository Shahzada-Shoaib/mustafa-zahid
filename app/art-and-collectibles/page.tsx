import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/shared/AnimatedBackground';
import { getAllProducts } from '@/lib/data/products';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Art & Collectibles | Mustafa Zahid', description: 'Discover original artwork and limited collectibles from Mustafa Zahid.' };

export default async function CollectionPage() {
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  try { products = await getAllProducts(); } catch { products = []; }
  return <div className="min-h-screen bg-[#0a0a0a] text-white"><AnimatedBackground/><Header/><main className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-12 lg:pt-36"><div className="mb-9 max-w-3xl"><p className="text-xs uppercase tracking-[0.35em] text-red-500">The Collection</p><h1 className="font-display mt-3 text-4xl font-bold sm:text-5xl lg:text-6xl">Art & <span className="text-gradient">Collectibles</span></h1><p className="mt-4 max-w-2xl leading-relaxed text-white/60">Original artwork and considered objects. Each piece is presented with its story, material and availability.</p></div>{products.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <Link key={product._id} href={`/art-and-collectibles/${product.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]"><div className="relative aspect-[5/4] overflow-hidden"><Image src={product.image} alt={product.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/><span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider backdrop-blur ${product.status === 'available' ? 'bg-emerald-500/80' : product.status === 'reserved' ? 'bg-amber-500/80' : 'bg-black/70'}`}>{product.status}</span></div><div className="p-4"><p className="text-[10px] uppercase tracking-[0.2em] text-red-400">{product.category}</p><div className="mt-1.5 flex justify-between gap-3"><h2 className="font-display text-lg font-semibold">{product.title}</h2><p className="whitespace-nowrap text-xs text-white/70">PKR {product.price.toLocaleString()}</p></div>{(product.medium || product.dimensions) && <p className="mt-2 truncate text-xs text-white/45">{[product.medium, product.dimensions].filter(Boolean).join(' · ')}</p>}</div></Link>)}</div> : <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center"><h2 className="font-display text-2xl">The collection is being curated.</h2><p className="mt-2 text-white/50">New pieces will appear here soon.</p></div>}</main><Footer/></div>;
}
