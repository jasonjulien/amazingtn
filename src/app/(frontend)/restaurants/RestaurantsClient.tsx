'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import FeaturedBadge from '@/components/FeaturedBadge'
import FeaturedCardWrapper from '@/components/FeaturedCardWrapper'

// ─── Types ────────────────────────────────────────────────────────────────────

interface RestaurantItem {
  id:               string
  name:             string
  slug:             string
  city:             string
  region:           string
  cuisine:          string[]
  priceRange:       string
  shortDescription: string
  heroImage:        string
  featured:         boolean
  featuredTier:     string
}

interface SponsorInfo {
  tier:           string
  tagline?:       string
  featuredImage?: string
}

interface Props {
  restaurants: RestaurantItem[]
  sponsorMap:  Record<string, SponsorInfo>
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CUISINE_LABELS: Record<string, string> = {
  'american':           'American',
  'bbq':                'BBQ',
  'southern':           'Southern',
  'hot-chicken':        'Hot Chicken',
  'italian':            'Italian',
  'mexican':            'Mexican',
  'seafood':            'Seafood',
  'asian':              'Asian',
  'french':             'French',
  'mediterranean':      'Mediterranean',
  'steakhouse':         'Steakhouse',
  'breakfast-brunch':   'Breakfast & Brunch',
  'burgers-sandwiches': 'Burgers & Sandwiches',
  'pizza':              'Pizza',
  'vegetarian-vegan':   'Vegetarian / Vegan',
  'bar-gastropub':      'Bar & Gastropub',
  'other':              'Other',
}

const PRICE_OPTIONS = [
  { value: '$',    label: '$ · Budget'        },
  { value: '$$',   label: '$$ · Moderate'     },
  { value: '$$$',  label: '$$$ · Upscale'     },
  { value: '$$$$', label: '$$$$ · Fine Dining' },
]

const TIER_ORDER: Record<string, number> = {
  premier:  0,  // sponsor tier
  premium:  1,  // restaurant featuredTier
  featured: 2,  // both sponsor and restaurant featuredTier
  basic:    3,  // sponsor tier
  free:     99, // no boost
}

const regionConfig = {
  east:   { label: 'East Tennessee',   color: '#059669' },
  middle: { label: 'Middle Tennessee', color: '#d97706' },
  west:   { label: 'West Tennessee',   color: '#7c3aed' },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RestaurantsClient({ restaurants, sponsorMap }: Props) {
  const [search,           setSearch]           = useState('')
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedPrice,    setSelectedPrice]    = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [region,           setRegion]           = useState<'all' | 'east' | 'middle' | 'west'>('all')

  const toggleCuisine = useCallback((c: string) => {
    setSelectedCuisines(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    )
  }, [])

  const filtered = restaurants.filter(r => {
    if (search) {
      const q = search.toLowerCase()
      if (!r.name.toLowerCase().includes(q) && !r.city.toLowerCase().includes(q)) return false
    }
    if (region !== 'all' && r.region !== region) return false
    if (selectedCuisines.length && !selectedCuisines.some(c => r.cuisine.includes(c))) return false
    if (selectedPrice && r.priceRange !== selectedPrice) return false
    if (showFeaturedOnly && !sponsorMap[r.id] && !r.featured) return false
    return true
  })

  // Sort: paid sponsors first (by tier), then featured restaurants, then free
  const sorted = [...filtered].sort((a, b) => {
    const sponsorA = sponsorMap[a.id]
    const sponsorB = sponsorMap[b.id]

    const scoreA = sponsorA
      ? (TIER_ORDER[sponsorA.tier] ?? 3)
      : a.featured
        ? (TIER_ORDER[a.featuredTier] ?? 3)
        : 99

    const scoreB = sponsorB
      ? (TIER_ORDER[sponsorB.tier] ?? 3)
      : b.featured
        ? (TIER_ORDER[b.featuredTier] ?? 3)
        : 99

    return scoreA - scoreB
  })

  const hasActiveFilters = !!(search || selectedCuisines.length || selectedPrice || showFeaturedOnly || region !== 'all')

  const clearFilters = () => {
    setSearch('')
    setSelectedCuisines([])
    setSelectedPrice('')
    setShowFeaturedOnly(false)
    setRegion('all')
  }

  function getBadgeTier(r: RestaurantItem): 'basic' | 'featured' | 'premier' | null {
    const s = sponsorMap[r.id]
    if (s) return s.tier as 'basic' | 'featured' | 'premier'
    if (r.featured && r.featuredTier === 'premium') return 'featured'
    if (r.featured) return 'basic'
    return null
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9' }}>
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
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px' }}>
          <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>
            Where to Eat
          </p>
          <h1 style={{ fontSize: '46px', fontWeight: 400, color: '#fff', letterSpacing: '-0.5px', marginBottom: '12px' }}>
            Tennessee <strong>Restaurants</strong>
          </h1>
          <p style={{ fontSize: '16.7px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', lineHeight: 1.65, margin: '0 auto' }}>
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
          {(['all', 'east', 'middle', 'west'] as const).map(r => (
            <FilterPill
              key={r}
              label={r === 'all' ? 'All' : regionConfig[r].label}
              active={region === r}
              activeColor={r === 'all' ? '#0f172a' : regionConfig[r].color}
              onClick={() => setRegion(r)}
            />
          ))}

          <div style={{ width: '1px', height: '20px', background: '#e5e5e5', margin: '0 4px' }} />

          {/* Price filters */}
          <span style={{ fontSize: '12px', color: '#94a3b8', marginRight: '4px' }}>Price:</span>
          {PRICE_OPTIONS.map(p => (
            <FilterPill
              key={p.value}
              label={p.value}
              active={selectedPrice === p.value}
              onClick={() => setSelectedPrice(selectedPrice === p.value ? '' : p.value)}
            />
          ))}

          <div style={{ width: '1px', height: '20px', background: '#e5e5e5', margin: '0 4px' }} />

          {/* Featured filter */}
          <FilterPill
            label="★ Featured"
            active={showFeaturedOnly}
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            activeColor="#f59e0b"
          />

          <div style={{ width: '1px', height: '20px', background: '#e5e5e5', margin: '0 4px' }} />

          {/* Cuisine filters — dynamic from actual data */}
          <span style={{ fontSize: '12px', color: '#94a3b8', marginRight: '4px' }}>Cuisine:</span>
          {Array.from(new Set(restaurants.flatMap(r => r.cuisine))).sort().map(c => (
            <FilterPill
              key={c}
              label={CUISINE_LABELS[c] ?? c}
              active={selectedCuisines.includes(c)}
              onClick={() => toggleCuisine(c)}
            />
          ))}

          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#475569' }}>
            <strong style={{ color: '#0f172a' }}>{sorted.length}</strong> restaurants
          </span>

          {hasActiveFilters && (
            <button onClick={clearFilters} style={{
              fontSize: '12px', color: '#ef4444', background: 'none', border: 'none',
              cursor: 'pointer', padding: '0 8px', fontFamily: 'inherit',
            }}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── Card grid ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 48px 80px' }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#64748b' }}>
            <p style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>No restaurants found</p>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>Try adjusting your filters or search term</p>
            <button onClick={clearFilters} style={{
              height: '36px', padding: '0 20px', borderRadius: '9999px',
              background: '#f59e0b', color: '#fff', border: 'none',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {sorted.map(r => {
              const sponsor   = sponsorMap[r.id]
              const badgeTier = getBadgeTier(r)
              const imgUrl    = sponsor?.featuredImage || r.heroImage || ''

              return (
                <FeaturedCardWrapper key={r.id} tier={badgeTier ?? undefined}>
                  <div style={{
                    background: '#fff', borderRadius: '16px', overflow: 'hidden',
                    boxShadow: badgeTier && badgeTier !== 'basic'
                      ? '0 2px 8px rgba(245,158,11,.15)'
                      : '0 1px 2px rgba(0,0,0,.05)',
                    border: badgeTier && badgeTier !== 'basic' ? '1px solid #fde68a' : '1px solid transparent',
                    height: '100%',
                  }}>
                    {/* Image */}
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#1e293b' }}>
                      {imgUrl ? (
                        <img src={imgUrl} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🍽️</div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.4), rgba(15,23,42,0))' }} />

                      {/* Featured badge — upper left of image */}
                      {badgeTier && badgeTier !== 'basic' && (
                        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                          <FeaturedBadge tier={badgeTier} />
                        </div>
                      )}

                      {/* Price range — upper right of image */}
                      {r.priceRange && (
                        <span style={{
                          position: 'absolute', top: '12px', right: '12px',
                          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                          color: '#fff', fontSize: '12px', fontWeight: 700,
                          padding: '3px 8px', borderRadius: '6px',
                        }}>
                          {r.priceRange}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                        {r.city && (
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#d97706', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>
                            {r.city}
                          </span>
                        )}
                        {r.cuisine.slice(0, 2).map(c => (
                          <span key={c} style={{ fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                            {CUISINE_LABELS[c] ?? c}
                          </span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '4px', lineHeight: 1.3 }}>
                        {r.name}
                      </h3>
                      {sponsor?.tagline && (
                        <p style={{ fontSize: '13px', color: '#d97706', fontStyle: 'italic', marginBottom: '6px' }}>
                          {sponsor.tagline}
                        </p>
                      )}
                      {r.shortDescription && (
                        <p style={{
                          fontSize: '13px', color: '#475569', lineHeight: 1.55, marginBottom: '16px',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {r.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </FeaturedCardWrapper>
              )
            })}
          </div>
        )}

        {/* ── Advertise CTA ── */}
        <div style={{
          marginTop: '64px', borderRadius: '16px', padding: '40px 48px',
          background: '#0f172a', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
        }}>
          <div>
            <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '8px' }}>Own a Restaurant?</p>
            <h3 style={{ fontSize: '24px', fontWeight: 400, color: '#fff', marginBottom: '6px' }}>
              Get <strong>featured on AmazingTN</strong>
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Boost your listing to the top. Plans from $29/month.</p>
          </div>
          <Link href="/advertise" style={{
            display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 28px',
            borderRadius: '9999px', background: '#f59e0b', color: '#0f172a',
            fontWeight: 600, fontSize: '14px', textDecoration: 'none', flexShrink: 0,
            boxShadow: '0 1px 3px rgba(0,0,0,.2)',
          }}>
            See Advertising Options →
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Filter Pill ── */
function FilterPill({ label, active, onClick, activeColor = '#0f172a' }: {
  label: string; active: boolean; onClick: () => void; activeColor?: string
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
        background: active ? activeColor : hovered ? '#f9fafb' : '#fff',
        color: active ? '#fff' : '#0a0a0a',
        cursor: 'pointer', fontFamily: 'inherit',
        transition: 'all 0.15s ease', whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}