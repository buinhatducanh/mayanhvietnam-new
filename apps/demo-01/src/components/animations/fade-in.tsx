import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <div
      className={cn('animate-[fadeIn_0.5s_ease-out_both]', className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
