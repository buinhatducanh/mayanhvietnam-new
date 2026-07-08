import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar', className)}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />}
          {item.href ? (
            <Link
              href={item.href}
              className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              itemProp="item"
            >
              <span itemProp="name">{item.label}</span>
            </Link>
          ) : (
            <span
              className="whitespace-nowrap text-xs font-medium text-muted-foreground"
              itemProp="name"
            >
              {item.label}
            </span>
          )}
          <meta itemProp="position" content={String(i + 1)} />
        </span>
      ))}
    </nav>
  );
}