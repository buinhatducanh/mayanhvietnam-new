'use client';

import { useEffect, useState, useCallback } from 'react';
import styles from './CountdownTimer.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  size?: 'sm' | 'md' | 'lg';
  style?: 'blocks' | 'minimal';
  label?: string;
  onComplete?: () => void;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function CountdownTimer({
  targetDate,
  size = 'md',
  style: displayStyle = 'blocks',
  label,
  onComplete,
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 1, hours: 12, minutes: 30, seconds: 0 });
  const [isUrgent, setIsUrgent] = useState(false);

  const tick = useCallback(() => {
    const tl = calculateTimeLeft(targetDate);
    setTimeLeft(tl);
    const totalSeconds = tl.days * 86400 + tl.hours * 3600 + tl.minutes * 60 + tl.seconds;
    setIsUrgent(totalSeconds < 3600);
    if (totalSeconds <= 0 && onComplete) onComplete();
  }, [targetDate, onComplete]);

  useEffect(() => {
    setMounted(true);
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  if (displayStyle === 'minimal') {
    const { days, hours, minutes } = timeLeft;
    return (
      <span
        className={[styles.minimal, isUrgent ? styles.urgent : ''].filter(Boolean).join(' ')}
        suppressHydrationWarning
      >
        {!mounted
          ? 'Đang tải thời gian...'
          : days > 0
          ? `Còn ${days} ngày ${pad(hours)} giờ`
          : `Còn ${pad(hours)} giờ ${pad(minutes)} phút`}
      </span>
    );
  }

  const blocks = [
    { value: timeLeft.days, label: 'NGÀY' },
    { value: timeLeft.hours, label: 'GIỜ' },
    { value: timeLeft.minutes, label: 'PHÚT' },
    { value: timeLeft.seconds, label: 'GIÂY' },
  ];

  return (
    <div className={[styles.timer, styles[`timer--${size}`], isUrgent ? styles.urgent : ''].filter(Boolean).join(' ')}>
      {label && <span className={styles.timer_label}>{label}</span>}
      <div className={styles.blocks}>
        {blocks.map((block, i) => (
          <div key={block.label} className={styles.block_group}>
            <div className={[styles.block, isUrgent && block.label === 'GIÂY' ? styles.block_pulse : ''].filter(Boolean).join(' ')}>
              <span className={styles.value} suppressHydrationWarning>
                {mounted ? pad(block.value) : '--'}
              </span>
            </div>
            <span className={styles.block_label}>{block.label}</span>
            {i < blocks.length - 1 && <span className={styles.sep}>:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
