import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import RegionDetailClient from '@/components/RegionDetailClient'
import { buildRegionsData } from '@/lib/buildRegionsData'

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region: regionSlug } = await params
  const payload = await getPayload({ config: await configPromise })

  const [regionsRes, citiesRes, destinationsRes] = await Promise.all([
    payload.find({ collection: 'regions', limit: 10, depth: 0 }),
    payload.find({ collection: 'cities', limit: 100, depth: 0 }),
    payload.find({ collection: 'destinations', limit: 200, depth: 0 }),
  ])

  const regionsData = buildRegionsData(regionsRes.docs, citiesRes.docs, destinationsRes.docs)
  const region = regionsData[regionSlug]

  if (!region) notFound()

  return <RegionDetailClient region={region} regionSlug={regionSlug} />
}
