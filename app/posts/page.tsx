import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { getPostList } from '@/lib/posts'

export const metadata = {
  title: '文章 | My Personal Blog',
  description: '浏览所有博客文章',
}

export default async function PostsPage() {
  const posts = await getPostList()

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
              className="text-sm font-medium text-gray-900"
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

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
              全部文章
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              文章列表
            </h1>
            <p className="mt-2 text-gray-600">
              共 {posts.length} 篇文章
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center">
              <p className="text-gray-500">暂无文章，请在 content/posts/ 目录下添加 Markdown 文件</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg sm:flex-row sm:items-start sm:gap-6"
                >
                  <div className="mb-4 flex-1">
                    <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/posts/${post.slug}`} className="group/link">
                      <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover/link:text-primary-600 sm:text-2xl">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
                    <Link href={`/posts/${post.slug}`} className="inline-flex items-center gap-1">
                      阅读全文
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-center text-sm text-gray-500">
            © 2024 Personal Blog. 保留所有权利。
          </p>
        </div>
      </footer>
    </div>
  )
}
