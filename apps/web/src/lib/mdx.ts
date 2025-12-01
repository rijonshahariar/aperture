import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calculateReadingTime, extractExcerpt } from './utils'

const postsDirectory = path.join(process.cwd(), 'src/app/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  author: string
  image: string
  tags: string[]
  content: string
  readingTime: string
  excerpt: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true })
    const postDirs = entries.filter(entry => entry.isDirectory())
    
    const posts = await Promise.all(
      postDirs.map(async (dir) => {
        const slug = dir.name
        const filePath = path.join(postsDirectory, slug, 'page.mdx')
        
        if (!fs.existsSync(filePath)) {
          return null
        }
        
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents) as { data: any }
        
        return {
          slug,
          title: data.title,
          date: data.date,
          description: data.description,
          author: data.author,
          image: data.image,
          tags: data.tags || [],
          excerpt: data.description || extractExcerpt(data.content || '', 30),
        }
      })
    )
    
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(postsDirectory, slug, 'page.mdx')
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Debug: Let's see what we're getting
    console.log('Raw content preview for', slug, ':', content.substring(0, 200))
    
    // Remove the first h1 heading since we display the title separately
    // Also clean any remaining frontmatter if it somehow got through
    let cleanContent = content
      .replace(/^---[\s\S]*?---\s*/, '') // Remove any remaining frontmatter
      .replace(/^#\s+.*?\n\n?/, '') // Remove first h1 heading
      .trim()
    
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      image: data.image,
      tags: data.tags || [],
      content: cleanContent,
      readingTime: calculateReadingTime(content),
      excerpt: data.description || extractExcerpt(content, 30),
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}
