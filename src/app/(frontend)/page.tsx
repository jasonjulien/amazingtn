'use client'

import { useState } from 'react'
import DestinationCard, { Category } from '@/components/DestinationCard'
import FilterBar, { Region } from '@/components/FilterBar'

const allDestinations = [
  {
    slug: 'graceland', name: 'Graceland',
    shortDescription: 'The legendary home of Elvis Presley, featuring the iconic mansion, museums, and memorabilia.',
    city: 'Memphis', region: 'west' as const, category: 'music' as const, featured: true,
  },
  {
    slug: 'great-smoky-mountains', name: 'Great Smoky Mountains National Park',
    shortDescription: "America's most visited national park with stunning mountain views, wildlife, and hiking trails.",
    city: 'Gatlinburg', region: 'east' as const, category: 'nature' as const, featured: true,
  },
  {
    slug: 'grand-ole-opry', name: 'Grand Ole Opry',
    shortDescription: 'The legendary home of country music, hosting live performances since 1925.',
    city: 'Nashville', region: 'middle' as const, category: 'music' as const, featured: true,
  },
  {
    slug: 'beale-street', name: 'Beale Street',
    shortDescription: 'The home of the blues, lined with legendary clubs, restaurants, and live music venues.',
    city: 'Memphis', region: 'west' as const, category: 'music' as const,
  },
  {
    slug: 'ruby-falls', name: 'Ruby Falls',
    shortDescription: "America's tallest and deepest underground waterfall, located deep inside Lookout Mountain.",
    city: 'Chattanooga', region: 'east' as const, category: 'nature' as const,
  },
  {
    slug: 'jack-daniels-distillery', name: 'Jack Daniels Distillery',
    shortDescription: "Tour the world's oldest registered distillery and learn the secrets of Tennessee whiskey.",
    city: 'Lynchburg', region: 'middle' as const, category: 'food' as const, featured: true,
  },
  {
    slug: 'dollywood', name: 'Dollywood',
    shortDescription: 'Award-winning theme park featuring world-class rides, shows, and Appalachian culture.',
    city: 'Pigeon Forge', region: 'east' as const, category: 'family' as const, featured: true,
  },
  {
    slug: 'parthenon', name: 'The Parthenon',
    shortDescription: 'A full-scale replica of the original Parthenon in Athens, featuring a 42-foot Athena statue.',
    city: 'Nashville', region: 'middle' as const, category: 'history' as const,
  },
  {
    slug: 'ocoee-river', name: 'Ocoee River Whitewater',
    shortDescription: 'Olympic-level whitewater rafting on the river that hosted the 1996 Olympics.',
    city: 'Polk County', region: 'east' as const, category: 'adventure' as const,
  },
]

export default function HomePage() {
  const [region,   setRegion]   = useState<Region>('all')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [search,   setSearch]   = useState('')

  const filtered = allDestinations.filter(d => {
    const matchRegion   = region   === 'all' || d.region   === region
    const matchCategory = category === 'all' || d.category === category
    const matchSearch   = search === '' ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchCategory && matchSearch
  })

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <FilterBar
        onRegionChange={setRegion}
        onCategoryChange={setCategory}
        onSearch={setSearch}
        resultCount={filtered.length}
      />
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 48px' }}>
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '24px',
        }}>
          {filtered.map(d => (
            <DestinationCard key={d.slug} {...d} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b' }}>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No results found</p>
            <p style={{ fontSize: '14px' }}>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  )
}