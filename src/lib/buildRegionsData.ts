import type { Region, City, Destination } from '@/payload-types'

export type RegionData = {
  slug:        string
  label:       string
  tagline:     string
  description: string
  heroImage:   string
  accentColor: string
  gradient:    string
  highlights:  { icon: string; label: string; description: string }[]
  cities:      { name: string; tagline: string; image: string; href: string }[]
  attractions: { name: string; href: string }[]
  destinations: {
    slug: string; name: string; shortDescription: string
    city: string; region: string; category: string
    featured: boolean; heroImage: string
  }[]
}

export function buildRegionsData(
  regions: Region[],
  cities: City[],
  destinations: Destination[],
): Record<string, RegionData> {
  const result: Record<string, RegionData> = {}

  for (const r of regions) {
    const regionCities = cities
      .filter(c => {
        const rel = c.region
        if (typeof rel === 'object' && rel !== null) return (rel as Region).id === r.id
        return rel === r.id
      })
      .map(c => ({
        name:    c.name,
        tagline: c.tagline ?? '',
        image:   c.heroImage ?? '',
        href:    `/cities/${c.slug}`,
      }))

    const regionDestinations = destinations
      .filter(d => {
        const rel = d.region
        if (typeof rel === 'object' && rel !== null) return (rel as Region).id === r.id
        return rel === r.id
      })
      .map(d => ({
        slug:             d.slug,
        name:             d.name,
        shortDescription: d.shortDescription ?? '',
        city:             d.city ?? '',
        region:           r.slug,
        category:         d.category ?? '',
        featured:         d.featured ?? false,
        heroImage:        d.heroImage ?? '',
      }))

    const attractions = regionDestinations.map(d => ({
      name: d.name,
      href: `/destinations/${d.slug}`,
    }))

    result[r.slug] = {
      slug:        r.slug,
      label:       r.label,
      tagline:     r.tagline ?? '',
      description: r.description ?? '',
      heroImage:   r.heroImage ?? '',
      accentColor: r.accentColor ?? '#000',
      gradient:    r.gradient ?? '',
      highlights:  (r.highlights ?? []).map(h => ({
        icon:        h.icon ?? 'nature',
        label:       h.label,
        description: h.description ?? '',
      })),
      cities:      regionCities,
      attractions,
      destinations: regionDestinations,
    }
  }

  return result
}