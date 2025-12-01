import { getPostBySlug } from '@/lib/mdx'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  
  if (!slug) {
    return Response.json({ error: 'No slug provided' })
  }
  
  try {
    const post = await getPostBySlug(slug)
    if (!post) {
      return Response.json({ error: 'Post not found' })
    }
    
    return Response.json({
      slug: post.slug,
      title: post.title,
      contentLength: post.content.length,
      contentPreview: post.content.substring(0, 500),
      hasContent: Boolean(post.content),
      frontmatter: {
        title: post.title,
        date: post.date,
        description: post.description,
        author: post.author,
        image: post.image,
        tags: post.tags
      }
    })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
