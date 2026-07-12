'use client';

import { useState, useEffect } from 'react';
import styles from './FloatingCTA.module.css';

export function FloatingCTA() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={styles.wrap} aria-label="Liên hệ nhanh">
      {/* Zalo */}
      <a
        href="https://zalo.me/0937148222"
        target="_blank"
        rel="noopener noreferrer"
        className={[styles.btn, styles.zalo].join(' ')}
        aria-label="Chat Zalo"
        title="Chat Zalo"
      >
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="white"/>
          <text x="24" y="32" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0068FF">Z</text>
        </svg>
        <span className={styles.tooltip}>Chat Zalo</span>
      </a>

      {/* Phone */}
      <a
        href="tel:0937148222"
        className={[styles.btn, styles.phone].join(' ')}
        aria-label="Gọi điện"
        title="Gọi: 0937.148.222"
      >
        <PhoneIcon />
        <span className={styles.tooltip}>0937.148.222</span>
        <span className={styles.ring} />
      </a>

      {/* Messenger */}
      <a
        href="https://m.me/mayanhvietnam"
        target="_blank"
        rel="noopener noreferrer"
        className={[styles.btn, styles.messenger].join(' ')}
        aria-label="Chat Messenger"
        title="Chat Messenger"
      >
        <MessengerIcon />
        <span className={styles.tooltip}>Messenger</span>
      </a>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={[styles.btn, styles.back_top].join(' ')}
          aria-label="Lên đầu trang"
          title="Lên đầu trang"
        >
          <ChevronUpIcon />
        </button>
      )}
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.27 2 11.5c0 2.74 1.24 5.2 3.21 6.95V22l3.86-2.12c1.01.28 2.08.43 3.18.43 5.52 0 10-4.27 10-9.5S17.52 2 12 2zm1.08 12.77L10.7 12.4l-4.52 2.37 4.97-5.27 2.44 2.4 4.48-2.4-4.99 5.27z"/>
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  );
}
