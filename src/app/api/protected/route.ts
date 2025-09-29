import { NextResponse } from 'next/server'
import { requireAuth } from '../../../lib/middleware/auth'
import { withCors } from '../../../lib/cors'

async function handler(req: Request) {
  const payload = await requireAuth(req)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ ok: true, payload })
}

export const GET = withCors(handler)
