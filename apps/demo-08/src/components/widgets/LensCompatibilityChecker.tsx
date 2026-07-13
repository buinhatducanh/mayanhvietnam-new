'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { products, formatPrice } from '@/data/products';
import styles from './LensCompatibilityChecker.module.css';

interface MountRule {
  bodyMount: string;
  lensMount: string;
  status: 'perfect' | 'adapter' | 'crop' | 'incompatible';
  message: string;
  adapterName?: string;
}

const COMPATIBILITY_RULES: MountRule[] = [
  { bodyMount: 'RF', lensMount: 'RF', status: 'perfect', message: 'Tương thích 100% — Full Frame ngàm RF nguyên bản' },
  { bodyMount: 'RF', lensMount: 'RF-S', status: 'crop', message: 'Tương thích tự động chuyển sang chế độ crop APS-C x1.6' },
  { bodyMount: 'RF', lensMount: 'EF', status: 'adapter', message: 'Tương thích hoàn hảo toàn bộ tính năng AF/IS qua ngàm chuyển đổi', adapterName: 'Mount Adapter EF-EOS R' },
  { bodyMount: 'RF-S', lensMount: 'RF', status: 'perfect', message: 'Tương thích 100% (Tiêu cự tương đương x1.6 hệ số crop)' },
  { bodyMount: 'RF-S', lensMount: 'RF-S', status: 'perfect', message: 'Tương thích 100% ngàm Canon APS-C RF-S' },
  { bodyMount: 'RF-S', lensMount: 'EF', status: 'adapter', message: 'Tương thích hoàn hảo qua ngàm chuyển EF-EOS R', adapterName: 'Mount Adapter EF-EOS R' },
  { bodyMount: 'FE', lensMount: 'FE', status: 'perfect', message: 'Tương thích 100% — Sony Full Frame E-Mount' },
  { bodyMount: 'FE', lensMount: 'E', status: 'crop', message: 'Tương thích ở chế độ Super 35mm (Crop APS-C)' },
  { bodyMount: 'Z', lensMount: 'Z', status: 'perfect', message: 'Tương thích 100% — Nikon Z Mount' },
  { bodyMount: 'Z', lensMount: 'F', status: 'adapter', message: 'Tương thích qua ngàm chuyển đổi chính hãng Nikon FTZ II', adapterName: 'Nikon FTZ II Adapter' },
];

export function LensCompatibilityChecker() {
  const { addItem } = useCart();
  const cameras = products.filter(p => p.categorySlug === 'may-anh');
  const lenses = products.filter(p => p.categorySlug === 'ong-kinh');

  const [selectedCameraId, setSelectedCameraId] = useState<string>(cameras[0]?.id || '');
  const [selectedLensId, setSelectedLensId] = useState<string>(lenses[0]?.id || '');
  const [isSnapping, setIsSnapping] = useState(false);

  const selectedCamera = cameras.find(c => c.id === selectedCameraId);
  const selectedLens = lenses.find(l => l.id === selectedLensId);

  const getCompatibility = () => {
    if (!selectedCamera || !selectedLens) return null;
    const bodyMount = selectedCamera.mount || 'RF';
    const lensMount = selectedLens.mount || 'RF';

    const rule = COMPATIBILITY_RULES.find(
      r => r.bodyMount === bodyMount && r.lensMount === lensMount
    );

    if (rule) return rule;

    if (bodyMount === lensMount) {
      return {
        bodyMount,
        lensMount,
        status: 'perfect' as const,
        message: `Tương thích 100% — Cả thân máy và ống kính đều sử dụng ngàm ${bodyMount}`,
      };
    }

    return {
      bodyMount,
      lensMount,
      status: 'incompatible' as const,
      message: `Khác hệ ngàm (${bodyMount} và ${lensMount}). Không thể lắp trực tiếp, cần ngàm chuyển đổi đặc biệt nếu có.`,
    };
  };

  const comp = getCompatibility();

  const handleTestCompatibility = (lensId: string) => {
    setIsSnapping(true);
    setSelectedLensId(lensId);
    setTimeout(() => {
      setIsSnapping(false);
    }, 450);
  };

  return (
    <section className={styles.widget} id="lens-compatibility-checker" aria-label="Kiểm tra tương thích ống kính">
      <div className={styles.header}>
        <span className={styles.badge}>⚡ CÔNG CỤ TƯƠNG THÍCH THIẾT BỊ NHIẾP ẢNH</span>
        <h2 className={styles.title}>Kiểm Tra Độ Tương Thích Ống Kính & Thân Máy</h2>
        <p className={styles.subtitle}>
          Lựa chọn thân máy (Body) và ống kính (Lens) để kiểm tra độ tương thích ngàm kết nối và đề xuất ngàm chuyển đổi phù hợp nhất.
        </p>
      </div>

      <div className={styles.selector_grid}>
        {/* Camera Body Column */}
        <div className={styles.box}>
          <div className={styles.boxHeader}>
            <span className={styles.stepBadge}>Bước 1</span>
            <label htmlFor="select-camera" className={styles.label}>Chọn Thân Máy (Body)</label>
          </div>
          <select
            id="select-camera"
            className={styles.select}
            value={selectedCameraId}
            onChange={e => setSelectedCameraId(e.target.value)}
          >
            {cameras.map(cam => (
              <option key={cam.id} value={cam.id}>
                {cam.name} ({cam.mount || 'RF'})
              </option>
            ))}
          </select>
          {selectedCamera && (
            <div className={styles.productPreview}>
              <div className={styles.previewImageWrap}>
                <img src={selectedCamera.thumbnail} alt={selectedCamera.name} className={styles.previewImage} />
              </div>
              <div className={styles.previewInfo}>
                <h4 className={styles.previewName}>{selectedCamera.name}</h4>
                <div className={styles.previewMeta}>
                  <span className={styles.mount_tag}>Ngàm: <strong>{selectedCamera.mount || 'RF'}</strong></span>
                  <span className={styles.previewPrice}>{formatPrice(selectedCamera.price)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Snap Center Graphic */}
        <div className={styles.snap_center}>
          <div className={[styles.snap_icon, isSnapping ? styles.snap_snapping : ''].filter(Boolean).join(' ')}>
            ⚡
          </div>
          <span className={styles.snapText}>Ghép Nối</span>
        </div>

        {/* Lens Column */}
        <div className={styles.box}>
          <div className={styles.boxHeader}>
            <span className={styles.stepBadge}>Bước 2</span>
            <label htmlFor="select-lens" className={styles.label}>Chọn Ống Kính (Lens)</label>
          </div>
          <select
            id="select-lens"
            className={styles.select}
            value={selectedLensId}
            onChange={e => handleTestCompatibility(e.target.value)}
          >
            {lenses.map(lens => (
              <option key={lens.id} value={lens.id}>
                {lens.name} ({lens.mount || 'RF'})
              </option>
            ))}
          </select>
          {selectedLens && (
            <div className={styles.productPreview}>
              <div className={styles.previewImageWrap}>
                <img src={selectedLens.thumbnail} alt={selectedLens.name} className={styles.previewImage} />
              </div>
              <div className={styles.previewInfo}>
                <h4 className={styles.previewName}>{selectedLens.name}</h4>
                <div className={styles.previewMeta}>
                  <span className={styles.mount_tag}>Ngàm: <strong>{selectedLens.mount || 'RF'}</strong></span>
                  <span className={styles.previewPrice}>{formatPrice(selectedLens.price)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compatibility Result Box */}
      {comp && selectedCamera && selectedLens && (
        <div
          className={[
            styles.result_box,
            comp.status === 'perfect' ? styles.result_box_match :
            comp.status === 'adapter' || comp.status === 'crop' ? styles.result_box_adapter :
            styles.result_box_incompatible
          ].join(' ')}
        >
          <div className={styles.result_status}>
            {comp.status === 'perfect' && '✅ Hoàn Toàn Tương Thích 100%'}
            {comp.status === 'crop' && '🔄 Tương Thích Chế Độ Crop APS-C'}
            {comp.status === 'adapter' && '🔗 Tương Thích Qua Ngàm Chuyển Đổi'}
            {comp.status === 'incompatible' && '⚠️ Khác Hệ Ngàm — Cần Kiểm Tra Ngàm Chuyển'}
          </div>
          <p className={styles.result_detail}>
            <strong>{selectedCamera.name}</strong> + <strong>{selectedLens.name}</strong>: {comp.message}
            {comp.adapterName && ` (Khuyên dùng: ${comp.adapterName})`}
          </p>

          <div className={styles.actionRow}>
            <button
              type="button"
              onClick={() => {
                addItem(selectedCamera);
                addItem(selectedLens);
              }}
              className={styles.result_action}
            >
              🛒 Mua Trọn Bộ Combo ({formatPrice((selectedCamera.price || 0) + (selectedLens.price || 0))})
            </button>
            <Link href={`/san-pham/${selectedLens.slug}`} className={styles.secondaryAction}>
              Xem Chi Tiết Ống Kính →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
