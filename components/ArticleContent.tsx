'use client'

import { useCodeTheme } from '@/components/CodeThemeProvider'

interface ArticleContentProps {
  html: string
}

export function ArticleContent({ html }: ArticleContentProps) {
  const { theme } = useCodeTheme()
  
  return (
    <div
      className={`prose prose-lg max-w-none code-block-wrapper ${theme}
        prose-headings:text-gray-900 
        prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-ul:text-gray-600 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
        prose-ol:text-gray-600 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
        prose-li:my-1 prose-li:marker:text-primary-500
        prose-blockquote:border-l-4 prose-blockquote:border-primary-500 
        prose-blockquote:bg-primary-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:pr-4
        prose-blockquote:rounded-r-lg prose-blockquote:my-6
        prose-blockquote:text-gray-700 prose-blockquote:italic
        prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 
        prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-0
        prose-img:rounded-lg prose-img:my-6
        prose-hr:border-gray-200 prose-hr:my-8`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
