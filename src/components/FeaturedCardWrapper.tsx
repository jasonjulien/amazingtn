/**
 * Wrap any card in this component to apply a featured-tier border highlight.
 * Usage:
 *   <FeaturedCardWrapper tier={sponsor?.tier}>
 *     <RestaurantCard restaurant={r} />
 *   </FeaturedCardWrapper>
 *
 * If tier is undefined / null the wrapper is invisible and adds no markup overhead.
 */

import React from 'react'

type Tier = 'basic' | 'featured' | 'premier' | undefined | null

const BORDER_CLASS: Record<string, string> = {
  basic: 'ring-1 ring-gray-300',
  featured: 'ring-2 ring-blue-400 shadow-md shadow-blue-100',
  premier: 'ring-2 ring-amber-400 shadow-md shadow-amber-100',
}

export default function FeaturedCardWrapper({
  tier,
  children,
  className = '',
}: {
  tier: Tier
  children: React.ReactNode
  className?: string
}) {
  if (!tier) return <>{children}</>

  return (
    <div className={`rounded-xl overflow-hidden ${BORDER_CLASS[tier] ?? ''} ${className}`}>
      {children}
    </div>
  )
}