type Tier = 'basic' | 'featured' | 'premier'

const TIER_CONFIG: Record<Tier, { label: string; bg: string; color: string; border: string; icon?: string } | null> = {
  basic: null,
  featured: {
    label:  'Featured',
    bg:     '#fef3c7',
    color:  '#d97706',
    border: '#fde68a',
    icon:   '★',
  },
  premier: {
    label:  'Premier',
    bg:     '#f5f3ff',
    color:  '#7c3aed',
    border: '#ddd6fe',
    icon:   '★',
  },
}

export default function FeaturedBadge({ tier }: { tier: Tier }) {
  const cfg = TIER_CONFIG[tier]
  if (!cfg) return null
  return (
    <span style={{
      display:      'inline-flex',
      alignItems:   'center',
      gap:          '4px',
      fontSize:     '11px',
      fontWeight:   700,
      padding:      '3px 10px',
      borderRadius: '9999px',
      background:   cfg.bg,
      color:        cfg.color,
      border:       `1px solid ${cfg.border}`,
    }}>
      {cfg.icon && <span aria-hidden="true">{cfg.icon}</span>}
      {cfg.label}
    </span>
  )
}