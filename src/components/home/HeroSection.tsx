'use client'

import Link from 'next/link'
import { useState } from 'react'

const stats = [
  { num: '56',  label: 'State Parks' },
  { num: '3',   label: 'Grand Divisions' },
  { num: '10M+',label: 'Annual Visitors' },
  { num: '∞',   label: 'Memories to Make' },
]

export default function HeroSection() {
  const [exploreHovered, setExploreHovered] = useState(false)
  const [regionsHovered, setRegionsHovered] = useState(false)

  return (
    <div style={{
      position:   'relative',
      height:     '100vh',
      minHeight:  '700px',
      overflow:   'hidden',
      background: '#0f172a',
    }}>

      {/* Background gradient (replace with real image later) */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(135deg, #0f172a 0%, #1a3a5c 40%, #0f2d3d 70%, #0f172a 100%)',
      }} />

      {/* Dark gradient overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.4) 50%, rgba(15,23,42,0.8) 100%)',
      }} />

      {/* Hero content */}
      <div style={{
        position:       'relative',
        height:         '100%',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        '0 24px',
        paddingBottom:  '105px', /* make room for stats bar */
      }}>

        {/* Eyebrow */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          gap:            '8px',
          marginBottom:   '24px',
        }}>
          <div style={{ width: '16px', height: '1px', background: '#fbbf24' }} />
          <span style={{
            fontSize:      '14px',
            color:         '#fcd34d',
            textTransform: 'uppercase',
            letterSpacing: '4.2px',
            fontWeight:    400,
          }}>
            The Volunteer State
          </span>
          <div style={{ width: '16px', height: '1px', background: '#fbbf24' }} />
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize:      'clamp(56px, 7vw, 90px)',
          fontWeight:    400,
          color:         '#fff',
          lineHeight:    1.05,
          letterSpacing: '-2.4px',
          marginBottom:  '24px',
        }}>
          Discover<br />
          <strong style={{ fontWeight: 700 }}>Tennessee</strong>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize:     'clamp(16px, 2vw, 18.4px)',
          color:        'rgba(255,255,255,0.8)',
          maxWidth:     '650px',
          lineHeight:   1.65,
          marginBottom: '40px',
        }}>
          From the soul-stirring rhythms of Memphis to the misty peaks of the Great
          Smokies, experience a land where music, history, and natural beauty converge.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/explore"
            onMouseEnter={() => setExploreHovered(true)}
            onMouseLeave={() => setExploreHovered(false)}
            style={{
              display:      'inline-flex',
              alignItems:   'center',
              justifyContent:'center',
              height:       '48px',
              padding:      '0 32px',
              borderRadius: '9999px',
              fontSize:     '15px',
              fontWeight:   500,
              color:        '#0f172a',
              background:   '#f59e0b',
              boxShadow:    '0 1px 3px rgba(0,0,0,.1)',
              transition:   'opacity 0.15s ease, transform 0.15s ease',
              opacity:      exploreHovered ? 0.9 : 1,
              transform:    exploreHovered ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            Start Exploring
          </Link>
          <Link
            href="/regions"
            onMouseEnter={() => setRegionsHovered(true)}
            onMouseLeave={() => setRegionsHovered(false)}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              justifyContent: 'center',
              height:         '48px',
              padding:        '0 32px',
              borderRadius:   '9999px',
              fontSize:       '15px',
              fontWeight:     500,
              color:          '#fff',
              background:     'rgba(255,255,255,0.15)',
              border:         '1px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(4px)',
              transition:     'opacity 0.15s ease, transform 0.15s ease',
              opacity:        regionsHovered ? 0.85 : 1,
              transform:      regionsHovered ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            View Regions
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position:        'absolute',
        bottom:          0,
        left:            0,
        right:           0,
        background:      'rgba(255,255,255,0.1)',
        backdropFilter:  'blur(6px)',
        borderTop:       '1px solid rgba(255,255,255,0.1)',
        height:          '105px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}>
        <div style={{
          maxWidth:       '1440px',
          width:          '100%',
          padding:        '0 48px',
          display:        'flex',
          justifyContent: 'space-around',
          alignItems:     'center',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize:   'clamp(22px, 3vw, 30px)',
                fontWeight: 700,
                color:      '#fff',
                lineHeight: 1.2,
              }}>
                {s.num}
              </div>
              <div style={{
                fontSize:      '14px',
                color:         'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.7px',
                marginTop:     '4px',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}