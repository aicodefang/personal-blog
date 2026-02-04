import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { notFound } from 'next/navigation'

interface Post {
  id: string
  title: string
  content: string
  date: string
  readTime: string
  category: string
  author: string
  slug: string
}

const posts: Post[] = [
  {
    id: '1',
    title: '构建现代化的 Web 应用',
    content: `
<p>在当今的 Web 开发领域，构建现代化的应用程序需要考虑众多因素。本文将探讨如何使用 Next.js、TypeScript 和 Tailwind CSS 构建高性能的 Web 应用。</p>

<h2>为什么选择 Next.js？</h2>

<p>Next.js 是一个功能强大的 React 框架，它提供了：</p>

<ul>
<li><strong>服务端渲染 (SSR)</strong> - 提升首屏加载速度和 SEO 表现</li>
<li><strong>静态站点生成 (SSG)</strong> - 预渲染页面以获得最佳性能</li>
<li><strong>增量静态再生成 (ISR)</strong> - 在运行时更新静态内容</li>
<li><strong>自动代码分割</strong> - 优化打包大小</li>
</ul>

<h2>TypeScript 的优势</h2>

<p>TypeScript 为 JavaScript 添加了类型系统，带来了诸多好处：</p>

<ul>
<li>更好的代码提示和自动补全</li>
<li>编译时错误检测</li>
<li>更安全的重构</li>
<li>提高代码可维护性</li>
</ul>

<h2>Tailwind CSS 的设计理念</h2>

<p>Tailwind CSS 采用实用优先 (Utility-First) 的方法，让开发者能够快速构建自定义界面，而无需离开 HTML。</p>

<p>通过组合小型的、单一用途的类，你可以构建出独特的设计，同时保持代码的可读性和可维护性。</p>

<h2>总结</h2>

<p>使用 Next.js + TypeScript + Tailwind CSS 的组合，你可以构建出既美观又高性能的现代 Web 应用。这套技术栈已经成为许多开发者的首选，值得深入学习和使用。</p>
    `,
    date: '2024-01-15',
    readTime: '5 分钟',
    category: '技术',
    author: 'Blog Author',
    slug: 'building-modern-web-apps',
  },
  {
    id: '2',
    title: 'React 性能优化最佳实践',
    content: `
<p>React 应用的性能优化是一个永恒的话题。本文将分享一些实用的优化技巧。</p>

<h2>使用 React.memo</h2>

<p>对于纯展示组件，使用 React.memo 可以避免不必要的重渲染。</p>

<h2>useMemo 和 useCallback</h2>

<p>合理使用 useMemo 和 useCallback 可以缓存计算结果和函数引用，减少子组件的渲染次数。</p>

<h2>虚拟化长列表</h2>

<p>当渲染大量数据时，使用虚拟化技术只渲染可视区域内的元素。</p>
    `,
    date: '2024-01-10',
    readTime: '8 分钟',
    category: 'React',
    author: 'Blog Author',
    slug: 'react-performance-optimization',
  },
  {
    id: '3',
    title: '设计系统的重要性',
    content: `
<p>设计系统是现代产品开发中不可或缺的一部分。</p>

<h2>什么是设计系统？</h2>

<p>设计系统是一套可复用的组件和模式，用于保持产品的一致性和质量。</p>

<h2>为什么需要设计系统？</h2>

<ul>
<li>提高开发效率</li>
<li>保持视觉一致性</li>
<li>降低维护成本</li>
</ul>
    `,
    date: '2024-01-05',
    readTime: '6 分钟',
    category: '设计',
    author: 'Blog Author',
    slug: 'importance-of-design-systems',
  },
  {
    id: '4',
    title: 'TypeScript 高级类型技巧',
    content: `
<p>TypeScript 的类型系统非常强大，掌握高级类型技巧可以让你写出更健壮的代码。</p>

<h2>条件类型</h2>

<p>条件类型允许你根据类型关系选择类型。</p>

<h2>映射类型</h2>

<p>映射类型可以基于现有类型创建新类型。</p>

<h2>模板字面量类型</h2>

<p>模板字面量类型提供了强大的字符串操作能力。</p>
    `,
    date: '2024-01-01',
    readTime: '10 分钟',
    category: 'TypeScript',
    author: 'Blog Author',
    slug: 'typescript-advanced-types',
  },
]

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return { title: '文章未找到' }
  
  return {
    title: `${post.title} | My Personal Blog`,
    description: post.content.slice(0, 150),
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  
  if (!post) {
    notFound()
  }

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
              <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
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

              <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {post.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </header>

            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-600 prose-li:marker:text-primary-500"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
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
