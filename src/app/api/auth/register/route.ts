import { NextResponse } from 'next/server'
import { createUser, signToken, createRefreshToken } from '../../../../lib/auth'
import { withCors } from '../../../../lib/cors'
import { createAuthCookie, createRefreshCookie } from '../../../../lib/cookies'
import { validateRequest, RegisterSchema } from '../../../../lib/security'
import { withErrorHandling } from '../../../../lib/errors'
import { logAuth } from '../../../../lib/logger'
import prisma from '../../../../lib/db'

async function handler(req: Request) {
  try {
    // Validate request body
    const validation = await validateRequest(RegisterSchema)(req)
    if (!validation.success) {
      // TS: cast here because `validation` is a union type — return the prepared NextResponse
      return (validation as any).error
    }

  const { email, password, name, phone, state, city, pincode, address, soilType, currentCrops, landSize, irrigation } = validation.data

  // Keep these in outer scope so we can reuse when creating related records
  let stateName: string | undefined = state
  let cityName: string | undefined = city

    logAuth('User registration attempt', undefined, { email })

    // Create user (use createUser helper which handles hashing and basic checks)
    const created = await createUser(email, password, name)
    // createUser returns a minimal user object; fetch full user record via prisma to get id
    const user = await prisma.user.findUnique({ where: { email: created.email } })
    if (!user) throw new Error('Failed to retrieve created user')

    // Create farm if farming details provided
    let farm = null
    try {
      if (soilType || currentCrops || landSize) {
        // Use provided state/city strings directly (RegisterSchema accepts strings)
        const stateName = state || undefined
        const cityName = city || undefined

        // Use any-cast to avoid type errors if Prisma client types are out-of-sync
        farm = await (prisma as any).farm.create({
          data: {
            name: `${name ?? 'My Farm'}`,
            location: `${cityName || 'Unknown'}, ${stateName || 'Unknown'}`,
            state: stateName,
            city: cityName,
            pincode,
            soilType: soilType || undefined,
            landSize: landSize ? Number(landSize) : undefined,
            currentCrops: currentCrops || undefined,
            irrigation: irrigation || false,
            ownerId: user.id,
          }
        })

        logAuth('Farm created during registration', user.id, { 
          farmId: farm.id, 
          location: farm.location 
        })
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      logAuth('Failed creating farm during registration', user.id, { error: msg })
      // Don't fail registration if farm creation fails
    }

    // Create default weather preference
    try {
      // create weather preference - cast to any in case client typings are stale
      await (prisma as any).weatherPreference.create({
        data: {
          userId: user.id,
          location: `${city || 'Unknown'}, ${state || 'Unknown'}`,
          isDefault: true,
          alerts: true,
          notifications: true
        }
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      // Don't fail registration if weather preference creation fails
      logAuth('Failed creating weather preference', user.id, { error: msg })
    }

    const token = signToken({ sub: user.id, email: user.email })
    const refresh = await createRefreshToken(user.id)
    
    logAuth('User registration successful', user.id, { email })

    const res = NextResponse.json({ 
      user: { id: user.id, email: user.email, name: user.name },
      farm 
    })
    res.headers.set('Set-Cookie', createAuthCookie(token))
    res.headers.append('Set-Cookie', createRefreshCookie(refresh.token))
    return res
  } catch (err: any) {
    logAuth('User registration failed', undefined, { error: err.message })
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}

export const POST = withCors(withErrorHandling(handler))
