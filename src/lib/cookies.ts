export function createAuthCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const secure = process.env.NODE_ENV === 'production'
  const cookie = [`token=${token}`]
  cookie.push(`Path=/`)
  cookie.push(`HttpOnly`)
  cookie.push(`Max-Age=${maxAgeSeconds}`)
  cookie.push(`SameSite=Lax`)
  if (secure) cookie.push('Secure')
  return cookie.join('; ')
}

export function parseCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) return {}
  return Object.fromEntries(
    cookieHeader.split(';').map(part => {
      const [k, ...v] = part.trim().split('=')
      return [k, decodeURIComponent(v.join('='))]
    })
  )
}

export function createRefreshCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 30) {
  const secure = process.env.NODE_ENV === 'production'
  const cookie = [`refresh=${token}`]
  cookie.push(`Path=/api/auth/refresh`)
  cookie.push(`HttpOnly`)
  cookie.push(`Max-Age=${maxAgeSeconds}`)
  cookie.push(`SameSite=Strict`)
  if (secure) cookie.push('Secure')
  return cookie.join('; ')
}

export function clearAuthCookies() {
  const secure = process.env.NODE_ENV === 'production'
  const base = [`Path=/`, `HttpOnly`, `Max-Age=0`, `SameSite=Lax`]
  if (secure) base.push('Secure')
  return [`token=; ${base.join('; ')}`, `refresh=; Path=/api/auth/refresh; HttpOnly; Max-Age=0; SameSite=Strict${secure ? '; Secure' : ''}`]
}
