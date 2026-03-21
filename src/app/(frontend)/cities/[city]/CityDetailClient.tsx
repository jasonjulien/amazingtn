'use client'

import Link from 'next/link'
import { useState } from 'react'
import HeaderWrapper from '@/components/HeaderWrapper'
import DestinationCard from '@/components/DestinationCard'

type CityData = {
  slug:        string
  name:        string
  tagline:     string
  region:      'east' | 'middle' | 'west'
  regionLabel: string
  population:  string
  description: string
  heroImage:   string
  highlights:  string[]
}

type NearbyCity = { slug: string; name: string; tagline: string }

type DestinationData = {
  slug: string; name: string; shortDescription: string
  city: string; region: string; category: string
  featured: boolean; heroImage: string
}

const regionConfig = {
  east:   { label: 'East Tennessee',   color: '#059669', gradient: 'linear-gradient(135deg, #059669, #15803d)' },
  middle: { label: 'Middle Tennessee', color: '#d97706', gradient: 'linear-gradient(135deg, #d97706, #c2410c)' },
  west:   { label: 'West Tennessee',   color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #1d4ed8)' },
}

export default function CityDetailClient({ city, nearbyCities, cityDestinations }: {
  city:             CityData
  nearbyCities:     NearbyCity[]
  cityDestinations: DestinationData[]
}) {
  const regionCfg = regionConfig[city.region]
  const [hoveredHighlight, setHoveredHighlight] = useState<string | null>(null)

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: '600px', overflow: 'hidden', background: '#0f172a' }}>
        <img src={city.heroImage} alt={city.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.5) 50%, rgba(15,23,42,0.2) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '64px', left: 0, right: 0, maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '13px' }}>
            <Link href="/cities" style={{ color: 'rgba(255,255,255,0.6)' }}>Cities</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
            <Link href={`/regions/${city.region}`} style={{ color: 'rgba(255,255,255,0.6)' }}>{regionCfg.label}</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
            <span style={{ color: '#fff' }}>{city.name}</span>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: regionCfg.color, color: '#fff',
            fontSize: '11px', fontWeight: 700, padding: '4px 12px',
            borderRadius: '9999px', marginBottom: '12px',
          }}>
            {regionCfg.label}
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '8px' }}>
            {city.name}
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>{city.tagline}</p>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', lineHeight: 1.65 }}>
            {city.description}
          </p>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', padding: '24px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px', display: 'flex', gap: '48px', alignItems: 'center' }}>
          <StatItem label="Population" value={city.population} />
          <StatItem label="Region" value={regionCfg.label} />
          <StatItem label="Attractions" value={`${cityDestinations.length > 0 ? cityDestinations.length : city.highlights.length}+`} />
          <div style={{ marginLeft: 'auto' }}>
            <Link href={`/explore?region=${city.region}`} style={{
              display: 'inline-flex', alignItems: 'center', height: '36px', padding: '0 20px',
              borderRadius: '9999px', background: regionCfg.color, color: '#fff',
              fontSize: '13px', fontWeight: 500,
            }}>
              Explore {regionCfg.label} →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Highlights ── */}
      <div style={{ background: '#fafaf9', padding: '64px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>Must See</p>
          <h2 style={{ fontSize: '34px', fontWeight: 400, color: '#1e293b', marginBottom: '32px' }}>
            Top Highlights in <strong>{city.name}</strong>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '800px' }}>
            {city.highlights.map((h, i) => (
              <div key={h}
                onMouseEnter={() => setHoveredHighlight(h)}
                onMouseLeave={() => setHoveredHighlight(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px 20px', borderRadius: '12px', background: '#fff',
                  boxShadow: hoveredHighlight === h ? '0 4px 12px rgba(0,0,0,.08)' : '0 1px 2px rgba(0,0,0,.05)',
                  transition: 'box-shadow 0.2s ease', cursor: 'default',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9999px',
                  background: regionCfg.gradient, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: 500 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Destinations ── */}
      {cityDestinations.length > 0 && (
        <div style={{ background: '#fff', padding: '64px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
            <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>Explore</p>
            <h2 style={{ fontSize: '34px', fontWeight: 400, color: '#1e293b', marginBottom: '32px' }}>
              Attractions in <strong>{city.name}</strong>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {cityDestinations.map(d => <DestinationCard key={d.slug} {...d} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── Nearby cities ── */}
      <div style={{ background: '#fafaf9', padding: '64px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#1e293b', marginBottom: '24px' }}>
            More Cities in <strong>{regionCfg.label}</strong>
          </h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {nearbyCities.map(c => (
              <Link key={c.slug} href={`/cities/${c.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                height: '40px', padding: '0 20px', borderRadius: '9999px',
                background: '#fff', border: '1px solid #e5e5e5',
                fontSize: '13px', color: '#1e293b', fontWeight: 500,
                boxShadow: '0 1px 2px rgba(0,0,0,.05)',
              }}>
                {c.name} <span style={{ color: '#94a3b8', fontSize: '11px' }}>{c.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: '#0f172a', padding: '64px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>
          Ready to Visit?
        </p>
        <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#fff', marginBottom: '10px' }}>
          Plan your trip to <strong>{city.name}</strong>
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '28px' }}>
          Start exploring everything {city.name} has to offer
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href="/plan" style={{
            display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 28px',
            borderRadius: '9999px', background: '#f59e0b', color: '#0f172a',
            fontSize: '14px', fontWeight: 600,
          }}>
            Plan Your Trip
          </Link>
          <Link href={`/explore?region=${city.region}`} style={{
            display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 28px',
            borderRadius: '9999px', background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontSize: '14px', fontWeight: 500,
          }}>
            Explore All Attractions
          </Link>
        </div>
      </div>

    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>{label}</div>
    </div>
  )
}