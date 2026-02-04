import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getPostBySlug, markdownToHtml, getAllSlugs } from '@/lib/posts'

interface Props {
  params: { slug: string }
}

// 生成静态参数
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// 生成元数据
export async function generateMetadata({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: '文章未找到' }
  
  return {
    title: `${post.title} | My Personal Blog`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  // 将 Markdown 转换为 HTML
  const contentHtml = await markdownToHtml(post.content)

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
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
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

            {/* Markdown 内容 */}
            <div
              className="prose prose-lg max-w-none 
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
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg 
                prose-pre:overflow-x-auto prose-pre:my-6
                prose-pre:code:text-inherit prose-pre:code:bg-transparent prose-pre:code:p-0
                prose-img:rounded-lg prose-img:my-6
                prose-hr:border-gray-200 prose-hr:my-8"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
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
