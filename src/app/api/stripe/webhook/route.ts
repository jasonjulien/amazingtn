import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Disable Next.js body parsing — Stripe needs the raw body to verify the signature
export const config = {
  api: { bodyParser: false },
}

async function getRawBody(req: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = []
  const reader = req.body?.getReader()
  if (!reader) return Buffer.from('')
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) chunks.push(value)
  }
  return Buffer.concat(chunks)
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  const rawBody = await getRawBody(req)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] Signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  switch (event.type) {
    // ── Payment succeeded: activate the sponsor ──────────────────────────────
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const { sponsorId } = session.metadata || {}
      if (!sponsorId) break

      const now = new Date()
      const expiresAt = new Date(now)
      expiresAt.setMonth(expiresAt.getMonth() + 1)

      await payload.update({
        collection: 'sponsors',
        id: sponsorId,
        data: {
          status: 'active',
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          stripeCheckoutSessionId: session.id,
          startsAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
        },
      })
      console.log(`[webhook] Sponsor ${sponsorId} activated`)
      break
    }

    // ── Subscription renewed: extend expiry ─────────────────────────────────
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const subId = invoice.subscription as string
      if (!subId) break

      const results = await payload.find({
        collection: 'sponsors',
        where: { stripeSubscriptionId: { equals: subId } },
        limit: 1,
      })
      const sponsor = results.docs[0]
      if (!sponsor) break

      const newExpiry = new Date()
      newExpiry.setMonth(newExpiry.getMonth() + 1)
      await payload.update({
        collection: 'sponsors',
        id: sponsor.id,
        data: {
          status: 'active',
          expiresAt: newExpiry.toISOString(),
        },
      })
      console.log(`[webhook] Sponsor ${sponsor.id} renewed`)
      break
    }

    // ── Subscription cancelled or payment failed: expire ────────────────────
    case 'customer.subscription.deleted':
    case 'invoice.payment_failed': {
      const obj = event.data.object as Stripe.Subscription | Stripe.Invoice
      const subId =
        event.type === 'customer.subscription.deleted'
          ? (obj as Stripe.Subscription).id
          : ((obj as Stripe.Invoice).subscription as string)

      if (!subId) break

      const results = await payload.find({
        collection: 'sponsors',
        where: { stripeSubscriptionId: { equals: subId } },
        limit: 1,
      })
      const sponsor = results.docs[0]
      if (!sponsor) break

      await payload.update({
        collection: 'sponsors',
        id: sponsor.id,
        data: {
          status: event.type === 'customer.subscription.deleted' ? 'cancelled' : 'expired',
        },
      })
      console.log(`[webhook] Sponsor ${sponsor.id} deactivated (${event.type})`)
      break
    }

    default:
      // Ignore unhandled event types
      break
  }

  return NextResponse.json({ received: true })
}