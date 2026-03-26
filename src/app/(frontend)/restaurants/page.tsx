import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RestaurantsClient from './RestaurantsClient'

export default async function RestaurantsPage() {
  const payload = await getPayload({ config: await configPromise })

  const [{ docs: restaurantDocs }, { docs: sponsorDocs }] = await Promise.all([
    payload.find({
      collection: 'restaurants',
      limit: 300,
      depth: 1,
    }),
    payload.find({
      collection: 'sponsors',
      where: {
        and: [
          { status:     { equals: 'active'     } },
          { linkedType: { equals: 'restaurant' } },
        ],
      },
      limit: 200,
      depth: 1,
    }),
  ])

  const restaurants = restaurantDocs.map((r) => ({
    id:               String(r.id),
    name:             r.name         ?? '',
    slug:             r.slug         ?? '',
    city:             r.city         ?? '',
    cuisine:          (r.cuisine     ?? []) as string[],
    priceRange:       r.priceRange   ?? '',
    shortDescription: r.shortDescription ?? '',
    heroImage:        r.heroImage    ?? '',   // plain text URL
    featured:         r.featured     ?? false,
    featuredTier:     r.featuredTier ?? 'free',
  }))

  // Sponsor map keyed by restaurant id (for paid featured badges via Sponsors collection)
  const sponsorMap: Record<string, { tier: string; tagline?: string; featuredImage?: string }> = {}
  for (const s of sponsorDocs) {
    const restId = typeof s.linkedRestaurant === 'object'
      ? (s.linkedRestaurant as any)?.id
      : s.linkedRestaurant
    if (restId) {
      sponsorMap[String(restId)] = {
        tier:         s.tier as string,
        tagline:      (s as any).tagline ?? undefined,
        featuredImage:
          s.featuredImage && typeof s.featuredImage === 'object'
            ? (s.featuredImage as any).url
            : undefined,
      }
    }
  }

  return <RestaurantsClient restaurants={restaurants} sponsorMap={sponsorMap} />
}