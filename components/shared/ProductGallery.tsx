'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ProductGallery({ title, images }: { title: string; images: string[] }) {
  const pictures = [...new Set(images.filter(Boolean))];
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullView, setFullView] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeImage = pictures[activeIndex];
  const previous = () => setActiveIndex((current) => (current - 1 + pictures.length) % pictures.length);
  const next = () => setActiveIndex((current) => (current + 1) % pictures.length);

  useEffect(() => {
    if (!fullView) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullView(false);
      if (event.key === 'ArrowLeft' && pictures.length > 1) previous();
      if (event.key === 'ArrowRight' && pictures.length > 1) next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', keydown); };
  }, [fullView, pictures.length]);

  const touchStart = (event: React.TouchEvent) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const touchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || pictures.length < 2) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(distance) > 45) distance > 0 ? previous() : next();
    touchStartX.current = null;
  };

  const stage = (fullscreen = false) => <div className={`relative overflow-hidden bg-[#080808] ${fullscreen ? 'h-[100dvh] w-full' : 'aspect-[4/5] rounded-3xl border border-white/10'}`} onTouchStart={touchStart} onTouchEnd={touchEnd}><Image src={activeImage} alt={`${title} — image ${activeIndex + 1}`} fill priority className="select-none object-contain" sizes={fullscreen ? '100vw' : '(max-width: 1024px) 100vw, 50vw'} draggable={false}/>{pictures.length > 1 && <><button type="button" onClick={previous} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white backdrop-blur hover:bg-red-600 sm:hidden" aria-label="Previous image">‹</button><button type="button" onClick={next} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-2xl text-white backdrop-blur hover:bg-red-600 sm:hidden" aria-label="Next image">›</button></>}<span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white/85 backdrop-blur">{activeIndex + 1} / {pictures.length}</span>{!fullscreen && <button type="button" onClick={() => setFullView(true)} className="absolute bottom-4 right-4 min-h-11 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur hover:bg-red-600" aria-label="Open full screen image">⛶ Full view</button>}{fullscreen && <button type="button" autoFocus onClick={() => setFullView(false)} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/65 text-2xl text-white backdrop-blur hover:bg-red-600" aria-label="Close full screen">×</button>}</div>;

  return <div className="space-y-3">{stage()}{pictures.length > 1 && <div className="hidden grid-cols-6 gap-2 sm:grid">{pictures.map((picture, index) => <button key={picture} type="button" onClick={() => setActiveIndex(index)} aria-pressed={activeIndex === index} className={`relative aspect-square overflow-hidden rounded-lg border transition ${activeIndex === index ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 opacity-60 hover:opacity-100'}`} aria-label={`View product image ${index + 1}`}><Image src={picture} alt="" fill className="object-cover" sizes="100px"/></button>)}</div>}{fullView && <div role="dialog" aria-modal="true" aria-label={`${title} image viewer`} className="fixed inset-0 z-[100] bg-black">{stage(true)}</div>}<p className="text-center text-xs text-white/35 sm:hidden">Swipe left or right to browse</p></div>;
}
