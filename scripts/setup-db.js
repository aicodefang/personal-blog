const { Client } = require('pg')

const client = new Client({
  host: 'db.qrazfvbjyuwmgmdubkyg.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'KEAIjun.////',
  ssl: { rejectUnauthorized: false }
})

async function createTable() {
  try {
    await client.connect()
    console.log('Connected to database')

    // 创建表
    await client.query(`
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
      )
    `)
    console.log('✓ Table created')

    // 创建索引
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
      CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date DESC);
      CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published)
    `)
    console.log('✓ Indexes created')

    // 启用 RLS
    await client.query(`ALTER TABLE posts ENABLE ROW LEVEL SECURITY`)
    console.log('✓ RLS enabled')

    // 创建策略
    await client.query(`
      DROP POLICY IF EXISTS "Allow anonymous read published posts" ON posts;
      CREATE POLICY "Allow anonymous read published posts"
        ON posts FOR SELECT
        USING (published = true)
    `)
    console.log('✓ Policy created')

    // 插入示例数据
    await client.query(`
      INSERT INTO posts (title, slug, content, excerpt, category, date, read_time, tags, published)
      VALUES 
        ('构建现代化的 Web 应用', 'building-modern-web-apps', '# 构建现代化的 Web 应用\n\n在当今的 Web 开发领域，构建现代化的应用程序需要考虑众多因素。本文将探讨如何使用 Next.js、TypeScript 和 Tailwind CSS 构建高性能的 Web 应用。', '探索如何使用 Next.js、TypeScript 和 Tailwind CSS 构建高性能的现代化 Web 应用程序。', '技术', '2024-01-15', '5 分钟', ARRAY['Next.js', 'React'], true),
        ('React 性能优化最佳实践', 'react-performance-optimization', '# React 性能优化最佳实践\n\nReact 应用的性能优化是一个永恒的话题。本文将分享一些实用的优化技巧。', '深入了解 React 应用的性能优化技巧，包括 memo、useMemo 和代码分割等。', 'React', '2024-01-10', '8 分钟', ARRAY['React', '性能优化'], true)
      ON CONFLICT (slug) DO NOTHING
    `)
    console.log('✓ Sample data inserted')

    console.log('\n✅ Database setup completed successfully!')
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

createTable()
