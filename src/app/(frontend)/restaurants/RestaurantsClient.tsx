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
  cuisine:          string[]   // e.g. ['hot-chicken', 'southern']
  priceRange:       string
  shortDescription: string
  heroImage:        string     // plain URL string
  featured:         boolean
  featuredTier:     string     // 'free' | 'featured' | 'premium'
}

interface SponsorInfo {
  tier:          string
  tagline?:      string
  featuredImage?: string
}

interface Props {
  restaurants: RestaurantItem[]
  sponsorMap:  Record<string, SponsorInfo>
}

// ─── Cuisine label map ────────────────────────────────────────────────────────

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

const CUISINE_OPTIONS = Object.keys(CUISINE_LABELS)

const PRICE_OPTIONS = [
  { value: '$',    label: '$ · Budget'       },
  { value: '$$',   label: '$$ · Moderate'    },
  { value: '$$$',  label: '$$$ · Upscale'    },
  { value: '$$$$', label: '$$$$ · Fine Dining'},
]

// Sort order: paid sponsor tiers first, then featured checkbox, then free
const TIER_ORDER: Record<string, number> = {
  premier:  0,
  featured: 1,
  basic:    2,
  premium:  3,  // featuredTier on the restaurant itself
  free:     4,
}

const C = {
  navy:    '#1a2e3b',
  navyDark:'#162433',
  teal:    '#4db896',
  amber:   '#f5a623',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RestaurantsClient({ restaurants, sponsorMap }: Props) {
  const [search,           setSearch]           = useState('')
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedPrice,    setSelectedPrice]    = useState('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const toggleCuisine = useCallback((c: string) => {
    setSelectedCuisines(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    )
  }, [])

  // ── Filter ────────────────────────────────────────────────────────────────

  const filtered = restaurants.filter(r => {
    if (search) {
      const q = search.toLowerCase()
      if (!r.name.toLowerCase().includes(q) && !r.city.toLowerCase().includes(q)) return false
    }
    if (selectedCuisines.length && !selectedCuisines.some(c => r.cuisine.includes(c))) return false
    if (selectedPrice && r.priceRange !== selectedPrice) return false
    if (showFeaturedOnly && !sponsorMap[r.id] && !r.featured) return false
    return true
  })

  // ── Sort: paid sponsors → featured checkbox → organic ────────────────────

  const sorted = [...filtered].sort((a, b) => {
    const sponsorA = sponsorMap[a.id]
    const sponsorB = sponsorMap[b.id]

    // Paid sponsor tier (from Sponsors collection)
    const oa = sponsorA ? (TIER_ORDER[sponsorA.tier] ?? 3) : 99
    const ob = sponsorB ? (TIER_ORDER[sponsorB.tier] ?? 3) : 99

    if (oa !== ob) return oa - ob

    // Fallback: featured checkbox + featuredTier on the restaurant
    const fa = a.featured ? (TIER_ORDER[a.featuredTier] ?? 3) : 99
    const fb = b.featured ? (TIER_ORDER[b.featuredTier] ?? 3) : 99
    return fa - fb
  })

  const featuredCount    = sorted.filter(r => sponsorMap[r.id] || r.featured).length
  const hasActiveFilters = search || selectedCuisines.length || selectedPrice || showFeaturedOnly

  const clearFilters = () => {
    setSearch('')
    setSelectedCuisines([])
    setSelectedPrice('')
    setShowFeaturedOnly(false)
  }

  // ── Badge helper ─────────────────────────────────────────────────────────

  function getBadgeTier(r: RestaurantItem): 'basic' | 'featured' | 'premier' | null {
    const s = sponsorMap[r.id]
    if (s) return s.tier as 'basic' | 'featured' | 'premier'
    if (r.featured && r.featuredTier === 'premium') return 'featured'
    if (r.featured) return 'basic'
    return null
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0.45), ${C.navy}ee), url('/images/restaurants-hero.jpg') center/cover no-repeat`,
        color: '#fff',
        paddingTop: 160,
        paddingBottom: 60,
        paddingLeft: 24,
        paddingRight: 24,
        textAlign: 'center',
      }}>
        <p style={{ color: C.teal, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontWeight: 600, marginBottom: 10 }}>
          Tennessee Dining
        </p>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 14 }}>
          Find the Best Restaurants in Tennessee
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 500, margin: '0 auto 28px' }}>
          From Nashville hot chicken to East Tennessee BBQ — discover where locals eat.
        </p>
        <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name or city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', paddingLeft: 40, paddingRight: 16,
              paddingTop: 12, paddingBottom: 12,
              borderRadius: 12, border: 'none', fontSize: 14, color: '#111827',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <div style={{ background: C.navyDark, color: '#fff' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', padding: '16px 24px',
          display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', textAlign: 'center',
        }}>
          {[
            { stat: restaurants.length,         label: 'Restaurants' },
            { stat: featuredCount,               label: 'Featured'    },
            { stat: `${CUISINE_OPTIONS.length}+`,label: 'Cuisines'    },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filters + grid ────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Sidebar — hidden on mobile via inline style + injected media query */}
        <style>{`@media(min-width:768px){.rest-sidebar{display:block!important}}`}</style>
        <aside className="rest-sidebar" style={{ width: 200, flexShrink: 0, display: 'none' }}>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Listing type</p>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
              <input type="checkbox" checked={showFeaturedOnly} onChange={e => setShowFeaturedOnly(e.target.checked)} />
              Featured only
            </label>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Price range</p>
            {PRICE_OPTIONS.map(p => (
              <label key={p.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#374151', marginBottom: 6 }}>
                <input type="radio" name="price" checked={selectedPrice === p.value} onChange={() => setSelectedPrice(selectedPrice === p.value ? '' : p.value)} />
                {p.label}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Cuisine</p>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {CUISINE_OPTIONS.map(c => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#374151', marginBottom: 6 }}>
                  <input type="checkbox" checked={selectedCuisines.includes(c)} onChange={() => toggleCuisine(c)} />
                  {CUISINE_LABELS[c]}
                </label>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button onClick={clearFilters} style={{ fontSize: 12, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
              Clear all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Mobile filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {PRICE_OPTIONS.map(p => (
              <button key={p.value} onClick={() => setSelectedPrice(selectedPrice === p.value ? '' : p.value)}
                style={{
                  fontSize: 12, padding: '4px 12px', borderRadius: 999,
                  border: '1px solid', cursor: 'pointer',
                  background:  selectedPrice === p.value ? C.teal : '#fff',
                  color:       selectedPrice === p.value ? '#fff' : '#6b7280',
                  borderColor: selectedPrice === p.value ? C.teal : '#e5e7eb',
                }}>
                {p.value}
              </button>
            ))}
            <button onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              style={{
                fontSize: 12, padding: '4px 12px', borderRadius: 999,
                border: '1px solid', cursor: 'pointer',
                background:  showFeaturedOnly ? '#2563eb' : '#fff',
                color:       showFeaturedOnly ? '#fff' : '#6b7280',
                borderColor: showFeaturedOnly ? '#2563eb' : '#e5e7eb',
              }}>
              ★ Featured
            </button>
          </div>

          {/* Count row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: '#6b7280' }}>
              {sorted.length} restaurant{sorted.length !== 1 ? 's' : ''}
              {hasActiveFilters && (
                <button onClick={clearFilters} style={{ marginLeft: 8, fontSize: 11, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                  clear
                </button>
              )}
            </p>
            {featuredCount > 0 && <p style={{ fontSize: 11, color: '#9ca3af' }}>★ Featured listings appear first</p>}
          </div>

          {/* Grid */}
          {sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🍴</div>
              <p style={{ color: '#374151', fontWeight: 500, marginBottom: 8 }}>No restaurants match your filters.</p>
              <button onClick={clearFilters} style={{ fontSize: 13, color: C.teal, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Clear filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {sorted.map(restaurant => {
                const sponsor   = sponsorMap[restaurant.id]
                const badgeTier = getBadgeTier(restaurant)
                // Prefer sponsor's featured image, then the restaurant's own heroImage URL
                const imgUrl    = sponsor?.featuredImage || restaurant.heroImage || ''

                return (
                  <FeaturedCardWrapper key={restaurant.id} tier={badgeTier ?? undefined}>
                    <Link href={`/restaurants/${restaurant.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                      <div style={{
                        background: '#fff', borderRadius: 14, overflow: 'hidden',
                        border: '1px solid #f1f0ec', height: '100%',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      }}>
                        {/* Image */}
                        <div style={{ position: 'relative', height: 168, background: '#f3f4f6', overflow: 'hidden' }}>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={restaurant.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#d1d5db' }}>
                              🍽️
                            </div>
                          )}
                          {restaurant.priceRange && (
                            <span style={{
                              position: 'absolute', top: 8, right: 8,
                              background: 'rgba(0,0,0,0.55)', color: '#fff',
                              fontSize: 11, padding: '2px 8px', borderRadius: 999,
                            }}>
                              {restaurant.priceRange}
                            </span>
                          )}
                        </div>

                        {/* Body */}
                        <div style={{ padding: 16 }}>
                          {badgeTier && (
                            <div style={{ marginBottom: 8 }}>
                              <FeaturedBadge tier={badgeTier} />
                            </div>
                          )}
                          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 2, lineHeight: 1.3 }}>
                            {restaurant.name}
                          </h2>
                          {sponsor?.tagline && (
                            <p style={{ fontSize: 12, color: '#d97706', fontStyle: 'italic', marginBottom: 4 }}>
                              {sponsor.tagline}
                            </p>
                          )}
                          {restaurant.city && (
                            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
                              📍 {restaurant.city}
                            </p>
                          )}
                          {/* Cuisine tags — translate slugs to readable labels */}
                          {restaurant.cuisine.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                              {restaurant.cuisine.slice(0, 3).map(c => (
                                <span key={c} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#f3f4f6', color: '#6b7280' }}>
                                  {CUISINE_LABELS[c] ?? c}
                                </span>
                              ))}
                            </div>
                          )}
                          {restaurant.shortDescription && (
                            <p style={{
                              fontSize: 12, color: '#9ca3af', marginTop: 8,
                              display: '-webkit-box', WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical', overflow: 'hidden',
                            }}>
                              {restaurant.shortDescription}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </FeaturedCardWrapper>
                )
              })}
            </div>
          )}

          {/* Advertise CTA */}
          <div style={{
            marginTop: 48, borderRadius: 16, padding: '32px',
            background: C.navy, color: '#fff',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}>
            <div>
              <p style={{ color: C.teal, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Own a restaurant?</p>
              <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Get featured on AmazingTN</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>Boost your listing to the top. Plans from $29/month.</p>
            </div>
            <Link href="/advertise" style={{
              background: C.amber, color: '#fff', fontWeight: 600,
              padding: '12px 24px', borderRadius: 12, textDecoration: 'none', fontSize: 14, flexShrink: 0,
            }}>
              See advertising options
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}