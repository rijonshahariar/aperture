import { PaginatedAPODResponse } from '@repo/shared'
import GalleryCard from '../blocks/galleryCard'
import { GalleryPagination } from '../blocks/galleryPagination'

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

  return (
    <div className="flex flex-col gap-4">
      <GalleryPagination gallery={data} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
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
        </div>
      </div>
      <GalleryPagination gallery={data} />
    </div>
  )
}
