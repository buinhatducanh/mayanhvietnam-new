'use client';

import { useState } from 'react';
import { ShoppingCart, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { formatVND } from '@/lib/utils';

interface AddToCartSectionProps {
  productId: string;
  productName: string;
  price: number;
}

export function AddToCartSection({ productId, productName, price }: AddToCartSectionProps) {
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    // TODO: integrate cart API
    console.log('Add to cart', { productId, qty });
    alert(`Đã thêm ${qty} × "${productName}" vào giỏ hàng (${formatVND(price * qty)})`);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-foreground">Số lượng:</span>
        <QuantitySelector value={qty} onChange={setQty} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button
          variant="primary"
          size="lg"
          className="sm:col-span-2"
          leftIcon={<ShoppingCart className="h-4 w-4" />}
          onClick={handleAdd}
        >
          THÊM VÀO GIỎ
        </Button>
        <Button
          variant="outline"
          size="lg"
          aria-label="Thêm vào yêu thích"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <Button
        variant="sale"
        size="lg"
        className="w-full"
        leftIcon={<Zap className="h-4 w-4" />}
        onClick={handleAdd}
      >
        MUA NGAY — NHẬN TRONG 2H
      </Button>
    </div>
  );
}
