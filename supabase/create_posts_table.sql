-- ============================================
-- 创建博客文章表
-- 在 Supabase Dashboard -> SQL Editor 中执行
-- ============================================

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

-- 删除已存在的策略（如果存在）
DROP POLICY IF EXISTS "Allow anonymous read published posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON posts;

-- 允许匿名用户读取已发布的文章
CREATE POLICY "Allow anonymous read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- 允许认证用户操作所有文章
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

-- 删除已存在的触发器
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

-- 创建触发器
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 插入示例数据
-- ============================================

INSERT INTO posts (title, slug, content, excerpt, category, author, date, read_time, tags, published)
VALUES (
  '构建现代化的 Web 应用',
  'building-modern-web-apps',
  '# 构建现代化的 Web 应用

在当今的 Web 开发领域，构建现代化的应用程序需要考虑众多因素。本文将探讨如何使用 **Next.js**、**TypeScript** 和 **Tailwind CSS** 构建高性能的 Web 应用。

## 为什么选择 Next.js？

Next.js 是一个功能强大的 React 框架，它提供了：

- **服务端渲染 (SSR)** - 提升首屏加载速度和 SEO 表现
- **静态站点生成 (SSG)** - 预渲染页面以获得最佳性能
- **增量静态再生成 (ISR)** - 在运行时更新静态内容
- **自动代码分割** - 优化打包大小

```tsx
// 示例代码
function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      {children}
    </button>
  )
}
```

## TypeScript 的优势

TypeScript 为 JavaScript 添加了类型系统，带来了诸多好处：

- 更好的代码提示和自动补全
- 编译时错误检测
- 更安全的重构
- 提高代码可维护性

## 总结

使用 Next.js + TypeScript + Tailwind CSS 的组合，你可以构建出既美观又高性能的现代 Web 应用。

> 💡 **提示**：这是一个 Markdown 渲染的示例，支持代码高亮、列表、引用等多种格式。',
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
  '# React 性能优化最佳实践

React 应用的性能优化是一个永恒的话题。本文将分享一些实用的优化技巧。

## 使用 React.memo

对于纯展示组件，使用 `React.memo` 可以避免不必要的重渲染。

```tsx
const MemoizedComponent = React.memo(function MyComponent({ data }) {
  return <div>{data}</div>
})
```

## useMemo 和 useCallback

合理使用 `useMemo` 和 `useCallback` 可以缓存计算结果和函数引用，减少子组件的渲染次数。

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b])
```

## 虚拟化长列表

当渲染大量数据时，使用虚拟化技术只渲染可视区域内的元素。

## 代码分割

使用动态导入实现代码分割：

```tsx
const LazyComponent = dynamic(() => import(''./HeavyComponent''))
```

## 总结

性能优化应该基于实际测量，不要盲目优化。使用 React DevTools Profiler 来找出真正的性能瓶颈。',
  '深入了解 React 应用的性能优化技巧，包括 memo、useMemo 和代码分割等。',
  'React',
  'Blog Author',
  '2024-01-10',
  '8 分钟',
  ARRAY['React', '性能优化'],
  true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, content, excerpt, category, author, date, read_time, tags, published)
VALUES (
  '设计系统的重要性',
  'importance-of-design-systems',
  '# 设计系统的重要性

设计系统是现代产品开发中不可或缺的一部分。

## 什么是设计系统？

设计系统是一套可复用的组件和模式，用于保持产品的一致性和质量。它通常包括：

- **设计原则** - 指导设计决策的核心理念
- **组件库** - 可复用的 UI 组件
- **样式指南** - 颜色、字体、间距等视觉规范
- **模式库** - 常见交互模式的最佳实践

## 为什么需要设计系统？

### 提高开发效率

设计系统让团队无需重复造轮子，可以直接使用预定义的组件快速构建界面。

### 保持视觉一致性

统一的视觉语言让用户在不同页面间获得一致的体验。

### 降低维护成本

集中管理的设计资产更容易更新和维护。

## 构建设计系统的步骤

1. **审计现有设计** - 识别不一致的地方
2. **定义设计令牌** - 颜色、字体、间距等基础元素
3. **创建组件库** - 从原子组件开始逐步构建
4. **编写文档** - 确保团队正确使用
5. **持续迭代** - 根据反馈不断改进

> 📚 推荐阅读：《Atomic Design》by Brad Frost',
  '为什么每个团队都需要一个设计系统，以及如何构建一个可扩展的设计系统。',
  '设计',
  'Blog Author',
  '2024-01-05',
  '6 分钟',
  ARRAY['设计系统', 'UI设计'],
  true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, content, excerpt, category, author, date, read_time, tags, published)
VALUES (
  'TypeScript 高级类型技巧',
  'typescript-advanced-types',
  '# TypeScript 高级类型技巧

TypeScript 的类型系统非常强大，掌握高级类型技巧可以让你写出更健壮的代码。

## 条件类型

条件类型允许你根据类型关系选择类型：

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false
```

## 映射类型

映射类型可以基于现有类型创建新类型：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

## 模板字面量类型

模板字面量类型提供了强大的字符串操作能力：

```ts
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<''click''>  // "onClick"
```

## infer 关键字

`infer` 用于在条件类型中推断类型：

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function greet() {
  return ''hello''
}

type GreetReturn = ReturnType<typeof greet>  // string
```

## 总结

TypeScript 的类型系统是图灵完备的，善用这些高级类型可以让你的代码更加类型安全。',
  '掌握 TypeScript 的高级类型系统，编写更类型安全的代码。',
  'TypeScript',
  'Blog Author',
  '2024-01-01',
  '10 分钟',
  ARRAY['TypeScript', '类型系统'],
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 验证数据
SELECT title, slug, category, date FROM posts;
