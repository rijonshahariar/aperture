import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Static blog posts data
const blogPosts = [
  {
    slug: 'quantum-computing-revolution',
    title: 'The Quantum Computing Revolution: Transforming the Future of Technology',
    description: 'Explore how quantum computing is poised to revolutionize industries from cryptography to drug discovery, and what this means for our technological future.',
    author: 'Dr. Elena Rodriguez',
    date: '2024-11-15',
    readingTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop&crop=center',
    tags: ['Technology', 'Quantum Computing', 'Future Tech']
  },
  {
    slug: 'sustainable-architecture-cities',
    title: 'Sustainable Architecture: Building Tomorrow\'s Cities Today',
    description: 'Discover innovative architectural approaches that are reshaping urban landscapes with sustainability at their core, from green skyscrapers to self-sufficient communities.',
    author: 'Marcus Chen',
    date: '2024-11-08',
    readingTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1565599573128-ae3ef5c9f478?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JlZW4lMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    tags: ['Architecture', 'Sustainability', 'Urban Planning']
  },
  {
    slug: 'artificial-intelligence-healthcare',
    title: 'AI in Healthcare: Revolutionizing Diagnosis and Treatment',
    description: 'An in-depth look at how artificial intelligence is transforming healthcare, from early disease detection to personalized treatment plans and surgical robotics.',
    author: 'Dr. Sarah Williams',
    date: '2024-10-28',
    readingTime: '14 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop&crop=center',
    tags: ['Healthcare', 'AI', 'Medical Technology']
  },
  {
    slug: 'renewable-energy-breakthrough',
    title: 'Renewable Energy Breakthroughs: The Path to a Carbon-Free Future',
    description: 'Examining the latest innovations in solar, wind, and emerging renewable technologies that are making clean energy more efficient and accessible than ever.',
    author: 'Dr. James Patterson',
    date: '2024-10-20',
    readingTime: '13 min read',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=600&fit=crop&crop=center',
    tags: ['Energy', 'Environment', 'Innovation']
  },
  {
    slug: 'space-exploration-mars',
    title: 'Mars Exploration: Humanity\'s Next Giant Leap',
    description: 'Follow the latest developments in Mars exploration technology, from advanced rovers to planned human missions, and what they mean for the future of space colonization.',
    author: 'Dr. Amanda Torres',
    date: '2024-10-12',
    readingTime: '16 min read',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=600&fit=crop&crop=center',
    tags: ['Space', 'Mars', 'Exploration']
  }
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mt-32 mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Aperture Blog
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Explore the frontiers of science, technology, and innovation. Dive deep into the discoveries and breakthroughs shaping our world.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:gap-10 lg:gap-12">
              {blogPosts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`group relative ${
                    index === 0 ? 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center' : 
                    index % 2 === 1 ? 'md:grid md:grid-cols-2 md:gap-8 md:items-center' : 
                    'md:grid md:grid-cols-2 md:gap-8 md:items-center'
                  }`}
                >
                  <div className={`relative ${index === 0 ? 'lg:order-2' : index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg md:shadow-xl group-hover:shadow-2xl transition-all duration-500 mx-2 sm:mx-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>

                  <div className={`mt-4 md:mt-0 px-2 sm:px-0 ${index === 0 ? 'lg:order-1' : index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className={`font-bold mb-3 md:mb-4 leading-tight group-hover:text-primary transition-colors duration-200 ${
                      index === 0 ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl' : 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'
                    }`}>
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>

                    <p className={`text-muted-foreground mb-4 md:mb-6 leading-relaxed ${
                      index === 0 ? 'text-sm sm:text-base md:text-lg lg:text-xl' : 'text-xs sm:text-sm md:text-base lg:text-lg'
                    }`}>
                      {post.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 md:mb-6">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="truncate max-w-[120px] sm:max-w-none">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <time dateTime={post.date} className="whitespace-nowrap">{formatDate(post.date)}</time>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="whitespace-nowrap">{post.readingTime}</span>
                      </div>
                    </div>

                    <Button asChild className="group/button w-full sm:w-auto">
                      <Link href={`/blog/${post.slug}`} className="flex items-center justify-center gap-2 text-sm sm:text-base">
                        <span className="hidden xs:inline">Read Article</span>
                        <span className="xs:hidden">Read</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/button:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const metadata = {
  title: 'AstroVista Blog - Explore Science & Technology',
  description: 'Discover the latest insights in science, technology, and innovation. From quantum computing to space exploration, dive into the discoveries shaping our future.',
  openGraph: {
    title: 'AstroVista Blog - Explore Science & Technology',
    description: 'Discover the latest insights in science, technology, and innovation.',
    images: ['/opengraph-image.png'],
  },
}
