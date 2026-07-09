'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Timer } from 'lucide-react';

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s, ended: diff === 0 };
}

function Pad({ n }: { n: number }) {
  return (
    <span className="text-white font-extrabold text-xl sm:text-2xl tabular-nums">
      {String(n).padStart(2, '0')}
    </span>
  );
}

export default function FlashSaleBanner() {
  const [target] = useState(() => Date.now() + 6 * 3600000);
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const iv = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(iv);
  }, [target]);

  return (
    <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-extrabold text-base tracking-tight flex items-center gap-2">
              FLASH SALE
              <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded">HÔM NAY</span>
            </h3>
            <p className="text-orange-100 text-[11px] mt-0.5">
              Giảm đến 30% — Số lượng có hạn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Timer size={14} className="text-orange-200" />
            <span className="text-orange-200 text-xs font-semibold mr-1">Kết thúc trong</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-black/30 rounded px-2.5 py-1.5"><Pad n={time.h} /></div>
            <span className="text-white font-bold text-lg">:</span>
            <div className="bg-black/30 rounded px-2.5 py-1.5"><Pad n={time.m} /></div>
            <span className="text-white font-bold text-lg">:</span>
            <div className="bg-black/30 rounded px-2.5 py-1.5"><Pad n={time.s} /></div>
          </div>
          <Link
            href="/san-pham"
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Xem ngay →
          </Link>
        </div>
      </div>
    </section>
  );
}
