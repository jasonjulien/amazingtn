import Link from 'next/link'

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
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>

        {/* Brand column */}
        <div style={brandColStyle}>
          <Link href="/" style={logoWrapStyle}>
            <div style={logoBgStyle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 6l4-4 4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 11l9-9 9 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={logoTextStyle}>Amazing Tennessee</span>
          </Link>
          <p style={taglineStyle}>
            Discover the beauty, music, and hospitality of the Volunteer State. Your adventure awaits.
          </p>
          <div style={socialRowStyle}>
            {socialLinks.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label} style={socialBtnStyle}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore column */}
        <div style={colStyle}>
          <h4 style={colHeadStyle}>Explore</h4>
          <ul style={listStyle}>
            {exploreLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={footerLinkStyle}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Regions column */}
        <div style={colStyle}>
          <h4 style={colHeadStyle}>Regions</h4>
          <ul style={listStyle}>
            {regionLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={footerLinkStyle}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div style={colStyle}>
          <h4 style={colHeadStyle}>Contact</h4>
          <ul style={listStyle}>
            <li style={contactItemStyle}>
              <PhoneIcon />
              <span style={footerLinkStyle}>1-800-GO-2-TENN</span>
            </li>
            <li style={contactItemStyle}>
              <MailIcon />
              <span style={footerLinkStyle}>info@amazingtn.com</span>
            </li>
            <li style={{ ...contactItemStyle, alignItems: 'flex-start' }}>
              <MapIcon />
              <span style={footerLinkStyle}>
                312 Rosa L. Parks Ave<br />Nashville, TN 37243
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={bottomBarStyle}>
        <div style={bottomInnerStyle}>
          <span>© {new Date().getFullYear()} AmazingTN. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link href="/privacy" style={bottomLinkStyle}>Privacy Policy</Link>
            <Link href="/terms"   style={bottomLinkStyle}>Terms of Service</Link>
            <Link href="/accessibility" style={bottomLinkStyle}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Icon helpers ───────────────────────────── */
const iconStyle: React.CSSProperties = { flexShrink: 0, color: 'var(--color-400)' }

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, marginTop: '2px' }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

/* ─── Styles ─────────────────────────────────── */
const footerStyle: React.CSSProperties = {
  background: 'var(--color-900)',
}

const innerStyle: React.CSSProperties = {
  maxWidth:  '1440px',
  margin:    '0 auto',
  padding:   '64px var(--side-pad) 48px',
  display:   'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap:       '48px',
}

const brandColStyle: React.CSSProperties = {
  display:       'flex',
  flexDirection: 'column',
  gap:           '16px',
}

const logoWrapStyle: React.CSSProperties = {
  display:    'flex',
  alignItems: 'center',
  gap:        '10px',
}

const logoBgStyle: React.CSSProperties = {
  width:          '40px',
  height:         '40px',
  borderRadius:   'var(--r-md)',
  background:     'var(--color-brand)',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  flexShrink:     0,
}

const logoTextStyle: React.CSSProperties = {
  fontSize:      '19px',
  fontWeight:    700,
  color:         '#fff',
  letterSpacing: '-0.5px',
}

const taglineStyle: React.CSSProperties = {
  fontSize:   '13px',
  color:      'var(--color-400)',
  lineHeight: '1.65',
}

const socialRowStyle: React.CSSProperties = {
  display: 'flex',
  gap:     '12px',
}

const socialBtnStyle: React.CSSProperties = {
  width:          '40px',
  height:         '40px',
  borderRadius:   'var(--r-pill)',
  background:     'var(--color-800)',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  color:          '#fff',
  flexShrink:     0,
}

const colStyle: React.CSSProperties = {
  display:       'flex',
  flexDirection: 'column',
  gap:           '16px',
}

const colHeadStyle: React.CSSProperties = {
  fontSize:   '15px',
  fontWeight: 700,
  color:      '#fff',
}

const listStyle: React.CSSProperties = {
  listStyle:     'none',
  display:       'flex',
  flexDirection: 'column',
  gap:           '12px',
}

const footerLinkStyle: React.CSSProperties = {
  fontSize:   '13px',
  color:      'var(--color-400)',
  lineHeight: '1.5',
}

const contactItemStyle: React.CSSProperties = {
  display:    'flex',
  alignItems: 'center',
  gap:        '8px',
}

const bottomBarStyle: React.CSSProperties = {
  borderTop:  '1px solid var(--color-800)',
}

const bottomInnerStyle: React.CSSProperties = {
  maxWidth:       '1440px',
  margin:         '0 auto',
  padding:        '20px var(--side-pad)',
  display:        'flex',
  justifyContent: 'space-between',
  alignItems:     'center',
  fontSize:       '13px',
  color:          'var(--color-500)',
}

const bottomLinkStyle: React.CSSProperties = {
  fontSize: '13px',
  color:    'var(--color-500)',
}