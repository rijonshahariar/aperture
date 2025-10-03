import { PaginatedAPODResponse } from '@repo/shared'
import GalleryCard from '../blocks/galleryCard'
import { GalleryPagination } from '../blocks/galleryPagination'
import Masonry from 'react-masonry-css'

export default function ApodGallery({ data }: { data: PaginatedAPODResponse }) {
  const toggleFavorite = (date: string) => {
    const favorites = localStorage.getItem('favoritesApod') ?? '[]'
    const favoritesArray = JSON.parse(favorites) as string[]
    if (favoritesArray.includes(date)) {
      favoritesArray.splice(favoritesArray.indexOf(date), 1)
    } else {
      favoritesArray.push(date)
    }
    localStorage.setItem('favoritesApod', JSON.stringify(favoritesArray))
  }

  // Responsive breakpoint configuration for masonry columns
  const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    1024: 2,
    640: 1
  }

  return (
    <div className="flex flex-col gap-4">
      <GalleryPagination gallery={data} />
      <div className="container mx-auto px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.apods.map((item) => (
            <GalleryCard
              key={item.date}
              date={item.date}
              explanation={item.explanation}
              url={item.url ?? ''}
              title={item.title}
              media_type={item.media_type}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </Masonry>
      </div>
      <GalleryPagination gallery={data} />
    </div>
  )
}
