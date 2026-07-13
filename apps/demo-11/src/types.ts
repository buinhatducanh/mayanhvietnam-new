export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: 'NEW' | 'HOT' | 'SALE';
  rating: number;
  reviews: number;
  category: string;
  categorySlug?: string;
  subcategory: string;
  mount?: string;
  condition: 'New' | 'Used';
  inStock: boolean;
  stockCount?: number;
  description?: string;
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export type Page = 'home' | 'plp' | 'pdp' | 'cart' | 'checkout' | 'about' | 'contact' | 'blog' | 'faq' | 'policy' | 'store-locator' | 'studio-service' | 'compare' | 'account' | 'installment' | 'search' | 'notfound';