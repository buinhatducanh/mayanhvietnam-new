'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  size?: 'md' | 'lg';
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
}: QuantitySelectorProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  const sz = size === 'lg' ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm';

  return (
    <div className="inline-flex items-center overflow-hidden rounded-md border border-border bg-card">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        className={cn(
          'flex items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          'disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground',
          sz
        )}
        aria-label="Giảm số lượng"
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n)));
        }}
        className={cn(
          'w-14 bg-transparent text-center font-mono font-semibold text-foreground',
          'focus:outline-none focus:bg-muted',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          size === 'lg' ? 'h-12 text-base' : 'h-10 text-sm'
        )}
        aria-label="Số lượng"
      />

      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        className={cn(
          'flex items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          'disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground',
          sz
        )}
        aria-label="Tăng số lượng"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}