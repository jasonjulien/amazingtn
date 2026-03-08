import type { Metadata } from 'next'
import './globals.css'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'

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
        <HeaderWrapper />
        <main style={{ paddingTop: '80px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}