'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MusicIcon, NatureIcon, HistoryIcon, FoodIcon, AdventureIcon, FamilyIcon } from '@/components/Icons'

const categories = [
 { value: 'music',     label: 'Music & Entertainment', sub: 'Birthplace of blues, country, and rock n roll',  href: '/explore?category=music',     gradient: 'linear-gradient(to top, #7c3aed, #7e22ce)', icon: <MusicIcon size={36} strokeWidth={1.5} />,     image: 'https://images.unsplash.com/photo-1559694097-9481924b2905?w=800&q=85' },
  { value: 'nature',    label: 'Nature & Outdoors',      sub: 'Mountains, waterfalls, and scenic trails',       href: '/explore?category=nature',    gradient: 'linear-gradient(to top, #059669, #15803d)', icon: <NatureIcon size={36} strokeWidth={1.5} />,    image: 'https://images.unsplash.com/photo-1490604001847-b712b0c2f967?w=800&q=85' },
  { value: 'history',   label: 'History & Culture',      sub: 'Civil War sites and living heritage',            href: '/explore?category=history',   gradient: 'linear-gradient(to top, #d97706, #c2410c)', icon: <HistoryIcon size={36} strokeWidth={1.5} />,   image: 'https://images.unsplash.com/photo-1532623248509-573d918ed7fd?w=800&q=85' },
  { value: 'food',      label: 'Food & Drink',            sub: 'BBQ, bourbon, and southern comfort',            href: '/explore?category=food',      gradient: 'linear-gradient(to top, #dc2626, #be123c)', icon: <FoodIcon size={36} strokeWidth={1.5} />,      image: 'https://images.unsplash.com/photo-1703219342329-fce8488cf443?w=800&q=85' },
  { value: 'adventure', label: 'Adventure',               sub: 'Rafting, hiking, and thrilling experiences',    href: '/explore?category=adventure', gradient: 'linear-gradient(to top, #0891b2, #1d4ed8)', icon: <AdventureIcon size={36} strokeWidth={1.5} />, image: 'https://images.unsplash.com/photo-1616119995464-231c404ea6c0?w=800&q=85' },
  { value: 'family',    label: 'Family Fun',              sub: 'Theme parks and kid-friendly attractions',      href: '/explore?category=family',    gradient: 'linear-gradient(to top, #ec4899, #e11d48)', icon: <FamilyIcon size={36} strokeWidth={1.5} />,    image: 'https://images.unsplash.com/photo-1548438444-275b68ae5120?w=800&q=85' },
]

export default function CategorySection() {
  return (
    <section style={{ background: '#fafaf9', padding: '96px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '16px' }}>
            Find Your Adventure
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 45px)', fontWeight: 400, color: '#1e293b', letterSpacing: '-0.5px', marginBottom: '16px' }}>
            Explore by <strong>Interest</strong>
          </h2>
          <p style={{ fontSize: '16.7px', color: '#475569', maxWidth: '650px', margin: '0 auto', lineHeight: 1.65 }}>
            Whether you&apos;re seeking the perfect melody, a mountain summit, or
            mouthwatering BBQ, Tennessee has something extraordinary waiting for you.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {categories.map(cat => (
            <CategoryCard key={cat.value} {...cat} />
          ))}
        </div>

      </div>
    </section>
  )
}

function CategoryCard({ label, sub, href, gradient, icon, image }: typeof categories[0]) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:      'block',
        position:     'relative',
        height:       '320px',
        borderRadius: '16px',
        overflow:     'hidden',
        background:   '#1e293b',
        cursor:       'pointer',
        transform:    hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow:    hovered ? '0 20px 40px rgba(0,0,0,.2)' : '0 4px 12px rgba(0,0,0,.1)',
        transition:   'transform 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      {/* Background photo */}
      {image && (
        <img
          src={image}
          alt={label}
          style={{
            position:   'absolute',
            inset:      0,
            width:      '100%',
            height:     '100%',
            objectFit:  'cover',
            transform:  hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
      )}

      {/* Color gradient overlay — only for cards without a photo */}
      {!image && (
        <div style={{
          position:     'absolute',
          inset:        0,
          background:   gradient,
          opacity:      0.85,
          mixBlendMode: 'multiply' as const,
        }} />
      )}

      {/* Dark gradient for text legibility */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: image
          ? 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)',
      }} />

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', color: '#fff' }}>
        <div style={{ marginBottom: '12px' }}>{icon}</div>
        <h3 style={{ fontSize: '23px', fontWeight: 700, color: '#fff', marginBottom: '6px', lineHeight: 1.2 }}>
          {label}
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
          {sub}
        </p>
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