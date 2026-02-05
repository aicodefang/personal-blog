'use client'

import { Sun, Moon } from 'lucide-react'
import { useCodeTheme } from './CodeThemeProvider'

export function CodeThemeToggle() {
  const { theme, toggleTheme } = useCodeTheme()

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
      title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4 text-amber-500" />
          <span>亮色</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-indigo-500" />
          <span>暗色</span>
        </>
      )}
    </button>
  )
}
