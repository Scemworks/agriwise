import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from './db'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.warn('JWT_SECRET is not set — using insecure dev secret')
}
const JWT_EXPIRES_IN = '7d'

export async function createUser(email: string, password: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('User already exists')
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  })
  return { id: user.id, email: user.email, name: user.name }
}

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return null
  return { id: user.id, email: user.email, name: user.name }
}

export function signToken(payload: Record<string, any>) {
  return jwt.sign(payload, JWT_SECRET || 'dev-secret-change-me', { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET || 'dev-secret-change-me')
  } catch (err) {
    return null
  }
}

export async function getUserById(id: string) {
  const u = await prisma.user.findUnique({ where: { id } })
  if (!u) return null
  return { id: u.id, email: u.email, name: u.name }
}

export { prisma }

// --- Refresh token helpers ---
import crypto from 'crypto'

const REFRESH_TOKEN_EXPIRES_DAYS = 30

export async function createRefreshToken(userId: string) {
  const token = crypto.randomBytes(64).toString('hex')
  const tokenHash = await bcrypt.hash(token, 10)
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000)
  await prisma.refreshToken.create({
    data: { tokenHash, userId, expiresAt },
  })
  return { token, expiresAt }
}

export async function rotateRefreshToken(oldToken: string, userId: string) {
  // revoke old token and create a new one
  const tokens = await prisma.refreshToken.findMany({ where: { userId, revoked: false } })
  for (const t of tokens) {
    const ok = await bcrypt.compare(oldToken, t.tokenHash)
    if (ok) {
      await prisma.refreshToken.update({ where: { id: t.id }, data: { revoked: true } })
      return createRefreshToken(userId)
    }
  }
  return null
}

export async function verifyRefreshToken(token: string) {
  const tokens = await prisma.refreshToken.findMany({ where: { revoked: false } })
  for (const t of tokens) {
    const ok = await bcrypt.compare(token, t.tokenHash)
    if (ok) {
      if (t.expiresAt < new Date()) return null
      const user = await prisma.user.findUnique({ where: { id: t.userId } })
      if (!user) return null
      return { tokenId: t.id, userId: t.userId }
    }
  }
  return null
}
