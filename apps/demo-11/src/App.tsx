import { useState } from 'react';
import type { CartItem, Page, Product } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PLPPage from './pages/PLPPage';
import PDPPage from './pages/PDPPage';
import CartPage from './pages/CartPage';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const navigate = (to: Page, product?: Product, category?: string) => {
    if (product) setSelectedProduct(product);
    if (category) setSelectedCategory(category);
    else if (to !== 'plp') setSelectedCategory(null);
    setPage(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.variant === variant
      );
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.variant === variant
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, variant }];
    });
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(i =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-cream font-sans antialiased">
      <Header
        cartCount={cartCount}
        onNavigate={navigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCategorySelect={(slug) => { setSelectedCategory(slug); setSearchQuery(''); setPage('plp'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />

      <main>
        {page === 'home' && (
          <HomePage onNavigate={navigate} onAddToCart={addToCart} />
        )}
        {page === 'plp' && (
          <PLPPage onNavigate={navigate} onAddToCart={addToCart} searchQuery={searchQuery} selectedCategory={selectedCategory} />
        )}
        {page === 'pdp' && selectedProduct && (
          <PDPPage
            product={selectedProduct}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        )}
        {page === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQty={updateCartQty}
            onRemove={removeFromCart}
            onNavigate={navigate}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
