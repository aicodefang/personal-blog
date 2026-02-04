export const metadata = {
  title: '关于我 | My Personal Blog',
  description: '了解更多关于博主的信息',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <a 
            href="/" 
            className="text-xl font-bold tracking-tight text-gray-900 transition-colors hover:text-primary-600"
          >
            Blog
          </a>
          <nav className="hidden items-center gap-8 sm:flex" aria-label="主导航">
            <a 
              href="/" 
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              首页
            </a>
            <a 
              href="/posts" 
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              文章
            </a>
            <a 
              href="/about" 
              className="text-sm font-medium text-gray-900"
            >
              关于
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-xl ring-4 ring-white">
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                B
              </div>
            </div>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            关于我
          </h1>
          
          <p className="mx-auto mb-12 max-w-xl text-lg text-gray-600">
            一名热爱技术与设计的开发者
          </p>
        </div>

        <div className="prose prose-lg mx-auto max-w-none">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            我的故事
          </h2>
          
          <p className="mb-6 text-gray-600 leading-relaxed">
            你好！我是一名前端开发者和 UI 设计师。我创建这个博客是为了分享我在技术学习和项目实践中的经验与思考。
          </p>
          
          <p className="mb-6 text-gray-600 leading-relaxed">
            我相信好的代码和好的设计是相辅相成的。在这个博客中，你会发现关于 React、Next.js、TypeScript 以及现代 Web 开发的实用文章，也会有一些关于 UI 设计和用户体验的思考。
          </p>

          <h2 className="mb-4 mt-12 text-2xl font-bold text-gray-900">
            技术栈
          </h2>
          
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma'].map((tech) => (
              <div
                key={tech}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-700 transition-all hover:border-primary-300 hover:bg-primary-50"
              >
                {tech}
              </div>
            ))}
          </div>

          <h2 className="mb-4 mt-12 text-2xl font-bold text-gray-900">
            联系我
          </h2>
          
          <p className="mb-6 text-gray-600 leading-relaxed">
            如果你想交流技术问题，或者有合作的想法，欢迎通过以下方式联系我：
          </p>
          
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-gray-400">📧</span>
              <a href="mailto:hello@example.com" className="text-primary-600 hover:underline">
                hello@example.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-gray-400">💻</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-gray-400">🐦</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                Twitter
              </a>
            </li>
          </ul>
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
