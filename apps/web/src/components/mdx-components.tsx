import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

// Custom components for MDX
const components = {
  // Override the default `img` element with Next.js `Image`
  img: (props: any) => (
    <Image
      src={props.src}
      alt={props.alt}
      width={800}
      height={400}
      className="rounded-lg my-8 w-full"
      {...props}
    />
  ),
  // Override the default `a` element with Next.js `Link`
  a: (props: any) => (
    <Link 
      href={props.href} 
      className="text-primary hover:text-primary/80 underline underline-offset-4"
      {...props}
    >
      {props.children}
    </Link>
  ),
  // Custom heading components with scroll margin for anchor links
  h1: (props: any) => (
    <h1 
      className="text-4xl font-bold mb-6 mt-8 scroll-mt-16" 
      {...props}
    >
      {props.children}
    </h1>
  ),
  h2: (props: any) => (
    <h2 
      className="text-3xl font-semibold mb-4 mt-8 scroll-mt-16 border-b border-border pb-2" 
      {...props}
    >
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 
      className="text-2xl font-medium mb-3 mt-6 scroll-mt-16" 
      {...props}
    >
      {props.children}
    </h3>
  ),
  h4: (props: any) => (
    <h4 
      className="text-xl font-medium mb-3 mt-6 scroll-mt-16" 
      {...props}
    >
      {props.children}
    </h4>
  ),
  // Paragraph styling
  p: (props: any) => (
    <p 
      className="text-muted-foreground leading-7 mb-4" 
      {...props}
    >
      {props.children}
    </p>
  ),
  // List styling
  ul: (props: any) => (
    <ul 
      className="list-disc list-inside space-y-2 mb-6 text-muted-foreground ml-4" 
      {...props}
    >
      {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol 
      className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground ml-4" 
      {...props}
    >
      {props.children}
    </ol>
  ),
  li: (props: any) => (
    <li className="leading-7" {...props}>
      {props.children}
    </li>
  ),
  // Blockquote styling
  blockquote: (props: any) => (
    <blockquote 
      className="border-l-4 border-primary pl-6 py-2 mb-6 italic text-muted-foreground bg-muted/50 rounded-r-lg" 
      {...props}
    >
      {props.children}
    </blockquote>
  ),
  // Code styling
  code: (props: any) => (
    <code 
      className="bg-muted px-2 py-1 rounded text-sm font-mono" 
      {...props}
    >
      {props.children}
    </code>
  ),
  // Pre styling for code blocks
  pre: (props: any) => (
    <pre 
      className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 text-sm" 
      {...props}
    >
      {props.children}
    </pre>
  ),
  // Custom callout component
  Callout: ({ children, type = 'info' }: { children: ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) => (
    <div className={`p-4 rounded-lg mb-6 ${
      type === 'warning' ? 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200' :
      type === 'error' ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-200' :
      type === 'success' ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-200' :
      'bg-blue-100 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
    } border-l-4`}>
      {children}
    </div>
  ),
}

export function useMDXComponents(components: any) {
  return components
}

export const mdxComponents = components
export default components
