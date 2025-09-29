import { NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'
import { withErrorHandling } from '@/lib/errors'
import { logAPI } from '@/lib/logger'
import prisma from '@/lib/db'

async function handler(req: Request) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const url = new URL(req.url)
    const stateId = url.searchParams.get('stateId')
    const search = url.searchParams.get('search')

    let whereClause: any = {}

    if (stateId) {
      whereClause.stateId = stateId
    }

    if (search) {
      whereClause.name = {
        contains: search,
        mode: 'insensitive'
      }
    }

    const cities = await prisma.city.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        pincode: true,
        latitude: true,
        longitude: true,
        state: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      },
      take: 100 // Limit results
    })

    logAPI('Retrieved cities list', '/api/location/cities', {
      count: cities.length,
      stateId,
      search
    })

    return NextResponse.json({
      success: true,
      cities,
      count: cities.length
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve cities' },
      { status: 500 }
    )
  }
}

export const GET = withCors(withErrorHandling(handler))

