'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase, Post } from '@/lib/supabase'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('date', { ascending: false })
        .limit(4)
      
      if (error) {
        console.error('Error fetching posts:', error)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 sm:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-xl ring-4 ring-white">
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                  B
                </div>
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              探索技术与设计的
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                交汇点
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              分享关于前端开发、UI 设计和工程化的思考。
              在这里，你会发现实用的技术文章和设计灵感。
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#posts"
                className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                浏览文章
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-primary-100/50 to-transparent opacity-50 blur-3xl" />
        </div>
      </section>

      {/* Posts Section */}
      <section id="posts" className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
                最新文章
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                思考与见解
              </h2>
            </div>
            <Link
              href="/posts"
              className="hidden items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 sm:flex"
            >
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
                
                return (
                  <article
                    key={post.id}
                    className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-xl hover:shadow-gray-200/50"
                  >
                    <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
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

                    <Link href={`/posts/${post.slug}`} className="group/link">
                      <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover/link:text-primary-600">
                        {post.title}
                      </h3>
                      <p className="mb-4 flex-1 text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-all group-hover/link:gap-2">
                        阅读全文
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </article>
                )
              })}
            </div>
          )}

          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/posts"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600"
            >
              查看全部文章
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-gray-200 bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center text-white sm:p-12">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              订阅更新
            </h2>
            <p className="mb-8 text-gray-300">
              获取最新文章和设计灵感，直接发送到你的邮箱。
            </p>
            
            <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <label htmlFor="email" className="sr-only">邮箱地址</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border-0 bg-white/10 px-4 py-3 text-white placeholder-gray-400 ring-1 ring-inset ring-white/20 transition-all focus:ring-2 focus:ring-white sm:w-72"
              />
              <button
                type="submit"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                订阅
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-gray-500">
              © 2024 Personal Blog. 保留所有权利。
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-gray-600"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-gray-600"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
