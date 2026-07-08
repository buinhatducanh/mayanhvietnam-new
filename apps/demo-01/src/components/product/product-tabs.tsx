'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { StarRating } from '@/components/ui/star-rating';

interface SpecGroup {
  group: string;
  items: { label: string; value: string }[];
}

interface ProductTabsProps {
  specs: SpecGroup[];
  description: string;
  productId: string;
}

const SAMPLE_REVIEWS = [
  { author: 'Nguyễn Minh', rating: 5, comment: 'Máy ảnh tuyệt vời! Cân bằng giữa tính năng và giá cả. Rất đáng tiền.', date: '2026-06-15', verified: true },
  { author: 'Trần Hùng', rating: 5, comment: 'Shop tư vấn nhiệt tình, giao hàng nhanh. Sản phẩm chính hãng.', date: '2026-05-28', verified: true },
  { author: 'Lê Hoa', rating: 4, comment: 'Ảnh chụp sắc nét, autofocus nhanh. Phiên bản phù hợp cho người mới.', date: '2026-05-10', verified: true },
];

export function ProductTabs({ specs, description, productId: _productId }: ProductTabsProps) {
  const [active, setActive] = useState<'desc' | 'specs' | 'reviews' | 'warranty'>('specs');

  const tabs = [
    { id: 'specs' as const, label: 'Thông số kỹ thuật' },
    { id: 'desc' as const, label: 'Mô tả' },
    { id: 'reviews' as const, label: `Đánh giá (${SAMPLE_REVIEWS.length})` },
    { id: 'warranty' as const, label: 'Bảo hành' },
  ];

  return (
    <div>
      {/* Tab headers */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              'px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              active === t.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="py-8">
        {active === 'specs' && (
          <div className="space-y-6">
            {specs.map((group) => (
              <div key={group.group}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {group.group}
                </h3>
                <div className="rounded-lg border border-border overflow-hidden">
                  {group.items.map((item, i) => (
                    <div
                      key={item.label}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 text-sm',
                        i !== 0 && 'border-t border-border',
                        i % 2 === 1 && 'bg-card'
                      )}
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-mono font-medium text-foreground">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {active === 'desc' && (
          <div className="prose prose-invert max-w-none">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        )}

        {active === 'reviews' && (
          <div className="space-y-4">
            {SAMPLE_REVIEWS.map((r, i) => (
              <article
                key={i}
                className="rounded-lg border border-border p-4 bg-card"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.author}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {new Date(r.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <StarRating rating={r.rating} showCount={false} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
              </article>
            ))}
          </div>
        )}

        {active === 'warranty' && (
          <div className="space-y-3 text-sm">
            {[
              ['Thời hạn bảo hành', '24 tháng chính hãng'],
              ['Hình thức bảo hành', 'Phiếu bảo hành + Hóa đơn'],
              ['Trung tâm bảo hành', 'Máy Ảnh Việt Nam toàn quốc'],
              ['Hỗ trợ kỹ thuật', '0937.148.222 (miễn phí)'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
