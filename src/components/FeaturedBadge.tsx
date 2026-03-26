import React from 'react'

type Tier = 'basic' | 'featured' | 'premier'

interface FeaturedBadgeProps {
  tier: Tier
  className?: string
}

const TIER_CONFIG: Record<
  Tier,
  { label: string; bg: string; text: string; border: string; icon: string }
> = {
  basic: {
    label: 'Sponsored',
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-200',
    icon: '·',
  },
  featured: {
    label: 'Featured',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: '★',
  },
  premier: {
    label: 'Premier',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-300',
    icon: '★',
  },
}

export default function FeaturedBadge({ tier, className = '' }: FeaturedBadgeProps) {
  const cfg = TIER_CONFIG[tier]
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border} ${className}`}
    >
      <span aria-hidden="true">{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}