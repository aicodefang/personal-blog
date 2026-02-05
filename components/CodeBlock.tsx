'use client'

import { useCodeTheme } from './CodeThemeProvider'

interface CodeBlockProps {
  html: string
}

export function CodeBlock({ html }: CodeBlockProps) {
  const { theme } = useCodeTheme()

  return (
    <div 
      className={`code-block-wrapper ${theme}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
