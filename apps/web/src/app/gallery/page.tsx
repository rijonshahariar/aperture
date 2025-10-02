'use client'
import GalleryInputs from '@/components/blocks/galleryInputs'
import { GalleryPagination } from '@/components/blocks/galleryPagination'
import GallerySkeleton from '@/components/skeleton/gallerySkeleton'
import ApodGallery from '@/components/templates/gallery'
import { useGallery } from '@/hooks'
import { Search } from 'lucide-react'
import { Suspense } from 'react'

export default function GalleryPage() {
  const { search, error, isFetched, isLoading } = useGallery()

  return (
    <Suspense fallback={<GallerySkeleton />}>
      <div className="container mx-auto flex flex-col items-center pt-24 pb-4">
        <h1 className="text-3xl font-bold select-none">Gallery</h1>
        <GalleryInputs />
      </div>
      <div className="container mx-auto flex w-full flex-wrap justify-center gap-3 px-4">
        {isLoading ? (
          <GallerySkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center select-none">
            <Search className="text-primary mb-2 h-10 w-10" />
            <h2 className="text-muted-foreground mb-2 text-2xl font-semibold">No images found</h2>
            <p className="text-muted-foreground">
              No images exist with the applied filters. Try adjusting your search parameters.
            </p>
          </div>
        ) : search && search.apods.length > 0 ? (
          <>
            <ApodGallery data={search} />
            <div className="w-full flex justify-center mt-8">
              <GalleryPagination gallery={search} />
            </div>
          </>
        ) : isFetched && search && search.apods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h2 className="text-muted-foreground mb-2 text-2xl font-semibold">No images found</h2>
            <p className="text-muted-foreground">
              No images exist with the applied filters. Try adjusting your search parameters.
            </p>
          </div>
        ) : (
          <GallerySkeleton />
        )}
      </div>
    </Suspense>
  )
}
