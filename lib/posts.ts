import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  author: string
  tags?: string[]
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 确保目录存在
function ensureDirectoryExists() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  ensureDirectoryExists()
  
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const dateStr = data.date instanceof Date 
          ? data.date.toISOString().split('T')[0] 
          : (data.date || new Date().toISOString().split('T')[0])

        return {
          id: slug,
          slug,
          title: String(data.title || 'Untitled'),
          excerpt: String(data.excerpt || content.slice(0, 200).replace(/[#*`]/g, '') + '...'),
          content,
          date: String(dateStr),
          readTime: String(data.readTime || `${Math.ceil(content.length / 500)} 分钟`),
          category: String(data.category || '未分类'),
          author: String(data.author || 'Blog Author'),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        }
      })

    // 按日期排序（最新的在前）
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// 获取文章列表（不含完整内容，用于列表页）
export async function getPostList(): Promise<Omit<Post, 'content'>[]> {
  const posts = await getAllPosts()
  return posts.map(({ content, ...rest }) => rest)
}

// 根据 slug 获取单篇文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensureDirectoryExists()
  
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const dateStr = data.date instanceof Date 
      ? data.date.toISOString().split('T')[0] 
      : (data.date || new Date().toISOString().split('T')[0])

    return {
      id: slug,
      slug,
      title: String(data.title || 'Untitled'),
      excerpt: String(data.excerpt || content.slice(0, 200).replace(/[#*`]/g, '') + '...'),
      content,
      date: String(dateStr),
      readTime: String(data.readTime || `${Math.ceil(content.length / 500)} 分钟`),
      category: String(data.category || '未分类'),
      author: String(data.author || 'Blog Author'),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// 将 Markdown 转换为 HTML
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

// 获取所有文章的 slug（用于 generateStaticParams）
export async function getAllSlugs(): Promise<string[]> {
  ensureDirectoryExists()
  
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
  } catch (error) {
    return []
  }
}
