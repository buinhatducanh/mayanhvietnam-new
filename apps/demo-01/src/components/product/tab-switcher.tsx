'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TabSwitcherProps {
  tabs: { id: string; label: string; count: number }[];
  initial?: string;
  onChange?: (id: string) => void;
}

export function TabSwitcher({ tabs, initial, onChange }: TabSwitcherProps) {
  const [active, setActive] = useState(initial ?? tabs[0]?.id);

  return (
    <div className="mb-6 flex items-center gap-1 border-b border-border">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => {
            setActive(t.id);
            onChange?.(t.id);
          }}
          className={cn(
            'cursor-pointer whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors',
            active === t.id
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {t.label} ({t.count})
        </button>
      ))}
    </div>
  );
}