'use client';

import { Cpu } from 'lucide-react';
import type { Product } from '@/lib/products';

export function SpecTable({ product }: { product: Product }) {
  return (
    <div className="mt-16">
      <div className="flex items-center gap-2">
        <Cpu className="size-4 text-primary" aria-hidden />
        <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Thông số kỹ thuật chi tiết
        </h4>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <caption className="sr-only">Bảng thông số kỹ thuật của {product.name}</caption>
          <tbody>
            {product.specs.map((spec, i) => (
              <tr
                key={spec.label}
                className={i % 2 === 0 ? 'bg-card/60' : 'bg-background'}
              >
                <th
                  scope="row"
                  className="w-1/3 border-b border-border px-5 py-4 text-left font-normal text-muted-foreground last:border-b-0"
                >
                  {spec.label}
                </th>
                <td className="border-b border-border px-5 py-4 font-medium text-foreground last:border-b-0">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
