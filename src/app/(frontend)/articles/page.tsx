import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import ArticlesIndexClient from './ArticlesIndexClient'

export const metadata: Metadata = {
  title: 'Articles & Guides | AmazingTN',
  description:
    'Explore Tennessee through our articles, travel guides, and destination features — from historic roads to hidden trails.',
}

export default async function ArticlesPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'sponsored-articles',
    depth: 1,
    limit: 48,
    sort: '-publishedDate',
  })

  const articles = result.docs.filter((a: any) => a.status === 'published')

  return <ArticlesIndexClient articles={articles} />
}