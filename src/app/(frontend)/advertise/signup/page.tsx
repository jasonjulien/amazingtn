'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import HeaderWrapper from '@/components/HeaderWrapper'
import Link from 'next/link'

const TIER_LABELS: Record<string, { label: string; price: number; color: string }> = {
  basic:    { label: 'Basic',    price: 29,  color: '#475569' },
  featured: { label: 'Featured', price: 79,  color: '#f59e0b' },
  premier:  { label: 'Premier',  price: 149, color: '#7c3aed' },
}

const LISTING_TYPES = [
  { value: 'restaurant',   label: 'Restaurant' },
  { value: 'destination',  label: 'Destination / Attraction' },
  { value: 'event',        label: 'Event' },
  { value: 'city',         label: 'City Page' },
]

export default function SignupPage() {
  const params = useSearchParams()
  const router = useRouter()
  const rawTier = params.get('tier') || 'featured'
  const tier = TIER_LABELS[rawTier] ? rawTier : 'featured'
  const { label, price, color } = TIER_LABELS[tier]

  const [form, setForm] = useState({
    businessName:  '',
    contactName:   '',
    contactEmail:  '',
    contactPhone:  '',
    website:       '',
    linkedType:    'restaurant',
    listingName:   '',
    notes:         '',
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const sponsorRes = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tier, status: 'pending' }),
      })
      const sponsorData = await sponsorRes.json()
      if (!sponsorRes.ok) throw new Error(sponsorData?.errors?.[0]?.message || 'Could not create listing')

      const checkoutRes = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, sponsorId: sponsorData.doc.id, email: form.contactEmail, businessName: form.businessName }),
      })
      const { url } = await checkoutRes.json()
      if (!url) throw new Error('Could not start checkout')
      window.location.href = url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: '42px', padding: '0 14px',
    border: '1px solid #e5e5e5', borderRadius: '9999px',
    fontSize: '14px', outline: 'none', background: '#fff',
    fontFamily: 'inherit', color: '#1e293b', boxSizing: 'border-box',
  }

  const textareaStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px',
    border: '1px solid #e5e5e5', borderRadius: '12px',
    fontSize: '14px', outline: 'none', background: '#fff',
    fontFamily: 'inherit', color: '#1e293b', resize: 'vertical',
    boxSizing: 'border-box',
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none' as const,
    cursor: 'pointer',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9' }}>
      <HeaderWrapper variant="white" />

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '140px 24px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '14px', color: '#d97706', textTransform: 'uppercase', letterSpacing: '4.2px', marginBottom: '12px' }}>
            Get Featured
          </p>
          <h1 style={{ fontSize: '34px', fontWeight: 400, color: '#1e293b', marginBottom: '8px' }}>
            List your <strong>Tennessee business</strong>
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', marginBottom: '24px' }}>
            You selected the{' '}
            <strong style={{ color }}>{label} plan — ${price}/month</strong>
          </p>

          {/* Tier switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {Object.entries(TIER_LABELS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => router.push(`/advertise/signup?tier=${key}`)}
                style={{
                  height: '32px', padding: '0 16px', borderRadius: '9999px',
                  fontSize: '12px', fontWeight: key === tier ? 600 : 400,
                  border: key === tier ? 'none' : '1px solid #e5e5e5',
                  background: key === tier ? val.color : '#fff',
                  color: key === tier ? '#fff' : '#475569',
                  cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                }}
              >
                {val.label} ${val.price}
              </button>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e5e5', padding: '40px', boxShadow: '0 1px 2px rgba(0,0,0,.05)' }}>

          <form onSubmit={handleSubmit}>

            {/* Business info */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
                Business Info
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Field label="Business name" required>
                  <input type="text" required value={form.businessName} onChange={set('businessName')} placeholder="e.g. The Loveless Cafe" style={inputStyle} />
                </Field>
                <Field label="Your name" required>
                  <input type="text" required value={form.contactName} onChange={set('contactName')} placeholder="First and last name" style={inputStyle} />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Field label="Email" required>
                    <input type="email" required value={form.contactEmail} onChange={set('contactEmail')} placeholder="you@example.com" style={inputStyle} />
                  </Field>
                  <Field label="Phone">
                    <input type="tel" value={form.contactPhone} onChange={set('contactPhone')} placeholder="(615) 000-0000" style={inputStyle} />
                  </Field>
                </div>
                <Field label="Website URL">
                  <input type="url" value={form.website} onChange={set('website')} placeholder="https://yourbusiness.com" style={inputStyle} />
                </Field>
              </div>
            </div>

            {/* Listing info */}
            <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '1px solid #e5e5e5' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
                Your Listing
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Field label="Listing type" required>
                  <select required value={form.linkedType} onChange={set('linkedType')} style={selectStyle}>
                    {LISTING_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Listing name" required>
                  <input type="text" required value={form.listingName} onChange={set('listingName')} placeholder="How it appears on AmazingTN" style={inputStyle} />
                </Field>
                <Field label="Anything else we should know?">
                  <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Special requests, multiple locations, etc." style={textareaStyle} />
                </Field>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ fontSize: '13px', color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: '48px', borderRadius: '9999px',
                background: loading ? '#94a3b8' : '#f59e0b', color: '#0f172a',
                fontWeight: 700, fontSize: '15px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                boxShadow: '0 1px 3px rgba(0,0,0,.1)', transition: 'background 0.15s ease',
              }}
            >
              {loading ? 'Redirecting to checkout…' : `Continue to payment — $${price}/mo`}
            </button>

            <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
              Secure checkout via Stripe. Cancel anytime. No long-term contracts.
            </p>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#94a3b8' }}>
          Have questions?{' '}
          <a href="mailto:hello@amazingtn.com" style={{ color: '#d97706' }}>hello@amazingtn.com</a>
          {' · '}
          <Link href="/advertise" style={{ color: '#d97706' }}>View all plans</Link>
        </p>
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#475569', marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}