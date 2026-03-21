import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ExploreClient from './ExploreClient'

export default async function ExplorePage() {
  const payload = await getPayload({ config: await configPromise })

  const { docs } = await payload.find({
    collection: 'destinations',
    limit: 200,
    depth: 1,
  })

  const destinations = docs.map(d => ({
    slug:             d.slug,
    name:             d.name,
    shortDescription: d.shortDescription,
    city:             d.city,
    region:           typeof d.region === 'object' ? d.region.slug : d.region,
    category:         d.category,
    featured:         d.featured,
    heroImage:        d.heroImage,
  }))

  return <ExploreClient destinations={destinations} />
}