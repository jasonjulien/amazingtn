import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Map tier slugs to Stripe Price IDs.
// Create these in your Stripe dashboard (Products → Prices) and paste the IDs here.
// They should be recurring monthly prices.
const TIER_PRICE_IDS: Record<string, string> = {
  basic: process.env.STRIPE_PRICE_BASIC!,
  featured: process.env.STRIPE_PRICE_FEATURED!,
  premier: process.env.STRIPE_PRICE_PREMIER!,
}

export async function POST(req: NextRequest) {
  try {
    const { tier, sponsorId, email, businessName } = await req.json()

    const priceId = TIER_PRICE_IDS[tier]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        sponsorId,
        tier,
        businessName,
      },
      subscription_data: {
        metadata: { sponsorId, tier },
      },
      success_url: `${baseUrl}/advertise/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/advertise/signup?tier=${tier}&cancelled=1`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return NextResponse.json({ error: 'Checkout session failed' }, { status: 500 })
  }
}