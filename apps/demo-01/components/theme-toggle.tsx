'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}
      className="flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary sm:size-10"
    >
      {isDark ? (
        <Sun className="size-4 transition-transform hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="size-4 transition-transform hover:-rotate-12" aria-hidden="true" />
      )}
    </button>
  )
}
