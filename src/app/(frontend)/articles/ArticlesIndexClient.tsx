'use client'

import Link from 'next/link'
import { useState } from 'react'
import HeaderWrapper from '@/components/HeaderWrapper'

const CATEGORIES = [
  { value: 'all', label: 'All Articles' },
  { value: 'history', label: 'History & Culture' },
  { value: 'outdoors', label: 'Outdoors & Nature' },
  { value: 'food', label: 'Food & Drink' },
  { value: 'music', label: 'Music & Nightlife' },
  { value: 'arts', label: 'Arts & Shopping' },
  { value: 'family', label: 'Family & Fun' },
]

const CATEGORY_LABELS: Record<string, string> = {
  history: 'History & Culture',
  outdoors: 'Outdoors & Nature',
  food: 'Food & Drink',
  music: 'Music & Nightlife',
  arts: 'Arts & Shopping',
  family: 'Family & Fun',
}

interface ArticlesIndexClientProps {
  articles: any[]
}

export default function ArticlesIndexClient({ articles }: ArticlesIndexClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === activeCategory)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      <HeaderWrapper variant="transparent" />

      <main style={{ background: '#fafaf9', minHeight: '100vh' }}>
        {/* Page hero */}
        <div
          style={{
            position: 'relative',
            background: '#0f172a',
            padding: '120px 24px 64px',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1715014258786-998a463ad77c?q=80&w=2066"
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.85) 100%)',
            }}
          />
          <p
            style={{
              position: 'relative',
              color: '#fbbf24',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Stories from the Volunteer State
          </p>
          <h1
            style={{
              position: 'relative',
              color: '#fff',
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              margin: '0 0 16px',
            }}
          >
            Articles &amp; Guides
          </h1>
          <p
            style={{
              position: 'relative',
              color: 'rgba(255,255,255,0.65)',
              fontSize: 18,
              lineHeight: 1.6,
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            Destination features, travel guides, and hidden gems — everything you need
            to explore Tennessee like a local.
          </p>
        </div>

        {/* Category filter */}
        <div
          style={{
            background: '#fff',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <div
            style={{
              maxWidth: 1160,
              margin: '0 auto',
              padding: '0 24px',
              display: 'flex',
              gap: 4,
              overflowX: 'auto',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '16px 16px',
                  fontSize: 14,
                  fontWeight: activeCategory === cat.value ? 600 : 400,
                  color: activeCategory === cat.value ? '#d97706' : '#64748b',
                  borderBottom:
                    activeCategory === cat.value
                      ? '2px solid #f59e0b'
                      : '2px solid transparent',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '56px 24px 96px' }}>
          {filtered.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '80px 0' }}>
              No articles yet in this category.
            </p>
          ) : (
            <>
              {/* Featured article — first card, full width */}
              {featured && (
                <Link
                  href={`/articles/${featured.slug}`}
                  style={{ textDecoration: 'none', display: 'block', marginBottom: 48 }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      borderRadius: 20,
                      overflow: 'hidden',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', minHeight: 340, background: '#1e293b' }}>
                      {featured.heroImage?.url && (
                        <img
                          src={featured.heroImage.url}
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
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to right, rgba(15,23,42,0.3), transparent)',
                        }}
                      />
                      {/* Sponsored / Editorial badge */}
                      <div style={{ position: 'absolute', top: 20, left: 20 }}>
                        <ArticleBadge article={featured} />
                      </div>
                    </div>
                    {/* Text */}
                    <div
                      style={{
                        padding: '48px 40px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      {featured.category && (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#d97706',
                            marginBottom: 12,
                          }}
                        >
                          {CATEGORY_LABELS[featured.category] || featured.category}
                        </span>
                      )}
                      <h2
                        style={{
                          fontSize: 28,
                          fontWeight: 700,
                          color: '#1e293b',
                          lineHeight: 1.25,
                          margin: '0 0 16px',
                        }}
                      >
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p
                          style={{
                            fontSize: 15,
                            color: '#475569',
                            lineHeight: 1.7,
                            margin: '0 0 24px',
                          }}
                        >
                          {featured.excerpt}
                        </p>
                      )}
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#d97706',
                        }}
                      >
                        Read Article →
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Article grid */}
              {rest.length > 0 && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 24,
                  }}
                >
                  {rest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            background: '#0f172a',
            padding: '64px 24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#fbbf24',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            For Businesses
          </p>
          <h2
            style={{
              color: '#fff',
              fontSize: 32,
              fontWeight: 700,
              margin: '0 0 12px',
            }}
          >
            Get your business featured
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 15,
              maxWidth: 480,
              margin: '0 auto 28px',
              lineHeight: 1.6,
            }}
          >
            Reach Tennessee travelers actively planning their next trip with a
            professionally written sponsored article.
          </p>
          <Link
            href="/advertise"
            style={{
              display: 'inline-block',
              background: '#f59e0b',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: 14,
              padding: '14px 32px',
              borderRadius: 9999,
              textDecoration: 'none',
            }}
          >
            See Packages →
          </Link>
        </div>
      </main>
    </>
  )
}

function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.2s, transform 0.2s',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'
          el.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Thumbnail */}
        <div style={{ position: 'relative', height: 200, background: '#1e293b' }}>
          {article.heroImage?.url && (
            <img
              src={article.heroImage.url}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 60%)',
            }}
          />
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <ArticleBadge article={article} />
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: '20px 20px 24px' }}>
          {article.category && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#d97706',
                display: 'block',
                marginBottom: 8,
              }}
            >
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
          )}
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: '#1e293b',
              lineHeight: 1.3,
              margin: '0 0 10px',
            }}
          >
            {article.title}
          </h3>
          {article.excerpt && (
            <p
              style={{
                fontSize: 13,
                color: '#64748b',
                lineHeight: 1.6,
                margin: '0 0 16px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.excerpt}
            </p>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: '#d97706' }}>
            Read more →
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArticleBadge({ article }: { article: any }) {
  const isEditorial = article.isEditorial !== false
  return (
    <span
      style={{
        display: 'inline-block',
        background: isEditorial ? 'rgba(255,255,255,0.15)' : 'rgba(245,158,11,0.9)',
        backdropFilter: 'blur(4px)',
        border: isEditorial ? '1px solid rgba(255,255,255,0.25)' : 'none',
        color: '#fff',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '3px 10px',
        borderRadius: 9999,
      }}
    >
      {isEditorial ? 'By AmazingTN' : `Sponsored`}
    </span>
  )
}