'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const TIER_LABELS: Record<string, { label: string; price: number }> = {
  basic: { label: 'Basic', price: 29 },
  featured: { label: 'Featured', price: 79 },
  premier: { label: 'Premier', price: 149 },
}

const LISTING_TYPES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'destination', label: 'Destination / Attraction' },
  { value: 'event', label: 'Event' },
  { value: 'city', label: 'City Page' },
]

export default function SignupPage() {
  const params = useSearchParams()
  const router = useRouter()
  const rawTier = params.get('tier') || 'featured'
  const tier = TIER_LABELS[rawTier] ? rawTier : 'featured'
  const { label, price } = TIER_LABELS[tier]

  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    linkedType: 'restaurant',
    listingName: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. Create a pending sponsor record in Payload
      const sponsorRes = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tier,
          status: 'pending',
        }),
      })
      const sponsorData = await sponsorRes.json()
      if (!sponsorRes.ok) throw new Error(sponsorData?.errors?.[0]?.message || 'Could not create listing')

      // 2. Start Stripe Checkout session
      const checkoutRes = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          sponsorId: sponsorData.doc.id,
          email: form.contactEmail,
          businessName: form.businessName,
        }),
      })
      const { url } = await checkoutRes.json()
      if (!url) throw new Error('Could not start checkout')

      // 3. Redirect to Stripe
      window.location.href = url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Get your listing featured</h1>
          <p className="text-gray-500 mt-1">
            You selected the{' '}
            <span className="font-semibold text-blue-700">
              {label} plan — ${price}/month
            </span>
          </p>
          <div className="flex justify-center gap-3 mt-3">
            {Object.entries(TIER_LABELS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => router.push(`/advertise/signup?tier=${key}`)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  key === tier
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-600 hover:border-blue-400'
                }`}
              >
                {val.label} ${val.price}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5"
        >
          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Business info
            </legend>
            <div className="space-y-4">
              <Field label="Business name" required>
                <input
                  type="text"
                  required
                  value={form.businessName}
                  onChange={set('businessName')}
                  placeholder="e.g. The Loveless Cafe"
                  className={inputCls}
                />
              </Field>
              <Field label="Your name" required>
                <input
                  type="text"
                  required
                  value={form.contactName}
                  onChange={set('contactName')}
                  placeholder="First and last name"
                  className={inputCls}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" required>
                  <input
                    type="email"
                    required
                    value={form.contactEmail}
                    onChange={set('contactEmail')}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={set('contactPhone')}
                    placeholder="(615) 000-0000"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Website URL">
                <input
                  type="url"
                  value={form.website}
                  onChange={set('website')}
                  placeholder="https://yourbusiness.com"
                  className={inputCls}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              What are you listing?
            </legend>
            <div className="space-y-4">
              <Field label="Listing type" required>
                <select
                  required
                  value={form.linkedType}
                  onChange={set('linkedType')}
                  className={inputCls}
                >
                  {LISTING_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Listing name / search it by" required>
                <input
                  type="text"
                  required
                  value={form.listingName}
                  onChange={set('listingName')}
                  placeholder="How it appears on AmazingTN"
                  className={inputCls}
                />
              </Field>
              <Field label="Anything else we should know?">
                <textarea
                  value={form.notes}
                  onChange={set('notes')}
                  rows={3}
                  placeholder="Special requests, multiple locations, etc."
                  className={inputCls}
                />
              </Field>
            </div>
          </fieldset>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Redirecting to checkout…' : `Continue to payment — $${price}/mo`}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Secure checkout via Stripe. Cancel anytime. No long-term contracts.
          </p>
        </form>
      </div>
    </main>
  )
}

const inputCls =
  'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}