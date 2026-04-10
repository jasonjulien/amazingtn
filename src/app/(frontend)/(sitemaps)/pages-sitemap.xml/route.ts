import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://amazingtn.com'

    const dateFallback = new Date().toISOString()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = payload as any
    const [restaurantsRes, destinationsRes, citiesRes, regionsRes] = await Promise.all([
      p.find({ collection: 'restaurants', limit: 1000, depth: 0, pagination: false }),
      p.find({ collection: 'destinations', limit: 1000, depth: 0, pagination: false }),
      p.find({ collection: 'cities', limit: 1000, depth: 0, pagination: false }),
      p.find({ collection: 'regions', limit: 100, depth: 0, pagination: false }),
    ])

    const staticPages = [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/restaurants`, lastmod: dateFallback },
      { loc: `${SITE_URL}/destinations`, lastmod: dateFallback },
      { loc: `${SITE_URL}/cities`, lastmod: dateFallback },
      { loc: `${SITE_URL}/explore`, lastmod: dateFallback },
      { loc: `${SITE_URL}/advertise`, lastmod: dateFallback },
    ]

    const restaurantPages = (restaurantsRes.docs as any[])
      .filter((r) => Boolean(r?.slug))
      .map((r) => ({
        loc: `${SITE_URL}/restaurants/${r.slug}`,
        lastmod: r.updatedAt || dateFallback,
      }))

    const destinationPages = (destinationsRes.docs as any[])
      .filter((d) => Boolean(d?.slug))
      .map((d) => ({
        loc: `${SITE_URL}/destinations/${d.slug}`,
        lastmod: d.updatedAt || dateFallback,
      }))

    const cityPages = (citiesRes.docs as any[])
      .filter((c) => Boolean(c?.slug))
      .map((c) => ({ loc: `${SITE_URL}/cities/${c.slug}`, lastmod: c.updatedAt || dateFallback }))

    const regionPages = (regionsRes.docs as any[])
      .filter((r) => Boolean(r?.slug))
      .map((r) => ({ loc: `${SITE_URL}/regions/${r.slug}`, lastmod: r.updatedAt || dateFallback }))

    return [...staticPages, ...restaurantPages, ...destinationPages, ...cityPages, ...regionPages]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
