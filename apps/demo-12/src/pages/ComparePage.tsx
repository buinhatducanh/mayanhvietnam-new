import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'

const specRows = ['Cảm biến', 'Quay video', 'Lấy nét', 'Chống rung', 'Trọng lượng']

export default function ComparePage() {
  const [compareList, setCompareList] = useState([products[0], products[1]])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const remove = (id: number) => setCompareList(compareList.filter(p => p.id !== id))
  const add = (p: typeof products[0]) => {
    setCompareList([...compareList, p])
    setShowModal(false)
  }

  return (
    <div style={{ backgroundColor: '#F6F8FB', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 13, color: '#5D6B7F' }}>
          <Link to="/" style={{ color: '#5D6B7F', textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E24A50'}
            onMouseLeave={e => e.currentTarget.style.color = '#5D6B7F'}
          >
            Trang chủ
          </Link>
          <span>/</span>
          <span style={{ color: '#E24A50', fontWeight: 600 }}>So Sánh Sản Phẩm</span>
        </div>

        <h1 style={{
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 32,
          fontWeight: 800,
          color: '#1A2332',
          marginBottom: 32,
        }}>
          So Sánh Sản Phẩm
        </h1>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #E8ECF0',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              {/* Product headers */}
              <thead>
                <tr>
                  <th style={{
                    width: 160,
                    padding: '16px 20px',
                    background: '#F6F8FB',
                    borderBottom: '1px solid #E8ECF0',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#5D6B7F',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Thông Số
                  </th>
                  {compareList.map(p => (
                    <th key={p.id} style={{
                      padding: '20px 16px',
                      background: '#F6F8FB',
                      borderBottom: '1px solid #E8ECF0',
                      textAlign: 'center',
                      minWidth: 220,
                      position: 'relative',
                    }}>
                      <button
                        onClick={() => remove(p.id)}
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'none',
                          border: 'none',
                          color: '#8B96A5',
                          cursor: 'pointer',
                          fontSize: 18,
                          transition: 'all 0.3s ease',
                          padding: '4px 8px',
                          borderRadius: 4,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#EF4444'
                          e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#8B96A5'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        ✕
                      </button>
                      <div style={{
                        aspectRatio: '4/3',
                        width: 140,
                        margin: '0 auto 12px',
                        borderRadius: 10,
                        overflow: 'hidden',
                        background: '#F6F8FB',
                      }}>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      <div style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1A2332',
                        lineHeight: 1.4,
                        marginBottom: 8,
                        minHeight: 40,
                      }}>
                        {p.name}
                      </div>
                      <div style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#E24A50',
                        fontFamily: 'Plus Jakarta Sans',
                      }}>
                        {p.price.toLocaleString('vi-VN')}₫
                      </div>
                    </th>
                  ))}
                  {compareList.length < 3 && (
                    <th style={{
                      padding: '20px 16px',
                      background: '#F6F8FB',
                      borderBottom: '1px solid #E8ECF0',
                      textAlign: 'center',
                      minWidth: 200,
                    }}>
                      <button
                        onClick={() => setShowModal(true)}
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: 'rgba(226,74,80,0.06)',
                          border: '2px dashed rgba(226,74,80,0.25)',
                          color: '#E24A50',
                          cursor: 'pointer',
                          fontSize: 24,
                          margin: '0 auto 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(226,74,80,0.12)'
                          e.currentTarget.style.borderColor = 'rgba(226,74,80,0.4)'
                          e.currentTarget.style.transform = 'scale(1.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(226,74,80,0.06)'
                          e.currentTarget.style.borderColor = 'rgba(226,74,80,0.25)'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        +
                      </button>
                      <div style={{ fontSize: 13, color: '#8B96A5' }}>Thêm sản phẩm</div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Brand row */}
                <tr>
                  <td style={{
                    padding: '14px 20px',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#5D6B7F',
                    background: '#FAFBFC',
                    borderBottom: '1px solid #E8ECF0',
                  }}>
                    Thương hiệu
                  </td>
                  {compareList.map(p => (
                    <td key={p.id} style={{
                      padding: '14px 16px',
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#1A2332',
                      background: '#FAFBFC',
                      borderBottom: '1px solid #E8ECF0',
                      fontWeight: 600,
                    }}>
                      {p.brand}
                    </td>
                  ))}
                  {compareList.length < 3 && <td style={{ background: '#FAFBFC', borderBottom: '1px solid #E8ECF0' }} />}
                </tr>

                {specRows.map((row, rowIdx) => {
                  const vals = compareList.map(p => p.specs[row] || '—')
                  const bestValue = vals.filter(v => v !== '—').reduce((best, v) => {
                    const numV = parseFloat(v)
                    const numB = parseFloat(best)
                    return !isNaN(numV) && !isNaN(numB) ? (numV > numB ? v : best) : best
                  }, vals[0] || '—')

                  return (
                    <tr key={row}>
                      <td style={{
                        padding: '14px 20px',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#5D6B7F',
                        background: rowIdx % 2 === 0 ? '#FAFBFC' : 'transparent',
                        borderBottom: '1px solid #E8ECF0',
                      }}>
                        {row}
                      </td>
                      {compareList.map((p, i) => (
                        <td key={p.id} style={{
                          padding: '14px 16px',
                          textAlign: 'center',
                          fontSize: 13,
                          color: '#1A2332',
                          background: rowIdx % 2 === 0 ? '#FAFBFC' : 'transparent',
                          borderBottom: '1px solid #E8ECF0',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            {vals[i]}
                            {vals[i] !== '—' && vals[i] === bestValue && vals.filter(v => v !== '—').length > 1 && (
                              <span style={{
                                fontSize: 9,
                                padding: '2px 6px',
                                borderRadius: 4,
                                background: 'rgba(16,185,129,0.12)',
                                color: '#10B981',
                                fontWeight: 700,
                              }}>
                                BEST
                              </span>
                            )}
                          </div>
                        </td>
                      ))}
                      {compareList.length < 3 && <td style={{
                        background: rowIdx % 2 === 0 ? '#FAFBFC' : 'transparent',
                        borderBottom: '1px solid #E8ECF0',
                      }} />}
                    </tr>
                  )
                })}

                {/* CTA row */}
                <tr>
                  <td style={{ padding: '20px' }} />
                  {compareList.map(p => (
                    <td key={p.id} style={{ padding: '20px 16px', textAlign: 'center' }}>
                      <Link
                        to={`/san-pham/${p.slug}`}
                        style={{
                          display: 'inline-block',
                          padding: '10px 24px',
                          borderRadius: 10,
                          textDecoration: 'none',
                          background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: 13,
                          fontFamily: 'Plus Jakarta Sans',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 12px rgba(226,74,80,0.2)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(226,74,80,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(226,74,80,0.2)'
                        }}
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  ))}
                  {compareList.length < 3 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(27,40,68,0.5)',
                backdropFilter: 'blur(8px)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
              }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  padding: 32,
                  width: '100%',
                  maxWidth: 560,
                  maxHeight: '80vh',
                  boxShadow: '0 24px 64px rgba(27,40,68,0.2)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                  <h3 style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#1A2332',
                  }}>
                    Chọn sản phẩm so sánh
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#8B96A5',
                      cursor: 'pointer',
                      fontSize: 20,
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#EF4444'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#8B96A5'
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  maxHeight: 400,
                  overflowY: 'auto',
                }}>
                  {products
                    .filter(p => !compareList.find(c => c.id === p.id))
                    .map(p => (
                      <motion.div
                        key={p.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => add(p)}
                        style={{
                          display: 'flex',
                          gap: 12,
                          alignItems: 'center',
                          padding: 12,
                          borderRadius: 12,
                          cursor: 'pointer',
                          background: '#F6F8FB',
                          border: '1px solid #E8ECF0',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#E24A50'
                          e.currentTarget.style.background = 'rgba(226,74,80,0.04)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E8ECF0'
                          e.currentTarget.style.background = '#F6F8FB'
                        }}
                      >
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          overflow: 'hidden',
                          flexShrink: 0,
                          background: '#FFFFFF',
                        }}>
                          <img
                            src={p.image}
                            alt=""
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#1A2332',
                          }}>
                            {p.name}
                          </div>
                          <div style={{
                            fontSize: 12,
                            color: '#E24A50',
                            fontWeight: 600,
                          }}>
                            {p.price.toLocaleString('vi-VN')}₫
                          </div>
                        </div>
                        <span style={{
                          color: '#E24A50',
                          fontSize: 20,
                          fontWeight: 300,
                        }}>
                          +
                        </span>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}