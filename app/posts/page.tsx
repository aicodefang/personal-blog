import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
}

const posts: Post[] = [
  {
    id: '1',
    title: '构建现代化的 Web 应用',
    excerpt: '探索如何使用 Next.js、TypeScript 和 Tailwind CSS 构建高性能的现代化 Web 应用程序。',
    date: '2024-01-15',
    readTime: '5 分钟',
    category: '技术',
    slug: 'building-modern-web-apps',
  },
  {
    id: '2',
    title: 'React 性能优化最佳实践',
    excerpt: '深入了解 React 应用的性能优化技巧，包括 memo、useMemo 和代码分割等。',
    date: '2024-01-10',
    readTime: '8 分钟',
    category: 'React',
    slug: 'react-performance-optimization',
  },
  {
    id: '3',
    title: '设计系统的重要性',
    excerpt: '为什么每个团队都需要一个设计系统，以及如何构建一个可扩展的设计系统。',
    date: '2024-01-05',
    readTime: '6 分钟',
    category: '设计',
    slug: 'importance-of-design-systems',
  },
  {
    id: '4',
    title: 'TypeScript 高级类型技巧',
    excerpt: '掌握 TypeScript 的高级类型系统，编写更类型安全的代码。',
    date: '2024-01-01',
    readTime: '10 分钟',
    category: 'TypeScript',
    slug: 'typescript-advanced-types',
  },
]

export const metadata = {
  title: '文章 | My Personal Blog',
  description: '浏览所有博客文章',
}

export default function PostsPage() {
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
          </div>

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
