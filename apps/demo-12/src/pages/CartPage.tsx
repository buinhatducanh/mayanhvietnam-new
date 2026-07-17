import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products'

export default function CartPage() {
  const [items, setItems] = useState([
    { ...products[0], qty: 1 },
    { ...products[3], qty: 1 },
  ])

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = 0
  const discount = 500000

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ backgroundColor: '#F6F8FB', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, fontSize: 13, color: '#5D6B7F' }}>
          <Link to="/" style={{ color: '#5D6B7F', textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E24A50'}
            onMouseLeave={e => e.currentTarget.style.color = '#5D6B7F'}
          >
            Trang chủ
          </Link>
          <span>/</span>
          <span style={{ color: '#E24A50', fontWeight: 600 }}>Giỏ Hàng</span>
        </div>

        <h1 style={{
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 32,
          fontWeight: 800,
          color: '#1A2332',
          marginBottom: 32,
        }}>
          Giỏ Hàng ({items.length} sản phẩm)
        </h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: '80px 0',
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E8ECF0',
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <h3 style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 24,
              color: '#1A2332',
              marginBottom: 8,
            }}>
              Giỏ hàng trống
            </h3>
            <p style={{ color: '#5D6B7F', marginBottom: 24 }}>Hãy thêm sản phẩm vào giỏ hàng</p>
            <Link
              to="/"
              style={{
                padding: '12px 32px',
                borderRadius: 12,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'Plus Jakarta Sans',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                boxShadow: '0 4px 16px rgba(226,74,80,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(226,74,80,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(226,74,80,0.25)'
              }}
            >
              Tiếp tục mua sắm
            </Link>
          </motion.div>
        ) : (
          <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
            {/* Cart items */}
            <div>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E8ECF0',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
              }}>
                {items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      padding: '20px 24px',
                      borderBottom: idx < items.length - 1 ? '1px solid #E8ECF0' : 'none',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'center',
                      transition: 'background 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(226,74,80,0.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: '#F6F8FB',
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Link
                        to={`/san-pham/${item.slug}`}
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#1A2332',
                          textDecoration: 'none',
                          display: 'block',
                          marginBottom: 4,
                          transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#E24A50'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#1A2332'
                        }}
                      >
                        {item.name}
                      </Link>
                      <div style={{ fontSize: 12, color: '#5D6B7F', marginBottom: 8 }}>
                        Thương hiệu: {item.brand}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #E8ECF0',
                          borderRadius: 8,
                          overflow: 'hidden',
                        }}>
                          <button
                            onClick={() => setItems(items.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                            style={{
                              padding: '6px 14px',
                              background: 'transparent',
                              border: 'none',
                              color: '#1A2332',
                              cursor: 'pointer',
                              fontSize: 16,
                              transition: 'background 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(226,74,80,0.08)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent'
                            }}
                          >
                            −
                          </button>
                          <span style={{
                            padding: '6px 14px',
                            fontSize: 14,
                            color: '#1A2332',
                            fontWeight: 600,
                            minWidth: 40,
                            textAlign: 'center',
                          }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => setItems(items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                            style={{
                              padding: '6px 14px',
                              background: 'transparent',
                              border: 'none',
                              color: '#1A2332',
                              cursor: 'pointer',
                              fontSize: 16,
                              transition: 'background 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(226,74,80,0.08)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent'
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => setItems(items.filter(i => i.id !== item.id))}
                          style={{
                            fontSize: 12,
                            color: '#EF4444',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: 4,
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          🗑 Xóa
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#E24A50',
                        fontFamily: 'Plus Jakarta Sans',
                      }}>
                        {(item.price * item.qty).toLocaleString('vi-VN')}₫
                      </div>
                      {item.originalPrice && (
                        <div style={{
                          fontSize: 12,
                          color: '#8B96A5',
                          textDecoration: 'line-through',
                        }}>
                          {(item.originalPrice * item.qty).toLocaleString('vi-VN')}₫
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E8ECF0',
                  borderRadius: 16,
                  padding: 28,
                  marginBottom: 16,
                  boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                }}
              >
                <h3 style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1A2332',
                  marginBottom: 20,
                }}>
                  Tóm Tắt Đơn Hàng
                </h3>
                <div style={{ marginBottom: 16 }}>
                  {[
                    ['Tạm tính', total],
                    ['Phí vận chuyển', shipping],
                    ['Giảm giá', -discount]
                  ].map(([label, val]) => (
                    <div
                      key={label as string}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                        fontSize: 14,
                      }}
                    >
                      <span style={{ color: '#5D6B7F' }}>{label as string}</span>
                      <span style={{
                        color: (val as number) < 0 ? '#10B981' : '#1A2332',
                        fontWeight: 500,
                      }}>
                        {(val as number) < 0 ? '-' : ''}
                        {Math.abs(val as number).toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{
                  borderTop: '1px solid #E8ECF0',
                  paddingTop: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#1A2332',
                    fontFamily: 'Plus Jakarta Sans',
                  }}>
                    Tổng cộng
                  </span>
                  <span style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#E24A50',
                    fontFamily: 'Plus Jakarta Sans',
                  }}>
                    {(total - discount).toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </motion.div>

              {/* Coupon */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input
                  placeholder="Nhập mã giảm giá"
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    background: '#FFFFFF',
                    border: '1px solid #E8ECF0',
                    borderRadius: 10,
                    color: '#1A2332',
                    fontSize: 14,
                    fontFamily: 'Inter',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#E24A50'
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E8ECF0'
                  }}
                />
                <button
                  style={{
                    padding: '12px 20px',
                    borderRadius: 10,
                    background: 'rgba(226,74,80,0.08)',
                    border: '1px solid rgba(226,74,80,0.2)',
                    color: '#E24A50',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14,
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(226,74,80,0.15)'
                    e.currentTarget.style.borderColor = 'rgba(226,74,80,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(226,74,80,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(226,74,80,0.2)'
                  }}
                >
                  Áp dụng
                </button>
              </div>

              <Link
                to="/thanh-toan"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  fontFamily: 'Plus Jakarta Sans',
                  marginBottom: 12,
                  boxShadow: '0 4px 16px rgba(226,74,80,0.25)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(226,74,80,0.35)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(226,74,80,0.25)'
                }}
              >
                Tiến Hành Thanh Toán →
              </Link>

              <Link
                to="/"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  border: '1px solid #E8ECF0',
                  color: '#5D6B7F',
                  fontSize: 14,
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#E24A50'
                  e.currentTarget.style.color = '#E24A50'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E8ECF0'
                  e.currentTarget.style.color = '#5D6B7F'
                }}
              >
                ← Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}