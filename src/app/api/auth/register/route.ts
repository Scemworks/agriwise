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
      return validation.error
    }

    const { email, password, name, phone, state, city, pincode, address, soilType, currentCrops, landSize, irrigation } = validation.data

    logAuth('User registration attempt', undefined, { email })

    // Create user with enhanced profile
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await require('bcryptjs').hash(password, 12),
        phone,
        state,
        city,
        pincode,
        address,
        isVerified: false,
        isActive: true
      }
    })

    // Create farm if farming details provided
    let farm = null
    try {
      if (soilType || currentCrops || landSize) {
        // Get state and city names for farm location
        let stateName = state
        let cityName = city
        
        if (state) {
          const stateData = await prisma.state.findUnique({ where: { id: state } })
          stateName = stateData?.name || state
        }
        
        if (city) {
          const cityData = await prisma.city.findUnique({ 
            where: { id: city },
            include: { state: true }
          })
          cityName = cityData?.name || city
        }

        farm = await prisma.farm.create({
          data: {
            name: `${name ?? 'My Farm'}`,
            location: `${cityName}, ${stateName}`,
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
      logAuth('Failed creating farm during registration', user.id, { error: e.message })
      // Don't fail registration if farm creation fails
    }

    // Create default weather preference
    try {
      await prisma.weatherPreference.create({
        data: {
          userId: user.id,
          location: `${cityName || 'Unknown'}, ${stateName || 'Unknown'}`,
          isDefault: true,
          alerts: true,
          notifications: true
        }
      })
    } catch (e) {
      // Don't fail registration if weather preference creation fails
      logAuth('Failed creating weather preference', user.id, { error: e.message })
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
