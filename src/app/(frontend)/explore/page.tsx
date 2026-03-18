'use client'

import { useState } from 'react'
import FilterBar, { Region } from '@/components/FilterBar'
import DestinationCard, { Category } from '@/components/DestinationCard'
import HeaderWrapper from '@/components/HeaderWrapper'
import { destinations as allDestinations } from '@/components/destinations-data'

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

      <HeaderWrapper variant="transparent" />

      {/* ── Hero ── */}
      <div style={{
        position:   'relative',
        height:     '320px',
        overflow:   'hidden',
        background: '#0f172a',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        paddingTop:     '100px',
      }}>
        {/* Background photo */}
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=85"
          alt="Blue Ridge Mountains Tennessee"
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center 60%',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.55)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <h1 style={{ fontSize: '46px', fontWeight: 400, color: '#fff', letterSpacing: '-0.5px', marginBottom: '12px' }}>
            Explore <strong>Tennessee</strong>
          </h1>
          <p style={{ fontSize: '16.7px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', lineHeight: '1.65' }}>
            Discover attractions, experiences, and hidden gems across the Volunteer State
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <FilterBar
        onRegionChange={setRegion}
        onCategoryChange={setCategory}
        onSearch={setSearch}
        resultCount={filtered.length}
      />

      {/* Sponsored banner */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 48px 0' }}>
        <SponsoredBanner />
      </div>

      {/* Card grid */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 48px 64px' }}>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {filtered.map(d => (
              <DestinationCard key={d.slug} {...d} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b' }}>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No results found</p>
            <p style={{ fontSize: '14px' }}>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

    </div>
  )
}

function SponsoredBanner() {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', background: 'linear-gradient(to right, #fffbeb, #fff7ed)',
        border: '1px solid #fde68a', borderRadius: '16px', padding: '28px 32px',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,.08)' : '0 1px 2px rgba(0,0,0,.05)',
        cursor: 'pointer', transition: 'box-shadow 0.2s ease',
      }}
    >
      <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#f59e0b', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>
        Sponsored
      </div>
      <h3 style={{ fontSize: '19.5px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Taste the Best of Nashville</h3>
      <p style={{ fontSize: '14.9px', color: '#475569', marginBottom: '10px', maxWidth: '720px' }}>
        Join our guided food tours and experience hot chicken, BBQ, and honky-tonk culture with local experts.
      </p>
      <span style={{ fontSize: '13.2px', color: '#d97706', fontWeight: 500 }}>Learn More →</span>
    </div>
  )
}