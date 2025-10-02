import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://Aperture.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apod`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Try to fetch dynamic routes, but don't fail the build if API is unavailable
  try {
    const nasaApiKey = process.env.NEXT_PUBLIC_NASA_API_KEY
    
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&count=10`, {
      headers: {
        'User-Agent': 'Aperture-Sitemap/1.0',
      },
    })

    if (!response.ok) {
      console.warn(`NASA API request failed with status ${response.status}, using static routes only`)
      return staticRoutes
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      console.warn('NASA API returned non-array data, using static routes only')
      return staticRoutes
    }

    const dynamicEntries: MetadataRoute.Sitemap = data.map((picture: { date: string }) => ({
      url: `${baseUrl}/gallery/${picture.date}`,
      lastModified: new Date(picture.date),
      changeFrequency: 'never' as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...dynamicEntries]
  } catch (error) {
    console.warn('Failed to fetch dynamic sitemap data:', error)
    return staticRoutes
  }
}
