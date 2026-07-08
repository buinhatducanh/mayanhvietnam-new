'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Chuyển sang chế độ ${isDark ? 'sáng' : 'tối'}`}
      title={`Chuyển sang chế độ ${isDark ? 'sáng' : 'tối'}`}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all',
        'border-border bg-card text-foreground hover:border-primary hover:text-primary',
        isDark && 'border-primary/30 shadow-[0_0_10px_rgba(255,107,53,0.3)]',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4" style={{ color: '#FF6B35' }} />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}