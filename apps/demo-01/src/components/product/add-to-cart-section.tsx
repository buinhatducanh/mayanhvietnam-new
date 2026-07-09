'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { useCart } from '@/lib/cart-context';
import { getProductBySlug } from '@/lib/mock-data';
import type { ProductSummary } from '@mayanhvietnam/mock-data';

interface AddToCartSectionProps {
  productId: string;
  productName: string;
  price: number;
}

export function AddToCartSection({ productId, productName, price }: AddToCartSectionProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    // Try to hydrate the full product from mock-data for richer cart data
    const product: ProductSummary = {
      id: productId,
      slug: productId,
      name: productName,
      thumbnail: '',
      images: [],
      price,
      badges: [],
      isUsed: false,
      brand: '',
      availability: 'in_stock',
      category: '',
    };
    // Try to get full product data
    const full = getProductBySlug(productId);
    addItem(full ?? product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
          {added ? '✓ Đã thêm!' : 'THÊM VÀO GIỎ'}
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
        onClick={() => {
          handleAdd();
          router.push('/gio-hang');
        }}
      >
        MUA NGAY — NHẬN TRONG 2H
      </Button>
    </div>
  );
}
