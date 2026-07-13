import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'

const paymentMethods = [
  { id: 'cod', icon: '💵', label: 'Thanh toán khi nhận hàng (COD)' },
  { id: 'card', icon: '💳', label: 'Thẻ tín dụng / Ghi nợ (VISA, MC, JCB)' },
  { id: 'momo', icon: '📱', label: 'Ví MoMo' },
  { id: 'atm', icon: '🏧', label: 'ATM nội địa (Napas)' },
  { id: 'installment', icon: '📅', label: 'Trả góp 0% qua thẻ tín dụng' },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [payment, setPayment] = useState('cod')
  const [fullName, setFullName] = useState('Nguyễn Văn A')
  const [phone, setPhone] = useState('0901 234 567')
  const [email, setEmail] = useState('example@gmail.com')
  const [address, setAddress] = useState('123 Nguyễn Trãi')
  const [ward, setWard] = useState('Phường 1')
  const [district, setDistrict] = useState('Quận 1')
  const [city, setCity] = useState('TP. Hồ Chí Minh')
  const [notes, setNotes] = useState('')
  const items = [{ ...products[0], qty: 1 }, { ...products[3], qty: 1 }]
  const total = items.reduce((s, i) => s + i.price * i.qty, 0) - 500000

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  return (
    <div style={{ backgroundColor: '#F6F8FB', minHeight: '100vh', padding: '32px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{
          fontFamily: 'Plus Jakarta Sans',
          fontSize: 32,
          fontWeight: 800,
          color: '#1A2332',
          marginBottom: 32,
        }}>
          Thanh Toán
        </h1>

        {/* Steps */}
        <div style={{
          display: 'flex',
          gap: 0,
          marginBottom: 40,
          background: '#FFFFFF',
          border: '1px solid #E8ECF0',
          borderRadius: 12,
          padding: '20px 24px',
          boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
        }}>
          {[
            ['1', 'Thông tin giao hàng'],
            ['2', 'Thanh toán'],
            ['3', 'Xác nhận']
          ].map(([n, label], i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: 'Plus Jakarta Sans',
                  background: step >= i + 1
                    ? 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)'
                    : '#E8ECF0',
                  color: step >= i + 1 ? '#fff' : '#8B96A5',
                  transition: 'all 0.3s ease',
                }}>
                  {n}
                </div>
                <span style={{
                  fontSize: 14,
                  fontWeight: step >= i + 1 ? 600 : 400,
                  color: step >= i + 1 ? '#1A2332' : '#8B96A5',
                  transition: 'all 0.3s ease',
                }}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div style={{
                  flex: 1,
                  height: 2,
                  background: step > i + 1
                    ? 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)'
                    : '#E8ECF0',
                  margin: '0 16px',
                  transition: 'all 0.3s ease',
                }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }}>
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8ECF0',
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                  }}>
                    <h2 style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#1A2332',
                      marginBottom: 24,
                    }}>
                      Thông Tin Giao Hàng
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Họ và tên *
                        </label>
                        <input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
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
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Số điện thoại *
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
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
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Email
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Địa chỉ *
                        </label>
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
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
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Phường/Xã *
                        </label>
                        <input
                          value={ward}
                          onChange={(e) => setWard(e.target.value)}
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
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Quận/Huyện *
                        </label>
                        <input
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
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
                      <div style={{ gridColumn: '1/-1' }}>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Tỉnh/Thành phố *
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
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
                          <option>TP. Hồ Chí Minh</option>
                          <option>TP. Cần Thơ</option>
                          <option>An Giang</option>
                          <option>Đồng Tháp</option>
                          <option>Hà Nội</option>
                        </select>
                      </div>
                      <div style={{ gridColumn: '1/-1' }}>
                        <label style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#5D6B7F',
                          marginBottom: 6,
                        }}>
                          Ghi chú đơn hàng
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Ghi chú thêm..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            background: '#F6F8FB',
                            border: '1px solid #E8ECF0',
                            borderRadius: 10,
                            color: '#1A2332',
                            fontSize: 14,
                            fontFamily: 'Inter',
                            resize: 'none',
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
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      style={{
                        marginTop: 24,
                        width: '100%',
                        padding: '14px',
                        borderRadius: 12,
                        border: 'none',
                        background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: 15,
                        cursor: 'pointer',
                        fontFamily: 'Plus Jakarta Sans',
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
                      Tiếp tục → Chọn thanh toán
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8ECF0',
                    borderRadius: 16,
                    padding: 32,
                    boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                  }}>
                    <h2 style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#1A2332',
                      marginBottom: 24,
                    }}>
                      Phương Thức Thanh Toán
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {paymentMethods.map(m => (
                        <label
                          key={m.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 14,
                            padding: '16px 20px',
                            borderRadius: 12,
                            cursor: 'pointer',
                            border: `1px solid ${payment === m.id ? '#E24A50' : '#E8ECF0'}`,
                            background: payment === m.id ? 'rgba(226,74,80,0.04)' : '#F6F8FB',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (payment !== m.id) {
                              e.currentTarget.style.borderColor = '#E24A50'
                              e.currentTarget.style.background = 'rgba(226,74,80,0.02)'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (payment !== m.id) {
                              e.currentTarget.style.borderColor = '#E8ECF0'
                              e.currentTarget.style.background = '#F6F8FB'
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={m.id}
                            checked={payment === m.id}
                            onChange={() => setPayment(m.id)}
                            style={{
                              accentColor: '#E24A50',
                              width: 18,
                              height: 18,
                              cursor: 'pointer',
                            }}
                          />
                          <span style={{ fontSize: 22 }}>{m.icon}</span>
                          <span style={{
                            fontSize: 14,
                            color: '#1A2332',
                            fontWeight: payment === m.id ? 600 : 400,
                          }}>
                            {m.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                      <button
                        onClick={() => setStep(1)}
                        style={{
                          flex: 1,
                          padding: '14px',
                          borderRadius: 12,
                          border: '1px solid #E8ECF0',
                          background: 'transparent',
                          color: '#1A2332',
                          cursor: 'pointer',
                          fontSize: 14,
                          fontWeight: 600,
                          transition: 'all 0.3s ease',
                          fontFamily: 'Inter',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#E24A50'
                          e.currentTarget.style.color = '#E24A50'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E8ECF0'
                          e.currentTarget.style.color = '#1A2332'
                        }}
                      >
                        ← Quay lại
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        style={{
                          flex: 2,
                          padding: '14px',
                          borderRadius: 12,
                          border: 'none',
                          background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: 15,
                          cursor: 'pointer',
                          fontFamily: 'Plus Jakarta Sans',
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
                        Đặt Hàng Ngay →
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(16,185,129,0.2)',
                      borderRadius: 16,
                      padding: 48,
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
                    }}
                  >
                    <div style={{
                      fontSize: 64,
                      marginBottom: 16,
                      animation: 'bounce 1s infinite',
                    }}>
                      🎉
                    </div>
                    <h2 style={{
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 28,
                      fontWeight: 800,
                      color: '#10B981',
                      marginBottom: 12,
                    }}>
                      Đặt Hàng Thành Công!
                    </h2>
                    <p style={{
                      fontSize: 16,
                      color: '#5D6B7F',
                      marginBottom: 8,
                    }}>
                      Mã đơn hàng: <strong style={{ color: '#E24A50' }}>#MAVNHCM241215001</strong>
                    </p>
                    <p style={{
                      fontSize: 15,
                      color: '#1A2332',
                      marginBottom: 4,
                      fontWeight: 600,
                    }}>
                      {fullName} · {phone}
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: '#5D6B7F',
                      marginBottom: 8,
                    }}>
                      {address}, {ward}, {district}, {city}
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: '#8B96A5',
                      marginBottom: 32,
                    }}>
                      Chúng tôi sẽ liên hệ xác nhận đơn trong vòng 30 phút. Giao hàng trong 24h.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                      <Link
                        to="/tai-khoan"
                        style={{
                          padding: '12px 28px',
                          borderRadius: 10,
                          textDecoration: 'none',
                          border: '1px solid #E8ECF0',
                          color: '#1A2332',
                          fontSize: 14,
                          fontWeight: 600,
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#E24A50'
                          e.currentTarget.style.color = '#E24A50'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#E8ECF0'
                          e.currentTarget.style.color = '#1A2332'
                        }}
                      >
                        Xem đơn hàng
                      </Link>
                      <Link
                        to="/"
                        style={{
                          padding: '12px 28px',
                          borderRadius: 10,
                          textDecoration: 'none',
                          background: 'linear-gradient(135deg, #E24A50 0%, #FF8A5B 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: 14,
                          fontFamily: 'Plus Jakarta Sans',
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
                        Tiếp tục mua sắm
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E8ECF0',
            borderRadius: 16,
            padding: 24,
            alignSelf: 'start',
            boxShadow: '0 2px 8px rgba(27,40,68,0.04)',
          }}>
            <h3 style={{
              fontFamily: 'Plus Jakarta Sans',
              fontSize: 16,
              fontWeight: 700,
              color: '#1A2332',
              marginBottom: 20,
            }}>
              Đơn Hàng Của Bạn
            </h3>
            {items.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: 12,
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: '1px solid #E8ECF0',
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#F6F8FB',
                  flexShrink: 0,
                }}>
                  <img
                    src={item.image}
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
                    fontSize: 12,
                    color: '#5D6B7F',
                    lineHeight: 1.4,
                    marginBottom: 4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#E24A50',
                  }}>
                    {item.price.toLocaleString('vi-VN')}₫
                  </div>
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#8B96A5',
                }}>
                  x{item.qty}
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #E8ECF0', paddingTop: 16 }}>
              {[
                ['Tạm tính', items.reduce((s, i) => s + i.price * i.qty, 0)],
                ['Vận chuyển', 0],
                ['Giảm giá', -500000]
              ].map(([label, val]) => (
                <div
                  key={label as string}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                    fontSize: 13,
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
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 12,
                borderTop: '1px solid #E8ECF0',
              }}>
                <span style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#1A2332',
                  fontFamily: 'Plus Jakarta Sans',
                }}>
                  Tổng
                </span>
                <span style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#E24A50',
                  fontFamily: 'Plus Jakarta Sans',
                }}>
                  {total.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    </div>
  )
}