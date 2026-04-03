import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeaderWrapper from '@/components/HeaderWrapper'
import HeroSection from '@/components/home/HeroSection'
import CategorySection from '@/components/home/CategorySection'
import RegionSection from '@/components/home/RegionSection'
import CitiesSection from '@/components/home/CitiesSection'
import ArticlesSection from '@/components/home/ArticlesSection'

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

  const articlesResult = await payload.find({
    collection: 'sponsored-articles',
    depth: 1,
    limit: 10,
    sort: '-publishedDate',
  })

  const articles = articlesResult.docs
    .filter((a: any) => a.status === 'published')
    .slice(0, 4)
    .map((a: any) => ({
      slug:      a.slug,
      title:     a.title,
      excerpt:   a.excerpt ?? '',
      category:  a.category ?? '',
      heroImage: typeof a.heroImage === 'object' ? a.heroImage?.url ?? '' : '',
      isEditorial: a.isEditorial !== false,
    }))

  return (
    <div style={{ background: '#fafaf9' }}>
      <HeaderWrapper variant="transparent" />
      <HeroSection />
      <CategorySection />
      <RegionSection />
      <CitiesSection cities={cities} />
      <ArticlesSection articles={articles} />
    </div>
  )
}