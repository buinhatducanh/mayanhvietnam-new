'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { allProducts } from '@/lib/mock-data';
import { formatVND } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length < 2
    ? []
    : allProducts
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      inputRef.current?.focus();
      setOpen(true);
    }
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Search input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Tìm máy ảnh, ống kính, phụ kiện... (⌘K)"
          className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          aria-label="Tìm kiếm sản phẩm"
          aria-expanded={open}
          role="combobox"
          aria-autocomplete="list"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Xóa tìm kiếm"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-xl border border-border bg-card shadow-xl"
          role="listbox"
        >
          {results.length === 0 && query.trim().length >= 2 ? (
            <div className="flex flex-col items-center gap-2 p-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Không tìm thấy &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground/60">
                Thử từ khóa khác hoặc{' '}
                <Link href="/san-pham" onClick={() => setOpen(false)} className="text-primary hover:underline">
                  xem tất cả sản phẩm
                </Link>
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              <ul>
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/san-pham/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 transition-colors',
                        'hover:bg-background'
                      )}
                    >
                      <Image
                        src={p.thumbnail}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-primary font-medium">{p.brand}</p>
                        <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                        <p className="font-mono text-xs font-semibold text-foreground mt-0.5">
                          {formatVND(p.price)}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border px-4 py-2.5">
                <Link
                  href={`/san-pham?q=${encodeURIComponent(query)}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  Xem tất cả kết quả cho &ldquo;{query}&rdquo;
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
