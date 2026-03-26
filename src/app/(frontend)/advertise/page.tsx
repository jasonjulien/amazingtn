import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderWrapper from '@/components/HeaderWrapper'

export const metadata: Metadata = {
  title: 'Advertise on AmazingTN | Reach Tennessee Travelers',
  description:
    'Get your restaurant or attraction in front of thousands of Tennessee travelers. Featured listing packages starting at $29/month.',
}

const C = {
  navy:     '#1a2e3b',
  navyDark: '#162433',
  teal:     '#4db896',
  amber:    '#f5a623',
  offWhite: '#f7f7f4',
}

const tiers = [
  {
    name: 'Basic', price: 29, priceId: 'basic',
    tagline: 'Get discovered',
    accentColor: '#e5e7eb', ctaBg: '#f3f4f6', ctaColor: '#1f2937',
    features: [
      '"Sponsored" badge on your listing card',
      'Listed in search & filter results',
      'Contact info + website link displayed',
      'Appears in category pages',
    ],
  },
  {
    name: 'Featured', price: 79, priceId: 'featured',
    tagline: 'Stand out from the crowd',
    badge: 'Most popular',
    accentColor: '#4db896', ctaBg: '#4db896', ctaColor: '#ffffff', ring: true,
    features: [
      'Everything in Basic',
      'Boosted to top of all category pages',
      'Featured image on listing card',
      'Highlighted card border treatment',
      'Included in "Featured" filter tab',
      'Priority placement on city pages',
    ],
  },
  {
    name: 'Premier', price: 149, priceId: 'premier',
    tagline: 'Maximum Tennessee exposure',
    accentColor: '#f5a623', ctaBg: '#f5a623', ctaColor: '#ffffff',
    features: [
      'Everything in Featured',
      'Custom promotional tagline on card',
      'Rotating homepage spotlight section',
      'Monthly social media mention',
      'Analytics dashboard (coming soon)',
      'Dedicated account manager',
    ],
  },
]

const benefits = [
  { icon: '🎯', title: 'High-intent audience',  desc: 'Visitors are actively searching for where to eat and what to do — not passively scrolling a feed.' },
  { icon: '🔝', title: 'Rise to the top',        desc: 'Featured and Premier listings are sorted above organic results in every city and category page.' },
  { icon: '⭐', title: 'Stand out visually',     desc: 'Your card gets a featured badge, a highlighted border, and an optional hero photo.' },
  { icon: '📍', title: 'Local relevance',        desc: 'Shown to travelers actively exploring your city or region — not a national audience.' },
]

const faqs = [
  { q: 'How long does it take to go live?',        a: 'Your listing is activated automatically after checkout. It typically appears within a few minutes.' },
  { q: 'Is this a monthly subscription?',          a: 'Yes. Billed monthly, cancel anytime — no contracts or long-term commitments.' },
  { q: "What if my restaurant isn't listed yet?",  a: "Sign up and we'll add your listing during onboarding. Name, address, and cuisine type is all we need." },
  { q: 'Can I upgrade my tier later?',             a: 'Absolutely. Email hello@amazingtn.com and we will prorate the difference.' },
  { q: 'Do you offer annual plans?',               a: 'Annual plans (two months free) are available — just email us to get set up.' },
]

export default function AdvertisePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#111827' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{
        // Falls back gracefully to solid navy if the image isn't present yet
        background: `linear-gradient(to bottom, rgba(15,30,45,0.65) 0%, rgba(26,46,59,0.92) 100%), url('/images/advertise-hero.jpg') center/cover no-repeat`,
        color: '#fff',
        paddingTop: 180,    // clears fixed 100px header generously
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle teal glow */}
        <div style={{
          position: 'absolute', top: -80, right: '15%',
          width: 320, height: 320, borderRadius: '50%',
          background: `${C.teal}18`, filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <p style={{ color: C.teal, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontWeight: 600, marginBottom: 12 }}>
            Advertise
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.12, marginBottom: 16 }}>
            Reach <span style={{ color: C.teal }}>Tennessee Travelers</span>
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: 17, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.6 }}>
            Thousands of visitors use AmazingTN every month to discover the best restaurants,
            attractions, and hidden gems across the Volunteer State.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pricing" style={{
              display: 'inline-block', background: C.amber, color: '#fff',
              fontWeight: 600, padding: '13px 30px', borderRadius: 12,
              textDecoration: 'none', fontSize: 15,
            }}>
              View pricing
            </a>
            <a href="mailto:hello@amazingtn.com" style={{
              display: 'inline-block', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
              fontWeight: 600, padding: '13px 30px', borderRadius: 12,
              textDecoration: 'none', fontSize: 15,
            }}>
              Contact us
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <div style={{ background: C.navyDark, color: '#fff' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', padding: '24px',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, textAlign: 'center',
        }}>
          {[
            { stat: '50k+',   label: 'Monthly visitors'           },
            { stat: '200+',   label: 'Tennessee cities & towns'   },
            { stat: '1,400+', label: 'Restaurants & attractions'  },
            { stat: 'Top 5',  label: 'TN travel searches'         },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why advertise ─────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ color: C.teal, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>Why AmazingTN</p>
        <h2 style={{ fontSize: 26, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Grow your Tennessee business</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 20 }}>
          {benefits.map(b => (
            <div key={b.title} style={{
              background: '#fff', border: '1px solid #f1f0ec', borderRadius: 16,
              padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <span style={{ fontSize: 24 }}>{b.icon}</span>
              <h3 style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{b.title}</h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: C.offWhite, padding: '64px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ color: C.teal, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>Pricing</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Simple, transparent pricing</h2>
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 14, marginBottom: 40 }}>No contracts. Cancel anytime.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {tiers.map(tier => (
              <div key={tier.name} style={{
                background: '#fff', borderRadius: 20, overflow: 'hidden',
                boxShadow: (tier as any).ring
                  ? `0 0 0 2px ${C.teal}, 0 8px 24px ${C.teal}28`
                  : '0 1px 4px rgba(0,0,0,0.08)',
                display: 'flex', flexDirection: 'column', position: 'relative',
              }}>
                <div style={{ height: 6, background: tier.accentColor }} />
                {(tier as any).badge && (
                  <div style={{ position: 'absolute', top: 18, right: 18 }}>
                    <span style={{ background: C.teal, color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999 }}>
                      {(tier as any).badge}
                    </span>
                  </div>
                )}
                <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{tier.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 16 }}>{tier.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                    <span style={{ fontSize: 40, fontWeight: 700 }}>${tier.price}</span>
                    <span style={{ color: '#9ca3af', fontSize: 13 }}>/month</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#374151' }}>
                        <span style={{ color: C.teal, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/advertise/signup?tier=${tier.priceId}`} style={{
                    display: 'block', textAlign: 'center', padding: '12px 20px',
                    borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: 'none',
                    background: tier.ctaBg, color: tier.ctaColor,
                  }}>
                    Get started →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 24 }}>
            Need an annual plan or custom arrangement?{' '}
            <a href="mailto:hello@amazingtn.com" style={{ color: C.teal }}>Email us</a>.
          </p>
        </div>
      </section>

      {/* ── Before / after ────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ color: C.teal, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>See it in action</p>
        <h2 style={{ fontSize: 26, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>What your listing will look like</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Standard */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Standard listing</p>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 130, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#d1d5db' }}>🍽️</div>
              <div style={{ padding: 16 }}>
                <h3 style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>The Loveless Cafe</h3>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>📍 Nashville, TN</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {['Southern','Breakfast'].map(t => <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#f3f4f6', color: '#6b7280' }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
          {/* Featured */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: C.teal, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Featured listing ★</p>
            <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: `0 0 0 2px ${C.teal}, 0 6px 20px ${C.teal}20` }}>
              <div style={{ height: 130, background: `linear-gradient(135deg, ${C.navy}, #2a4a5e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🍽️</div>
              <div style={{ padding: 16 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', marginBottom: 8 }}>★ Featured</span>
                <h3 style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>The Loveless Cafe</h3>
                <p style={{ fontSize: 12, color: '#d97706', fontStyle: 'italic', marginBottom: 4 }}>Nashville's most beloved biscuits since 1951</p>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>📍 Nashville, TN</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  {['Southern','Breakfast'].map(t => <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#f3f4f6', color: '#6b7280' }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: '64px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ color: C.teal, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontWeight: 600, textAlign: 'center', marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, textAlign: 'center', marginBottom: 40 }}>Common questions</h2>
          {faqs.map((faq, i) => (
            <div key={faq.q} style={{ padding: '20px 0', borderTop: i === 0 ? 'none' : '1px solid #e5e7eb' }}>
              <h3 style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 6 }}>{faq.q}</h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navy}, ${C.navyDark})`,
        color: '#fff', padding: '64px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: '25%', width: 240, height: 240, borderRadius: '50%', background: `${C.teal}14`, filter: 'blur(48px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
          <p style={{ color: C.teal, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, fontWeight: 600, marginBottom: 12 }}>Ready to grow?</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Start reaching Tennessee travelers today</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 32 }}>Set up your featured listing in under 5 minutes. No contracts, cancel anytime.</p>
          <Link href="/advertise/signup?tier=featured" style={{
            display: 'inline-block', background: C.amber, color: '#fff',
            fontWeight: 600, padding: '13px 30px', borderRadius: 12, textDecoration: 'none', fontSize: 15,
          }}>
            Start with Featured — $79/mo
          </Link>
          <p style={{ color: '#64748b', fontSize: 12, marginTop: 20 }}>
            Questions? <a href="mailto:hello@amazingtn.com" style={{ color: C.teal }}>hello@amazingtn.com</a>
          </p>
        </div>
      </section>
    </div>
  )
}