'use client';

import { useState } from 'react';
import { cn, formatVND } from '@/lib/utils';

interface Variant {
  id: string;
  name: string;
  sku: string;
  available: boolean;
  priceAdjust?: number;
}

interface VariantSelectorProps {
  variants: Variant[];
  label?: string;
}

export function VariantSelector({ variants, label = 'Chọn phiên bản' }: VariantSelectorProps) {
  const [selected, setSelected] = useState(variants[0]?.id);

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-foreground">{label}:</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            type="button"
            disabled={!v.available}
            onClick={() => setSelected(v.id)}
            className={cn(
              'min-h-11 rounded-md border px-4 py-2 text-sm font-medium transition-all',
              !v.available && 'cursor-not-allowed opacity-40',
              selected === v.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
            )}
          >
            <span>{v.name}</span>
            {v.priceAdjust && selected !== v.id && (
              <span className="ml-1.5 font-mono text-xs text-muted-foreground">
                +{formatVND(v.priceAdjust)}
              </span>
            )}
            {!v.available && (
              <span className="ml-2 text-[10px] text-muted-foreground">(Hết hàng)</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}