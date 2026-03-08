'use client'

import Link from 'next/link'
import { useState } from 'react'

const featuredCity = {
  name:       'Nashville',
  tagline:    'Music City',
  region:     'Middle Tennessee',
  regionLabel:'Middle Tennessee',
  desc:       'The country music capital with legendary honky-tonks, award-winning restaurants, and vibrant nightlife.',
  href:       '/cities/nashville',
  color:      '#1a3a5c',
}

const smallCities = [
  { name: 'Memphis',     tagline: 'Home of the Blues',       region: 'West Tennessee',   href: '/cities/memphis',     color: '#2d1b4e' },
  { name: 'Gatlinburg',  tagline: 'Gateway to the Smokies',  region: 'East Tennessee',   href: '/cities/gatlinburg',  color: '#1a3a2e' },
  { name: 'Chattanooga', tagline: 'Scenic City',             region: 'East Tennessee',   href: '/cities/chattanooga', color: '#1a2a3a' },
  { name: 'Knoxville',   tagline: 'Marble City',             region: 'East Tennessee',   href: '/cities/knoxville',   color: '#3a1a1a' },
]

export default function CitiesSection() {
  return (
    <section style={{
      background: '#fff',
      padding:    '96px 0',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin:   '0 auto',
        padding:  '0 48px',
      }}>

        {/* Header */}
        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-end',
          marginBottom:   '40px',
        }}>
          <div>
            <p style={{
              fontSize:      '14px',
              color:         '#d97706',
              textTransform: 'uppercase',
              letterSpacing: '4.2px',
              marginBottom:  '12px',
            }}>
              Urban Adventures
            </p>
            <h2 style={{
              fontSize:      'clamp(32px, 4vw, 45px)',
              fontWeight:    400,
              color:         '#1e293b',
              letterSpacing: '-0.5px',
            }}>
              Featured <strong>Cities</strong>
            </h2>
          </div>
          <Link href="/cities" style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '6px',
            fontSize:   '14.9px',
            color:      '#475569',
          }}>
            View all cities →
          </Link>
        </div>

        {/* Nashville hero card */}
        <CityCardLarge city={featuredCity} />

        {/* Small city grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap:                 '16px',
          marginTop:           '16px',
        }}>
          {smallCities.map(city => (
            <CityCardSmall key={city.name} city={city} />
          ))}
        </div>

      </div>
    </section>
  )
}

function CityCardLarge({ city }: { city: typeof featuredCity }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={city.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:      'block',
        position:     'relative',
        height:       '500px',
        borderRadius: '24px',
        overflow:     'hidden',
        background:   city.color,
        cursor:       'pointer',
        transform:    hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow:    hovered ? '0 16px 40px rgba(0,0,0,.15)' : 'none',
        transition:   'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Gradient overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.3) 50%, rgba(15,23,42,0) 100%)',
      }} />

      {/* Image zoom on hover */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: `linear-gradient(135deg, ${city.color} 0%, #0f172a 100%)`,
        transform:  hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.4s ease',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom:   0,
        left:     0,
        right:    0,
        padding:  '40px',
      }}>
        <div style={{
          fontSize:      '13.2px',
          color:         '#fbbf24',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom:  '8px',
        }}>
          {city.regionLabel}
        </div>
        <h3 style={{
          fontSize:     '46px',
          fontWeight:   700,
          color:        '#fff',
          lineHeight:   1,
          marginBottom: '8px',
        }}>
          {city.name}
        </h3>
        <div style={{
          fontSize:     '16.7px',
          color:        'rgba(255,255,255,0.6)',
          marginBottom: '16px',
        }}>
          {city.tagline}
        </div>
        <p style={{
          fontSize:   '14.6px',
          color:      'rgba(255,255,255,0.8)',
          maxWidth:   '500px',
          lineHeight: 1.6,
        }}>
          {city.desc}
        </p>
      </div>
    </Link>
  )
}

function CityCardSmall({ city }: { city: typeof smallCities[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={city.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:      'block',
        position:     'relative',
        height:       '288px',
        borderRadius: '16px',
        overflow:     'hidden',
        background:   city.color,
        cursor:       'pointer',
        transform:    hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow:    hovered ? '0 12px 28px rgba(0,0,0,.15)' : 'none',
        transition:   'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Gradient overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.2) 50%, rgba(15,23,42,0) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom:   0,
        left:     0,
        right:    0,
        padding:  '24px',
      }}>
        <div style={{
          fontSize:      '11px',
          color:         '#fbbf24',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom:  '4px',
        }}>
          {city.tagline}
        </div>
        <h3 style={{
          fontSize:     '22px',
          fontWeight:   700,
          color:        '#fff',
          marginBottom: '4px',
        }}>
          {city.name}
        </h3>
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '4px',
          fontSize:   '13.3px',
          color:      'rgba(255,255,255,0.6)',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {city.region}
        </div>
      </div>
    </Link>
  )
}