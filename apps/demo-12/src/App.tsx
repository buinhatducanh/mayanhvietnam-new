import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PolicyPage from './pages/PolicyPage'
import StudioServicePage from './pages/StudioServicePage'
import StoreLocatorPage from './pages/StoreLocatorPage'
import SearchPage from './pages/SearchPage'
import ComparePage from './pages/ComparePage'
import AccountPage from './pages/AccountPage'
import FAQPage from './pages/FAQPage'
import InstallmentPage from './pages/InstallmentPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-strong)' }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/danh-muc/:slug" element={<ProductListPage />} />
            <Route path="/san-pham/:slug" element={<ProductDetailPage />} />
            <Route path="/gio-hang" element={<CartPage />} />
            <Route path="/thanh-toan" element={<CheckoutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/chinh-sach/:type" element={<PolicyPage />} />
            <Route path="/dich-vu-phong-studio" element={<StudioServicePage />} />
            <Route path="/he-thong-cua-hang" element={<StoreLocatorPage />} />
            <Route path="/tim-kiem" element={<SearchPage />} />
            <Route path="/so-sanh" element={<ComparePage />} />
            <Route path="/tai-khoan" element={<AccountPage />} />
            <Route path="/hoi-dap" element={<FAQPage />} />
            <Route path="/tra-gop" element={<InstallmentPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
