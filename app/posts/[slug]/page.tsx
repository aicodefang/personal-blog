'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import { supabase, Post } from '@/lib/supabase'
import { CodeThemeProvider } from '@/components/CodeThemeProvider'
import { CodeThemeToggle } from '@/components/CodeThemeToggle'
import { ArticleContent } from '@/components/ArticleContent'
import './code-themes.css'

export default function PostPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [post, setPost] = useState<Post | null>(null)
  const [contentHtml, setContentHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
      
      if (error || !data) {
        console.error('Error fetching post:', error)
        setError(true)
      } else {
        setPost(data)
        // 转换 Markdown 为 HTML
        const result = await remark()
          .use(remarkGfm)
          .use(html, { sanitize: false })
          .process(data.content)
        setContentHtml(result.toString())
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h1>
            <p className="text-gray-600 mb-8">该文章不存在或已被删除</p>
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-primary-600 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              返回文章列表
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <CodeThemeProvider>
      <div className="min-h-screen bg-white">
        <Header />

        <main className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Link
              href="/posts"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              返回文章列表
            </Link>

            <article>
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.read_time}
                  </span>
                </div>

                <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {post.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-gray-400" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* 代码主题切换 */}
              <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-600">代码主题</span>
                <CodeThemeToggle />
              </div>

              {/* Markdown 内容 */}
              <ArticleContent html={contentHtml} />
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </CodeThemeProvider>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight text-gray-900 transition-colors hover:text-primary-600"
        >
          Blog
        </Link>
        <nav className="hidden items-center gap-8 sm:flex" aria-label="主导航">
          <Link 
            href="/" 
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            首页
          </Link>
          <Link 
            href="/posts" 
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            文章
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            关于
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-center text-sm text-gray-500">
          © 2024 Personal Blog. 保留所有权利。
        </p>
      </div>
    </footer>
  )
}
