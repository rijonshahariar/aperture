'use client'
import { useGalleryParams } from '@/contexts'
import { useEffect, useState } from 'react'
import { useApodSearch } from './useApod'

export const useGallery = () => {
  const { query, mediaType, perPage, sort, startDate, endDate, page } = useGalleryParams()
  const [mounted, setMounted] = useState(false)

  const { search, isLoading, error, refetch, isRefetching, isFetching, isFetched } = useApodSearch({
    query,
    mediaType,
    perPage: parseInt(perPage),
    sort,
    startDate,
    endDate,
    page: parseInt(page),
  })

  // Handle mounting and initial fetch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only refetch when search parameters change and component is mounted
  useEffect(() => {
    if (mounted) {
      refetch()
    }
  }, [query, mediaType, perPage, sort, startDate, endDate, page, mounted, refetch])

  // Prevent hydration mismatches by not rendering anything until mounted
  if (!mounted) {
    return {
      search: null,
      isLoading: true,
      error: null,
      refetch,
      isRefetching: false,
      isFetching: false,
      isFetched: false,
    }
  }

  return {
    search,
    isLoading,
    error,
    refetch,
    isRefetching,
    isFetching,
    isFetched,
  }
}
