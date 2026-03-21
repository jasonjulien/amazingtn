import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import DestinationDetailClient from './DestinationDetailClient'

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config: await configPromise })

  const { docs } = await payload.find({
    collection: 'destinations',
    limit: 200,
    depth: 1,
  })

  const doc = docs.find(d => d.slug === params.slug)
  if (!doc) notFound()

  const regionSlug = typeof doc.region === 'object' ? (doc.region as any).slug : doc.region

  const destination = {
    slug:             doc.slug,
    name:             doc.name,
    shortDescription: doc.shortDescription ?? '',
    city:             doc.city ?? '',
    region:           regionSlug as 'east' | 'middle' | 'west',
    category:         doc.category as 'music' | 'nature' | 'history' | 'food' | 'adventure' | 'family',
    featured:         doc.featured ?? false,
    heroImage:        doc.heroImage ?? '',
  }

  const related = docs
    .filter(d => d.category === doc.category && d.slug !== doc.slug)
    .slice(0, 3)
    .map(d => ({
      slug:             d.slug,
      name:             d.name,
      shortDescription: d.shortDescription ?? '',
      city:             d.city ?? '',
      region:           (typeof d.region === 'object' ? (d.region as any).slug : d.region) as 'east' | 'middle' | 'west',
      category:         d.category as any,
      featured:         d.featured ?? false,
      heroImage:        d.heroImage ?? '',
    }))

  return <DestinationDetailClient destination={destination} related={related} />
}