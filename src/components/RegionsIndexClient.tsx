'use client'

import { useState } from 'react'
import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import { regionsData, RegionHighlight } from '@/components/regions-data'
import { destinations } from '@/components/destinations-data'
import DestinationCard from '@/components/DestinationCard'
import { MusicIcon, NatureIcon, HistoryIcon, AdventureIcon, FoodIcon, FamilyIcon } from '@/components/Icons'

const regionOrder = ['east', 'middle', 'west'] as const
type RegionSlug = typeof regionOrder[number]

const regionColors: Record<RegionSlug, string> = {
  east:   '#059669',
  middle: '#d97706',
  west:   '#7c3aed',
}

const highlightIconMap: Record<RegionHighlight['icon'], React.ReactNode> = {
  music:     <MusicIcon size={24} strokeWidth={1.75} />,
  nature:    <NatureIcon size={24} strokeWidth={1.75} />,
  history:   <HistoryIcon size={24} strokeWidth={1.75} />,
  adventure: <AdventureIcon size={24} strokeWidth={1.75} />,
  food:      <FoodIcon size={24} strokeWidth={1.75} />,
  family:    <FamilyIcon size={24} strokeWidth={1.75} />,
}

export default function RegionsIndexClient() {
  const [active, setActive] = useState<RegionSlug>('east')
  const region = regionsData[active]
  const regionDestinations = destinations.filter(d => d.region === active)
  const [hoveredAttraction, setHoveredAttraction] = useState<string | null>(null)

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero with tab switcher ── */}
      <div style={{ position: 'relative', height: '720px', overflow: 'hidden', background: '#0f172a' }}>
        <img
          src={region.heroImage}
          alt={region.label}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.5) 50%, rgba(15,23,42,0.3) 100%)' }} />

        {/* Hero content */}
        <div style={{ position: 'absolute', bottom: '120px', left: 0, right: 0, padding: '0 48px', maxWidth: '1440px', margin: '0 auto' }}>
          <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>
            {region.tagline}
          </p>
          <h1 style={{ fontSize: 'clamp(48px, 6vw, 69px)', fontWeight: 400, color: '#fff', lineHeight: 1.05, marginBottom: '16px', maxWidth: '600px' }}>
            {region.label}
          </h1>
          <p style={{ fontSize: '16.7px', color: 'rgba(255,255,255,0.8)', maxWidth: '660px', lineHeight: 1.7 }}>
            {region.description}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          {regionOrder.map(slug => {
            const isActive = slug === active
            const r = regionsData[slug]
            return (
              <button
                key={slug}
                onClick={() => setActive(slug)}
                style={{
                  padding: '18px 48px', fontSize: '15px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#0f172a' : 'rgba(255,255,255,0.7)',
                  background: isActive ? '#fff' : 'transparent',
                  borderRadius: isActive ? '12px 12px 0 0' : '0',
                  border: 'none',
                  borderBottom: isActive ? `3px solid ${regionColors[slug]}` : '3px solid transparent',
                  whiteSpace: 'nowrap', cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                }}
              >
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Feature highlights ── */}
      <div style={{ background: '#fff', padding: '56px 0' }}>
        <div style={{
          maxWidth:            '1440px',
          margin:              '0 auto',
          padding:             '0 48px',
          display:             'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap:                 '32px',
        }}>
          {region.highlights.map(h => (
            <div key={h.label} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ color: regionColors[active] }}>
                {highlightIconMap[h.icon]}
              </div>
              <div>
                <h3 style={{
                  fontSize:     '16px',
                  fontWeight:   700,
                  color:        '#1e293b',
                  marginBottom: '6px',
                  lineHeight:   1.3,
                }}>
                  {h.label}
                </h3>
                <p style={{
                  fontSize:   '13.5px',
                  color:      '#64748b',
                  lineHeight: 1.6,
                  margin:     0,
                }}>
                  {h.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Cities ── */}
      <div style={{ background: '#fafaf9', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '10px' }}>Explore</p>
              <h2 style={{ fontSize: '34px', fontWeight: 400, color: '#1e293b' }}>Cities in <strong>{region.label}</strong></h2>
            </div>
            <Link href="/cities" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', background: '#fff', border: '1px solid #e5e5e5', padding: '8px 16px', borderRadius: '9999px', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
              View All Cities →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {region.cities.map(city => (
              <Link key={city.name} href={city.href} style={{ display: 'block', position: 'relative', height: '256px', borderRadius: '16px', overflow: 'hidden', background: '#1e293b' }}>
                <img src={city.image} alt={city.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a, rgba(15,23,42,0.2))' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
                  <h3 style={{ fontSize: '19.5px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{city.name}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{city.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Top Attractions ── */}
      <div style={{ background: '#0f172a', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>Must Visit</p>
              <h2 style={{ fontSize: '34px', fontWeight: 400, color: '#fff', marginBottom: '32px' }}>
                Top Attractions in <strong>{region.label}</strong>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {region.attractions.map((a, i) => (
                  <Link key={a.name} href={a.href}
                    onMouseEnter={() => setHoveredAttraction(a.name)}
                    onMouseLeave={() => setHoveredAttraction(null)}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '12px', background: hoveredAttraction === a.name ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', transition: 'background 0.15s ease' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700, color: '#fbbf24', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '15px', color: '#fff', flex: 1 }}>{a.name}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ))}
              </div>
              <Link href={`/explore?region=${active}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', height: '36px', padding: '0 20px', borderRadius: '9999px', background: region.accentColor, color: '#fff', fontSize: '13px', fontWeight: 500 }}>
                Explore All {region.label} Attractions →
              </Link>
            </div>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', aspectRatio: '1' }}>
              <img src={region.heroImage} alt={region.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '-16px', left: '-16px', width: '128px', height: '128px', borderRadius: '16px', background: region.gradient, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,.3)' }}>
                <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>{region.attractions.length}+</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Top Sites</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Destination cards ── */}
      {regionDestinations.length > 0 && (
        <div style={{ background: '#fafaf9', padding: '80px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: 400, color: '#1e293b', marginBottom: '32px' }}>
              All <strong>{region.label}</strong> Destinations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {regionDestinations.map(d => <DestinationCard key={d.slug} {...d} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div style={{ background: '#fff', padding: '64px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '29px', fontWeight: 400, color: '#1e293b', marginBottom: '10px' }}>
          Ready to explore <strong>{region.label}</strong>?
        </h2>
        <p style={{ fontSize: '14.8px', color: '#475569', marginBottom: '24px' }}>Start planning your perfect Tennessee adventure today.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href={`/explore?region=${active}`} style={{ display: 'inline-flex', alignItems: 'center', height: '36px', padding: '0 20px', borderRadius: '9999px', background: '#f59e0b', color: '#fff', fontSize: '13px', fontWeight: 500 }}>
            View All Attractions
          </Link>
          <Link href="/cities" style={{ display: 'inline-flex', alignItems: 'center', height: '36px', padding: '0 20px', borderRadius: '9999px', background: '#fff', color: '#0a0a0a', border: '1px solid #e5e5e5', fontSize: '13px' }}>
            Explore Cities
          </Link>
        </div>
      </div>

    </div>
  )
}