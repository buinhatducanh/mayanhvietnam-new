'use client'

import { Cpu } from 'lucide-react'
import type { Product } from '@/lib/products'

export function SpecTable({ product }: { product: Product }) {
  return (
    <section aria-labelledby="spec-heading">
      <h2 id="spec-heading" className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        <Cpu className="h-4 w-4 text-primary" />
        Thông số kỹ thuật
      </h2>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <tbody>
            {product.specs.map((spec, i) => (
              <tr key={spec.label} className={i !== product.specs.length - 1 ? 'border-b border-border/60' : ''}>
                <th scope="row" className="w-2/5 bg-card px-4 py-3 text-left font-medium text-muted-foreground">
                  {spec.label}
                </th>
                <td className="px-4 py-3 text-foreground">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
