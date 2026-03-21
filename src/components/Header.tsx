'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type HeaderVariant = 'white' | 'transparent'

interface HeaderProps {
  variant?: HeaderVariant
}

const navLinks = [
  { label: 'Home',        href: '/' },
  { label: 'Explore',     href: '/explore' },
  { label: 'Regions',     href: '/regions' },
  { label: 'Cities',      href: '/cities' },
  { label: 'Restaurants', href: '/restaurants' },
  { label: 'Plan Trip',   href: '/itinerary' },
]

export default function Header({ variant = 'white' }: HeaderProps) {
  const pathname      = usePathname()
  const isTransparent = variant === 'transparent'
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [ctaHovered,  setCtaHovered]  = useState(false)

  return (
    <header style={{
      position:             'fixed',
      top:                  0, left: 0, right: 0,
      height:               '100px',
      zIndex:               100,
      background:           isTransparent ? 'transparent' : 'rgba(255,255,255,0.82)',
      backdropFilter:       isTransparent ? 'none' : 'blur(12px)',
      WebkitBackdropFilter: isTransparent ? 'none' : 'blur(12px)',
      boxShadow:            isTransparent ? 'none' : '0 1px 2px rgba(0,0,0,.05)',
      transition:           'background 0.3s ease, box-shadow 0.3s ease',
    }}>
      <div style={{
        maxWidth:       '1440px',
        margin:         '0 auto',
        height:         '100%',
        padding:        '0 48px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            '32px',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src={isTransparent ? '/logo-light.svg' : '/logo-dark.svg'}
            alt="Amazing Tennessee"
            style={{ height: '75px', width: 'auto' }}
          />
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map(link => {
            const isActive  = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            const isHovered = hoveredLink === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  fontSize:   '13.5px',
                  fontWeight: isActive ? 500 : 400,
                  color:      isTransparent
                    ? (isActive || isHovered ? '#fbbf24' : 'rgba(255,255,255,0.8)')
                    : (isActive || isHovered ? '#d97706' : '#475569'),
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <Link
          href="/itinerary"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            justifyContent: 'center',
            height:         '36px',
            padding:        '0 20px',
            borderRadius:   '9999px',
            fontSize:       '13.3px',
            fontWeight:     500,
            color:          '#fff',
            background:     isTransparent ? 'rgba(255,255,255,0.15)' : '#f59e0b',
            border:         isTransparent ? '1px solid rgba(255,255,255,0.3)' : 'none',
            backdropFilter: isTransparent ? 'blur(4px)' : 'none',
            boxShadow:      isTransparent ? 'none' : '0 1px 3px rgba(0,0,0,.1)',
            whiteSpace:     'nowrap',
            flexShrink:     0,
            opacity:        ctaHovered ? 0.85 : 1,
            transform:      ctaHovered ? 'translateY(-1px)' : 'translateY(0)',
            transition:     'opacity 0.15s ease, transform 0.15s ease, background 0.3s ease',
          }}
        >
          Plan Your Trip
        </Link>

      </div>
    </header>
  )
}