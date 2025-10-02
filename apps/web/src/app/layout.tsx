import { Footer } from '@/components/templates/footer'
import { HeroHeader } from '@/components/templates/navbar'
import { GalleryParamsProvider } from '@/contexts'
import { ThemeProvider } from '@/contexts/theme'
import { QueryProvider } from '@/providers/query-provider'
import type { Metadata } from 'next'
import { Merriweather, Outfit } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense } from 'react'
import './globals.css'

const outfitSans = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin'],
})

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://aperture-space.vercel.app'),
  title: {
    default: "APERTURE - NASA Space Apps Challenge 2025",
    template: '%s | APERTURE',
  },
  description:
    "APERTURE is a modern web application built for NASA Space Apps Challenge 2025 that brings the wonders of space directly to your screen through NASA's Astronomy Picture of the Day API. Explore astronomical imagery with an intuitive, fast-loading interface.",
  keywords: [
    'NASA',
    'APOD',
    'Astronomy Picture of the Day',
    'Space',
    'Universe',
    'Cosmos',
    'Astronomy',
    'APERTURE',
    'Space Photography',
    'NASA Images',
    'Space Apps Challenge',
    'NASA Space Apps 2025',
  ],
  authors: [{ name: 'rijonshahariar', url: 'https://github.com/rijonshahariar' }],
  creator: 'rijonshahariar',
  publisher: 'APERTURE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://aperture-space.vercel.app',
    siteName: 'APERTURE',
    title: "APERTURE - NASA Space Apps Challenge 2025",
    description:
      "Discover the wonders of space through NASA's Astronomy Picture of the Day archive. Built for NASA Space Apps Challenge 2025 with beautiful, responsive interface and optimized performance.",
    images: [
      {
        url: '/aperture-og.jpg',
        width: 1200,
        height: 630,
        alt: 'APERTURE - NASA APOD Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aperture_space',
    creator: '@rijonshahariar',
    title: "APERTURE - NASA Space Apps Challenge 2025",
    description:
      "Discover the wonders of space through NASA's APOD archive. Built for NASA Space Apps Challenge 2025.",
    images: ['/aperture-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${outfitSans.variable} ${merriweather.variable} antialiased`}
        suppressHydrationWarning
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <QueryProvider>
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">Loading...</div>
                }>
                <GalleryParamsProvider>
                  <HeroHeader />
                  {children}
                </GalleryParamsProvider>
              </Suspense>
              <Footer />
            </QueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
