'use client'

import Link from 'next/link'
import { useState } from 'react'

const regions = [
  {
    value:       'east',
    label:       'East Tennessee',
    tagline:     'Mountain Majesty',
    description: 'Home to the Great Smoky Mountains, charming mountain towns, and world-class hiking. Experience breathtaking vistas, cascading waterfalls, and the warm hospitality of Appalachian culture.',
    highlights:  ['Great Smoky Mountains', 'Dollywood', 'Ruby Falls', 'Cades Cove'],
    cities:      'Knoxville, Gatlinburg, Pigeon Forge',
    href:        '/regions/east',
    gradient:    'linear-gradient(135deg, #059669, #15803d)',
  },
  {
    value:       'middle',
    label:       'Middle Tennessee',
    tagline:     'Music City & Beyond',
    description: 'From the neon lights of Nashville\'s honky-tonks to the rolling hills of the Highland Rim, Middle Tennessee pulses with music, history, and Southern hospitality at its finest.',
    highlights:  ['Grand Ole Opry', 'Jack Daniels Distillery', 'The Parthenon', 'Belle Meade'],
    cities:      'Nashville, Franklin, Murfreesboro',
    href:        '/regions/middle',
    gradient:    'linear-gradient(135deg, #d97706, #c2410c)',
  },
  {
    value:       'west',
    label:       'West Tennessee',
    tagline:     'Soul of the Delta',
    description: 'Where the Mississippi River meets the birthplace of the blues. West Tennessee is a land of deep musical roots, civil rights history, and the legendary Beale Street in Memphis.',
    highlights:  ['Beale Street', 'Graceland', 'National Civil Rights Museum', 'Mud Island'],
    cities:      'Memphis, Jackson, Dyersburg',
    href:        '/regions/west',
    gradient:    'linear-gradient(135deg, #7c3aed, #1d4ed8)',
  },
]

export default function RegionSection() {
  const [activeRegion, setActiveRegion] = useState('east')
  const region = regions.find(r => r.value === activeRegion)!

  return (
    <section style={{
      background: '#0f172a',
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
            color:         '#fbbf24',
            textTransform: 'uppercase',
            letterSpacing: '4.2px',
            marginBottom:  '16px',
          }}>
            Three Grand Divisions
          </p>
          <h2 style={{
            fontSize:      'clamp(32px, 4vw, 46px)',
            fontWeight:    400,
            color:         '#fff',
            letterSpacing: '-0.5px',
            marginBottom:  '16px',
          }}>
            Discover by <strong>Region</strong>
          </h2>
          <p style={{
            fontSize:   '16.6px',
            color:      '#94a3b8',
            maxWidth:   '668px',
            margin:     '0 auto',
            lineHeight: 1.65,
          }}>
            Tennessee&apos;s three distinct regions each offer their own unique character,
            attractions, and unforgettable experiences.
          </p>
        </div>

        {/* Main content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap:     '48px',
          alignItems: 'start',
        }}>

          {/* Left: Region selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {regions.map(r => (
              <RegionButton
                key={r.value}
                label={r.label}
                tagline={r.tagline}
                active={activeRegion === r.value}
                gradient={r.gradient}
                onClick={() => setActiveRegion(r.value)}
              />
            ))}
          </div>

          {/* Right: Region detail */}
          <div style={{
            background:   'rgba(30,41,59,0.5)',
            borderRadius: '24px',
            overflow:     'hidden',
            minHeight:    '384px',
            display:      'flex',
            flexDirection:'column',
          }}>
            {/* Gradient header */}
            <div style={{
              background: region.gradient,
              padding:    '32px',
              flex:       1,
            }}>
              <p style={{
                fontSize:      '13px',
                color:         'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '0.7px',
                marginBottom:  '8px',
              }}>
                Must-See Highlights
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {region.highlights.map(h => (
                  <span key={h} style={{
                    background:   'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: '9999px',
                    padding:      '5px 14px',
                    fontSize:     '13px',
                    color:        '#fff',
                  }}>
                    {h}
                  </span>
                ))}
              </div>
              <p style={{
                fontSize:   '14.8px',
                color:      'rgba(255,255,255,0.9)',
                lineHeight: 1.65,
                marginBottom: '16px',
              }}>
                {region.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LocationIcon />
                <span style={{ fontSize: '13.2px', color: '#94a3b8' }}>{region.cities}</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{ padding: '20px 32px' }}>
              <Link href={region.href} style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                height:         '36px',
                padding:        '0 20px',
                borderRadius:   '9999px',
                fontSize:       '13.3px',
                fontWeight:     500,
                color:          '#0f172a',
                background:     '#fff',
                boxShadow:      '0 1px 3px rgba(0,0,0,.1)',
              }}>
                Explore {region.label} →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function RegionButton({ label, tagline, active, gradient, onClick }: {
  label:    string
  tagline:  string
  active:   boolean
  gradient: string
  onClick:  () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:      'flex',
        alignItems:   'center',
        justifyContent:'space-between',
        padding:      '20px 24px',
        borderRadius: '16px',
        border:       'none',
        background:   active ? gradient : (hovered ? 'rgba(30,41,59,0.7)' : 'rgba(30,41,59,0.5)'),
        cursor:       'pointer',
        transition:   'background 0.2s ease',
        textAlign:    'left',
        fontFamily:   'inherit',
      }}
    >
      <div>
        <div style={{
          fontSize:   '19px',
          fontWeight: 700,
          color:      active ? '#0f172a' : '#fff',
          marginBottom: '4px',
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '13px',
          color:    active ? 'rgba(15,23,42,0.7)' : '#94a3b8',
        }}>
          {tagline}
        </div>
      </div>
      <ArrowIcon color={active ? '#0f172a' : 'rgba(255,255,255,0.5)'} />
    </button>
  )
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function ArrowIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}