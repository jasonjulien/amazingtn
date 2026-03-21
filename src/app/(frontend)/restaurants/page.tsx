import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RestaurantsClient from './RestaurantsClient'

export default async function RestaurantsPage() {
  const payload = await getPayload({ config: await configPromise })

  const { docs } = await payload.find({
    collection: 'restaurants',
    limit: 200,
    depth: 1,
  })

  const restaurants = docs.map(r => ({
    slug:             r.slug,
    name:             r.name,
    city:             r.city ?? '',
    region:           typeof r.region === 'object' ? (r.region as any).slug : r.region,
    cuisine:          Array.isArray(r.cuisine) ? r.cuisine : r.cuisine ? [r.cuisine] : [],
    priceRange:       r.priceRange ?? '',
    shortDescription: r.shortDescription ?? '',
    heroImage:        r.heroImage ?? '',
    address:          r.address ?? '',
    featured:         r.featured ?? false,
    featuredTier:     r.featuredTier ?? 'free',
    website:          r.website ?? '',
    phone:            r.phone ?? '',
  }))

  return <RestaurantsClient restaurants={restaurants} />
}