const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qrazfvbjyuwmgmdubkyg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYXpmdmJqeXV3bWdtZHVia3lnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE4MDg2NywiZXhwIjoyMDg1NzU2ODY3fQ.M6LylqawhKGxnOqdXb-u_3iNYVyr0lXCJD3gJE8Fzhk'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  try {
    // 检查 posts 表是否存在
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'posts')

    if (tableError) {
      console.error('Error checking table:', tableError)
      return
    }

    if (tables && tables.length > 0) {
      console.log('✓ Table "posts" already exists')
    } else {
      console.log('Table "posts" does not exist')
      console.log('Please create it manually in Supabase Dashboard SQL Editor')
      console.log('\nSQL to execute:')
      console.log('----------------------------------------')
      console.log(`CREATE TABLE posts (
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
);`)
      console.log('----------------------------------------')
      return
    }

    // 尝试插入示例数据
    const { error: insertError } = await supabase
      .from('posts')
      .upsert([
        {
          title: '构建现代化的 Web 应用',
          slug: 'building-modern-web-apps',
          content: '# 构建现代化的 Web 应用\n\n在当今的 Web 开发领域...',
          excerpt: '探索如何使用 Next.js 构建高性能应用',
          category: '技术',
          date: '2024-01-15',
          read_time: '5 分钟',
          tags: ['Next.js', 'React'],
          published: true
        },
        {
          title: 'React 性能优化最佳实践',
          slug: 'react-performance-optimization',
          content: '# React 性能优化\n\n本文介绍优化技巧...',
          excerpt: '深入了解 React 性能优化',
          category: 'React',
          date: '2024-01-10',
          read_time: '8 分钟',
          tags: ['React', '性能优化'],
          published: true
        }
      ], { onConflict: 'slug' })

    if (insertError) {
      console.error('Error inserting data:', insertError)
    } else {
      console.log('✓ Sample data inserted/updated')
    }

    console.log('\n✅ Database setup check completed!')
  } catch (err) {
    console.error('Error:', err.message)
  }
}

setupDatabase()
