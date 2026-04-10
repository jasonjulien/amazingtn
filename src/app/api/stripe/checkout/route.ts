import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const TIER_PRICE_IDS: Record<string, string> = {
  basic:    process.env.STRIPE_PRICE_BASIC!,
  featured: process.env.STRIPE_PRICE_FEATURED!,
  premier:  process.env.STRIPE_PRICE_PREMIER!,
  article:  process.env.STRIPE_PRICE_ARTICLE!,
}

// One-time payment tiers (vs subscription)
const ONE_TIME_TIERS = new Set(['article'])

export async function POST(req: NextRequest) {
  try {
    const { tier, sponsorId, email, businessName, businessUrl, articleTopic } = await req.json()

    const priceId = TIER_PRICE_IDS[tier]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const isOneTime = ONE_TIME_TIERS.has(tier)

    const session = await stripe.checkout.sessions.create({
      mode: isOneTime ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        sponsorId:    sponsorId ?? '',
        tier,
        businessName,
        businessUrl:  businessUrl ?? '',
        articleTopic: articleTopic ?? '',
      },
      ...(isOneTime ? {} : {
        subscription_data: {
          metadata: { sponsorId, tier },
        },
      }),
      success_url: `${baseUrl}/advertise/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/advertise/signup?tier=${tier}&cancelled=1`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return NextResponse.json({ error: 'Checkout session failed' }, { status: 500 })
  }
}