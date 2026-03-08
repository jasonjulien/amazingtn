'use client'

import Link from 'next/link'
import { useState } from 'react'

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
  heroImage?:       string
  onAdd?:           (slug: string) => void
}

/* ─── Category config ────────────────────────── */
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

export default function DestinationCard({
  slug,
  name,
  shortDescription,
  city,
  region,
  category,
  featured = false,
  heroImage,
  onAdd,
}: DestinationCardProps) {
  const [hovered, setHovered]   = useState(false)
  const [addHovered, setAddHovered] = useState(false)
  const cat = categoryConfig[category]

  return (
    <Link
      href={`/destinations/${slug}`}
      style={{
        display:       'block',
        background:    '#fff',
        borderRadius:  '16px',
        overflow:      'hidden',
        boxShadow:     hovered
          ? '0 8px 24px rgba(0,0,0,.10), 0 2px 6px rgba(0,0,0,.06)'
          : '0 1px 2px rgba(0,0,0,.05)',
        transform:     hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition:    'box-shadow 0.2s ease, transform 0.2s ease',
        cursor:        'pointer',
        textDecoration:'none',
        color:         'inherit',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── Hero image ── */}
      <div style={{
        position:   'relative',
        height:     '224px',
        overflow:   'hidden',
        background: '#1e293b',
      }}>
        {heroImage && (
          <img
            src={heroImage}
            alt={name}
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
        )}

        {/* Gradient overlay on hover */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))',
          opacity:    hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }} />

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top:      '18px',
          left:     '16px',
          display:  'flex',
          gap:      '6px',
          flexWrap: 'wrap',
        }}>
          {featured && (
            <span style={badgeStyle('#f59e0b', '#fff')}>Featured</span>
          )}
          <span style={badgeStyle(cat.bg, cat.color)}>{cat.label}</span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '24px' }}>
        <h3 style={{
          fontSize:     '19.5px',
          fontWeight:   700,
          color:        '#1e293b',
          marginBottom: '8px',
          lineHeight:   '1.3',
        }}>
          {name}
        </h3>

        <p style={{
          fontSize:     '13px',
          color:        '#475569',
          lineHeight:   '1.55',
          marginBottom: '16px',
          display:      '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow:     'hidden',
        }}>
          {shortDescription}
        </p>

        {/* Footer row */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}>
          {/* Location */}
          <div style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '5px',
          }}>
            <LocationIcon />
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              {city}, {regionLabel[region]}
            </span>
          </div>

          {/* Add button */}
          <button
            onClick={e => {
              e.preventDefault()
              onAdd?.(slug)
            }}
            onMouseEnter={() => setAddHovered(true)}
            onMouseLeave={() => setAddHovered(false)}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '4px',
              height:       '32px',
              padding:      '0 14px',
              borderRadius: '9999px',
              fontSize:     '11px',
              fontWeight:   500,
              color:        addHovered ? '#fff' : '#0a0a0a',
              background:   addHovered ? '#f59e0b' : '#fff',
              border:       '1px solid #e5e5e5',
              boxShadow:    '0 1px 2px rgba(0,0,0,.05)',
              cursor:       'pointer',
              transition:   'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
              borderColor:  addHovered ? '#f59e0b' : '#e5e5e5',
              flexShrink:   0,
            }}
          >
            <PlusIcon color={addHovered ? '#fff' : '#0a0a0a'} />
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}

/* ─── Icons ──────────────────────────────────── */
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function PlusIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}

/* ─── Badge helper ───────────────────────────── */
function badgeStyle(bg: string, color: string): React.CSSProperties {
  return {
    display:      'inline-flex',
    alignItems:   'center',
    padding:      '4px 10px',
    borderRadius: '6px',
    fontSize:     '11px',
    fontWeight:   700,
    background:   bg,
    color:        color,
    boxShadow:    '0 1px 3px rgba(0,0,0,.1)',
    whiteSpace:   'nowrap',
  }
}