'use client';

import { useState } from 'react';

interface ResultCombo {
  name: string;
  camera: string;
  lens: string;
  imageUrl: string;
  price: string;
  desc: string;
  specs: string[];
}

const matchGear = (purpose: string, skill: string, budget: string): ResultCombo => {
  if (budget === 'low') {
    if (purpose === 'vlog') {
      return {
        name: 'Combo Creator Khởi Đầu',
        camera: 'Sony ZV-E10 II',
        lens: 'Sony E PZ 16-50mm f/3.5-5.6 OSS',
        imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/25-07/25-07-14/250714103201041/avatar/639029506922725233_sony-zv-e10-kem-lens-sony-e-pz-16-50mm-f3-5-5-6-oss-mark-ii-chinh-hang.jpg',
        price: '24.990.000₫',
        desc: 'Hoàn hảo cho người mới làm Vlog, tự động lấy nét mắt cực nhanh, siêu nhỏ gọn dễ di chuyển.',
        specs: ['26.1 MP APS-C BSI', 'Quay 4K 60p 10-bit', 'Micro 3-capsule định hướng', 'Livestream Type-C'],
      };
    }
    return {
      name: 'Combo Nhiếp Ảnh Nhập Môn',
      camera: 'Canon EOS R50',
      lens: 'Canon RF-S 18-45mm f/4.5-6.3 IS STM',
      imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/24-12/24-12-28/241228112737843/avatar/638709822567106100_may-anh-canon-eos-r50-black-kem-lens-rf-s-18-45mm-chinh-hang.jpg',
      price: '18.990.000₫',
      desc: 'Dễ tiếp cận cho người mới bắt đầu học chụp ảnh phong cảnh, đời thường và chân dung du lịch.',
      specs: ['24.2 MP APS-C', 'Dual Pixel CMOS AF II', 'Quay phim 4K 30p', 'Trọng lượng siêu nhẹ 375g'],
    };
  } else if (budget === 'mid') {
    if (purpose === 'portrait' || purpose === 'landscape') {
      return {
        name: 'Combo Chân Dung & Phong Cảnh Bán Chuyên',
        camera: 'Fujifilm X-T5 Thân Máy',
        lens: 'Fujifilm XF 27mm f/2.8 R WR',
        imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/23-02/23-02-10/230210223540394/avatar/01_may-anh-fujifilm-x-h2s-body-only-chinh-hang.jpg',
        price: '52.990.000₫',
        desc: 'Độ phân giải siêu cao kết hợp hệ màu giả lập phim Fujifilm mang lại chiều sâu nghệ thuật xuất sắc.',
        specs: ['40.2 MP X-Trans CMOS V', '19 Chế độ giả lập phim', 'Chống rung IBIS 7-stop', 'Màn hình lật 3 chiều'],
      };
    }
    if (purpose === 'vlog') {
      return {
        name: 'Combo Filmmaker Đa Năng',
        camera: 'Sony Alpha A7C II',
        lens: 'Sony FE 35mm f/1.4 GM',
        imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/23-08/23-08-30/230830134714949/avatar/638308197638831519_may-anh-sony-alpha-a7c-ii-body-only-silver-chinh-hang.jpg',
        price: '74.900.000₫',
        desc: 'Cảm biến Full-frame thế hệ mới, tích hợp vi xử lý AI tự động bám nét lý tưởng cho sáng tạo nội dung độc lập.',
        specs: ['33.0 MP Full-frame BSI', 'Chip xử lý AI chuyên biệt', 'Quay 4K 60p 10-bit 4:2:2', 'Hệ màu S-Cinetone cao cấp'],
      };
    }
    return {
      name: 'Combo Đa Dụng Cổ Điển',
      camera: 'Nikon Zf Thân Máy',
      lens: 'Nikon Z 24-70mm f/4 S',
      imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/25-05/25-05-30/250530073748218/avatar/638841874800416073_may-anh-nikon-zf-kit-z-40mm-f2-se.jpg',
      price: '64.990.000₫',
      desc: 'Thiết kế hoài cổ sang trọng kết hợp chip xử lý mạnh mẽ nhất của Nikon. Chụp đa dụng xuất sắc.',
      specs: ['24.5 MP Full-frame', 'Chip EXPEED 7 flagship', 'Chế độ chụp B&W riêng biệt', 'Lấy nét 3D Tracking thông minh'],
    };
  } else {
    if (purpose === 'sports' || purpose === 'action') {
      return {
        name: 'Combo Siêu Tốc Chuyên Nghiệp',
        camera: 'Sony A9 III Siêu Tốc',
        lens: 'Sony FE 70-200mm f/2.8 GM II',
        imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/25-12/25-12-09/251209090438536/avatar/639008696959464299_may-anh-sony-a9-iii-chinh-hang.jpg',
        price: '210.000.000₫',
        desc: 'Cảm biến Global Shutter triệt tiêu biến dạng hình ảnh, chụp liên tiếp 120fps lý tưởng cho thể thao và hành động.',
        specs: ['Màn trập Global Shutter', 'Chụp liên tiếp 120fps blackout-free', 'Lấy nét mắt AI Real-time', 'Độ trễ màn trập 0%'],
      };
    }
    return {
      name: 'Combo Flagship Masterclass',
      camera: 'Sony Alpha A7 IV',
      lens: 'Sony FE 24-70mm f/2.8 GM II',
      imageUrl: 'https://mayanhvietnam.com/image-data/san-pham/25-03/25-03-08/250308101803437/avatar/638770267851044960_may-anh-sony-alpha-a7-mark-iv-body-sony-fe-24-70mm-f2-8-gm-ii.jpg',
      price: '112.900.000₫',
      desc: 'Sự kết hợp hoàn hảo giữa body đa năng A7 IV và ống kính zoom G Master thế hệ II nét nhất phân khúc.',
      specs: ['33.0 MP Full-frame', 'Ống kính GM II siêu nét, gọn nhẹ', 'Lấy nét mắt người & động vật', 'Quay 4K 60p 10-bit'],
    };
  }
};

export default function GearQuiz() {
  const [step, setStep] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [skill, setSkill] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<ResultCombo | null>(null);

  const startQuiz = () => {
    setStep(1);
    setPurpose('');
    setSkill('');
    setBudget('');
    setResult(null);
  };

  const handleSelectPurpose = (val: string) => {
    setPurpose(val);
    setStep(2);
  };

  const handleSelectSkill = (val: string) => {
    setSkill(val);
    setStep(3);
  };

  const handleSelectBudget = (val: string) => {
    setBudget(val);
    const res = matchGear(purpose, skill, val);
    setResult(res);
    setStep(4);
  };

  return (
    <section 
      id="quiz" 
      style={{ 
        padding: '100px 0', 
        background: '#ffffff', // White background adapt
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      
      {/* HUD Diagonal lines in light theme */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0, 94, 184, 0.08), transparent)' }} />
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 94, 184, 0.03) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <style>{`
        .quiz-glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(0, 94, 184, 0.06);
          border-radius: 24px;
          padding: 44px 48px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.9);
          transition: border-color 0.4s;
        }

        .quiz-btn {
          background: #ffffff;
          border: 1px solid rgba(0, 94, 184, 0.06);
          border-radius: 14px;
          padding: 20px 24px;
          color: #0f172a;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 10px rgba(0,0,0,0.01);
        }

        .quiz-btn:hover {
          background: rgba(0, 94, 184, 0.03);
          border-color: rgba(0, 94, 184, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 94, 184, 0.06);
        }

        .quiz-option-desc {
          font-size: 0.78rem;
          color: rgba(15, 23, 42, 0.45);
          font-weight: 500;
          margin-top: 4px;
          transition: color 0.3s;
        }

        .quiz-btn:hover .quiz-option-desc {
          color: rgba(15, 23, 42, 0.7);
        }

        /* Result container blueprint styling in Light Theme */
        .result-box-blueprint {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 94, 184, 0.12);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          position: relative;
        }
        @media (min-width: 640px) {
          .result-box-blueprint {
            grid-template-columns: 220px 1fr;
            gap: 32px;
          }
        }

        .result-box-blueprint::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px; width: 15px; height: 15px;
          border-top: 2px solid #005EB8; border-left: 2px solid #005EB8;
        }
        .result-box-blueprint::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px; width: 15px; height: 15px;
          border-bottom: 2px solid #005EB8; border-right: 2px solid #005EB8;
        }
      `}</style>

      <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#005EB8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Trợ Lý Ảo Chọn Thiết Bị</span>
            <div style={{ width: 16, height: 1, background: '#005EB8' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
            Khám Phá <span style={{ color: '#005EB8' }}>Bộ Thiết Bị Phù Hợp</span>
          </h2>
          <p style={{ color: 'rgba(15,23,42,0.5)', marginTop: 12, fontSize: '0.95rem', maxWidth: 500, margin: '12px auto 0', lineHeight: 1.6 }}>
            Bắt đầu bài trắc nghiệm nhanh 3 câu hỏi để hệ thống AI phân tích và đề xuất giải pháp máy ảnh & ống kính tối ưu nhất.
          </p>
        </div>

        {/* Quiz glass panel */}
        <div className="quiz-glass-panel" style={{ maxWidth: 780, margin: '0 auto', minHeight: 380, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Step dots */}
          {step < 4 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  width: step === i ? 40 : 10,
                  height: 6,
                  borderRadius: 3,
                  background: step >= i ? '#005EB8' : 'rgba(0, 94, 184, 0.1)',
                  boxShadow: step === i ? '0 0 8px rgba(0, 94, 184, 0.2)' : 'none',
                  transition: 'all 0.3s'
                }}/>
              ))}
            </div>
          )}

          {/* STEP 1: Purpose */}
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.4s' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.01em' }}>
                Q1: Nhu cầu chụp ảnh/quay phim chính của bạn là gì?
              </h3>
              
              <div className="quiz-purpose-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { id: 'portrait', title: 'Chân Dung & Đường Phố', icon: '📸' },
                  { id: 'landscape', title: 'Phong Cảnh & Du Lịch', icon: '🌄' },
                  { id: 'vlog', title: 'Vlog & Quay Phim Sáng Tạo', icon: '🎥' },
                  { id: 'sports', title: 'Thể Thao & Chim Thú', icon: '🦅' },
                ].map(opt => (
                  <button key={opt.id} className="quiz-btn" onClick={() => handleSelectPurpose(opt.id)}>
                    <span style={{ fontSize: '1.4rem' }}>{opt.icon}</span>
                    {opt.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Skill */}
          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.4s' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.01em' }}>
                Q2: Mức độ kinh nghiệm nhiếp ảnh của bạn?
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { id: 'beg', title: 'Mới Bắt Đầu / Tập Chơi', desc: 'Ưu tiên các dòng máy nhỏ gọn, dễ làm quen, tự động lấy nét thông minh', icon: '👶' },
                  { id: 'int', title: 'Bán Chuyên / Đam Mê', desc: 'Yêu cầu kiểm soát thông số nâng cao, chất lượng thấu kính nét sâu', icon: '🚀' },
                  { id: 'pro', title: 'Chuyên Nghiệp / Dịch Vụ', desc: 'Đòi hỏi lấy nét siêu nhanh, cảm biến Full-frame cao cấp phục vụ công việc', icon: '🏆' },
                ].map(opt => (
                  <button key={opt.id} className="quiz-btn" onClick={() => handleSelectSkill(opt.id)} style={{ padding: '16px 24px' }}>
                    <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{opt.title}</div>
                      <div className="quiz-option-desc">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(1)} style={{
                marginTop: 24, background: 'none', border: 'none', color: '#005EB8', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6
              }}>
                ← Quay lại câu hỏi trước
              </button>
            </div>
          )}

          {/* STEP 3: Budget */}
          {step === 3 && (
            <div style={{ animation: 'fadeIn 0.4s' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: 28, letterSpacing: '-0.01em' }}>
                Q3: Hạn mức ngân sách tối đa của bạn?
              </h3>
              
              <div className="quiz-budget-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { id: 'low', title: 'Dưới 25 Triệu', desc: 'Bộ Máy Nhập Môn', icon: '💸' },
                  { id: 'mid', title: '25 - 60 Triệu', desc: 'Thiết Bị Tầm Trung', icon: '💳' },
                  { id: 'high', title: 'Trên 60 Triệu', desc: 'Đầu Tư Flagship', icon: '💎' },
                ].map(opt => (
                  <button key={opt.id} className="quiz-btn" onClick={() => handleSelectBudget(opt.id)} style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 16px', gap: 10 }}>
                    <span style={{ fontSize: '1.8rem' }}>{opt.icon}</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{opt.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#005EB8', fontWeight: 700 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(2)} style={{
                marginTop: 28, background: 'none', border: 'none', color: '#005EB8', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6
              }}>
                ← Quay lại câu hỏi trước
              </button>
            </div>
          )}

          {/* STEP 4: Result */}
          {step === 4 && result && (
            <div style={{ animation: 'fadeIn 0.5s ease both' }}>
              
              {/* Header result */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{
                  background: 'rgba(0,94,184,0.08)', border: '1px solid rgba(0,94,184,0.18)',
                  color: '#005EB8', fontWeight: 800, fontSize: '0.72rem',
                  padding: '4px 14px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.08em'
                }}>
                  Kết Quả Đề Xuất AI
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginTop: 10, letterSpacing: '-0.02em' }}>
                  {result.name}
                </h3>
              </div>

              {/* Blueprint details container */}
              <div className="result-box-blueprint">
                
                {/* Photo frame */}
                <div className="result-photo" style={{
                  background: '#f8faff',
                  border: '1px solid rgba(0, 94, 184, 0.05)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 14, height: 180,
                }}>
                  <img src={result.imageUrl} alt={result.camera} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>

                {/* Text specs */}
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#005EB8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cấu hình trọn bộ:</div>
                  
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                    {result.camera}
                  </h4>
                  
                  <div style={{ fontSize: '0.9rem', color: 'rgba(15,23,42,0.6)', marginTop: 2, fontWeight: 700 }}>
                    + {result.lens}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'rgba(15,23,42,0.65)', marginTop: 10, lineHeight: 1.6 }}>
                    {result.desc}
                  </p>

                  {/* Highlights checklist */}
                  <div className="result-specs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginTop: 16 }}>
                    {result.specs.map((sp, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'rgba(15,23,42,0.5)' }}>
                        <span style={{ color: '#005EB8', fontWeight: 900 }}>◆</span>
                        {sp}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action pricing row */}
              <div className="quiz-actions-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(15,23,42,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Giá trọn bộ đề xuất:</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#d32f2f', fontFamily: 'ui-monospace, monospace' }}>
                    {result.price}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={startQuiz} className="ig-btn" style={{ background: 'transparent', borderColor: '#cbd5e1', color: 'rgba(15,23,42,0.55)' }}>
                    Chọn lại từ đầu
                  </button>
                  
                  <a 
                    href="#featured" 
                    onClick={() => alert(`Đã thêm ${result.camera} & ${result.lens} vào giỏ hàng!`)}
                    className="ig-btn"
                  >
                    Mua Ngay Combo Này
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 8 }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
