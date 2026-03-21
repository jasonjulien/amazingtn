'use client'

import { useState } from 'react'
import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'

export type RestaurantData = {
  slug:             string
  name:             string
  city:             string
  region:           string
  cuisine:          string[]
  priceRange:       string
  shortDescription: string
  heroImage:        string
  address:          string
  featured:         boolean
  featuredTier:     string
  website:          string
  phone:            string
}

type RegionFilter = 'all' | 'east' | 'middle' | 'west'
type CuisineFilter = 'all' | 'american' | 'bbq' | 'southern' | 'hot-chicken' | 'italian' | 'mexican' | 'seafood' | 'asian' | 'french' | 'mediterranean' | 'steakhouse' | 'breakfast-brunch' | 'burgers-sandwiches' | 'pizza' | 'vegetarian-vegan' | 'bar-gastropub' | 'other'

const regionConfig = {
  east:   { label: 'East Tennessee',   color: '#059669' },
  middle: { label: 'Middle Tennessee', color: '#d97706' },
  west:   { label: 'West Tennessee',   color: '#7c3aed' },
}

const cuisineLabels: Record<string, string> = {
  american:            'American',
  bbq:                 'BBQ',
  southern:            'Southern',
  'hot-chicken':       'Hot Chicken',
  italian:             'Italian',
  mexican:             'Mexican',
  seafood:             'Seafood',
  asian:               'Asian',
  french:              'French',
  mediterranean:       'Mediterranean',
  steakhouse:          'Steakhouse',
  'breakfast-brunch':  'Breakfast & Brunch',
  'burgers-sandwiches':'Burgers & Sandwiches',
  pizza:               'Pizza',
  'vegetarian-vegan':  'Vegetarian/Vegan',
  'bar-gastropub':     'Bar & Gastropub',
  other:               'Other',
}

const priceColors: Record<string, string> = {
  '$':    '#059669',
  '$$':   '#d97706',
  '$$$':  '#dc2626',
  '$$$$': '#7c3aed',
}

export default function RestaurantsClient({ restaurants }: { restaurants: RestaurantData[] }) {
  const [region,  setRegion]  = useState<RegionFilter>('all')
  const [cuisine, setCuisine] = useState<CuisineFilter>('all')
  const [search,  setSearch]  = useState('')

  const filtered = restaurants.filter(r => {
    const matchRegion  = region  === 'all' || r.region  === region
    const matchCuisine = cuisine === 'all' || r.cuisine.includes(cuisine)
    const matchSearch  = search === '' ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase())
    return matchRegion && matchCuisine && matchSearch
  })

  const featured = filtered.filter(r => r.featuredTier !== 'free')

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero ── */}
      <div style={{
        position: 'relative', height: '320px', overflow: 'hidden',
        background: '#0f172a', display: 'flex', alignItems: 'center',
        justifyContent: 'center', paddingTop: '100px',
      }}>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          alt="Tennessee dining"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>
            Where to Eat
          </p>
          <h1 style={{ fontSize: '46px', fontWeight: 400, color: '#fff', letterSpacing: '-0.5px', marginBottom: '12px' }}>
            Tennessee <strong>Restaurants</strong>
          </h1>
          <p style={{ fontSize: '16.7px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', lineHeight: 1.65 }}>
            From legendary BBQ pits to Michelin-starred dining — discover the best places to eat across the Volunteer State
          </p>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e5e5e5',
        boxShadow: '0 1px 2px rgba(0,0,0,.05)', position: 'sticky', top: '100px', zIndex: 90,
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 48px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>

          {/* Search */}
          <div style={{ position: 'relative', marginRight: '8px' }}>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                height: '36px', padding: '0 16px 0 36px', borderRadius: '9999px',
                border: '1px solid #e5e5e5', fontSize: '13px', outline: 'none',
                background: '#f9fafb', width: '200px', fontFamily: 'inherit',
              }}
            />
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          {/* Region filters */}
          <span style={{ fontSize: '12px', color: '#94a3b8', marginRight: '4px' }}>Region:</span>
          {(['all', 'east', 'middle', 'west'] as RegionFilter[]).map(r => (
            <FilterPill
              key={r}
              label={r === 'all' ? 'All' : regionConfig[r].label}
              active={region === r}
              color={r === 'all' ? '#0f172a' : regionConfig[r].color}
              onClick={() => setRegion(r)}
            />
          ))}

          <div style={{ width: '1px', height: '20px', background: '#e5e5e5', margin: '0 4px' }} />

          {/* Cuisine filters */}
        <span style={{ fontSize: '12px', color: '#94a3b8', marginRight: '4px' }}>Cuisine:</span>
        {(['all', ...Array.from(new Set(restaurants.flatMap(r => r.cuisine))).sort()] as CuisineFilter[]).map(c => (
        <FilterPill
            key={c}
            label={c === 'all' ? 'All' : cuisineLabels[c] ?? c}
            active={cuisine === c}
            color='#0f172a'
            onClick={() => setCuisine(c)}
        />
        ))}

          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#475569' }}>
            <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> restaurants
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 48px 80px' }}>

        {/* ── Featured section ── */}
        {featured.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '4px', height: '24px', borderRadius: '2px', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }} />
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Featured Restaurants</h2>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', background: '#fffbeb', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '9999px' }}>
                SPONSORED
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {featured.map(r => <RestaurantCard key={r.slug} restaurant={r} highlight />)}
            </div>
          </div>
        )}

        {/* ── All results ── */}
        {filtered.length > 0 ? (
          <div>
            {featured.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '4px', height: '24px', borderRadius: '2px', background: '#e5e5e5' }} />
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>All Restaurants</h2>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {filtered.map(r => <RestaurantCard key={r.slug} restaurant={r} />)}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b' }}>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No restaurants found</p>
            <p style={{ fontSize: '14px' }}>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Restaurant Card ─────────────────────────── */
function RestaurantCard({ restaurant: r, highlight }: { restaurant: RestaurantData; highlight?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const regionCfg = regionConfig[r.region as keyof typeof regionConfig]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   '#fff',
        borderRadius: '16px',
        overflow:     'hidden',
        boxShadow:    hovered ? '0 8px 24px rgba(0,0,0,.10)' : highlight ? '0 2px 8px rgba(245,158,11,.15)' : '0 1px 2px rgba(0,0,0,.05)',
        border:       highlight ? '1px solid #fde68a' : '1px solid transparent',
        transform:    hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:   'all 0.2s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#1e293b' }}>
        {r.heroImage ? (
          <img src={r.heroImage} alt={r.name} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.4s ease',
          }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e293b, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
            🍽️
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.5), rgba(15,23,42,0))' }} />

        {/* Featured badge */}
        {highlight && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#f59e0b', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
            FEATURED
          </div>
        )}

        {/* Price range */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          color: priceColors[r.priceRange] ?? '#fff',
          fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px',
        }}>
          {r.priceRange}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {regionCfg && (
            <span style={{ fontSize: '11px', fontWeight: 700, color: regionCfg.color, background: `${regionCfg.color}18`, padding: '2px 8px', borderRadius: '4px' }}>
              {r.city}
            </span>
          )}
          <span style={{ fontSize: '11px', color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
            {r.cuisine.map(c => cuisineLabels[c] ?? c).join(', ')}
          </span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '6px', lineHeight: 1.3 }}>{r.name}</h3>
        <p style={{
          fontSize: '13px', color: '#475569', lineHeight: 1.55, marginBottom: '16px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {r.shortDescription}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {r.address && (
            <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {r.city}
            </span>
          )}
          {r.website && (
            <a
              href={r.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: '12px', color: '#d97706', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Visit Site →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Filter Pill ─────────────────────────────── */
function FilterPill({ label, active, color, onClick }: {
  label: string; active: boolean; color: string; onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '30px', padding: '0 14px', borderRadius: '9999px',
        fontSize: '12px', fontWeight: active ? 600 : 400,
        border: active ? 'none' : '1px solid #e5e5e5',
        background: active ? color : hovered ? '#f9fafb' : '#fff',
        color: active ? '#fff' : '#0a0a0a',
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.15s ease', whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}