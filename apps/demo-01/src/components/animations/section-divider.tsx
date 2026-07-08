'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
  label?: string;
}

export function SectionDivider({ className, label }: SectionDividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-3 py-6', className)}>
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
    );
  }
  return <div className={cn('h-px w-full bg-border', className)} />;
}

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
}

export function CountUp({ end, duration = 1200, className }: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return <span className={className}>{value}</span>;
}
