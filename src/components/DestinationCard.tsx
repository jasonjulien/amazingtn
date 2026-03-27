'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LocationIcon, PlusIcon } from './Icons'
import { useItinerary } from '@/context/ItineraryContext'
import FeaturedBadge from './FeaturedBadge'

export type Category =
  | 'music'
  | 'nature'
  | 'history'
  | 'food'
  | 'adventure'
  | 'family'

export interface DestinationCardProps {
  slug:             string
  name:             string
  shortDescription: string
  city:             string
  region:           'east' | 'middle' | 'west'
  category:         Category
  featured?:        boolean
  featuredTier?:    string
  heroImage?:       string
}

const categoryConfig: Record<Category, { label: string; bg: string; color: string }> = {
  music:     { label: 'Music & Entertainment', bg: '#ede9fe', color: '#6d28d9' },
  nature:    { label: 'Nature & Outdoors',      bg: '#d1fae5', color: '#047857' },
  history:   { label: 'History & Culture',      bg: '#fef3c7', color: '#b45309' },
  food:      { label: 'Food & Drink',            bg: '#fee2e2', color: '#b91c1c' },
  adventure: { label: 'Adventure',               bg: '#cffafe', color: '#0e7490' },
  family:    { label: 'Family Fun',              bg: '#fce7f3', color: '#be185d' },
}

const regionLabel: Record<string, string> = {
  east:   'East Tennessee',
  middle: 'Middle Tennessee',
  west:   'West Tennessee',
}

function getBadgeTier(featured: boolean, featuredTier?: string): 'basic' | 'featured' | 'premier' | null {
  if (!featured) return null
  if (featuredTier === 'premier' || featuredTier === 'premium') return 'premier'
  if (featuredTier === 'featured') return 'featured'
  return 'basic'
}

export default function DestinationCard({
  slug, name, shortDescription, city, region, category,
  featured = false, featuredTier, heroImage,
}: DestinationCardProps) {
  const [hovered, setHovered]       = useState(false)
  const [addHovered, setAddHovered] = useState(false)
  const { addStop, removeStop, isAdded, days } = useItinerary()
  const added    = isAdded(slug)
  const cat      = categoryConfig[category]
  const badgeTier = getBadgeTier(featured, featuredTier)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (added) {
      const day = days.find(d => d.stops.some(s => s.slug === slug))
      if (day) removeStop(slug, day.id)
    } else {
      addStop({ slug, name, city, region, category, heroImage })
    }
  }

  return (
    <Link
      href={`/destinations/${slug}`}
      style={{
        display:        'block',
        background:     '#fff',
        borderRadius:   '16px',
        overflow:       'hidden',
        boxShadow:      hovered
          ? '0 8px 24px rgba(0,0,0,.10), 0 2px 6px rgba(0,0,0,.06)'
          : badgeTier === 'premier'
            ? '0 0 0 2px #f59e0b, 0 8px 24px rgba(245,158,11,0.2)'
            : badgeTier === 'featured'
              ? '0 0 0 1px #fde68a, 0 4px 16px rgba(245,158,11,0.12)'
              : '0 1px 2px rgba(0,0,0,.05)',
        outline: badgeTier === 'premier'
          ? '2px solid #f59e0b'
          : badgeTier === 'featured'
            ? '1px solid #fde68a'
            : 'none',
        transform:      hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:     'box-shadow 0.2s ease, transform 0.2s ease',
        cursor:         'pointer',
        textDecoration: 'none',
        color:          'inherit',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Hero image ── */}
      <div style={{ position: 'relative', height: '224px', overflow: 'hidden', background: '#1e293b' }}>
        {heroImage && (
          <img src={heroImage} alt={name} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.4s ease',
          }} />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.2s ease',
        }} />

        {/* Featured/Premier badge — upper left */}
        {badgeTier && badgeTier !== 'basic' && (
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <FeaturedBadge tier={badgeTier} />
          </div>
        )}

        {/* Category badge — upper right (or left if no featured badge) */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '4px 10px', borderRadius: '6px',
            fontSize: '11px', fontWeight: 700,
            background: cat.bg, color: cat.color,
            boxShadow: '0 1px 3px rgba(0,0,0,.1)', whiteSpace: 'nowrap',
          }}>
            {cat.label}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '24px' }}>
        {/* Basic sponsored badge in body */}
        {badgeTier === 'basic' && (
          <div style={{ marginBottom: '8px' }}>
            <FeaturedBadge tier="basic" />
          </div>
        )}
        <h3 style={{ fontSize: '19.5px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: '1.3' }}>
          {name}
        </h3>
        <p style={{
          fontSize: '13px', color: '#475569', lineHeight: '1.55', marginBottom: '16px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {shortDescription}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
            <LocationIcon size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '13px' }}>{city}, {regionLabel[region]}</span>
          </div>

          <button
            onClick={handleAdd}
            onMouseEnter={() => setAddHovered(true)}
            onMouseLeave={() => setAddHovered(false)}
            style={{
              display:     'inline-flex',
              alignItems:  'center',
              gap:         '4px',
              height:      '32px',
              padding:     '0 14px',
              borderRadius:'9999px',
              fontSize:    '11px',
              fontWeight:  500,
              color:       added ? '#fff' : addHovered ? '#fff' : '#0a0a0a',
              background:  added ? '#f59e0b' : addHovered ? '#f59e0b' : '#fff',
              border:      '1px solid',
              borderColor: added || addHovered ? '#f59e0b' : '#e5e5e5',
              boxShadow:   '0 1px 2px rgba(0,0,0,.05)',
              cursor:      'pointer',
              transition:  'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
              flexShrink:  0,
            }}
          >
            {added ? '✓ Added' : <><PlusIcon size={12} strokeWidth={2.5} />Add</>}
          </button>
        </div>
      </div>
    </Link>
  )
}