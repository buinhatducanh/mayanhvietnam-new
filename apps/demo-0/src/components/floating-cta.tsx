'use client';

import { Phone, MessageCircle } from 'lucide-react';

const CTAS = [
  { label: 'Gọi ngay', href: 'tel:0907215252', icon: Phone, color: 'bg-green-600 hover:bg-green-700' },
  { label: 'Messenger', href: 'https://www.facebook.com/mayanhvietnam', icon: MessageCircle, color: 'bg-blue-600 hover:bg-blue-700' },
];

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
      {CTAS.map(({ label, href, icon: Icon, color }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className={`flex size-12 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl ${color}`}
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
