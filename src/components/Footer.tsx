'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PhoneIcon, MailIcon, MapPinIcon } from './Icons'

const exploreLinks = [
  { label: 'Music & Entertainment', href: '/explore?category=music' },
  { label: 'Nature & Outdoors',     href: '/explore?category=nature' },
  { label: 'History & Culture',     href: '/explore?category=history' },
  { label: 'Food & Drink',          href: '/explore?category=food' },
  { label: 'Adventure',             href: '/explore?category=adventure' },
]

const regionLinks = [
  { label: 'East Tennessee',   href: '/regions/east' },
  { label: 'Middle Tennessee', href: '/regions/middle' },
  { label: 'West Tennessee',   href: '/regions/west' },
]

const socialLinks = [
  {
    label: 'Facebook', href: 'https://facebook.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  },
  {
    label: 'Instagram', href: 'https://instagram.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'X', href: 'https://twitter.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: 'YouTube', href: 'https://youtube.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>,
  },
]

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize:   '13px',
        color:      hovered ? '#fff' : 'var(--color-400)',
        transition: 'color 0.15s ease',
        lineHeight: '1.5',
      }}
    >
      {children}
    </Link>
  )
}

function SocialButton({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:          '40px',
        height:         '40px',
        borderRadius:   '9999px',
        background:     hovered ? '#334155' : 'var(--color-800)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          hovered ? '#fff' : '#94a3b8',
        transition:     'background 0.15s ease, color 0.15s ease',
        flexShrink:     0,
      }}
    >
      {icon}
    </a>
  )
}

export default function Footer() {
  const [email, setEmail]           = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe() {
    if (email.trim()) setSubscribed(true)
  }

  return (
    <footer>

      {/* ── Photo CTA band ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=85"
          alt="Tennessee scenic"
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center 40%',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 20, 40, 0.68)' }} />

        <div style={{
          position:  'relative',
          zIndex:    1,
          textAlign: 'center',
          padding:   '80px 48px 88px',
          maxWidth:  '720px',
          margin:    '0 auto',
        }}>
          <p style={{ fontSize: '12px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '14px' }}>
            Stay Connected
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: '14px' }}>
            Plan Your Tennessee <strong>Adventure</strong>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '480px', margin: '0 auto 32px' }}>
            Get insider tips, seasonal guides, and exclusive travel inspiration delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '9999px', padding: '12px 28px',
              color: '#fff', fontSize: '14px', backdropFilter: 'blur(8px)',
            }}>
              ✓ You're subscribed — thanks!
            </div>
          ) : (
            <div style={{ display: 'flex', maxWidth: '480px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                style={{
                  flex: 1, height: '52px', padding: '0 20px',
                  borderRadius: '9999px 0 0 9999px',
                  border: '1px solid rgba(255,255,255,0.2)', borderRight: 'none',
                  background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                  color: '#fff', fontSize: '14px', fontFamily: 'inherit', outline: 'none',
                }}
              />
              <button
                onClick={handleSubscribe}
                style={{
                  height: '52px', padding: '0 28px',
                  borderRadius: '0 9999px 9999px 0',
                  background: '#f59e0b', color: '#0f172a',
                  fontSize: '14px', fontWeight: 600,
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Existing footer — unchanged ── */}
      <div style={{ background: 'var(--color-900)' }}>
        <div style={{
          maxWidth:            '1440px',
          margin:              '0 auto',
          padding:             '64px 48px 48px',
          display:             'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap:                 '48px',
        }}>

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo-light.svg" alt="Amazing Tennessee" style={{ height: '56px', width: 'auto' }} />
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--color-400)', lineHeight: '1.65' }}>
              Discover the beauty, music, and hospitality of the Volunteer State. Your adventure awaits.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map(s => <SocialButton key={s.label} {...s} />)}
            </div>
          </div>

          {/* Explore column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {exploreLinks.map(l => (
                <li key={l.href}><FooterLink href={l.href}>{l.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Regions column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Regions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {regionLinks.map(l => (
                <li key={l.href}><FooterLink href={l.href}>{l.label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneIcon style={{ color: 'var(--color-400)', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'var(--color-400)' }}>1-800-GO-2-TENN</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MailIcon style={{ color: 'var(--color-400)', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: 'var(--color-400)' }}>info@amazingtn.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPinIcon style={{ color: 'var(--color-400)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-400)', lineHeight: '1.5' }}>
                  312 Rosa L. Parks Ave<br />Nashville, TN 37243
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--color-800)' }}>
          <div style={{
            maxWidth:       '1440px',
            margin:         '0 auto',
            padding:        '20px 48px',
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            fontSize:       '13px',
            color:          'var(--color-500)',
          }}>
            <span>© {new Date().getFullYear()} AmazingTN. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '32px' }}>
              <FooterLink href="/advertise">Advertise</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/accessibility">Accessibility</FooterLink>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}