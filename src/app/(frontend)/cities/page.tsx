'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { cities, citiesByRegion } from '@/components/cities-data'

type RegionFilter = 'all' | 'east' | 'middle' | 'west'

const regionConfig = {
  east:   { label: 'East Tennessee',   color: '#059669', gradient: 'linear-gradient(135deg, #059669, #15803d)' },
  middle: { label: 'Middle Tennessee', color: '#d97706', gradient: 'linear-gradient(135deg, #d97706, #c2410c)' },
  west:   { label: 'West Tennessee',   color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #1d4ed8)' },
}

export default function CitiesPage() {
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('all')

  const filtered = activeRegion === 'all'
    ? cities
    : cities.filter(c => c.region === activeRegion)

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <Header variant="white" />

      {/* ── Hero ── */}
      <div style={{
        position:       'relative',
        height:         '320px',
        overflow:       'hidden',
        background:     '#0f172a',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        paddingTop:     '100px',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2027 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>
            Urban Adventures
          </p>
          <h1 style={{ fontSize: '46px', fontWeight: 400, color: '#fff', letterSpacing: '-0.5px', marginBottom: '12px' }}>
            Explore Tennessee <strong>Cities</strong>
          </h1>
          <p style={{ fontSize: '16.7px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', lineHeight: 1.65 }}>
            From Music City to the birthplace of the blues — discover Tennessee's most vibrant urban destinations
          </p>
        </div>
      </div>

      {/* ── Region filter ── */}
      <div style={{
        background:   '#fff',
        borderBottom: '1px solid #e5e5e5',
        boxShadow:    '0 1px 2px rgba(0,0,0,.05)',
        position:     'sticky',
        top:          '100px',
        zIndex:       90,
      }}>
        <div style={{
          maxWidth: '1440px',
          margin:   '0 auto',
          padding:  '16px 48px',
          display:  'flex',
          gap:      '8px',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '13px', color: '#64748b', marginRight: '8px' }}>Filter by region:</span>
          {(['all', 'east', 'middle', 'west'] as RegionFilter[]).map(r => (
            <RegionPill
              key={r}
              label={r === 'all' ? 'All Cities' : regionConfig[r].label}
              active={activeRegion === r}
              color={r === 'all' ? '#0f172a' : regionConfig[r].color}
              onClick={() => setActiveRegion(r)}
            />
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '14px', color: '#475569' }}>
            Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> cities
          </span>
        </div>
      </div>

      {/* ── Cities grid ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 48px 80px' }}>
        {activeRegion === 'all' ? (
          /* Grouped by region */
          <>
            {(['east', 'middle', 'west'] as const).map(region => (
              <RegionGroup
                key={region}
                region={region}
                cities={citiesByRegion[region]}
                config={regionConfig[region]}
              />
            ))}
          </>
        ) : (
          /* Filtered grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {filtered.map(city => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

/* ─── Region Group ───────────────────────────── */
function RegionGroup({ region, cities, config }: {
  region: 'east' | 'middle' | 'west'
  cities: typeof import('@/components/cities-data').cities
  config: { label: string; color: string; gradient: string }
}) {
  return (
    <div style={{ marginBottom: '64px' }}>
      {/* Region header */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        marginBottom:   '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width:        '4px',
            height:       '32px',
            borderRadius: '2px',
            background:   config.gradient,
          }} />
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b' }}>{config.label}</h2>
        </div>
        <Link href={`/regions/${region}`} style={{
          fontSize: '13px', color: config.color, fontWeight: 500,
        }}>
          Explore {config.label} →
        </Link>
      </div>

      {/* City cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {cities.map(city => (
          <CityCard key={city.slug} city={city} />
        ))}
      </div>
    </div>
  )
}

/* ─── City Card ──────────────────────────────── */
function CityCard({ city }: { city: typeof import('@/components/cities-data').cities[0] }) {
  const [hovered, setHovered] = useState(false)
  const config = regionConfig[city.region]

  return (
    <Link
      href={`/cities/${city.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:      'block',
        background:   '#fff',
        borderRadius: '16px',
        overflow:     'hidden',
        boxShadow:    hovered ? '0 8px 24px rgba(0,0,0,.10)' : '0 1px 2px rgba(0,0,0,.05)',
        transform:    hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:   'box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#1e293b' }}>
        <img
          src={city.heroImage}
          alt={city.name}
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            transform:  hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6), rgba(15,23,42,0))' }} />
        {/* Region badge */}
        <div style={{
          position:     'absolute',
          top:          '16px',
          left:         '16px',
          background:   config.color,
          color:        '#fff',
          fontSize:     '11px',
          fontWeight:   700,
          padding:      '4px 10px',
          borderRadius: '6px',
          boxShadow:    '0 1px 3px rgba(0,0,0,.15)',
        }}>
          {config.label}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 24px' }}>
        <h3 style={{ fontSize: '19.5px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{city.name}</h3>
        <p style={{ fontSize: '13px', color: '#d97706', fontWeight: 500, marginBottom: '10px' }}>{city.tagline}</p>
        <p style={{
          fontSize:        '13px',
          color:           '#475569',
          lineHeight:      1.55,
          marginBottom:    '16px',
          display:         '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow:        'hidden',
        }}>
          {city.description}
        </p>

        {/* Highlights */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {city.highlights.slice(0, 3).map(h => (
            <span key={h} style={{
              fontSize:     '11px',
              color:        '#475569',
              background:   '#f1f5f9',
              padding:      '3px 8px',
              borderRadius: '4px',
            }}>
              {h}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

/* ─── Region Pill ────────────────────────────── */
function RegionPill({ label, active, color, onClick }: {
  label:   string
  active:  boolean
  color:   string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height:       '32px',
        padding:      '0 16px',
        borderRadius: '9999px',
        fontSize:     '12px',
        fontWeight:   active ? 600 : 400,
        border:       active ? 'none' : '1px solid #e5e5e5',
        background:   active ? color : hovered ? '#f9fafb' : '#fff',
        color:        active ? '#fff' : '#0a0a0a',
        boxShadow:    active ? '0 1px 3px rgba(0,0,0,.1)' : '0 1px 2px rgba(0,0,0,.05)',
        cursor:       'pointer',
        fontFamily:   'inherit',
        transition:   'all 0.15s ease',
        whiteSpace:   'nowrap',
      }}
    >
      {label}
    </button>
  )
}