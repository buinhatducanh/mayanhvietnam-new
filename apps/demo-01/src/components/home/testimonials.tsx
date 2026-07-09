'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { reviews } from '@/lib/mock-data';

const REVIEWS = reviews.slice(0, 6);

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  if (REVIEWS.length === 0) return null;

  const visibleCount = 3;
  const maxIndex = Math.max(0, REVIEWS.length - visibleCount);
  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Đánh giá khách hàng
            </p>
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
            >
              Khách hàng nói gì?
            </h2>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              aria-label="Đánh giá trước"
              onClick={prev}
              disabled={current === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Đánh giá tiếp"
              onClick={next}
              disabled={current >= maxIndex}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * (100 / visibleCount)}%)` }}
          >
            {REVIEWS.map((r) => (
              <div
                key={r.id}
                className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
                style={{ flex: `0 0 ${100 / visibleCount}%` }}
              >
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i <= r.rating
                            ? 'fill-primary text-primary'
                            : 'text-border'
                        )}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <div className="relative flex-1">
                    <Quote className="absolute -left-1 -top-1 h-5 w-5 text-primary/20" />
                    <p className="text-sm leading-relaxed text-foreground pl-4 line-clamp-4">
                      {r.comment}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="mt-4 flex items-center gap-2.5 pt-3 border-t border-border">
                    {/* Avatar */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {r.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {r.authorName}
                        </p>
                        {r.verified && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {r.productPurchased} · {r.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats summary */}
        <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-6 text-center">
          {[
            { value: '4.8', label: 'Đánh giá TB', suffix: '/5.0' },
            { value: String(REVIEWS.length * 47), label: 'Đánh giá verified', suffix: '+' },
            { value: '98%', label: 'Khách hàng hài lòng', suffix: '' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="price-mono text-2xl font-black text-primary">
                {stat.value}
                <span className="text-sm text-muted-foreground font-normal">{stat.suffix}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
