'use client';

import Link from 'next/link';

const BRANDS = [
  { name: 'Canon', color: 'text-red-600' },
  { name: 'SONY', color: 'text-gray-900' },
  { name: 'Nikon', color: 'text-yellow-600' },
  { name: 'DJI', color: 'text-blue-600' },
  { name: 'FUJIFILM', color: 'text-green-700' },
  { name: 'Panasonic', color: 'text-blue-700' },
  { name: 'GODOX', color: 'text-orange-600' },
  { name: 'SIGMA', color: 'text-gray-700' },
];

export default function BrandsStrip() {
  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
        <div className="text-center mb-5">
          <span className="w-1.5 h-5 bg-orange-500 rounded-sm inline-block mr-2 align-middle" />
          <h2 className="inline-block text-lg font-extrabold tracking-tight text-gray-900 align-middle">
            THƯƠNG HIỆU NỔI BẬT
          </h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BRANDS.map((b) => (
            <Link
              key={b.name}
              href="/thuong-hieu"
              className="group flex items-center justify-center h-16 px-3 bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-300 rounded-lg transition-all"
            >
              <span
                className={`font-black text-base sm:text-lg tracking-tight ${b.color} group-hover:scale-105 transition-transform`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {b.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
