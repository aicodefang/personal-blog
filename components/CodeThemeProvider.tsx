'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface CodeThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const CodeThemeContext = createContext<CodeThemeContextType | undefined>(undefined)

export function CodeThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 从 localStorage 读取保存的主题
    const saved = localStorage.getItem('code-theme') as Theme
    if (saved && (saved === 'light' || saved === 'dark')) {
      setThemeState(saved)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('code-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  // 防止 hydration 不匹配
  if (!mounted) {
    return (
      <CodeThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {}, setTheme: () => {} }}>
        {children}
      </CodeThemeContext.Provider>
    )
  }

  return (
    <CodeThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </CodeThemeContext.Provider>
  )
}

export function useCodeTheme() {
  const context = useContext(CodeThemeContext)
  if (context === undefined) {
    throw new Error('useCodeTheme must be used within a CodeThemeProvider')
  }
  return context
}
