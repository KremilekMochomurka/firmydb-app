import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-02-25.clover'
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { priceId, customerId } = req.body

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' })
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
      metadata: {
        priceId
      }
    }

    // If customer ID provided, use it
    if (customerId) {
      sessionParams.customer = customerId
    } else {
      // Collect email for new customers
      sessionParams.customer_email = undefined // User will enter email
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    res.status(200).json({ id: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      message: error.message 
    })
  }
}
