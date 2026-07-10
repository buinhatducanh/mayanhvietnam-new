import StoreHeader from "@/components/store/StoreHeader";
import StoreFooter from "@/components/store/StoreFooter";
import Providers from "@/lib/context/Providers";
import CartDrawer from "@/components/store/CartDrawer";
import WishlistDrawer from "@/components/store/WishlistDrawer";
import { UIProvider } from "@/components/store/UIProvider";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <UIProvider>
        <StoreHeader />
        <main className="flex-1">{children}</main>
        <StoreFooter />
        <CartDrawer />
        <WishlistDrawer />
      </UIProvider>
    </Providers>
  );
}
