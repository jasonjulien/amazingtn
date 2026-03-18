import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import { ItineraryProvider } from '@/context/ItineraryContext'

export const metadata: Metadata = {
  title: 'Amazing Tennessee — Discover the Volunteer State',
  description: 'Explore destinations, trails, cities, restaurants, and events across East, Middle, and West Tennessee.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ItineraryProvider>
          {children}
          <Footer />
        </ItineraryProvider>
      </body>
    </html>
  )
}