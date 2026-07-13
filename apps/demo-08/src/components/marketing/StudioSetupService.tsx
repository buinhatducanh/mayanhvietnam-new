'use client';

import React from 'react';
import styles from './StudioSetupService.module.css';

const STUDIO_POINTS = [
  {
    id: 1,
    text: '• Yếu tố quan trọng nhất của một studio là hệ thống đèn. Có thể trang bị đèn ánh sáng chủ, đèn ánh sáng phụ, đèn đánh ven, …',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dịch vụ setup ánh sáng studio — Hệ thống đèn ánh sáng chủ & phụ chuyên nghiệp',
  },
  {
    id: 2,
    text: '• Các loại softbox gôm sáng, tản sáng, tấm hắt sáng, ô hắt sáng giúp điều chỉnh diện tích hắt sáng, khống chế khoảng sáng hậu cảnh và điều hướng ánh sáng theo ý muốn.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dịch vụ setup ánh sáng studio — Softbox gôm sáng & điều hướng ánh sáng',
  },
  {
    id: 3,
    text: '• Mỗi đèn cần có chân đứng. Nó có khả năng gắn softbox, dù tản sáng hay các loại đèn chiếu sáng. Khi chụp hình, quay phim, bạn có thể điều chỉnh độ cao của chân đèn để phù hợp với chủ thể.',
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dịch vụ setup ánh sáng studio — Chân đèn vững chắc chịu tải cao',
  },
  {
    id: 4,
    text: '• Số lượng phông màu tùy theo nhu cầu nhưng cơ bản nhất studio cần có một phông tối màu và một phông sáng màu.\n\n• Nếu muốn dễ dàng bóc tách chủ thể khỏi phông để thay phông nền trên máy tính, nên sử dụng phông màu xanh lam hoặc xanh lục (vì đây là 2 màu tương phản với da người, dễ bóc tách).',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dịch vụ setup ánh sáng studio — Hệ thống phông xanh & phông màu đa dạng',
  },
  {
    id: 5,
    text: '• Phông màu có chiều dài tận 10 - 11m nên có thể thoải mái chùm lên ghế/kệ ngồi để chụp chân dung, người mẫu chuyên nghiệp. Có thể sử dụng hệ thống kéo phông tự động như trục có gắn mô-tơ điều khiển hoặc dùng trục xích kéo tay để tiết kiệm chi phí.',
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dịch vụ setup ánh sáng studio — Trục cuốn phông tự động & xích kéo tiện lợi',
  },
];

export function StudioSetupService() {
  return (
    <article className={styles.section}>
      <div className={`container ${styles.article_container}`}>
        <header className={styles.header}>
          <span className={styles.badge}>💡 Giải Pháp Nhiếp Ảnh & Quay Phim</span>
          <h1 className={styles.title}>Dịch Vụ Lắp Phòng & Setup Phòng Studio Chuyên Nghiệp</h1>
        </header>

        <div className={styles.intro}>
          <p>
            Bạn đang muốn sở hữu cho mình một studio hay có một phòng chụp của riêng mình để thỏa mãn niềm đam mê cũng như nhu cầu công việc của bạn. Nhưng không biết bắt đầu từ đâu và cần chuẩn bị những gì để có một studio phù hợp và đáp ứng tốt nhu cầu mà lại đáng tiền? Vậy những thiết bị studio nào là quan trọng nhất cần phải có? Hãy cùng Máy Ảnh Việt Nam tìm hiểu nhé!
          </p>
        </div>

        {STUDIO_POINTS.map((item) => (
          <section key={item.id} className={styles.section_block}>
            <div className={styles.point_text}>
              {item.text.split('\n\n').map((line, idx) => (
                <p key={idx} style={{ marginBottom: idx > 0 ? '12px' : 0 }}>
                  {line}
                </p>
              ))}
            </div>
            <div className={styles.image_card}>
              <div className={styles.image_wrap}>
                <img
                  src={item.image}
                  alt={item.caption}
                  className={styles.setup_img}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=85';
                  }}
                />
              </div>
              <div className={styles.img_caption}>{item.caption}</div>
            </div>
          </section>
        ))}

        <div className={styles.cta_box}>
          <h2 className={styles.cta_title}>Hàng shop cập nhật mỗi ngày. Mấy bác cần gì nhắn em nhaaa!</h2>
          <p className={styles.cta_text}>
            Chuyên cung cấp & tư vấn giải pháp thi công lắp đặt trọn gói: Phông và trục treo, Softbox, Đèn studio, Đèn LED, Chân đèn cùng các thiết bị phòng studio chất lượng cao với chi phí tối ưu nhất cho cá nhân và doanh nghiệp.
          </p>

          <div className={styles.cta_tags}>
            <span className={styles.tag}>Phông & trục treo</span>
            <span className={styles.tag}>Softbox gôm sáng</span>
            <span className={styles.tag}>Đèn studio chuyên nghiệp</span>
            <span className={styles.tag}>Đèn LED liên tục</span>
            <span className={styles.tag}>Chân đèn chịu tải</span>
            <span className={styles.tag}>Thiết bị phòng studio khác</span>
          </div>

          <div className={styles.cta_buttons}>
            <a href="tel:0937148222" className={styles.btn_hotline}>
              📞 Gọi Tư Vấn Ngay: 0937.148.222
            </a>
            <a href="https://zalo.me/0937148222" target="_blank" rel="noopener noreferrer" className={styles.btn_zalo}>
              💬 Nhắn Zalo Báo Giá Trọn Gói
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
