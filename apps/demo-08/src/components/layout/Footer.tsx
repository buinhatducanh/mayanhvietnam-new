import Link from 'next/link';
import { stores } from '@/data/stores';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand_col}>
              <Link href="/" className={styles.footer_logo}>
                <img
                  src="https://mayanhvietnam.com/asset/imgs/icon/Logo_white01.png"
                  alt="Máy Ảnh Việt Nam"
                  style={{ height: '40px', width: 'auto', display: 'block' }}
                />
              </Link>
              <p className={styles.brand_desc}>
                Hệ thống cửa hàng máy ảnh uy tín hàng đầu tại Cần Thơ và các tỉnh miền Tây.
                Chuyên cung cấp máy ảnh, ống kính, flycam, action camera chính hãng.
              </p>
              <div className={styles.contact_info}>
                <a href="tel:0937148222" className={styles.phone}>📞 0937.148.222</a>
                <a href="mailto:info@mayanhvietnam.com" className={styles.email}>✉️ info@mayanhvietnam.com</a>
              </div>
              <div className={styles.socials}>
                <a href="https://facebook.com/mayanhvietnam" target="_blank" rel="noopener noreferrer" className={styles.social_link} aria-label="Facebook">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://youtube.com/@mayanhvietnam" target="_blank" rel="noopener noreferrer" className={styles.social_link} aria-label="YouTube">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="https://tiktok.com/@mayanhvietnam" target="_blank" rel="noopener noreferrer" className={styles.social_link} aria-label="TikTok">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.72a4.85 4.85 0 0 1-1.02-.03z" /></svg>
                </a>
              </div>
            </div>

            {/* Policy Links */}
            <div className={styles.links_col}>
              <h3 className={styles.col_title}>Chính sách</h3>
              <ul className={styles.link_list}>
                <li><Link href="/chinh-sach/bao-hanh">Chính sách bảo hành</Link></li>
                <li><Link href="/chinh-sach/doi-tra">Chính sách đổi trả</Link></li>
                <li><Link href="/chinh-sach/van-chuyen">Chính sách vận chuyển</Link></li>
                <li><Link href="/chinh-sach/thanh-toan">Chính sách thanh toán</Link></li>
                <li><Link href="/chinh-sach/bao-mat">Chính sách bảo mật</Link></li>
                <li><Link href="/trade-in">Thu mua &amp; Trade-in</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className={styles.links_col}>
              <h3 className={styles.col_title}>Hỗ trợ khách hàng</h3>
              <ul className={styles.link_list}>
                <li><Link href="/lien-he">Liên hệ chúng tôi</Link></li>
                <li><Link href="/theo-doi-don-hang">Theo dõi đơn hàng</Link></li>
                <li><Link href="/blog">Blog & Tin tức</Link></li>
                <li><Link href="/danh-muc/san-pham-flash-sale">Flash Sale</Link></li>
                <li><Link href="/danh-muc/2nd-hand">Sản phẩm cũ</Link></li>
                <li><Link href="/dich-vu-lap-phong">Dịch vụ lắp phòng</Link></li>
              </ul>
            </div>

            {/* Stores */}
            <div className={styles.stores_col}>
              <h3 className={styles.col_title}>Hệ thống cửa hàng</h3>
              <div className={styles.store_list}>
                {stores.map(store => (
                  <a
                    key={store.id}
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.store_item}
                  >
                    <div className={styles.store_city}>
                      📍 {store.city}
                      {store.isPrimary && <span className={styles.primary_tag}>Trụ sở</span>}
                    </div>
                    <div className={styles.store_addr}>{store.address}</div>
                    <div className={styles.store_hours}>{store.hours}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: BỘ CÔNG THƯƠNG + PHƯƠNG THỨC THANH TOÁN */}
      <div className={styles.bottom}>
        <div className={`container ${styles.bottom_inner}`}>
          {/* Trái: Logo BCT + Copyright */}
          <div className={styles.bct_group}>
            <a
              href="http://online.gov.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bct_link}
              title="Đã thông báo Bộ Công Thương"
            >
              <img
                src="https://mayanhvietnam.com/asset/imgs/icon/logoBCT.png"
                alt="Đã thông báo Bộ Công Thương"
                className={styles.logo_bct}
              />
            </a>
            <div className={styles.copyright_block}>
              <p className={styles.copyright}>
                © {currentYear} Máy Ảnh Việt Nam. All rights reserved.
              </p>
            </div>
          </div>

          {/* Phải: 6 Hình thức thanh toán chuẩn demo-05 */}
          <div className={styles.payment_section}>
            <span className={styles.payment_label}>Phương thức thanh toán:</span>
            <div className={styles.payment_grid}>
              {[
                { name: 'Visa', src: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/visa_icon_44fe6e15ed.svg' },
                { name: 'Mastercard', src: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/mastercard_icon_c75f94f6a5.svg' },
                { name: 'JCB', src: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/jcb_icon_214783937c.svg' },
                { name: 'Napas', src: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/napas_icon_94d5330e3c.svg' },
                { name: 'Home PayLater', src: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/homepaylater_icon_adef600842.svg' },
                { name: 'MoMo', src: 'https://mayanhvietnam.com/asset/imgs/icon/hinhThucThanhToan/momo_icon_baef21b5f7.svg' },
              ].map(item => (
                <div key={item.name} className={styles.payment_card} title={item.name}>
                  <img src={item.src} alt={item.name} className={styles.payment_img} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
