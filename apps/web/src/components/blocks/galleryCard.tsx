'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Heart, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Spinner } from '../ui/spinner'

// Helper function to truncate text
const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export default function GalleryCard({
  date,
  explanation,
  url,
  title,
  media_type,
  toggleFavorite,
}: {
  date: string
  explanation?: string
  url: string
  title?: string
  media_type: string
  toggleFavorite: (date: string) => void
}) {
  //const truncatedExplanation = truncateText(explanation, 150)
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageHeight, setImageHeight] = useState(300) // Default height
  const [imageWidth, setImageWidth] = useState(400) // Default width

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement
    setImageWidth(img.naturalWidth)
    setImageHeight(img.naturalHeight)
    setImageLoaded(true)
  }

  const checkFavorite = (date: string) => {
    const favorites = localStorage.getItem('favoritesApod') ?? '[]'
    const favoritesArray = JSON.parse(favorites) as string[]
    return favoritesArray.includes(date)
  }

  useEffect(() => {
    setImageLoaded(false)
    setImageHeight(300) // Reset to default height
    setImageWidth(400) // Reset to default width
  }, [url])

  const truncatedTitle = truncateText(title, 50)

  const formattedDate = date
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(new Date(date.replace(/-/g, '/')))
    : ''

  useEffect(() => {
    setIsFavorite(checkFavorite(date))
  }, [date])

  // Calculate dynamic height based on image aspect ratio for masonry
  const cardWidth = 320 // Fixed card width - increased from 280
  const aspectRatio = imageWidth / imageHeight
  const calculatedHeight = Math.min(Math.max(cardWidth / aspectRatio, 200), 450) // Min 200px, max 450px

  return (
    <Card className="group relative flex w-full max-w-md flex-col overflow-hidden cursor-pointer break-inside-avoid mb-4">
      <CardContent className="flex-grow p-0">
        <div 
          className="relative overflow-hidden"
          style={{ height: imageLoaded ? `${calculatedHeight}px` : '300px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {media_type === 'image' ? (
            <>
              {!imageLoaded && (
                <div className="flex h-full w-full place-content-center items-center justify-center">
                  <Spinner />
                </div>
              )}
              <Image
                src={url}
                alt={title ?? ''}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                className="transition-all duration-500 select-none group-hover:scale-110"
                onLoad={handleImageLoad}
              />
            </>
          ) : url ? (
            <div className="h-full">
              <ReactPlayer
                src={url}
                controls={false}
                loop={false}
                playing={false}
                height="100%"
                width="100%"
              />
            </div>
          ) : (
            <div className="bg-muted flex h-full w-full place-content-center items-center justify-center">
              <p className="text-muted-foreground text-sm">No media available</p>
            </div>
          )}

          {/* Favorite button - upper left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 left-3 z-10"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 cursor-pointer bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
                aria-label="Save to favorites"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleFavorite(date)
                  setIsFavorite(!isFavorite)
                }}
              >
                {isFavorite ? (
                  <Heart className="h-4 w-4 fill-current text-red-500" />
                ) : (
                  <Heart className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Full-screen button - upper right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 z-10"
          >
            <Link href={`/gallery/${date}`} passHref>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 cursor-pointer bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
                  aria-label="View full image"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Title overlay - bottom on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4"
          >
            <h2 className="text-white text-lg font-semibold mb-1 overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {truncatedTitle}
            </h2>
            <p className="text-white/80 text-sm">
              {formattedDate}
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
