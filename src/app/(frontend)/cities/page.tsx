import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CitiesClient from './CitiesClient'

export default async function CitiesPage() {
  const payload = await getPayload({ config: await configPromise })

  const { docs } = await payload.find({
    collection: 'cities',
    limit: 100,
    depth: 1,
  })

  const cities = docs.map(c => ({
    slug:        c.slug,
    name:        c.name,
    tagline:     c.tagline ?? '',
    region:      typeof c.region === 'object' ? (c.region as any).slug : c.region,
    regionLabel: c.regionLabel ?? '',
    population:  c.population ?? '',
    description: c.description ?? '',
    heroImage:   c.heroImage ?? '',
    highlights:  (c.highlights ?? []).map((h: any) => h.highlight),
  }))

  return <CitiesClient cities={cities} />
}
