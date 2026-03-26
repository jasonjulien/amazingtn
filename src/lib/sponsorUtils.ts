/**
 * Client-safe sponsor utilities — no Payload imports, no server-only code.
 * Import this from client components (restaurants/page.tsx, etc.)
 * Import from src/lib/sponsors.ts only in Server Components / route handlers.
 */

export type SponsorTier = 'basic' | 'featured' | 'premier'

export interface SponsorInfo {
  tier: SponsorTier
  tagline?: string | null
  featuredImage?: { url: string; alt?: string } | null
}

const TIER_ORDER: Record<string, number> = { premier: 0, featured: 1, basic: 2 }

/**
 * Sort items so sponsored ones bubble to the top:
 * premier → featured → basic → organic
 */
export function sortWithSponsors<T extends { id: string }>(
  items: T[],
  sponsorMap: Record<string, SponsorInfo>,
): T[] {
  return [...items].sort((a, b) => {
    const oa = sponsorMap[a.id] ? (TIER_ORDER[sponsorMap[a.id].tier] ?? 3) : 3
    const ob = sponsorMap[b.id] ? (TIER_ORDER[sponsorMap[b.id].tier] ?? 3) : 3
    return oa - ob
  })
}