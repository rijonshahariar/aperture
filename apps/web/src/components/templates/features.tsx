import { Archive, CodeIcon, Heart, SearchCheck } from 'lucide-react'
import { BentoGrid, BentoItem } from '../blocks/bentoGrid'
import { AnimatedGroup } from '../ui/animatedGroup'

export default function FeaturesSection() {
  const itemsSample: BentoItem[] = [
    {
      title: 'Complete NASA APOD Archive',
      description:
        'Dive into the full NASA Astronomy Picture of the Day archive, spanning back to 1995. Complete with powerful search tools and detailed scientific insights.',
      icon: <Archive className="text-primary h-6 w-6" />,
      tags: ['Archive', 'Search', 'Metadata', 'Collections'],
      colSpan: 2,
      rowSpan: 2,
    },
    {
      title: 'Personal Collection',
      description:
        'Build your own cosmic gallery with our favorites system. Save breathtaking images, organize them into custom albums, add personal notes, and share your collection with the community',
      icon: <Heart className="h-6 w-6 text-amber-500" />,
      tags: ['Favorites', 'Collections', 'Sharing'],
      colSpan: 1,
      rowSpan: 2,
    },
    {
      title: 'Advanced Searching and Filtering Tools ',
      description:
        'Explore the archive with powerful search and filtering tools. Browse by date, tags, or media type to find exactly what you’re looking for, or uncover new cosmic favorites along the way.',
      icon: <SearchCheck className="h-6 w-6 text-purple-500" />,
      tags: ['Search', 'Filter', 'Discovery'],
      colSpan: 1,
      rowSpan: 1,
    },
    {
      title: 'Developer Platform',
      description:
        'Build with our open API, complete with clear documentation, webhooks, and SDKs. Create your own astronomy apps or integrate cosmic data directly into your projects with ease.',
      icon: <CodeIcon className="h-6 w-6 text-gray-500" />,
      tags: ['API', 'SDK', 'Webhooks', 'Integration'],
      colSpan: 2,
      rowSpan: 1,
    },
  ]

  const transitionVariants = {
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(12px)',
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          type: 'spring' as const,
          bounce: 0.3,
          duration: 2,
        },
      },
    },
  }

  return (
    <section className="container mx-auto flex max-w-7xl py-4 select-none">
      <AnimatedGroup variants={transitionVariants} className="flex flex-col items-center">
        <h1 className="mx-auto p-4 text-4xl font-bold">Key Features</h1>
        <BentoGrid items={itemsSample} />
      </AnimatedGroup>
    </section>
  )
}
