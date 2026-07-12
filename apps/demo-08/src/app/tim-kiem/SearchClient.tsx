'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchProducts } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './SearchClient.module.css';

export function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';

  const [inputVal, setInputVal] = useState(queryParam);
  const results = queryParam ? searchProducts(queryParam, 20) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className="container">
        <form onSubmit={handleSearch} className={styles.search_box}>
          <div className={styles.input_wrap}>
            <input
              type="search"
              placeholder="Nhập tên máy ảnh, ống kính, thương hiệu..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.btn}>
              Tìm Kiếm 🔍
            </button>
          </div>
        </form>

        {queryParam ? (
          <div>
            <div className={styles.header_row}>
              <h1 className={styles.title}>
                Kết quả cho từ khóa: <strong>&ldquo;{queryParam}&rdquo;</strong> ({results.length} sản phẩm)
              </h1>
            </div>

            {results.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.empty_icon}>🔍</div>
                <h2>Không tìm thấy sản phẩm phù hợp</h2>
                <p style={{ color: '#737373', marginTop: '8px' }}>
                  Bạn hãy thử từ khóa ngắn gọn hơn như: <em>Canon, Sony, Lens 50mm, Flycam DJI...</em>
                </p>
              </div>
            ) : (
              <div className={styles.grid}>
                {results.map((p, idx) => (
                  <ProductCard key={p.id} product={p} priority={idx < 4} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.empty_icon}>💡</div>
            <h2>Hãy nhập từ khóa để tìm kiếm sản phẩm</h2>
            <p style={{ color: '#737373', marginTop: '8px' }}>
              Gợi ý tìm kiếm phổ biến: Canon R50, Sony A7C II, Godox SL60W, DJI Mini 4 Pro
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
