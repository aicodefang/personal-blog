// 使用 Supabase JS 客户端创建表
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qrazfvbjyuwmgmdubkyg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYXpmdmJqeXV3bWdtZHVia3lnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDE4MDg2NywiZXhwIjoyMDg1NzU2ODY3fQ.M6LylqawhKGxnOqdXb-u_3iNYVyr0lXCJD3gJE8Fzhk'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTable() {
  // 使用 raw SQL 创建表
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
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
    `
  })
  
  if (error) {
    console.error('Error creating table:', error)
    process.exit(1)
  }
  
  console.log('Table created successfully!')
}

createTable()
