import { NextResponse } from 'next/server'
import { verifyToken, getUserById } from '../../../../lib/auth'
import { withCors } from '../../../../lib/cors'
import { parseCookieHeader } from '../../../../lib/cookies'

async function handler(req: Request) {
  try {
    const body = await req.json()
    let { token } = body
    if (!token) {
      // try cookie
      const cookies = parseCookieHeader(req.headers.get('cookie'))
      token = cookies.token
    }
    if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    const payload: any = verifyToken(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    const user = getUserById(String(payload.sub))
    return NextResponse.json({ valid: true, user })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}

export const POST = withCors(handler)
