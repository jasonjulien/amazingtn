'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type HeaderVariant = 'white' | 'transparent'

interface HeaderProps {
  variant?: HeaderVariant
}

const navLinks = [
  { label: 'Home',      href: '/' },
  { label: 'Explore',   href: '/explore' },
  { label: 'Regions',   href: '/regions' },
  { label: 'Cities',    href: '/cities' },
  { label: 'Plan Trip', href: '/plan' },
]

export default function Header({ variant = 'white' }: HeaderProps) {
  const pathname = usePathname()
  const isTransparent = variant === 'transparent'

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '80px',
      zIndex: 100,
      background: isTransparent ? 'transparent' : 'rgba(255,255,255,0.95)',
      backdropFilter: isTransparent ? 'none' : 'blur(6px)',
      boxShadow: isTransparent ? 'none' : '0 1px 2px rgba(0,0,0,.05)',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        height: '100%',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '12px',
            background: isTransparent ? 'rgba(255,255,255,0.2)' : '#f59e0b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 6l4-4 4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 11l9-9 9 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontSize: '19px', fontWeight: 700,
            color: isTransparent ? '#fff' : '#1e293b',
            letterSpacing: '-0.5px', whiteSpace: 'nowrap',
          }}>
            Amazing Tennessee
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map(link => {
            const isActive = pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            let color: string
            if (isActive) {
              color = isTransparent ? '#fbbf24' : '#d97706'
            } else {
              color = isTransparent ? 'rgba(255,255,255,0.8)' : '#475569'
            }
            return (
              <Link key={link.href} href={link.href} style={{
                fontSize: '13.5px',
                fontWeight: isActive ? 500 : 400,
                color,
                whiteSpace: 'nowrap',
              }}>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA */}
        <Link href="/plan" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          height: '36px', padding: '0 20px',
          borderRadius: '9999px',
          fontSize: '13.3px', fontWeight: 500,
          color: '#fff',
          background: isTransparent ? 'rgba(255,255,255,0.15)' : '#f59e0b',
          border: isTransparent ? '1px solid rgba(255,255,255,0.3)' : 'none',
          boxShadow: isTransparent ? 'none' : '0 1px 3px rgba(0,0,0,.1)',
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          Plan Your Trip
        </Link>

      </div>
    </header>
  )
}