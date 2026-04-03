'use client'

import Link from 'next/link'

const CATEGORY_LABELS: Record<string, string> = {
  history:  'History & Culture',
  outdoors: 'Outdoors & Nature',
  food:     'Food & Drink',
  music:    'Music & Nightlife',
  arts:     'Arts & Shopping',
  family:   'Family & Fun',
}

interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  heroImage: string
  isEditorial: boolean
}

interface Props {
  articles: Article[]
}

export default function ArticlesSection({ articles }: Props) {
  if (!articles.length) return null

  const [featured, ...rest] = articles

  return (
    <section style={{ background: '#fff', padding: '96px 0' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#d97706',
            marginBottom: 12,
          }}>
            From the AmazingTN Journal
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{
              fontSize: 44,
              fontWeight: 400,
              color: '#1e293b',
              margin: 0,
              lineHeight: 1.1,
            }}>
              Stories &amp; <strong>Guides</strong>
            </h2>
            <Link href="/articles" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#475569',
              fontSize: 15,
              textDecoration: 'none',
            }}>
              View all articles →
            </Link>
          </div>
        </div>

        {/* Featured + grid layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}>
          {/* Featured article — left, tall */}
          <Link href={`/articles/${featured.slug}`} style={{ textDecoration: 'none' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                height: '100%',
                minHeight: 480,
                background: '#1e293b',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {featured.heroImage && (
                <img
                  src={featured.heroImage}
                  alt={featured.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.2) 60%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px',
              }}>
                {featured.category && (
                  <span style={{
                    display: 'inline-block',
                    background: 'rgba(245,158,11,0.9)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: 9999,
                    marginBottom: 12,
                  }}>
                    {CATEGORY_LABELS[featured.category] || featured.category}
                  </span>
                )}
                <h3 style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.2,
                  margin: '0 0 10px',
                }}>
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.6,
                    margin: '0 0 16px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {featured.excerpt}
                  </p>
                )}
                <span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 600 }}>
                  Read Article →
                </span>
              </div>
            </div>
          </Link>

          {/* Right column — up to 3 smaller cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {rest.map(article => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                style={{ textDecoration: 'none', flex: 1 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#fafaf9',
                    border: '1px solid #e2e8f0',
                    height: '100%',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', background: '#1e293b' }}>
                    {article.heroImage && (
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  {/* Text */}
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {article.category && (
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#d97706',
                        marginBottom: 6,
                      }}>
                        {CATEGORY_LABELS[article.category] || article.category}
                      </span>
                    )}
                    <h3 style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: '#1e293b',
                      lineHeight: 1.3,
                      margin: '0 0 6px',
                    }}>
                      {article.title}
                    </h3>
                    <span style={{ color: '#d97706', fontSize: 12, fontWeight: 600 }}>
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}