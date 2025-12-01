import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override the default `img` element with Next.js `Image`
    img: (props) => (
      <Image
        src={props.src!}
        alt={props.alt || ''}
        width={800}
        height={400}
        className="rounded-lg my-8 w-full"
        {...props}
      />
    ),
    // Override the default `a` element with Next.js `Link`
    a: (props) => (
      <Link 
        href={props.href || ''} 
        className="text-primary hover:text-primary/80 underline underline-offset-4"
        {...props}
      >
        {props.children}
      </Link>
    ),
    // Custom heading components with scroll margin for anchor links
    h1: (props) => (
      <h1 
        className="text-4xl font-bold mt-12 mb-6 scroll-mt-20 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
        {...props}
      />
    ),
    h2: (props) => (
      <h2 
        className="text-3xl font-bold mt-10 mb-4 scroll-mt-20 text-foreground border-b border-border pb-2"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 
        className="text-2xl font-semibold mt-8 mb-3 scroll-mt-20 text-foreground"
        {...props}
      />
    ),
    h4: (props) => (
      <h4 
        className="text-xl font-semibold mt-6 mb-2 scroll-mt-20 text-foreground"
        {...props}
      />
    ),
    // Enhanced paragraph styling
    p: (props) => (
      <p 
        className="text-muted-foreground leading-relaxed mb-4"
        {...props}
      />
    ),
    // Code blocks with syntax highlighting
    pre: (props) => (
      <pre 
        className="bg-muted border rounded-lg p-4 overflow-x-auto my-6 text-sm"
        {...props}
      />
    ),
    // Inline code
    code: (props) => (
      <code 
        className="bg-muted text-primary px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ),
    // Blockquotes
    blockquote: (props) => (
      <blockquote 
        className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground"
        {...props}
      />
    ),
    // Lists
    ul: (props) => (
      <ul 
        className="list-disc list-inside space-y-2 mb-4 text-muted-foreground ml-4"
        {...props}
      />
    ),
    ol: (props) => (
      <ol 
        className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground ml-4"
        {...props}
      />
    ),
    li: (props) => (
      <li 
        className="leading-relaxed"
        {...props}
      />
    ),
    // Tables
    table: (props) => (
      <div className="overflow-x-auto my-6">
        <table 
          className="min-w-full border-collapse border border-border"
          {...props}
        />
      </div>
    ),
    th: (props) => (
      <th 
        className="border border-border bg-muted p-2 text-left font-semibold"
        {...props}
      />
    ),
    td: (props) => (
      <td 
        className="border border-border p-2"
        {...props}
      />
    ),
    // Horizontal rule
    hr: (props) => (
      <hr 
        className="my-8 border-border"
        {...props}
      />
    ),
    // Custom Callout component
    Callout: ({ type = 'info', children, ...props }: { 
      type?: 'info' | 'warning' | 'success' | 'error'
      children: React.ReactNode 
    }) => {
      const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
        success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
        error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
      }
      
      return (
        <div 
          className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}
          {...props}
        >
          {children}
        </div>
      )
    },
    ...components,
  }
}
