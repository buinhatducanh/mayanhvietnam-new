import { cn } from '@/lib/utils';
import { forwardRef, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'sale';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20',
  secondary:
    'bg-secondary text-secondary-foreground border border-border hover:border-primary/50',
  outline:
    'bg-transparent border border-border text-foreground hover:border-primary hover:text-primary',
  ghost:
    'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted',
  sale:
    'bg-primary text-primary-foreground hover:opacity-90 shadow-sm shadow-primary/20',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', leftIcon, rightIcon, loading, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'active:scale-[0.98]',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
);
Button.displayName = 'Button';