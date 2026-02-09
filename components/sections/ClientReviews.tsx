'use client';

import { useState } from 'react';

interface Review {
  name: string;
  review: string;
  rating: number;
}

interface ClientReviewsProps {
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    name: "Ahmed Khan",
    review: "Amazing performance at our wedding! Mustafa Zahid made our special day unforgettable. Highly recommended!",
    rating: 5,
  },
  {
    name: "Fatima Ali",
    review: "Professional, talented, and delivered exactly what we wanted. The crowd loved every moment.",
    rating: 5,
  },
  {
    name: "Hassan Malik",
    review: "Best decision we made for our event. The performance was outstanding and the booking process was smooth.",
    rating: 5,
  },
];

export default function ClientReviews({ reviews = defaultReviews }: ClientReviewsProps) {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-b from-transparent via-red-950/10 to-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-medium">
            Client Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            What Clients <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mobile Scrollable Carousel */}
          <div className="md:hidden">
            <div
              id="reviews-carousel"
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-4"
              onScroll={(e) => {
                const container = e.currentTarget;
                const scrollLeft = container.scrollLeft;
                const cardWidth = container.offsetWidth;
                const index = Math.round(scrollLeft / cardWidth);
                setCurrentReviewIndex(Math.min(index, reviews.length - 1));
              }}
            >
              {reviews.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-start glass-card rounded-2xl p-6 hover-lift"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4 italic">
                    &quot;{testimonial.review}&quot;
                  </p>
                  <p className="text-white font-medium">— {testimonial.name}</p>
                </div>
              ))}
            </div>
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const container = document.getElementById('reviews-carousel');
                    if (container) {
                      container.scrollTo({
                        left: index * container.clientWidth,
                        behavior: 'smooth',
                      });
                      setCurrentReviewIndex(index);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentReviewIndex === index
                      ? 'bg-red-500 w-6'
                      : 'bg-white/30 w-2'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 lg:p-8 hover-lift"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-4 italic">
                  &quot;{testimonial.review}&quot;
                </p>
                <p className="text-white font-medium">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

