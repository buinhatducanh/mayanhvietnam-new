import Link from 'next/link';
import { Aperture } from 'lucide-react';
import { allProducts } from '@/lib/mock-data';
import { formatVND } from '@/lib/utils';

interface LensCompatibilityProps {
  mountName: string;
  currentProductName: string;
}

export function LensCompatibility({ mountName, currentProductName }: LensCompatibilityProps) {
  // Mock — find lenses & compatible bodies in the same mount system
  const compatibleLenses = allProducts.filter(
    (p) => p.category === 'ong-kinh' && p.mount === mountName
  ).slice(0, 3);

  return (
    <div className="rounded-lg bg-primary/[0.04] border border-primary/20 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Aperture className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">
          Ống kính tương thích ({mountName})
        </h3>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Mua kèm {currentProductName} để tiết kiệm đến <span className="text-primary font-semibold">2.000.000₫</span>
      </p>
      <div className="space-y-2">
        {compatibleLenses.length > 0 ? (
          compatibleLenses.map((lens) => (
            <Link
              key={lens.id}
              href={`/san-pham/${lens.slug}`}
              className="flex items-center gap-3 p-2 rounded-md bg-card/60 border border-border hover:border-primary/50 transition-all"
            >
              <img
                src={lens.thumbnail}
                alt={lens.name}
                className="h-12 w-12 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {lens.name}
                </p>
                <p className="text-xs font-mono text-primary">
                  {formatVND(lens.price)}
                </p>
              </div>
              <span className="text-xs text-primary">+ Thêm</span>
            </Link>
          ))
        ) : (
          <p className="text-xs text-muted-foreground py-2">
            Liên hệ tư vấn để được gợi ý ống kính phù hợp.
          </p>
        )}
      </div>
    </div>
  );
}
