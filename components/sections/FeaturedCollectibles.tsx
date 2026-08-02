'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProductCard { _id: string; title: string; slug: string; image: string; price: number; category: string; status: string; featured: boolean }

export default function FeaturedCollectibles() {
  const [products, setProducts] = useState<ProductCard[]>([]);
  useEffect(() => {
    fetch('/api/products').then((response) => response.json()).then((result) => {
      if (result.success) setProducts(result.data.filter((item: ProductCard) => item.featured).slice(0, 3));
    }).catch(() => setProducts([]));
  }, []);

  if (!products.length) return null;
  return (
    <section id="art-and-collectibles" className="relative py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><span className="text-xs font-medium uppercase tracking-[0.3em] text-red-500 sm:text-sm">A private collection</span><h2 className="font-display mt-3 text-3xl font-bold text-white sm:text-5xl">Art & <span className="text-gradient">Collectibles</span></h2><p className="mt-3 max-w-xl text-white/60">Original pieces and limited collectibles, selected for those who value art with a story.</p></div>
          <Link href="/art-and-collectibles" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-red-400">Explore the collection <span aria-hidden>→</span></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <Link key={product._id} href={`/art-and-collectibles/${product.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]"><div className="relative aspect-[5/3] overflow-hidden"><Image src={product.image} alt={product.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/><span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">{product.status}</span></div><div className="p-4"><p className="text-[10px] uppercase tracking-[0.2em] text-red-400">{product.category}</p><div className="mt-1.5 flex items-start justify-between gap-3"><h3 className="font-display text-lg font-semibold text-white">{product.title}</h3><span className="whitespace-nowrap text-xs text-white/75">PKR {product.price.toLocaleString()}</span></div></div></Link>)}</div>
      </div>
    </section>
  );
}
