import { nasaApiKey } from '@/constants/api'
import { ApodService } from '@repo/shared'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  try {
    const apodService = new ApodService(nasaApiKey)
    const data = await apodService.getAll()

    return data?.map((picture) => picture.date).map((date) => ({ params: { date } })) || []
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>
}): Promise<Metadata> {
  const { date } = await params

  try {
    const apodService = new ApodService(nasaApiKey)
    const data = await apodService.getByDate(date)

    if (!data) {
      return {
        title: 'APOD',
        description: 'APOD',
      }
    }

    return {
      title: {
        absolute: data.title,
      },
      description: data.explanation,
      openGraph: {
        images: [
          {
            url: data.url,
            alt: data.title,
          },
        ],
      },
    }
  } catch {
    return {
      title: 'APOD',
      description: 'APOD',
    }
  }
}

import ApodInfo from '@/components/templates/apodInfo'

export default async function Page({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params

  try {
    const apodService = new ApodService(nasaApiKey)
    const data = await apodService.getByDate(date)

    if (!data) {
      return (
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">APOD Not Found</h1>
          <p className="text-muted-foreground">
            No Astronomy Picture of the Day was found for {date}.
          </p>
        </div>
      )
    }

    return <ApodInfo data={data} />
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading APOD</h1>
        <p className="text-muted-foreground">
          There was an error loading the Astronomy Picture of the Day for {date}.
        </p>
      </div>
    )
  }
}
