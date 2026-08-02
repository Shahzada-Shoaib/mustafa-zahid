import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedBackground from '@/components/shared/AnimatedBackground';
import ProductGallery from '@/components/shared/ProductGallery';
import { getProduct } from '@/lib/data/products';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return product
    ? { title: `${product.title} | Art & Collectibles`, description: product.description, openGraph: { images: [product.image] } }
    : { title: 'Artwork Not Found' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const message = encodeURIComponent(`Hello, I am interested in “${product.title}” from Art & Collectibles. Please share purchase and delivery details.`);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <AnimatedBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-black/70" aria-hidden="true" />
      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-12 lg:pt-36">
        <Link href="/art-and-collectibles" className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white">
          <span aria-hidden>←</span> Back to the collection
        </Link>

        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative isolate animate-slide-in-left">
            {/* Hero-style red light behind the artwork */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-red-600/20 blur-[70px] sm:-inset-14 sm:bg-red-600/25 sm:blur-[100px]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-8 top-1/4 -z-10 h-1/2 rounded-full bg-gradient-to-r from-red-950/30 via-red-500/30 to-amber-500/10 blur-3xl" aria-hidden="true" />

            {/* Exact decorative treatment used by the homepage hero */}
            <div className="hidden sm:block absolute -top-8 -right-8 w-24 sm:w-32 h-24 sm:h-32 border border-red-500/30 rounded-full animate-rotate-slow" aria-hidden="true" />
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-xl" aria-hidden="true" />
            <div className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-16 h-16 sm:w-24 sm:h-24 z-30 animate-rotate-slow hidden sm:block" aria-hidden="true">
              <svg viewBox="0 0 100 100" className="w-full h-full text-red-500/40" aria-hidden="true">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="12" fill="currentColor" />
                <circle cx="50" cy="50" r="6" fill="#0a0a0a" />
                {[...Array(8)].map((_, index) => (
                  <line
                    key={index}
                    x1="50"
                    y1="50"
                    x2={50 + 35 * Math.cos((index * Math.PI) / 4)}
                    y2={50 + 35 * Math.sin((index * Math.PI) / 4)}
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                ))}
              </svg>
            </div>

            <div className="relative z-10 rounded-3xl shadow-[0_0_70px_rgba(220,38,38,0.22)]">
              <ProductGallery title={product.title} images={[product.image, ...(product.gallery || [])]} />
            </div>
          </div>

          <div className="glass-card animate-slide-in-right rounded-3xl p-6 sm:p-8 lg:sticky lg:top-32 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-red-400">{product.category}</span>
              <span className="text-white/20">•</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/55">{product.status}</span>
            </div>
            <h1 className="font-display mt-4 text-4xl font-bold sm:text-6xl">{product.title}</h1>
            <p className="mt-6 text-2xl text-white/85">PKR {product.price.toLocaleString()}</p>
            <div className="my-6 h-px bg-gradient-to-r from-red-500/50 via-white/10 to-transparent" />
            <p className="whitespace-pre-line leading-8 text-white/65">{product.description}</p>

            {(product.medium || product.dimensions) && (
              <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-white/10 py-5">
                {product.medium && <div><dt className="text-xs uppercase tracking-wider text-white/35">Medium</dt><dd className="mt-1 text-white/80">{product.medium}</dd></div>}
                {product.dimensions && <div><dt className="text-xs uppercase tracking-wider text-white/35">Dimensions</dt><dd className="mt-1 text-white/80">{product.dimensions}</dd></div>}
              </dl>
            )}

            <a href={`https://wa.me/923224071299?text=${message}`} target="_blank" rel="noopener noreferrer" aria-disabled={product.status === 'sold'} className={`mt-8 inline-flex rounded-full px-8 py-4 font-semibold transition ${product.status === 'sold' ? 'pointer-events-none bg-white/10 text-white/40' : 'bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-900/30 hover:from-red-500 hover:to-red-600 hover:scale-[1.02]'}`}>
              {product.status === 'sold' ? 'Sold' : product.status === 'reserved' ? 'Inquire about this piece' : 'Inquire to purchase'}
            </a>
            <p className="mt-3 text-xs text-white/35">Purchase and delivery details are confirmed personally on WhatsApp.</p>
          </div>
        </div>
      </main>

      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
