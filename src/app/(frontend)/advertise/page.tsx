import Link from 'next/link'
import type { Metadata } from 'next'
import HeaderWrapper from '@/components/HeaderWrapper'

export const metadata: Metadata = {
  title: 'Advertise on AmazingTN | Reach Tennessee Travelers',
  description:
    'Get your restaurant or attraction in front of thousands of Tennessee travelers. Featured listing packages starting at $29/month.',
}

const tiers = [
  {
    name: 'Basic', price: 29, priceId: 'basic',
    tagline: 'Get discovered',
    accentColor: '#e2e8f0',
    ctaBg: '#f1f5f9', ctaColor: '#1e293b',
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
    badge: 'Most Popular',
    accentColor: '#f59e0b',
    ctaBg: '#f59e0b', ctaColor: '#0f172a',
    ring: true,
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
    accentColor: '#7c3aed',
    ctaBg: '#7c3aed', ctaColor: '#ffffff',
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
  { icon: '🎯', title: 'High-Intent Audience',  desc: 'Visitors are actively searching for where to eat and what to do — not passively scrolling a feed.' },
  { icon: '🔝', title: 'Rise to the Top',        desc: 'Featured and Premier listings are sorted above organic results in every city and category page.' },
  { icon: '⭐', title: 'Stand Out Visually',     desc: 'Your card gets a featured badge, a highlighted border, and an optional hero photo.' },
  { icon: '📍', title: 'Local Relevance',        desc: 'Shown to travelers actively exploring your city or region — not a national audience.' },
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
    <div style={{ minHeight: '100vh', background: '#fafaf9' }}>
      <HeaderWrapper variant="transparent" />

      {/* ── Hero ── */}
      <div style={{
        position: 'relative', height: '480px', overflow: 'hidden',
        background: '#0f172a', display: 'flex', alignItems: 'center',
        justifyContent: 'center', paddingTop: '100px',
      }}>
        <img
          //src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          //alt="Tennessee dining"
          src="https://images.unsplash.com/photo-1574097880168-21606735d77b?q=80&w=1774"
          alt="Enjoying the peace of Tennessee"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.65)' }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: '640px', padding: '0 24px' }}>
          <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '16px' }}>
            Advertise on AmazingTN
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
            Reach <strong>Tennessee Travelers</strong>
          </h1>
          <p style={{ fontSize: '16.7px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 36px', lineHeight: 1.65 }}>
            Thousands of visitors use AmazingTN every month to discover the best restaurants,
            attractions, and hidden gems across the Volunteer State.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#pricing" style={{
              display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 28px',
              borderRadius: '9999px', background: '#f59e0b', color: '#0f172a',
              fontWeight: 600, fontSize: '14px', textDecoration: 'none',
            }}>
              View Pricing
            </a>
            <a href="mailto:hello@amazingtn.com" style={{
              display: 'inline-flex', alignItems: 'center', height: '44px', padding: '0 28px',
              borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
              fontWeight: 500, fontSize: '14px', textDecoration: 'none',
            }}>
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: '#0f172a', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', textAlign: 'center' }}>
          {[
            { stat: '50k+',   label: 'Monthly Visitors'           },
            { stat: '200+',   label: 'Tennessee Cities & Towns'   },
            { stat: '1,400+', label: 'Restaurants & Attractions'  },
            { stat: 'Top 5',  label: 'TN Travel Searches'         },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div style={{ fontSize: '28px', fontWeight: 700 }}>{stat}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why advertise ── */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>Why AmazingTN</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#1e293b' }}>
              Grow your <strong>Tennessee business</strong>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {benefits.map(b => (
              <div key={b.title} style={{
                background: '#fafaf9', border: '1px solid #e5e5e5', borderRadius: '16px',
                padding: '28px 24px', boxShadow: '0 1px 2px rgba(0,0,0,.05)',
              }}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px' }}>{b.icon}</span>
                <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#1e293b', marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ background: '#fafaf9', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>Pricing</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#1e293b', marginBottom: '8px' }}>
              Simple, <strong>transparent pricing</strong>
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px' }}>No contracts. Cancel anytime.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '960px', margin: '0 auto' }}>
            {tiers.map(tier => (
              <div key={tier.name} style={{
                background: '#fff', borderRadius: '16px', overflow: 'hidden',
                boxShadow: (tier as any).ring
                  ? `0 0 0 2px #f59e0b, 0 8px 24px rgba(245,158,11,0.15)`
                  : '0 1px 2px rgba(0,0,0,.05)',
                border: (tier as any).ring ? 'none' : '1px solid #e5e5e5',
                display: 'flex', flexDirection: 'column', position: 'relative',
              }}>
                <div style={{ height: '5px', background: tier.accentColor }} />
                {(tier as any).badge && (
                  <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                    <span style={{ background: '#f59e0b', color: '#0f172a', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px' }}>
                      {(tier as any).badge}
                    </span>
                  </div>
                )}
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{tier.name}</h3>
                  <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>{tier.tagline}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                    <span style={{ fontSize: '42px', fontWeight: 700, color: '#1e293b' }}>${tier.price}</span>
                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>/month</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: '#475569' }}>
                        <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/advertise/signup?tier=${tier.priceId}`} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: '44px', borderRadius: '9999px',
                    fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                    background: tier.ctaBg, color: tier.ctaColor,
                    boxShadow: '0 1px 3px rgba(0,0,0,.1)',
                  }}>
                    Get started →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '24px' }}>
            Need an annual plan or custom arrangement?{' '}
            <a href="mailto:hello@amazingtn.com" style={{ color: '#d97706' }}>Email us</a>.
          </p>
        </div>
      </section>

      {/* ── Before / after ── */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>See It in Action</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#1e293b' }}>
              What your <strong>listing will look like</strong>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
            {/* Standard */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Standard listing</p>
              <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>
                <div style={{ height: '140px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#cbd5e1' }}>🍽️</div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#1e293b', marginBottom: '4px' }}>The Loveless Cafe</h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>Nashville, TN</p>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['Southern', 'Breakfast'].map(t => (
                      <span key={t} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Featured */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Featured listing ★</p>
              <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 0 0 2px #f59e0b, 0 6px 20px rgba(245,158,11,0.15)' }}>
                <div style={{ height: '140px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🍽️</div>
                <div style={{ padding: '20px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '9999px', background: '#fef3c7', color: '#d97706', marginBottom: '8px' }}>★ Featured</span>
                  <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#1e293b', marginBottom: '2px' }}>The Loveless Cafe</h3>
                  <p style={{ fontSize: '12px', color: '#d97706', fontStyle: 'italic', marginBottom: '4px' }}>Nashville's most beloved biscuits since 1951</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>Nashville, TN</p>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['Southern', 'Breakfast'].map(t => (
                      <span key={t} style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: '#f1f5f9', color: '#475569' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#fafaf9', padding: '80px 0' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>FAQ</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#1e293b' }}>
              Common <strong>questions</strong>
            </h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={faq.q} style={{ padding: '24px 0', borderTop: i === 0 ? 'none' : '1px solid #e5e5e5' }}>
              <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#1e293b', marginBottom: '8px' }}>{faq.q}</h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.65 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <div style={{ background: '#0f172a', padding: '80px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '14px', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '16px' }}>Ready to Grow?</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#fff', marginBottom: '12px' }}>
            Start reaching <strong>Tennessee travelers</strong> today
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '36px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.65 }}>
            Set up your featured listing in under 5 minutes. No contracts, cancel anytime.
          </p>
          <Link href="/advertise/signup?tier=featured" style={{
            display: 'inline-flex', alignItems: 'center', height: '48px', padding: '0 32px',
            borderRadius: '9999px', background: '#f59e0b', color: '#0f172a',
            fontWeight: 600, fontSize: '15px', textDecoration: 'none',
            boxShadow: '0 1px 3px rgba(0,0,0,.2)',
          }}>
            Start with Featured — $79/mo
          </Link>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '20px' }}>
            Questions?{' '}
            <a href="mailto:hello@amazingtn.com" style={{ color: '#fbbf24' }}>hello@amazingtn.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}