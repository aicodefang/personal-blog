import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qrazfvbjyuwmgmdubkyg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_yIsS9hml04fRUwM7-seyaQ_OTu-gMvn'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Post {
  id: string
  slug: string
  title: string
  content: string
  excerpt: string | null
  category: string
  author: string
  date: string
  read_time: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}
