'use client'

import React from 'react'
import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import { mediaUrl } from '@/lib/mediaUrl'

interface ArticleClientProps {
  article: any
}

export default function ArticleClient({ article }: ArticleClientProps) {
  const heroUrl = article.heroImage ? mediaUrl(article.heroImage) : null

  const heroCredit = null

  const isEditorial = article.isEditorial !== false
  const hasSponsor = !isEditorial && article.sponsorName

  const sponsorLogoUrl =
    typeof article.sponsorLogo === 'object' && article.sponsorLogo?.url
      ? article.sponsorLogo.url
      : null

  const formattedDate = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      <HeaderWrapper variant="transparent" />

      <main style={{ background: '#fafaf9', minHeight: '100vh' }}>
        {/* Hero */}
        <div
          style={{
            position: 'relative',
            height: 520,
            overflow: 'hidden',
            background: '#1e293b',
          }}
        >
          {heroUrl && (
            <img
              src={heroUrl}
              alt={article.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          )}
          {/* Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.75) 100%)',
            }}
          />
          {/* Photo credit — fades in on hover */}
          {heroCredit && (
            <div
              className="photo-credit"
              style={{
                position: 'absolute',
                bottom: 12,
                right: 16,
                background: 'rgba(0,0,0,0.45)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 4,
                opacity: 0,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
              }}
            >
              {heroCredit}
            </div>
          )}
          {/* Hero text */}
          <div
            style={{
              position: 'absolute',
              bottom: 64,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: 800,
              padding: '0 24px',
            }}
          >
            {/* Category pill */}
            {article.category && (
              <div style={{ marginBottom: 16 }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    borderRadius: 9999,
                  }}
                >
                  {article.category}
                </span>
              </div>
            )}
            <h1
              style={{
                color: '#fff',
                fontSize: 44,
                fontWeight: 700,
                lineHeight: 1.1,
                margin: '0 0 20px',
                letterSpacing: '-0.5px',
              }}
            >
              {article.title}
            </h1>
            {/* Byline row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              {isEditorial ? (
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
                  By <strong style={{ color: '#fff' }}>AmazingTN</strong>
                </span>
              ) : hasSponsor ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(245,158,11,0.15)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: 9999,
                    padding: '4px 14px 4px 10px',
                  }}
                >
                  {sponsorLogoUrl && (
                    <img
                      src={sponsorLogoUrl}
                      alt={article.sponsorName}
                      style={{ height: 20, width: 'auto', borderRadius: 4 }}
                    />
                  )}
                  <span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 500 }}>
                    Sponsored by {article.sponsorName}
                  </span>
                </div>
              ) : null}
              {formattedDate && (
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                  {formattedDate}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body + Sidebar layout */}
        <div
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            padding: '64px 24px 96px',
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Article body */}
          <article>
            {/* Excerpt / lede */}
            {article.excerpt && (
              <p
                style={{
                  fontSize: 20,
                  lineHeight: 1.7,
                  color: '#475569',
                  fontStyle: 'italic',
                  borderLeft: '3px solid #f59e0b',
                  paddingLeft: 20,
                  marginBottom: 40,
                }}
              >
                {article.excerpt}
              </p>
            )}

            {/* Rich text body */}
            {article.body && (
              <div className="article-body" style={{ color: '#1e293b' }}>
                <RichTextRenderer content={article.body} />
              </div>
            )}

            {/* Related links */}
            <div
              style={{
                marginTop: 56,
                paddingTop: 32,
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              {article.relatedRegion && typeof article.relatedRegion === 'object' && (
                <Link
                  href={`/regions/${article.relatedRegion.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: 9999,
                    textDecoration: 'none',
                  }}
                >
                  ← {article.relatedRegion.name} Region
                </Link>
              )}
              {article.relatedCity && typeof article.relatedCity === 'object' && (
                <Link
                  href={`/cities/${article.relatedCity.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: 9999,
                    textDecoration: 'none',
                  }}
                >
                  ← {article.relatedCity.name}
                </Link>
              )}
              {article.relatedDestination && typeof article.relatedDestination === 'object' && (
                <Link
                  href={`/destinations/${article.relatedDestination.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#f1f5f9',
                    color: '#475569',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: 9999,
                    textDecoration: 'none',
                  }}
                >
                  ← {article.relatedDestination.name}
                </Link>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 104 }}>
            {/* CTA card — only show on editorial articles */}
            {isEditorial && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)',
                  border: '1px solid #fde68a',
                  borderRadius: 16,
                  padding: 28,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    background: '#f59e0b',
                    color: '#0f172a',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    padding: '3px 10px',
                    borderRadius: 9999,
                    marginBottom: 16,
                  }}
                >
                  For Businesses
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#1e293b',
                    margin: '0 0 10px',
                    lineHeight: 1.3,
                  }}
                >
                  Get your business featured like this
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: '#475569',
                    lineHeight: 1.6,
                    margin: '0 0 20px',
                  }}
                >
                  AmazingTN's Sponsored Articles put your story in front of Tennessee travelers
                  actively planning their next trip.
                </p>
                <Link
                  href="/advertise"
                  style={{
                    display: 'block',
                    background: '#f59e0b',
                    color: '#0f172a',
                    fontWeight: 600,
                    fontSize: 14,
                    textAlign: 'center',
                    padding: '12px 20px',
                    borderRadius: 9999,
                    textDecoration: 'none',
                  }}
                >
                  See Packages →
                </Link>
              </div>
            )}

            {/* Explore More card */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                padding: 24,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#d97706',
                  margin: '0 0 12px',
                }}
              >
                Explore More
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link
                  href="/regions/middle-tennessee"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#1e293b',
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <span>🗺️</span> Middle Tennessee Region
                </Link>
                <Link
                  href="/explore?category=history"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#1e293b',
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <span>🏛️</span> History &amp; Culture
                </Link>
                <Link
                  href="/explore?category=outdoors"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#1e293b',
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: 'none',
                    padding: '8px 0',
                  }}
                >
                  <span>🥾</span> Outdoors &amp; Nature
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Styles */}
      <style>{`
        .article-body {
          font-size: 17px;
          line-height: 1.8;
          color: #334155;
        }
        .article-body h1,
        .article-body h2,
        .article-body h3 {
          color: #1e293b;
          font-weight: 700;
          line-height: 1.25;
          margin: 2em 0 0.75em;
        }
        .article-body h2 { font-size: 26px; }
        .article-body h3 { font-size: 20px; }
        .article-body p { margin: 0 0 1.4em; }
        .article-body ul,
        .article-body ol {
          padding-left: 24px;
          margin: 0 0 1.4em;
        }
        .article-body li { margin-bottom: 0.4em; }
        .article-body strong { color: #1e293b; }
        .article-body a {
          color: #d97706;
          text-decoration: underline;
        }
        .article-body a:hover { color: #b45309; }
        .article-body blockquote {
          border-left: 3px solid #f59e0b;
          padding-left: 20px;
          margin: 2em 0;
          font-style: italic;
          color: #475569;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 2.5em 0;
        }
        div:hover > .photo-credit { opacity: 1 !important; }
      `}</style>
    </>
  )
}

// Minimal Payload rich text renderer
function RichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root) return null
  return <>{renderNodes(content.root.children)}</>
}

function renderNodes(nodes: any[]): React.ReactNode {
  if (!nodes) return null
  return nodes.map((node, i) => renderNode(node, i))
}

function renderNode(node: any, key: number): React.ReactNode {
  switch (node.type) {
    case 'heading': {
      const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return <Tag key={key}>{renderNodes(node.children)}</Tag>
    }
    case 'paragraph':
      return <p key={key}>{renderNodes(node.children)}</p>
    case 'text': {
      let el: React.ReactNode = node.text
      if (node.format & 1) el = <strong>{el}</strong>
      if (node.format & 2) el = <em>{el}</em>
      return <span key={key}>{el}</span>
    }
    case 'list':
      return node.listType === 'number' ? (
        <ol key={key}>{renderNodes(node.children)}</ol>
      ) : (
        <ul key={key}>{renderNodes(node.children)}</ul>
      )
    case 'listitem':
      return <li key={key}>{renderNodes(node.children)}</li>
    case 'quote':
      return <blockquote key={key}>{renderNodes(node.children)}</blockquote>
    case 'horizontalrule':
      return <hr key={key} />
    case 'link':
      return (
        <a key={key} href={node.fields?.url || '#'}>
          {renderNodes(node.children)}
        </a>
      )
    default:
      return null
  }
}
