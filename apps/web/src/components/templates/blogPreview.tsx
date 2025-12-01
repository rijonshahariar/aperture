'use client'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPreviewPost {
  slug: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
}

const featuredBlogPosts: BlogPreviewPost[] = [
  {
    slug: "quantum-computing-revolution",
    title: "The Quantum Computing Revolution: Transforming the Future of Technology",
    excerpt: "Explore how quantum computing is poised to revolutionize industries from cryptography to drug discovery, and what this means for our technological future.",
    author: "Dr. Elena Rodriguez",
    date: "2024-11-15",
    readTime: "12 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&crop=center"
  },
  {
    slug: "sustainable-architecture-cities",
    title: "Sustainable Architecture: Building Tomorrow's Cities Today",
    excerpt: "Discover innovative architectural approaches that are reshaping urban landscapes with sustainability at their core, from green skyscrapers to self-sufficient communities.",
    author: "Marcus Chen",
    date: "2024-11-08",
    readTime: "15 min read",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1565599573128-ae3ef5c9f478?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JlZW4lMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    slug: "artificial-intelligence-healthcare",
    title: "AI in Healthcare: Revolutionizing Diagnosis and Treatment",
    excerpt: "An in-depth look at how artificial intelligence is transforming healthcare, from early disease detection to personalized treatment plans and surgical robotics.",
    author: "Dr. Sarah Williams",
    date: "2024-10-28",
    readTime: "14 min read",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center"
  }
]

export default function BlogPreview() {
  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full mb-4 md:mb-6"
          >
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 px-2">
            Latest from Our Blog
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Explore cutting-edge insights from science and technology, featuring breakthrough discoveries 
            and innovations that are shaping our future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {featuredBlogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group mx-2 sm:mx-0">
                <div className="aspect-video bg-muted/20 rounded-t-lg relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span className="bg-primary/90 text-primary-foreground px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="hidden sm:inline">{new Date(post.date).toLocaleDateString()}</span>
                      <span className="sm:hidden">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground min-w-0 flex-1">
                      <User className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="truncate">{post.author}</span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary/80 flex-shrink-0 h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <span className="hidden sm:inline">Read More</span>
                        <span className="sm:hidden">Read</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Posts Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12 lg:mt-16 px-4"
        >
          <Button size="lg" asChild className="group w-full sm:w-auto min-w-[200px]">
            <Link href="/blog" className="inline-flex items-center justify-center">
              <span className="hidden sm:inline">View All Blog Posts</span>
              <span className="sm:hidden">View All Posts</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
