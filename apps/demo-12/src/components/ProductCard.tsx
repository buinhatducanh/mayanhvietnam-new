import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface ProductCardProps {
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating?: number
  slug: string
}

export default function ProductCard({ name, price, originalPrice, image, badge, rating = 4.8, slug }: ProductCardProps) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link to={`/san-pham/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8E4DE',
          borderRadius: 16,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.08)'
            : '0 2px 8px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        <div style={{
          position: 'relative',
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: '#F5F2ED',
        }}>
          <img
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            loading="lazy"
          />

          {badge && (
            <span style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)',
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              padding: '4px 14px',
              borderRadius: 20,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(255,107,0,0.25)',
            }}>{badge}</span>
          )}

          {discount > 0 && (
            <span style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 20,
            }}>-{discount}%</span>
          )}
        </div>

        <div style={{ padding: '16px 18px 18px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
          }}>
            <span style={{ color: '#FF6B00', fontSize: 13 }}>★</span>
            <span style={{ fontSize: 13, color: '#666666', fontWeight: 500 }}>
              {rating} (128 đánh giá)
            </span>
          </div>

          <div style={{
            fontSize: 14,
            color: '#1A1A1A',
            fontWeight: 600,
            marginBottom: 10,
            lineHeight: 1.4,
            fontFamily: 'Inter',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 40,
          }}>
            {name}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#FF6B00',
              fontFamily: 'Plus Jakarta Sans'
            }}>
              {price.toLocaleString('vi-VN')}₫
            </span>
            {originalPrice && (
              <span style={{
                fontSize: 13,
                color: '#999999',
                textDecoration: 'line-through'
              }}>
                {originalPrice.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          <motion.button
            onClick={(e) => {
              e.preventDefault()
              alert('Đã thêm vào giỏ hàng!')
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 10,
              border: 'none',
              background: isHovered
                ? 'linear-gradient(135deg, #FF6B00 0%, #FF8A3C 100%)'
                : '#F5F2ED',
              color: isHovered ? '#fff' : '#1A1A1A',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter',
              transition: 'all 0.3s ease',
            }}
          >
            {isHovered ? '🛒 Thêm vào giỏ' : 'Thêm vào giỏ'}
          </motion.button>
        </div>
      </motion.div>
    </Link>
  )
}