import { CartPage } from './components/cart/CartPage'
import { useState } from 'react'
import { SharedNavbar }   from './components/homepage/SharedNavbar'
import { StoryRail }      from './components/homepage/StoryRail'
import { CinematicScene } from './components/homepage/CinematicScene'
import { Scene2 }         from './components/homepage/Scene2'
import { Scene3 }         from './components/homepage/Scene3'
import { Scene4 }         from './components/homepage/Scene4'
import { Scene5 }         from './components/homepage/Scene5'
import { Scene6 }         from './components/homepage/Scene6'
import { Scene7 }         from './components/homepage/Scene7'
import { CameraPage }       from './components/camera/CameraPage'
import { LensPage }         from './components/camera/LensPage'
import { VideoCameraPage }  from './components/camera/VideoCameraPage'
import { ActionCameraPage } from './components/camera/ActionCameraPage'
import { FlycamPage }       from './components/camera/FlycamPage'
import { StudioPage }       from './components/camera/StudioPage'
import { AccessoriesPage }  from './components/camera/AccessoriesPage'
import { UsedProductsPage } from './components/camera/UsedProductsPage'
import { StudioSetupPage }  from './components/camera/StudioSetupPage'
import { ProductDetailPage } from './components/camera/ProductDetailPage'
import { StorePage } from './components/camera/StorePage'

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'camera' | 'lens' | 'video' | 'action' | 'flycam' | 'studio' | 'accessories' | 'used' | 'setup' | 'product' | 'store' | 'cart'>('home')
  const [currentProductId, setCurrentProductId] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const cartCount = cartItems.length

  const handleNavigate = (label: string, id?: string) => {
    if (id) setCurrentProductId(id)
    if (label === 'Trang chủ') setCurrentPage('home')
    if (label === 'Máy ảnh') setCurrentPage('camera')
    if (label === 'Ống kính') setCurrentPage('lens')
    if (label === 'Máy quay') setCurrentPage('video')
    if (label === 'Action Camera') setCurrentPage('action')
    if (label === 'Flycam') setCurrentPage('flycam')
    if (label === 'Thiết bị studio') setCurrentPage('studio')
    if (label === 'Phụ kiện') setCurrentPage('accessories')
    if (label === 'Sản phẩm cũ') setCurrentPage('used')
    if (label === 'Setup studio') setCurrentPage('setup')
    if (label === 'Product Detail') setCurrentPage('product')
    if (label === 'Cửa hàng') setCurrentPage('store')
    if (label === 'Giỏ hàng') setCurrentPage('cart')
  }

  const handleAddToCart = (product: any) => {
    setCartItems(prev => [...prev, product])
  }

  if (currentPage === 'product') {
    return <ProductDetailPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} productId={currentProductId} />
  }

  if (currentPage === 'camera') {
    return <CameraPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'lens') {
    return <LensPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'video') {
    return <VideoCameraPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'action') {
    return <ActionCameraPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'flycam') {
    return <FlycamPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'studio') {
    return <StudioPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'accessories') {
    return <AccessoriesPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'used') {
    return <UsedProductsPage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  if (currentPage === 'setup') {
    return <StudioSetupPage onNavigate={handleNavigate} cartCount={cartCount} />
  }

  
  if (currentPage === 'cart') {
    return <CartPage onNavigate={handleNavigate} cartItems={cartItems} setCartItems={setCartItems} cartCount={cartCount} />
  }

  if (currentPage === 'store') {
    return <StorePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} cartCount={cartCount} />
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>

      {/* ── SHARED NAVBAR ──────────────────────────────────
          Fixed at viewport top. White + orange.
          Persists identically across every scene.
      ─────────────────────────────────────────────────── */}
      <SharedNavbar onNavigate={handleNavigate} cartCount={cartCount} />

      {/* ── STORY PROGRESS RAIL ────────────────────────────
          Fixed film-strip counter on the right edge:
          7 frame ticks + 01·07 readout, click to jump.
      ─────────────────────────────────────────────────── */}
      <StoryRail />

      {/* ── SCENES ─────────────────────────────────────────
          Scroll-snap mandatory — one scene per viewport.
          scrollSnapStop: always prevents skipping scenes.
      ─────────────────────────────────────────────────── */}
      <div
        id="scroll-container"
        style={{
          height: '100dvh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
        }}
      >
        {/* 1 — The foggy lone tree. The frame reveals what the eye chooses. */}
        <section style={{ minHeight: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <CinematicScene onNavigate={handleNavigate} />
        </section>

        {/* 2 — Vietnamese misty hills at dawn. Time and silence. */}
        <section style={{ minHeight: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Scene2 />
        </section>

        {/* 3 — Mountain at last light. Ánh sáng không chờ ai. */}
        <section style={{ minHeight: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Scene3 />
        </section>

        {/* 4 — Warm orange sunset mountain valley */}
        <section style={{ minHeight: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Scene4 />
        </section>

        {/* 5 — Breathtaking golden hour mountain reflection lake */}
        <section style={{ minHeight: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Scene5 />
        </section>

        {/* 6 — Choose Your World: Six cinematic photography worlds */}
        <section style={{ minHeight: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Scene6 />
        </section>

        {/* 7 — The Closing Scene: Manifesto & CTA */}
        <section style={{ minHeight: '100dvh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <Scene7 onEnterCamera={() => setCurrentPage('store')} />
        </section>
      </div>

    </div>
  )
}
