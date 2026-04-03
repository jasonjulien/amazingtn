import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ArticleClient from './ArticleClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'sponsored-articles',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const article = result.docs.find((a: any) => a.status === 'published')
  if (!article) return {}

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'sponsored-articles',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const article = result.docs.find((a: any) => a.status === 'published')
  if (!article) notFound()

  return <ArticleClient article={article} />
}