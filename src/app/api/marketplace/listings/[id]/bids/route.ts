import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { withCors } from '@/lib/cors'
import { requireAuth } from '@/lib/middleware/auth'

async function handler(req: Request) {
  if (req.method !== 'POST') return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })

  const payload = await requireAuth(req)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // extract id param from URL path
  const url = new URL(req.url)
  const pathParts = url.pathname.split('/')
  const id = pathParts[pathParts.length - 2] === 'listings' ? pathParts[pathParts.length - 1] : pathParts[pathParts.length - 2]
  let body: any
  try { body = await req.json() } catch (e) { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const amount = Number(body.amount)
  if (!amount || Number.isNaN(amount) || amount <= 0) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })

  // Load listing and product seller info
  const listing = await prisma.listing.findUnique({ where: { id }, include: { bids: true, product: { include: { seller: true } } } })
  if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })

  // Prevent seller from bidding on their own listing
  if (listing.product?.sellerId && listing.product.sellerId === payload.sub) {
    return NextResponse.json({ error: 'Cannot bid on your own listing' }, { status: 403 })
  }

  const highest = listing.bids.reduce((max, b) => (b.amount > max ? b.amount : max), 0)
  if (listing.startingBid && amount < listing.startingBid) return NextResponse.json({ error: 'Bid below starting bid' }, { status: 400 })
  if (amount <= highest) return NextResponse.json({ error: 'Bid must be higher than current highest' }, { status: 400 })

  const bid = await prisma.bid.create({
    data: {
      amount,
      bidderId: payload.sub,
      listingId: id,
    }
  })

  return NextResponse.json({ ok: true, bid })
}

export const POST = withCors(handler)
