import { NextResponse } from 'next/server'
import { verifyRefreshToken, rotateRefreshToken, signToken, getUserById } from '../../../../lib/auth'
import { withCors } from '../../../../lib/cors'
import { parseCookieHeader, createAuthCookie, createRefreshCookie } from '../../../../lib/cookies'

async function handler(req: Request) {
  try {
    const cookies = parseCookieHeader(req.headers.get('cookie'))
    const token = cookies.refresh
    if (!token) return NextResponse.json({ error: 'Missing refresh token' }, { status: 401 })
    const verified = await verifyRefreshToken(token)
    if (!verified) return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 })
    const rotated = await rotateRefreshToken(token, verified.userId)
    if (!rotated) return NextResponse.json({ error: 'Unable to rotate refresh token' }, { status: 500 })
    const accessToken = signToken({ sub: verified.userId })
    const res = NextResponse.json({ user: await getUserById(verified.userId) })
    res.headers.append('Set-Cookie', createAuthCookie(accessToken))
    res.headers.append('Set-Cookie', createRefreshCookie(rotated.token))
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}

export const POST = withCors(handler)
