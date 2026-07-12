'use client';

import { useState } from 'react';
import { stores } from '@/data/stores';
import styles from './ContactClient.module.css';

export function ContactClient() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'tu_van_may_anh',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', email: '', topic: 'tu_van_may_anh', message: '' });
  };

  return (
    <div className={styles.wrap}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Hệ Thống Cửa Hàng & Liên Hệ</h1>
          <p className={styles.subtitle}>
            Chúng tôi luôn sẵn sàng hỗ trợ tư vấn thiết bị nhiếp ảnh, bảo hành và dịch vụ hậu mãi tại 4 chi nhánh chính hãng trên toàn quốc.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Hệ thống cửa hàng */}
          <div className={styles.stores_section}>
            <h2 className={styles.section_title}>🏪 Chi Nhánh Máy Ảnh Việt Nam</h2>
            {stores.map(store => (
              <div key={store.id} className={styles.store_card}>
                <div className={styles.store_header}>
                  <div className={styles.store_name}>{store.name}</div>
                  <span className={styles.store_city}>{store.city}</span>
                </div>

                <div className={styles.store_row}>
                  <span className={styles.store_icon}>📍</span>
                  <span>{store.address}</span>
                </div>

                <div className={styles.store_row}>
                  <span className={styles.store_icon}>📞</span>
                  <span>Hotline: <strong>{store.phone}</strong></span>
                </div>

                <div className={styles.store_row}>
                  <span className={styles.store_icon}>⏰</span>
                  <span>Giờ mở cửa: {store.hours} (Tất cả các ngày trong tuần)</span>
                </div>

                <a
                  href={store.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.store_map_link}
                >
                  🧭 Xem bản đồ đường đi Google Maps →
                </a>
              </div>
            ))}
          </div>

          {/* Form tư vấn */}
          <div>
            <div className={styles.form_card}>
              <h2 className={styles.section_title}>📩 Gửi Yêu Cầu Tư Vấn / Hỗ Trợ</h2>
              <p style={{ color: '#737373', fontSize: '14px', marginBottom: '20px' }}>
                Điền thông tin bên dưới, chuyên viên của chúng tôi sẽ gọi lại trong vòng 15 phút.
              </p>

              {sent ? (
                <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                  <h3>✓ Gửi yêu cầu thành công!</h3>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>
                    Cảm ơn bạn đã liên hệ. Đội ngũ Máy Ảnh Việt Nam sẽ liên lạc với bạn sớm nhất có thể.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ marginTop: '16px', color: '#ea580c', fontWeight: 700, fontSize: '14px' }}
                  >
                    Gửi yêu cầu khác →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form_grid}>
                  <div className={styles.field}>
                    <label className={styles.label}>Họ và tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0937 xxx xxx"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Chủ đề cần hỗ trợ</label>
                    <select
                      value={form.topic}
                      onChange={e => setForm({ ...form, topic: e.target.value })}
                      className={styles.select}
                    >
                      <option value="tu_van_may_anh">Tư vấn mua máy ảnh / ống kính</option>
                      <option value="tra_gop">Tư vấn thủ tục trả góp 0%</option>
                      <option value="lap_phong_studio">Báo giá thi công phông Studio</option>
                      <option value="bao_hanh">Kiểm tra bảo hành / sửa chữa</option>
                      <option value="khac">Yêu cầu khác</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Nội dung chi tiết</label>
                    <textarea
                      rows={4}
                      placeholder="Bạn cần tư vấn sản phẩm nào hoặc câu hỏi cụ thể..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className={styles.textarea}
                    />
                  </div>

                  <button type="submit" className={styles.submit_btn}>
                    GỬI YÊU CẦU NGAY →
                  </button>
                </form>
              )}
            </div>

            <div className={styles.hotline_banner}>
              <div>
                <div style={{ fontSize: '13px', opacity: 0.8 }}>Hỗ trợ khẩn cấp 24/7</div>
                <div className={styles.hotline_num}>0937.148.222</div>
              </div>
              <a
                href="tel:0937148222"
                style={{
                  background: '#f97316',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Gọi Ngay 📞
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
