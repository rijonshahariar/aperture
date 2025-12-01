import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { slug } from "github-slugger"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const numberOfWords = text.split(/\s/g).length
  const minutes = numberOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  
  if (readTime === 1) {
    return "1 min read"
  } else {
    return `${readTime} min read`
  }
}

export function getTableOfContents(content: string) {
  const headingLines = content.split('\n').filter(line => 
    line.match(/^#{2,3}\s/)
  )
  
  return headingLines.map(line => {
    const level = line.match(/^#+/)?.[0].length || 2
    const text = line.replace(/^#+\s/, '')
    const anchor = slug(text)
    
    return {
      level,
      text,
      anchor,
    }
  })
}

export function extractExcerpt(content: string, wordLimit: number = 30): string {
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()

  const words = plainText.split(' ')
  if (words.length <= wordLimit) {
    return plainText
  }
  
  return words.slice(0, wordLimit).join(' ') + '...'
}
