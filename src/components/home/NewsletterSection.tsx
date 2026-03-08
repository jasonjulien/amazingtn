'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section style={{
      position:   'relative',
      height:     '456px',
      overflow:   'hidden',
      background: '#0f172a',
      display:    'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Background gradient */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(135deg, #0f172a 0%, #1a2f4a 50%, #0f172a 100%)',
        opacity:    0.8,
      }} />

      {/* Content */}
      <div style={{
        position:  'relative',
        textAlign: 'center',
        padding:   '0 24px',
        maxWidth:  '700px',
      }}>

        {/* Eyebrow */}
        <p style={{
          fontSize:      '14px',
          color:         '#fbbf24',
          textTransform: 'uppercase',
          letterSpacing: '4.2px',
          marginBottom:  '16px',
        }}>
          Stay Connected
        </p>

        {/* Headline */}
        <h2 style={{
          fontSize:      'clamp(32px, 4vw, 46px)',
          fontWeight:    400,
          color:         '#fff',
          letterSpacing: '-0.5px',
          marginBottom:  '16px',
        }}>
          Plan Your Tennessee <strong>Adventure</strong>
        </h2>

        {/* Subheadline */}
        <p style={{
          fontSize:     '16.7px',
          color:        'rgba(255,255,255,0.7)',
          lineHeight:   1.65,
          marginBottom: '32px',
        }}>
          Get insider tips, seasonal guides, and exclusive travel inspiration
          delivered straight to your inbox.
        </p>

        {/* Form */}
        {submitted ? (
          <div style={{
            background:   'rgba(245,158,11,0.15)',
            border:       '1px solid rgba(245,158,11,0.3)',
            borderRadius: '9999px',
            padding:      '16px 32px',
            fontSize:     '15px',
            color:        '#fbbf24',
            fontWeight:   500,
          }}>
            🎉 You&apos;re in! We&apos;ll be in touch with Tennessee travel inspiration.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display:       'flex',
            gap:           '0',
            maxWidth:      '448px',
            margin:        '0 auto',
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex:         1,
                height:       '56px',
                padding:      '0 24px',
                borderRadius: '9999px 0 0 9999px',
                border:       '1px solid rgba(255,255,255,0.2)',
                borderRight:  'none',
                background:   'rgba(255,255,255,0.1)',
                color:        'rgba(255,255,255,0.9)',
                fontSize:     '13.3px',
                outline:      'none',
                fontFamily:   'inherit',
              }}
            />
            <button
              type="submit"
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                height:       '56px',
                padding:      '0 28px',
                borderRadius: '0 9999px 9999px 0',
                border:       'none',
                background:   '#f59e0b',
                color:        '#0f172a',
                fontSize:     '13.1px',
                fontWeight:   600,
                cursor:       'pointer',
                fontFamily:   'inherit',
                display:      'flex',
                alignItems:   'center',
                gap:          '8px',
                boxShadow:    '0 1px 3px rgba(0,0,0,.1)',
                opacity:      btnHovered ? 0.9 : 1,
                transition:   'opacity 0.15s ease',
                whiteSpace:   'nowrap',
              }}
            >
              <MailIcon />
              Subscribe
            </button>
          </form>
        )}

      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}