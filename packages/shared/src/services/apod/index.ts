import type { APOD, PaginatedAPODResponse } from '../../types'
import { ApiClient } from '../apiClient'

export class ApodService {
  private client: ApiClient
  private cache: Map<string, { data: any; timestamp: number }> = new Map()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes cache

  constructor(apiKey: string) {
    this.client = new ApiClient('https://api.nasa.gov/planetary/apod', apiKey)
  }

  private getCacheKey(params: Record<string, string>): string {
    return JSON.stringify(params)
  }

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }
    return null
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  async getLatest(): Promise<APOD> {
    return this.client.get<APOD>('')
  }

  async getByDate(date: string): Promise<APOD> {
    return this.client.get<APOD>('', { date })
  }

  async getRandom(): Promise<APOD> {
    const data = await this.client.get<APOD[]>('', { count: '1' })
    const result = Array.isArray(data) ? data[0] : data as APOD
    if (!result) {
      throw new Error('No random APOD data received')
    }
    return result
  }

  async getMultiple(count: number): Promise<APOD[]> {
    const data = await this.client.get<APOD[]>('', { count: count.toString() })
    return Array.isArray(data) ? data : [data as APOD]
  }

  async getDateRange(startDate: string, endDate: string): Promise<APOD[]> {
    const cacheKey = this.getCacheKey({ start_date: startDate, end_date: endDate })
    const cached = this.getFromCache<APOD[]>(cacheKey)
    
    if (cached) {
      return cached
    }

    const result = await this.client.get<APOD[]>('', { 
      start_date: startDate, 
      end_date: endDate 
    }).then((data: APOD[] | APOD) => {
      return Array.isArray(data) ? data : [data]
    })

    this.setCache(cacheKey, result)
    return result
  }

  // Efficient search with true pagination - only fetch what's needed
  async search(
    query: string,
    mediaType: string,
    perPage: number,
    sort: string,
    startDate: string,
    endDate: string,
    page: number,
  ): Promise<PaginatedAPODResponse> {
    try {
      // Calculate date range for pagination
      let searchStartDate: string
      let searchEndDate: string
      
      if (startDate && endDate) {
        // User provided specific date range - use traditional pagination
        const allApods = await this.getDateRange(startDate, endDate)
        
        // Apply filters
        let filteredApods = allApods
        
        if (mediaType && (mediaType === 'image' || mediaType === 'video')) {
          filteredApods = filteredApods.filter(apod => apod.media_type === mediaType)
        }

        if (query) {
          const queryLower = query.toLowerCase()
          filteredApods = filteredApods.filter(apod => 
            apod.title.toLowerCase().includes(queryLower) ||
            apod.explanation.toLowerCase().includes(queryLower)
          )
        }

        // Sort
        if (sort === 'date_asc') {
          filteredApods.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        } else {
          filteredApods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }

        // Paginate
        const totalRecords = filteredApods.length
        const totalPages = Math.ceil(totalRecords / perPage)
        const startIndex = (page - 1) * perPage
        const paginatedApods = filteredApods.slice(startIndex, startIndex + perPage)

        return {
          totalRecords,
          totalPages,
          page,
          perPage,
          sort,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          links: {
            next: page < totalPages ? `?page=${page + 1}` : null,
            previous: page > 1 ? `?page=${page - 1}` : null,
            first: `?page=1`,
            last: `?page=${totalPages}`
          },
          apods: paginatedApods
        }
      } else {
        // No specific date range - fetch different dates for each page
        const today = new Date()
        let collectedApods: APOD[] = []
        let daysToFetch = perPage
        let attempts = 0
        const maxAttempts = 5 // Prevent infinite loops
        
        // Keep fetching until we have enough images or reach max attempts
        while (collectedApods.length < perPage && attempts < maxAttempts) {
          attempts++
          
          // Calculate date range for this fetch
          const daysBackEnd = (page - 1) * perPage + (attempts - 1) * daysToFetch
          const daysBackStart = daysBackEnd + daysToFetch - 1
          
          const pageEndDate = new Date(today)
          pageEndDate.setDate(pageEndDate.getDate() - daysBackEnd)
          
          const pageStartDate = new Date(today)
          pageStartDate.setDate(pageStartDate.getDate() - daysBackStart)
          
          searchStartDate = pageStartDate.toISOString().split('T')[0]!
          searchEndDate = pageEndDate.toISOString().split('T')[0]!
          
          try {
            // Fetch data for this date range
            let fetchedApods = await this.getDateRange(searchStartDate, searchEndDate)

            // Filter by media type
            if (mediaType && (mediaType === 'image' || mediaType === 'video')) {
              fetchedApods = fetchedApods.filter(apod => apod.media_type === mediaType)
            }

            // Filter by query (search in title and explanation)
            if (query) {
              const queryLower = query.toLowerCase()
              fetchedApods = fetchedApods.filter(apod => 
                apod.title.toLowerCase().includes(queryLower) ||
                apod.explanation.toLowerCase().includes(queryLower)
              )
            }

            // Add to collected APODs, avoiding duplicates
            const existingDates = new Set(collectedApods.map(apod => apod.date))
            const newApods = fetchedApods.filter(apod => !existingDates.has(apod.date))
            collectedApods.push(...newApods)
            
            // If we still don't have enough, increase the fetch size for next attempt
            if (collectedApods.length < perPage) {
              daysToFetch = Math.ceil(daysToFetch * 1.5) // Increase by 50%
            }
          } catch (error) {
            console.warn(`Failed to fetch APODs for range ${searchStartDate} to ${searchEndDate}:`, error)
            daysToFetch = Math.ceil(daysToFetch * 1.5) // Increase range and try again
          }
        }

        // Sort the collected APODs
        if (sort === 'date_asc') {
          collectedApods.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        } else {
          collectedApods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }

        // Take exactly perPage items
        const finalApods = collectedApods.slice(0, perPage)

        // For open-ended search, estimate total pages
        const estimatedTotalRecords = 1000 // APOD has been running since 1995
        const totalPages = Math.ceil(estimatedTotalRecords / perPage)

        return {
          totalRecords: estimatedTotalRecords,
          totalPages,
          page,
          perPage,
          sort,
          hasNextPage: page < totalPages && finalApods.length === perPage,
          hasPreviousPage: page > 1,
          links: {
            next: page < totalPages && finalApods.length === perPage ? `?page=${page + 1}` : null,
            previous: page > 1 ? `?page=${page - 1}` : null,
            first: `?page=1`,
            last: `?page=${totalPages}`
          },
          apods: finalApods
        }
      }
    } catch (error) {
      throw new Error('Failed to search APODs: ' + (error as Error).message)
    }
  }

  async getAll(): Promise<APOD[]> {
    // Get last 30 days to ensure we have enough data after filtering
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 30)
    
    const apods = await this.getDateRange(
      start.toISOString().split('T')[0]!,
      end.toISOString().split('T')[0]!
    )
    
    // Return sorted by date (newest first) and limit to 10
    return apods
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
  }

  // New method for paginated recent APODs
  async getRecent(page: number = 1, perPage: number = 10): Promise<PaginatedAPODResponse> {
    const daysBack = (page - 1) * perPage + perPage
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - daysBack)
    
    const apods = await this.getDateRange(
      start.toISOString().split('T')[0]!,
      end.toISOString().split('T')[0]!
    )

    // Sort by date (newest first)
    apods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Take only the items for this page
    const startIndex = (page - 1) * perPage
    const paginatedApods = apods.slice(startIndex, startIndex + perPage)
    
    const totalPages = Math.ceil(1000 / perPage) // Estimate based on APOD history
    
    return {
      totalRecords: 1000,
      totalPages,
      page,
      perPage,
      sort: 'date_desc',
      hasNextPage: page < totalPages && paginatedApods.length === perPage,
      hasPreviousPage: page > 1,
      links: {
        next: page < totalPages && paginatedApods.length === perPage ? `?page=${page + 1}` : null,
        previous: page > 1 ? `?page=${page - 1}` : null,
        first: `?page=1`,
        last: `?page=${totalPages}`
      },
      apods: paginatedApods
    }
  }
}
