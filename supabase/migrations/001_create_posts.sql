-- 创建文章表
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT DEFAULT '未分类',
  author TEXT DEFAULT 'Blog Author',
  date DATE DEFAULT CURRENT_DATE,
  read_time TEXT DEFAULT '5 分钟',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);

-- 启用行级安全策略 (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户读取已发布的文章
DROP POLICY IF EXISTS "Allow anonymous read published posts" ON posts;
CREATE POLICY "Allow anonymous read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- 允许认证用户操作所有文章
DROP POLICY IF EXISTS "Allow authenticated users full access" ON posts;
CREATE POLICY "Allow authenticated users full access"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated');

-- 创建触发器函数自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据
INSERT INTO posts (title, slug, content, excerpt, category, author, date, read_time, tags, published)
VALUES (
  '构建现代化的 Web 应用',
  'building-modern-web-apps',
  E'在当今的 Web 开发领域，构建现代化的应用程序需要考虑众多因素。本文将探讨如何使用 **Next.js**、**TypeScript** 和 **Tailwind CSS** 构建高性能的 Web 应用。\n\n## 为什么选择 Next.js？\n\nNext.js 是一个功能强大的 React 框架，它提供了：\n\n- **服务端渲染 (SSR)** - 提升首屏加载速度和 SEO 表现\n- **静态站点生成 (SSG)** - 预渲染页面以获得最佳性能\n- **增量静态再生成 (ISR)** - 在运行时更新静态内容\n- **自动代码分割** - 优化打包大小\n\n```tsx\n// 示例代码\nfunction Button({ children }: { children: React.ReactNode }) {\n  return (\n    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">\n      {children}\n    </button>\n  )\n}\n```\n\n## TypeScript 的优势\n\nTypeScript 为 JavaScript 添加了类型系统，带来了诸多好处：\n\n- 更好的代码提示和自动补全\n- 编译时错误检测\n- 更安全的重构\n- 提高代码可维护性\n\n## 总结\n\n使用 Next.js + TypeScript + Tailwind CSS 的组合，你可以构建出既美观又高性能的现代 Web 应用。',
  '探索如何使用 Next.js、TypeScript 和 Tailwind CSS 构建高性能的现代化 Web 应用程序。',
  '技术',
  'Blog Author',
  '2024-01-15',
  '5 分钟',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS'],
  true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, content, excerpt, category, author, date, read_time, tags, published)
VALUES (
  'React 性能优化最佳实践',
  'react-performance-optimization',
  E'React 应用的性能优化是一个永恒的话题。本文将分享一些实用的优化技巧。\n\n## 使用 React.memo\n\n对于纯展示组件，使用 `React.memo` 可以避免不必要的重渲染。\n\n```tsx\nconst MemoizedComponent = React.memo(function MyComponent({ data }) {\n  return <div>{data}</div>\n})\n```\n\n## useMemo 和 useCallback\n\n合理使用 `useMemo` 和 `useCallback` 可以缓存计算结果和函数引用。\n\n## 总结\n\n性能优化应该基于实际测量，不要盲目优化。',
  '深入了解 React 应用的性能优化技巧，包括 memo、useMemo 和代码分割等。',
  'React',
  'Blog Author',
  '2024-01-10',
  '8 分钟',
  ARRAY['React', '性能优化'],
  true
)
ON CONFLICT (slug) DO NOTHING;
