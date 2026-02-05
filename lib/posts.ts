import { supabase, Post } from './supabase'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

// 获取所有已发布的文章
export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  
  return data || []
}

// 获取文章列表（用于列表页）
export async function getPostList(): Promise<Omit<Post, 'content'>[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, date, read_time, category, author, tags, published, created_at, updated_at')
    .eq('published', true)
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching post list:', error)
    return []
  }
  
  return data || []
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) {
    console.error(`Error fetching post ${slug}:`, error)
    return null
  }
  
  return data
}

// 将 Markdown 转换为 HTML
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown)
  
  return result.toString()
}

// 获取所有 slug（用于 generateStaticParams）
export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('published', true)
  
  if (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
  
  return data?.map(post => post.slug) || []
}

// 创建文章（管理后台使用）
export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating post:', error)
    return null
  }
  
  return data
}

// 更新文章（管理后台使用）
export async function updatePost(slug: string, updates: Partial<Post>): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('slug', slug)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating post:', error)
    return null
  }
  
  return data
}

// 删除文章（管理后台使用）
export async function deletePost(slug: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug)
  
  if (error) {
    console.error('Error deleting post:', error)
    return false
  }
  
  return true
}

export type { Post }
