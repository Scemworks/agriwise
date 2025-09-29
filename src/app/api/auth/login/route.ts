import { NextResponse } from 'next/server'
import { verifyCredentials, signToken, createRefreshToken } from '../../../../lib/auth'
import { withCors } from '../../../../lib/cors'
import { createAuthCookie, createRefreshCookie } from '../../../../lib/cookies'

async function handler(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }
    const user = await verifyCredentials(email, password)
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const token = signToken({ sub: user.id, email: user.email })
  const refresh = await createRefreshToken(user.id)
  const res = NextResponse.json({ user })
  res.headers.set('Set-Cookie', createAuthCookie(token))
  res.headers.append('Set-Cookie', createRefreshCookie(refresh.token))
  return res
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}

export const POST = withCors(handler)
