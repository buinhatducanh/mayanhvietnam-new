'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ChevronUp, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {/* Back to top */}
      {show && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-lg transition-all hover:border-primary hover:text-primary"
          aria-label="Lên đầu trang"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Zalo */}
      <a
        href="https://zalo.me/0937148222"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600"
        aria-label="Chat Zalo"
      >
        <Send className="h-5 w-5" />
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/mayanhvietnam"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700"
        aria-label="Messenger"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      {/* Call — primary CTA */}
      <a
        href="tel:+84937148222"
        className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all"
        style={{
          background: '#FF6B35',
          boxShadow: '0 4px 20px rgba(255,107,53,0.5)',
        }}
        aria-label="Gọi điện tư vấn"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}