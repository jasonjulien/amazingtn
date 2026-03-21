'use client'

import Link from 'next/link'
import { useState } from 'react'
import HeaderWrapper from '@/components/HeaderWrapper'
import DestinationCard from '@/components/DestinationCard'
import { LocationIcon, MapPinIcon, MusicIcon, NatureIcon, HistoryIcon, FoodIcon, AdventureIcon, FamilyIcon } from '@/components/Icons'

type DestinationData = {
  slug:             string
  name:             string
  shortDescription: string
  city:             string
  region:           'east' | 'middle' | 'west'
  category:         'music' | 'nature' | 'history' | 'food' | 'adventure' | 'family'
  featured:         boolean
  heroImage:        string
}

const categoryConfig = {
  music:     { label: 'Music & Entertainment', bg: '#ede9fe', color: '#6d28d9' },
  nature:    { label: 'Nature & Outdoors',      bg: '#d1fae5', color: '#047857' },
  history:   { label: 'History & Culture',      bg: '#fef3c7', color: '#b45309' },
  food:      { label: 'Food & Drink',            bg: '#fee2e2', color: '#b91c1c' },
  adventure: { label: 'Adventure',               bg: '#cffafe', color: '#0e7490' },
  family:    { label: 'Family Fun',              bg: '#fce7f3', color: '#be185d' },
}

const regionConfig = {
  east:   { label: 'East Tennessee',   color: '#059669' },
  middle: { label: 'Middle Tennessee', color: '#d97706' },
  west:   { label: 'West Tennessee',   color: '#7c3aed' },
}

const categoryIcons = {
  music:     <MusicIcon size={18} />,
  nature:    <NatureIcon size={18} />,
  history:   <HistoryIcon size={18} />,
  food:      <FoodIcon size={18} />,
  adventure: <AdventureIcon size={18} />,
  family:    <FamilyIcon size={18} />,
}

export default function DestinationDetailClient({ destination, related }: {
  destination: DestinationData
  related:     DestinationData[]
}) {
  const cat    = categoryConfig[destination.category]
  const region = regionConfig[destination.region]
  const [addHovered, setAddHovered] = useState(false)
  const [added, setAdded]           = useState(false)

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: '560px', overflow: 'hidden', background: '#0f172a' }}>
        <img src={destination.heroImage} alt={destination.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0.2) 100%)' }} />

        <div style={{ position: 'absolute', bottom: '56px', left: 0, right: 0, maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '13px' }}>
            <Link href="/explore" style={{ color: 'rgba(255,255,255,0.6)' }}>Explore</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
            <Link href={`/explore?region=${destination.region}`} style={{ color: 'rgba(255,255,255,0.6)' }}>{region.label}</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
            <span style={{ color: '#fff' }}>{destination.name}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {destination.featured && (
              <span style={{ background: '#f59e0b', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
                Featured
              </span>
            )}
            <span style={{ background: cat.bg, color: cat.color, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
              {cat.label}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '12px' }}>
            {destination.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', color: 'rgba(255,255,255,0.7)' }}>
            <LocationIcon size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '14px' }}>{destination.city}, {region.label}</span>
          </div>

          <button
            onMouseEnter={() => setAddHovered(true)}
            onMouseLeave={() => setAddHovered(false)}
            onClick={() => setAdded(!added)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              height: '40px', padding: '0 20px', borderRadius: '9999px',
              fontSize: '13px', fontWeight: 500,
              background: added ? '#f59e0b' : addHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
              color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
            }}
          >
            {added ? '✓ Added to Trip' : '+ Add to Trip'}
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '56px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '64px', alignItems: 'start' }}>

          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
              About {destination.name}
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.75, marginBottom: '32px' }}>
              {destination.shortDescription}
            </p>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.75 }}>
              Located in {destination.city}, {region.label}, {destination.name} is one of Tennessee's most beloved destinations.
              Whether you're a first-time visitor or a returning traveler, there's always something new to discover here.
              Plan your visit today and experience the best that {region.label} has to offer.
            </p>
          </div>

          <div style={{
            background: '#fff', borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 1px 2px rgba(0,0,0,.05)', position: 'sticky', top: '120px',
          }}>
            <div style={{ background: cat.bg, padding: '20px 24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: cat.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {cat.label}
              </span>
            </div>
            <div style={{ padding: '24px' }}>
              <InfoRow icon={<MapPinIcon size={18} strokeWidth={2} />} label="Location" value={`${destination.city}, ${region.label}`} />
              <InfoRow icon={<LocationIcon size={18} strokeWidth={2} />} label="Region" value={region.label} />
              <InfoRow icon={categoryIcons[destination.category]} label="Category" value={cat.label} />
              <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '20px', paddingTop: '20px' }}>
                <Link href="/plan" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  height: '44px', borderRadius: '9999px', background: '#f59e0b',
                  color: '#0f172a', fontSize: '14px', fontWeight: 600, marginBottom: '10px',
                }}>
                  Plan Your Visit
                </Link>
                <Link href={`/regions/${destination.region}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  height: '44px', borderRadius: '9999px', background: '#fff',
                  border: '1px solid #e5e5e5', color: '#475569', fontSize: '13px',
                }}>
                  Explore {region.label}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Related destinations ── */}
      {related.length > 0 && (
        <div style={{ background: '#fff', padding: '64px 0' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 400, color: '#1e293b', marginBottom: '32px' }}>
              More <strong>{cat.label}</strong> in Tennessee
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {related.map(d => <DestinationCard key={d.slug} {...d} />)}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <span style={{ color: '#94a3b8', flexShrink: 0, display: 'flex' }}>{icon}</span>
      <div>
        <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
        <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500, marginTop: '2px' }}>{value}</div>
      </div>
    </div>
  )
}