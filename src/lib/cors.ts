import { NextResponse } from 'next/server'

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)

function originAllowed(origin?: string) {
  if (!origin) return false
  if (ALLOWED_ORIGINS.length === 0) return true // allow all when not configured
  return ALLOWED_ORIGINS.includes(origin)
}

export function withCors(handler: (...args: any[]) => Promise<Response> | Response) {
  return async (...args: any[]) => {
    const req = args[0] as Request
    const origin = req?.headers?.get('origin') || undefined
    const allowed = originAllowed(origin)

    // Handle preflight
    if (req?.method === 'OPTIONS') {
      const headers: Record<string, string> = {
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Vary': 'Origin',
      }
      if (allowed) headers['Access-Control-Allow-Origin'] = origin || '*'
      // allow credentials when origin allowed
      if (allowed) headers['Access-Control-Allow-Credentials'] = 'true'
      return new Response(null, { status: 204, headers })
    }

    const res = await handler(...args)
    if (res instanceof Response) {
      const newHeaders = new Headers(res.headers)
      if (allowed) newHeaders.set('Access-Control-Allow-Origin', origin || '*')
      newHeaders.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,OPTIONS')
      newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      if (allowed) newHeaders.set('Access-Control-Allow-Credentials', 'true')
      newHeaders.set('Vary', 'Origin')
      return new Response(await res.text(), { status: res.status, headers: newHeaders })
    }

    return res
  }
}
