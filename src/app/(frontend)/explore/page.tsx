'use client'

import { useState } from 'react'
import FilterBar, { Region } from '@/components/FilterBar'
import DestinationCard, { Category } from '@/components/DestinationCard'

/* ─── Sample data (will be replaced with Payload CMS data) ── */
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
  {
    slug: 'cades-cove', name: 'Cades Cove',
    shortDescription: 'A broad valley surrounded by mountains, known for wildlife viewing and historic buildings.',
    city: 'Great Smoky Mountains', region: 'east' as const, category: 'nature' as const,
  },
  {
    slug: 'national-civil-rights-museum', name: 'National Civil Rights Museum',
    shortDescription: 'Located at the Lorraine Motel, chronicling the American civil rights movement.',
    city: 'Memphis', region: 'west' as const, category: 'history' as const, featured: true,
  },
  {
    slug: 'tennessee-aquarium', name: 'Tennessee Aquarium',
    shortDescription: 'World-class aquarium featuring freshwater and ocean exhibits on the Tennessee River.',
    city: 'Chattanooga', region: 'east' as const, category: 'family' as const,
  },
]

export default function ExplorePage() {
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

      {/* ── Hero ── */}
      <div style={{
        position:   'relative',
        height:     '320px',
        overflow:   'hidden',
        background: '#0f172a',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Background image — replace with real photo */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2027 100%)',
        }} />
        {/* Dark overlay */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'rgba(15,23,42,0.6)',
        }} />
        {/* Content */}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{
            fontSize:     '46px',
            fontWeight:   400,
            color:        '#fff',
            letterSpacing:'-0.5px',
            marginBottom: '12px',
          }}>
            Explore <strong>Tennessee</strong>
          </h1>
          <p style={{
            fontSize:  '16.7px',
            color:     'rgba(255,255,255,0.8)',
            maxWidth:  '500px',
            lineHeight:'1.65',
          }}>
            Discover attractions, experiences, and hidden gems across the Volunteer State
          </p>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <FilterBar
        onRegionChange={setRegion}
        onCategoryChange={setCategory}
        onSearch={setSearch}
        resultCount={filtered.length}
      />

      {/* ── Sponsored banner ── */}
      <div style={{
        maxWidth: '1440px',
        margin:   '0 auto',
        padding:  '32px 48px 0',
      }}>
        <SponsoredBanner />
      </div>

      {/* ── Card grid ── */}
      <div style={{
        maxWidth: '1440px',
        margin:   '0 auto',
        padding:  '24px 48px 64px',
      }}>
        {filtered.length > 0 ? (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap:                 '24px',
          }}>
            {filtered.map(d => (
              <DestinationCard key={d.slug} {...d} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding:   '80px 0',
            color:     '#64748b',
          }}>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              No results found
            </p>
            <p style={{ fontSize: '14px' }}>
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

/* ─── Sponsored Banner ───────────────────────── */
function SponsoredBanner() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:   'relative',
        background: 'linear-gradient(to right, #fffbeb, #fff7ed)',
        border:     '1px solid #fde68a',
        borderRadius: '16px',
        padding:    '28px 32px',
        boxShadow:  '0 1px 2px rgba(0,0,0,.05)',
        cursor:     'pointer',
        transition: 'box-shadow 0.2s ease',
        ...(hovered && { boxShadow: '0 4px 12px rgba(0,0,0,.08)' }),
      }}
    >
      {/* Sponsored tag */}
      <div style={{
        position:     'absolute',
        top:          '12px',
        right:        '12px',
        background:   '#f59e0b',
        color:        '#fff',
        fontSize:     '11px',
        fontWeight:   700,
        padding:      '3px 10px',
        borderRadius: '9999px',
      }}>
        Sponsored
      </div>

      <h3 style={{
        fontSize:     '19.5px',
        fontWeight:   700,
        color:        '#1e293b',
        marginBottom: '6px',
      }}>
        Taste the Best of Nashville
      </h3>
      <p style={{
        fontSize:     '14.9px',
        color:        '#475569',
        marginBottom: '10px',
        maxWidth:     '720px',
      }}>
        Join our guided food tours and experience hot chicken, BBQ, and honky-tonk culture with local experts.
      </p>
      <span style={{
        fontSize:  '13.2px',
        color:     '#d97706',
        fontWeight: 500,
      }}>
        Learn More →
      </span>
    </div>
  )
}