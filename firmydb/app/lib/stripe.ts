// Stripe integration for FirmyDB
import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe (client-side)
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

// Pricing tiers
export const pricingTiers = [
  {
    id: 'beta',
    name: 'Beta',
    price: 0,
    priceId: null, // No Stripe price for free beta
    currency: 'CZK',
    interval: 'month',
    features: [
      '50+ českých B2B firem',
      'CSV export bez omezení',
      'Pokročilé filtry',
      'Detail na každou firmu',
      'Denní aktualizace',
      'Základní podpora (email)'
    ],
    limits: {
      exports: 10000, // Unlimited for beta
      searches: 10000,
      savedSearches: 5
    },
    highlighted: true,
    available: true
  },
  {
    id: 'startup',
    name: 'Startup',
    price: 1990,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTUP,
    currency: 'CZK',
    interval: 'month',
    features: [
      '1000+ firem v databázi',
      '1k exportů/měsíc',
      'Email enrichment (70%+ pokrytí)',
      'API přístup (1000 req/den)',
      'Pokročilé filtry',
      'Uložené vyhledávání',
      'Emailová podpora'
    ],
    limits: {
      exports: 1000,
      searches: 10000,
      savedSearches: 10
    },
    highlighted: false,
    available: false // Coming soon
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 4990,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
    currency: 'CZK',
    interval: 'month',
    features: [
      '10k+ firem (celé ČR)',
      'Neomezené exporty',
      'CRM integrace (HubSpot, Pipedrive)',
      'Company insights (news, jobs)',
      'API přístup (10k req/den)',
      'Uložené seznamy',
      'Email templates',
      'Prioritní podpora'
    ],
    limits: {
      exports: -1, // Unlimited
      searches: -1,
      savedSearches: -1
    },
    highlighted: true,
    available: false // Coming soon
  }
]

// Get tier by ID
export function getTierById(id: string) {
  return pricingTiers.find(t => t.id === id)
}

// Get tier by price ID
export function getTierByPriceId(priceId: string) {
  return pricingTiers.find(t => t.priceId === priceId)
}

// Check if user has reached limit
export function hasReachedLimit(usage: number, limit: number): boolean {
  if (limit === -1) return false // Unlimited
  return usage >= limit
}

// Format price
export function formatPrice(price: number, currency: string = 'CZK'): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0
  }).format(price)
}

// Create checkout session (server-side function - placeholder)
export async function createCheckoutSession(priceId: string, customerId?: string) {
  // This would be called from API route
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      priceId,
      customerId
    })
  })
  
  const session = await response.json()
  return session
}

// Redirect to checkout
export async function redirectToCheckout(priceId: string) {
  const session = await createCheckoutSession(priceId)
  
  // Redirect to Stripe Checkout URL directly
  if (session.url) {
    window.location.href = session.url
  } else {
    throw new Error('No checkout URL returned')
  }
}
