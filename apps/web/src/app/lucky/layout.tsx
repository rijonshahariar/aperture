import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Did Hubble See on Your Birthday? | APERTURE',
  description: 'Discover the cosmic wonders that Hubble Space Telescope captured on your birthday. Enter your birth date to reveal your personal piece of the universe.',
  keywords: ['Hubble', 'birthday', 'space telescope', 'astronomy', 'cosmic discovery', 'NASA'],
}

export default function LuckyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
