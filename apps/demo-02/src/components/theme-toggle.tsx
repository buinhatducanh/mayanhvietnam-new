'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  // Guard: server renders 'light' (matches ThemeProvider's initial state),
  // so the toggle shows sun on first paint and switches to moon after hydration.
  const isDark = theme === 'dark' && theme !== 'light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      aria-pressed={isDark}
      className="relative rounded-full border border-border p-2.5 text-muted-foreground transition-all hover:border-primary hover:text-primary"
    >
      <Sun
        className={`size-4 transition-all ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 transition-all ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
        aria-hidden="true"
      />
    </button>
  )
}
