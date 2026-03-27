type Tier = 'basic' | 'featured' | 'premier' | undefined | null

const BORDER_STYLE: Record<string, React.CSSProperties> = {
  basic: {
    borderRadius: '16px',
    overflow:     'hidden',
  },
  featured: {
    borderRadius: '16px',
    overflow:     'hidden',
    outline:      '1px solid #fde68a',
    boxShadow:    '0 0 0 1px #fde68a, 0 4px 16px rgba(245,158,11,0.12)',
  },
  premier: {
    borderRadius: '16px',
    overflow:     'hidden',
    outline:      '2px solid #f59e0b',
    boxShadow:    '0 0 0 2px #f59e0b, 0 8px 24px rgba(245,158,11,0.2)',
  },
}

export default function FeaturedCardWrapper({
  tier,
  children,
}: {
  tier:     Tier
  children: React.ReactNode
}) {
  if (!tier) return <>{children}</>
  return (
    <div style={BORDER_STYLE[tier] ?? { borderRadius: '16px', overflow: 'hidden' }}>
      {children}
    </div>
  )
}