import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RegionsIndexClient from '@/components/RegionsIndexClient'
import { buildRegionsData } from '@/lib/buildRegionsData'

export default async function RegionsPage() {
  const payload = await getPayload({ config: await configPromise })

  const [regionsRes, citiesRes, destinationsRes] = await Promise.all([
    payload.find({ collection: 'regions', limit: 10, depth: 0 }),
    payload.find({ collection: 'cities', limit: 100, depth: 0 }),
    payload.find({ collection: 'destinations', limit: 200, depth: 0 }),
  ])

  const regionsData = buildRegionsData(regionsRes.docs, citiesRes.docs, destinationsRes.docs)

  return <RegionsIndexClient regionsData={regionsData} />
}