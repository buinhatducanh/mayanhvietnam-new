'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';
import { formatVND } from '@/lib/utils';

const LENSES = [
  { id: 1, name: 'Canon RF 24-70mm F2.8L', price: 39990000, active: true },
  { id: 2, name: 'Canon RF 50mm F1.2L', price: 52990000, active: false },
  { id: 3, name: 'Canon RF 70-200mm F2.8L', price: 58990000, active: false },
  { id: 4, name: 'Canon RF 100mm F2.8L Macro', price: 29990000, active: false },
  { id: 5, name: 'Canon RF 15-35mm F2.8L', price: 55990000, active: false },
];

export function LensCarousel() {
  const [activeLens, setActiveLens] = useState(LENSES[0]);
  const activeLensData = LENSES.find((l) => l.id === activeLens.id) ?? LENSES[0];

  return (
    <div className="landing-lens">
      <div className="landing-lens__track" role="listbox" aria-label="Ống kính tương thích">
        {LENSES.map((lens) => (
          <button
            key={lens.id}
            className={`landing-lens__card ${lens.id === activeLens.id ? 'landing-lens__card--active' : ''}`}
            onClick={() => setActiveLens(lens)}
            role="option"
            aria-selected={lens.id === activeLens.id}
            aria-label={`${lens.name} — ${formatVND(lens.price)}`}
          >
            <Camera size={24} style={{ opacity: 0.25, color: '#f0f0f5' }} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="landing-lens__info">
        <div className="landing-lens__name">{activeLensData.name}</div>
        <div className="landing-lens__price">{formatVND(activeLensData.price)}</div>
        <a
          href={`/san-pham/${activeLensData.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="landing-lens__cta"
        >
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}
