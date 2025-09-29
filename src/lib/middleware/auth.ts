import { verifyToken } from '../auth'
import { parseCookieHeader } from '../cookies'

export async function requireAuth(req: Request) {
  // read token from cookie
  const cookies = parseCookieHeader(req.headers.get('cookie'))
  const token = cookies.token
  if (!token) return null
  const payload: any = verifyToken(token)
  if (!payload) return null
  return payload
}
