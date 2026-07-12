'use client';

import { useState } from 'react';
import styles from './TradeInWidget.module.css';

export function TradeInWidget() {
  const [deviceType, setDeviceType] = useState('camera');
  const [brand, setBrand] = useState('Canon');
  const [model, setModel] = useState('');
  const [condition, setCondition] = useState('like_new');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const calculateEstimate = () => {
    let base = 15000000;
    if (deviceType === 'lens') base = 9000000;
    if (deviceType === 'drone') base = 18000000;

    let multiplier = 1.0;
    if (condition === 'like_new') multiplier = 1.0;
    if (condition === 'good') multiplier = 0.88;
    if (condition === 'fair') multiplier = 0.75;

    const minPrice = Math.round((base * multiplier * 0.95) / 100000) * 100000;
    const maxPrice = Math.round((base * multiplier * 1.08) / 100000) * 100000;

    return {
      min: new Intl.NumberFormat('vi-VN').format(minPrice) + 'đ',
      max: new Intl.NumberFormat('vi-VN').format(maxPrice) + 'đ',
    };
  };

  const est = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert('Vui lòng nhập số điện thoại để nhận định giá chính xác');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section className={styles.widget} id="tradein-widget">
      <div className={styles.header}>
        <span className={styles.badge}>♻️ Thu Cũ Đổi Mới — Trợ Giá Đến 3,000,000đ</span>
        <h2 className={styles.title}>Định Giá & Lên Đời Thiết Bị Nhiếp Ảnh</h2>
        <p className={styles.subtitle}>
          Thu mua máy ảnh, ống kính, flycam cũ giá cao nhất miền Tây — Định giá tự động trong 30 giây — Đổi máy mới trả góp 0%.
        </p>
      </div>

      {submitted ? (
        <div className={styles.success_box}>
          <div className={styles.success_title}>🎉 Đã Gửi Yêu Cầu Định Giá Thành Công!</div>
          <p>
            Chuyên viên kỹ thuật Máy Ảnh Việt Nam sẽ liên hệ Zalo/SĐT <strong>{phone}</strong> trong vòng 15 phút để chốt giá thu mua cao nhất cho thiết bị của bạn.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className={styles.submit_btn}
            style={{ marginTop: '16px' }}
          >
            Định giá thiết bị khác
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          <form onSubmit={handleSubmit} className={styles.form_panel}>
            <div className={styles.field}>
              <label className={styles.label}>1. Loại thiết bị cần bán lại</label>
              <select className={styles.select} value={deviceType} onChange={e => setDeviceType(e.target.value)}>
                <option value="camera">Máy ảnh Body (Mirrorless / DSLR)</option>
                <option value="lens">Ống kính (Lens)</option>
                <option value="drone">Flycam / Drone</option>
                <option value="action">Action Camera / Gimbal</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>2. Hãng sản xuất</label>
              <select className={styles.select} value={brand} onChange={e => setBrand(e.target.value)}>
                <option value="Canon">Canon</option>
                <option value="Sony">Sony</option>
                <option value="Nikon">Nikon</option>
                <option value="Fujifilm">Fujifilm</option>
                <option value="DJI">DJI</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>3. Tên dòng máy / model cũ của bạn</label>
              <input
                type="text"
                className={styles.input}
                placeholder="VD: Canon EOS RP, Sony A7 III, Lens RF 24-105mm..."
                value={model}
                onChange={e => setModel(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>4. Tình trạng ngoại hình & hoạt động</label>
              <select className={styles.select} value={condition} onChange={e => setCondition(e.target.value)}>
                <option value="like_new">Mới 99% — Không trầy xước, đầy đủ hộp phụ kiện</option>
                <option value="good">Đẹp 95% — Trầy xước rất nhẹ, hoạt động hoàn hảo</option>
                <option value="fair">Khá 90% — Có hao mòn ngoại hình theo thời gian</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>5. Số điện thoại / Zalo nhận định giá chính xác</label>
              <input
                type="tel"
                className={styles.input}
                placeholder="Nhập SĐT của bạn (VD: 0937...)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
          </form>

          <div className={styles.estimate_panel}>
            <div>
              <div className={styles.est_title}>Khoảng giá thu mua dự kiến</div>
              <div className={styles.est_value}>
                {est.min} – {est.max}
              </div>
              <p className={styles.est_note}>
                * Mức giá dự kiến dựa trên dữ liệu thu mua thực tế tại Máy Ảnh Việt Nam. Trợ giá thêm tới <strong>3,000,000đ</strong> khi đổi sang máy ảnh/ống kính mới tại cửa hàng.
              </p>
            </div>

            <button type="button" onClick={handleSubmit} className={styles.submit_btn}>
              🚀 Nhận Báo Giá Chính Xác Qua Zalo
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
