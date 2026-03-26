import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import CityDetailClient from './CityDetailClient'

export default async function CityDetailPage({ params }: { params: { city: string } }) {
  const payload = await getPayload({ config: await configPromise })

  const [citiesRes, destinationsRes, restaurantsRes] = await Promise.all([
    payload.find({ collection: 'cities', limit: 100, depth: 1 }),
    payload.find({ collection: 'destinations', limit: 200, depth: 0 }),
    payload.find({ collection: 'restaurants', limit: 200, depth: 0 }),
  ])

  const city = citiesRes.docs.find(c => c.slug === params.city)
  if (!city) notFound()

  const regionSlug = typeof city.region === 'object' ? (city.region as any).slug : city.region

  const cityData = {
    slug:        city.slug,
    name:        city.name,
    tagline:     city.tagline ?? '',
    region:      regionSlug as 'east' | 'middle' | 'west',
    regionLabel: city.regionLabel ?? '',
    population:  city.population ?? '',
    description: city.description ?? '',
    heroImage:   city.heroImage ?? '',
    highlights:  (city.highlights ?? []).map((h: any) => h.highlight),
  }

  const nearbyCities = citiesRes.docs
    .filter(c => {
      const cRegion = typeof c.region === 'object' ? (c.region as any).slug : c.region
      return cRegion === regionSlug && c.slug !== city.slug
    })
    .map(c => ({
      slug:    c.slug,
      name:    c.name,
      tagline: c.tagline ?? '',
    }))

  const cityDestinations = destinationsRes.docs
    .filter(d => d.city?.toLowerCase() === city.name.toLowerCase())
    .map(d => ({
      slug:             d.slug,
      name:             d.name,
      shortDescription: d.shortDescription ?? '',
      city:             d.city ?? '',
      region:           regionSlug,
      category:         d.category ?? '',
      featured:         d.featured ?? false,
      heroImage:        d.heroImage ?? '',
    }))

  const cityRestaurants = restaurantsRes.docs
    .filter(r => r.city?.toLowerCase() === city.name.toLowerCase())
    .map(r => ({
      slug:             r.slug,
      name:             r.name,
      city:             r.city ?? '',
      cuisine:          Array.isArray(r.cuisine) ? r.cuisine : r.cuisine ? [r.cuisine] : [],
      priceRange:       r.priceRange ?? '',
      shortDescription: r.shortDescription ?? '',
      heroImage:        r.heroImage ?? '',
      featured:         r.featured ?? false,
      featuredTier:     r.featuredTier ?? 'free',
      website:          r.website ?? '',
    }))

  return (
    <CityDetailClient
      city={cityData}
      nearbyCities={nearbyCities}
      cityDestinations={cityDestinations}
      cityRestaurants={cityRestaurants}
    />
  )
}