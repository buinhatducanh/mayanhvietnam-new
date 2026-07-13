import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'

const orders = [
  { id: '#MAVNHCM241215001', date: '15/12/2024', total: 59900000, status: 'Đang giao', color: '#0EA5E9' },
  { id: '#MAVNHCM241210002', date: '10/12/2024', total: 18900000, status: 'Hoàn thành', color: '#10B981' },
  { id: '#MAVNHCM241205003', date: '05/12/2024', total: 10900000, status: 'Đang xử lý', color: '#F59E0B' },
  { id: '#MAVNHCM241201004', date: '01/12/2024', total: 62900000, status: 'Đã hủy', color: '#EF4444' },
]

const tabs = ['Thông tin cá nhân', 'Lịch sử đơn hàng', 'Sản phẩm yêu thích', 'Địa chỉ giao hàng', 'Đổi mật khẩu']

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('Lịch sử đơn hàng')

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
          <span style={{ color: '#E24A50', fontWeight: 600 }}>Tài Khoản</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
          {/* Sidebar */}
          <div>
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8ECF0',
                borderRadius: 16,
                padding: 28,
                marginBottom: 16,
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
              }}
            >
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                margin: '0 auto 12px',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'Plus Jakarta Sans',
                boxShadow: '0 8px 24px rgba(226,74,80,0.25)',
              }}>
                N
              </div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 18, fontWeight: 700, color: '#1A2332', marginBottom: 2 }}>
                Nguyễn Văn A
              </div>
              <div style={{ fontSize: 13, color: '#5D6B7F' }}>nguyenvana@gmail.com</div>
              <div style={{
                marginTop: 10,
                padding: '4px 14px',
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(226,74,80,0.1), rgba(255,138,91,0.08))',
                color: '#E24A50',
                fontSize: 12,
                fontWeight: 600,
                display: 'inline-block',
                border: '1px solid rgba(226,74,80,0.15)',
              }}>
                ⭐ Thành viên Vàng
              </div>
            </motion.div>

            {/* Nav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E8ECF0',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
              }}
            >
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    textAlign: 'left',
                    background: activeTab === tab ? 'rgba(226,74,80,0.04)' : 'transparent',
                    border: 'none',
                    borderBottom: i < tabs.length - 1 ? '1px solid #E8ECF0' : 'none',
                    borderLeft: `3px solid ${activeTab === tab ? '#E24A50' : 'transparent'}`,
                    color: activeTab === tab ? '#E24A50' : '#5D6B7F',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: activeTab === tab ? 600 : 400,
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.color = '#1A2332'
                      e.currentTarget.style.background = 'rgba(27,40,68,0.02)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.color = '#5D6B7F'
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
              <button
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  borderTop: '1px solid #E8ECF0',
                  color: '#EF4444',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                🚪 Đăng xuất
              </button>
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'Lịch sử đơn hàng' && (
                  <div>
                    <h2 style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#1A2332',
                      marginBottom: 24,
                    }}>
                      Lịch Sử Đơn Hàng
                    </h2>
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #E8ECF0',
                      borderRadius: 16,
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ background: '#F6F8FB' }}>
                            {['Mã đơn hàng', 'Ngày đặt', 'Tổng tiền', 'Trạng thái', 'Thao tác'].map(h => (
                              <th key={h} style={{
                                padding: '14px 16px',
                                textAlign: 'left',
                                fontSize: 12,
                                fontWeight: 700,
                                color: '#5D6B7F',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}>
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr
                              key={order.id}
                              style={{
                                borderTop: '1px solid #E8ECF0',
                                transition: 'background 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(226,74,80,0.02)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                              }}
                            >
                              <td style={{
                                padding: '14px 16px',
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#E24A50',
                              }}>
                                {order.id}
                              </td>
                              <td style={{
                                padding: '14px 16px',
                                fontSize: 13,
                                color: '#5D6B7F',
                              }}>
                                {order.date}
                              </td>
                              <td style={{
                                padding: '14px 16px',
                                fontSize: 14,
                                fontWeight: 700,
                                color: '#1A2332',
                                fontFamily: 'Plus Jakarta Sans',
                              }}>
                                {order.total.toLocaleString('vi-VN')}₫
                              </td>
                              <td style={{ padding: '14px 16px' }}>
                                <span style={{
                                  padding: '4px 12px',
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  background: order.color + '15',
                                  color: order.color,
                                }}>
                                  {order.status}
                                </span>
                              </td>
                              <td style={{ padding: '14px 16px' }}>
                                <button
                                  style={{
                                    padding: '6px 16px',
                                    borderRadius: 6,
                                    background: 'transparent',
                                    border: '1px solid #E8ECF0',
                                    color: '#1A2332',
                                    cursor: 'pointer',
                                    fontSize: 12,
                                    fontWeight: 500,
                                    transition: 'all 0.3s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#E24A50'
                                    e.currentTarget.style.borderColor = '#E24A50'
                                    e.currentTarget.style.color = '#fff'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.borderColor = '#E8ECF0'
                                    e.currentTarget.style.color = '#1A2332'
                                  }}
                                >
                                  Chi tiết
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'Sản phẩm yêu thích' && (
                  <div>
                    <h2 style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#1A2332',
                      marginBottom: 24,
                    }}>
                      Sản Phẩm Yêu Thích
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                      {products.slice(0, 3).map((p, idx) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E8ECF0',
                            borderRadius: 14,
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(27,40,68,0.08)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(27,40,68,0.04)'
                          }}
                        >
                          <div style={{
                            aspectRatio: '4/3',
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
                                transition: 'transform 0.6s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                              }}
                            />
                          </div>
                          <div style={{ padding: '14px 16px' }}>
                            <div style={{
                              fontSize: 13,
                              color: '#5D6B7F',
                              marginBottom: 4,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              minHeight: 36,
                              lineHeight: 1.4,
                            }}>
                              {p.name}
                            </div>
                            <div style={{
                              fontSize: 17,
                              fontWeight: 700,
                              color: '#E24A50',
                              fontFamily: 'Plus Jakarta Sans',
                              marginBottom: 12,
                            }}>
                              {p.price.toLocaleString('vi-VN')}₫
                            </div>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button
                                style={{
                                  flex: 1,
                                  padding: '8px 12px',
                                  borderRadius: 8,
                                  border: 'none',
                                  background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                                  color: '#fff',
                                  fontSize: 12,
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.02)'
                                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(226,74,80,0.3)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)'
                                  e.currentTarget.style.boxShadow = 'none'
                                }}
                              >
                                Thêm vào giỏ
                              </button>
                              <button
                                style={{
                                  padding: '8px 12px',
                                  borderRadius: 8,
                                  background: 'rgba(239,68,68,0.08)',
                                  border: '1px solid rgba(239,68,68,0.15)',
                                  color: '#EF4444',
                                  cursor: 'pointer',
                                  fontSize: 14,
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
                                }}
                              >
                                ❤️
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'Thông tin cá nhân' && (
                  <div>
                    <h2 style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 24,
                      fontWeight: 700,
                      color: '#1A2332',
                      marginBottom: 24,
                    }}>
                      Thông Tin Cá Nhân
                    </h2>
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #E8ECF0',
                      borderRadius: 16,
                      padding: 32,
                      boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                          ['Họ và tên', 'Nguyễn Văn A'],
                          ['Số điện thoại', '0901 234 567'],
                          ['Email', 'nguyenvana@gmail.com'],
                          ['Ngày sinh', '01/01/1990']
                        ].map(([label, value]) => (
                          <div key={label}>
                            <label style={{
                              display: 'block',
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#5D6B7F',
                              marginBottom: 6,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}>
                              {label}
                            </label>
                            <input
                              defaultValue={value}
                              style={{
                                width: '100%',
                                padding: '12px 14px',
                                background: '#F6F8FB',
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
                          </div>
                        ))}
                        <div>
                          <label style={{
                            display: 'block',
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#5D6B7F',
                            marginBottom: 6,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}>
                            Giới tính
                          </label>
                          <select
                            style={{
                              width: '100%',
                              padding: '12px 14px',
                              background: '#F6F8FB',
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
                          >
                            <option>Nam</option>
                            <option>Nữ</option>
                            <option>Khác</option>
                          </select>
                        </div>
                      </div>
                      <button
                        style={{
                          marginTop: 24,
                          padding: '12px 36px',
                          borderRadius: 10,
                          border: 'none',
                          background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: 'pointer',
                          fontFamily: 'Plus Jakarta Sans',
                          transition: 'all 0.3s ease',
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
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                )}

                {!['Lịch sử đơn hàng', 'Sản phẩm yêu thích', 'Thông tin cá nhân'].includes(activeTab) && (
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8ECF0',
                    borderRadius: 16,
                    padding: 64,
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                  }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
                    <h3 style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#1A2332',
                      marginBottom: 8,
                    }}>
                      Tính năng đang phát triển
                    </h3>
                    <p style={{ color: '#5D6B7F', fontSize: 14 }}>
                      Chức năng "{activeTab}" sẽ sớm ra mắt.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}