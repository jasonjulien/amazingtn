import { notFound } from 'next/navigation'
import { regionsData } from '@/components/regions-data'
import RegionDetailClient from '@/components/RegionDetailClient'

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = regionsData[params.region]
  if (!region) notFound()
  return <RegionDetailClient region={region} regionSlug={params.region} />
}
