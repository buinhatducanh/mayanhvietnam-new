import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface Slide {
    title: string
    sub: string
    cta: string
    href: string
    image: string
    badge: string
    price: string
}

const heroSlides: Slide[] = [
    {
        title: 'Sony Alpha A7R VI',
        sub: 'Cảm biến 61MP · 8K 30fps · AF AI Tracking',
        cta: 'Khám phá ngay',
        href: '/san-pham/sony-alpha-a7r-vi-body',
        image: 'https://mayanhvietnam.com/asset/imgs/img/1200x400_banner_sanPhamKhuyenMai20250108.png',
        badge: 'MỚI NHẤT 2026',
        price: '89.900.000₫',
    },
    {
        title: 'DJI Mavic 4 Pro',
        sub: 'Flycam 50MP · 8K 30fps · Bay 43 phút',
        cta: 'Mua ngay',
        href: '/san-pham/dji-mavic-4-pro-creator-combo',
        image: 'https://mayanhvietnam.com/asset/imgs/img/tet/bannerTet.png',
        badge: 'FLAGSHIP',
        price: '59.900.000₫',
    },
    {
        title: 'Canon EOS R50',
        sub: 'APS-C nhẹ nhất · 4K 30fps · Dual Pixel AF II',
        cta: 'Xem chi tiết',
        href: '/san-pham/canon-eos-r50-18-45mm',
        image: 'https://mayanhvietnam.com/asset/imgs/img/SPKM_banner/SPKM_eosR50.webp',
        badge: 'BÁN CHẠY',
        price: '17.900.000₫',
    },
]

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1)
            setCurrentSlide((s) => (s + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setMousePosition({ x, y })
    }, [])

    const handleMouseLeave = useCallback(() => {
        setMousePosition({ x: 0, y: 0 })
    }, [])

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1)
        setCurrentSlide(index)
    }

    const slide = heroSlides[currentSlide]

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                height: 'calc(100dvh - 160px)',
                minHeight: '400px',
                maxHeight: '800px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #404040 100%)',
                margin: 0,
                borderRadius: 0,
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 0.35,
                        x: mousePosition.x * -20,
                        y: mousePosition.y * -10,
                    }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1],
                        x: { type: 'spring', stiffness: 100, damping: 30 },
                        y: { type: 'spring', stiffness: 100, damping: 30 },
                    }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
            linear-gradient(135deg, 
              rgba(26, 26, 26, 0.92) 0%, 
              rgba(45, 45, 45, 0.80) 40%,
              rgba(64, 64, 64, 0.50) 70%,
              rgba(0, 0, 0, 0.15) 100%
            )
          `,
                    zIndex: 1,
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    right: '-5%',
                    top: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,107,0,0.10) 0%, transparent 70%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    left: '5%',
                    bottom: '-20%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,138,60,0.06) 0%, transparent 70%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 clamp(16px, 4vw, 48px)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{
                            opacity: 0,
                            x: direction > 0 ? 40 : -40,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: mousePosition.y * -6,
                        }}
                        exit={{
                            opacity: 0,
                            x: direction > 0 ? -40 : 40,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: [0.4, 0, 0.2, 1],
                            y: { type: 'spring', stiffness: 150, damping: 25 },
                        }}
                        style={{
                            maxWidth: '520px',
                            width: '100%',
                        }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                display: 'inline-block',
                                padding: '6px 18px',
                                borderRadius: '24px',
                                fontSize: '11px',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                                color: '#fff',
                                marginBottom: '16px',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                            }}
                        >
                            {slide.badge}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                                fontSize: 'clamp(28px, 7vw, 48px)',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                lineHeight: 1.1,
                                marginBottom: '16px',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            }}
                        >
                            {slide.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            style={{
                                fontSize: '17px',
                                color: 'rgba(255,255,255,0.85)',
                                marginBottom: '12px',
                                lineHeight: 1.6,
                                fontWeight: 400,
                            }}
                        >
                            {slide.sub}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                fontSize: '28px',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: '28px',
                                fontFamily: 'Plus Jakarta Sans, sans-serif',
                            }}
                        >
                            {slide.price}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Link
                                to={slide.href}
                                style={{
                                    padding: '14px 36px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: '15px',
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 24px rgba(255,107,0,0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,0,0.4)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.3)'
                                }}
                            >
                                {slide.cta}
                            </Link>
                            <Link
                                to="/danh-muc/may-anh"
                                style={{
                                    padding: '14px 36px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                                }}
                            >
                                Xem tất cả
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '32px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '8px',
                        zIndex: 3,
                    }}
                >
                    {heroSlides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            style={{
                                width: i === currentSlide ? '32px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: i === currentSlide
                                    ? 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)'
                                    : 'rgba(255,255,255,0.25)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                if (i !== currentSlide) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.5)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (i !== currentSlide) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
                                }
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        color: '#fff',
                        fontSize: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    }}
                >
                    ‹
                </button>
                <button
                    onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
                    style={{
                        position: 'absolute',
                        right: '24px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        color: '#fff',
                        fontSize: '22px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        zIndex: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    }}
                >
                    ›
                </button>

                <motion.div
                    animate={{
                        y: [0, 8, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '72px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 3,
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                    onClick={() => {
                        window.scrollTo({
                            top: window.innerHeight,
                            behavior: 'smooth',
                        })
                    }}
                >
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Cuộn xuống
                    </span>
                    <span>↓</span>
                </motion.div>
            </div>
        </div>
    )
}