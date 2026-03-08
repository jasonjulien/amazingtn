'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = [
  {
    value:    'music',
    label:    'Music & Entertainment',
    sub:      'Birthplace of blues, country, and rock n roll',
    href:     '/explore?category=music',
    gradient: 'linear-gradient(to top, #7c3aed, #7e22ce)',
    icon:     '🎵',
  },
  {
    value:    'nature',
    label:    'Nature & Outdoors',
    sub:      'Mountains, waterfalls, and scenic trails',
    href:     '/explore?category=nature',
    gradient: 'linear-gradient(to top, #059669, #15803d)',
    icon:     '🌲',
  },
  {
    value:    'history',
    label:    'History & Culture',
    sub:      'Civil War sites and living heritage',
    href:     '/explore?category=history',
    gradient: 'linear-gradient(to top, #d97706, #c2410c)',
    icon:     '🏛',
  },
  {
    value:    'food',
    label:    'Food & Drink',
    sub:      'BBQ, bourbon, and southern comfort',
    href:     '/explore?category=food',
    gradient: 'linear-gradient(to top, #dc2626, #be123c)',
    icon:     '🍖',
  },
  {
    value:    'adventure',
    label:    'Adventure',
    sub:      'Rafting, hiking, and thrilling experiences',
    href:     '/explore?category=adventure',
    gradient: 'linear-gradient(to top, #0891b2, #1d4ed8)',
    icon:     '⚡',
  },
  {
    value:    'family',
    label:    'Family Fun',
    sub:      'Theme parks and kid-friendly attractions',
    href:     '/explore?category=family',
    gradient: 'linear-gradient(to top, #ec4899, #e11d48)',
    icon:     '🎡',
  },
]

export default function CategorySection() {
  return (
    <section style={{
      background: '#fafaf9',
      padding:    '96px 0',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin:   '0 auto',
        padding:  '0 48px',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            fontSize:      '14px',
            color:         '#d97706',
            textTransform: 'uppercase',
            letterSpacing: '4.2px',
            marginBottom:  '16px',
          }}>
            Find Your Adventure
          </p>
          <h2 style={{
            fontSize:     'clamp(32px, 4vw, 45px)',
            fontWeight:   400,
            color:        '#1e293b',
            letterSpacing:'-0.5px',
            marginBottom: '16px',
          }}>
            Explore by <strong>Interest</strong>
          </h2>
          <p style={{
            fontSize:   '16.7px',
            color:      '#475569',
            maxWidth:   '650px',
            margin:     '0 auto',
            lineHeight: 1.65,
          }}>
            Whether you&apos;re seeking the perfect melody, a mountain summit, or
            mouthwatering BBQ, Tennessee has something extraordinary waiting for you.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '24px',
        }}>
          {categories.map(cat => (
            <CategoryCard key={cat.value} {...cat} />
          ))}
        </div>

      </div>
    </section>
  )
}

function CategoryCard({ label, sub, href, gradient, icon }: typeof categories[0]) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:       'block',
        position:      'relative',
        height:        '320px',
        borderRadius:  '16px',
        overflow:      'hidden',
        background:    '#1e293b',
        cursor:        'pointer',
        transform:     hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:     hovered
          ? '0 20px 40px rgba(0,0,0,.2)'
          : '0 4px 12px rgba(0,0,0,.1)',
        transition:    'transform 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Color gradient overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: gradient,
        opacity:    0.85,
        mixBlendMode: 'multiply' as const,
      }} />

      {/* Dark bottom gradient */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom:   0,
        left:     0,
        right:    0,
        padding:  '32px',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>{icon}</div>
        <h3 style={{
          fontSize:     '23px',
          fontWeight:   700,
          color:        '#fff',
          marginBottom: '6px',
          lineHeight:   1.2,
        }}>
          {label}
        </h3>
        <p style={{
          fontSize:  '13px',
          color:     'rgba(255,255,255,0.8)',
          lineHeight: 1.5,
        }}>
          {sub}
        </p>

        {/* Explore arrow — appears on hover */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '6px',
          marginTop:  '12px',
          opacity:    hovered ? 1 : 0,
          transform:  hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          fontSize:   '14px',
          color:      '#fff',
          fontWeight: 500,
        }}>
          Explore →
        </div>
      </div>
    </Link>
  )
}