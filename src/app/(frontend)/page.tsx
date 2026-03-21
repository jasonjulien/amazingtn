import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeaderWrapper from '@/components/HeaderWrapper'
import HeroSection from '@/components/home/HeroSection'
import CategorySection from '@/components/home/CategorySection'
import RegionSection from '@/components/home/RegionSection'
import CitiesSection from '@/components/home/CitiesSection'

export default async function HomePage() {
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

  return (
    <div style={{ background: '#fafaf9' }}>
      <HeaderWrapper variant="transparent" />
      <HeroSection />
      <CategorySection />
      <RegionSection />
      <CitiesSection cities={cities} />
    </div>
  )
}