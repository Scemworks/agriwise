import { NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'
import { getIndianCities } from '@/lib/weather'

async function handler() {
  try {
    if (!process.env.INDIANAPI_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: INDIANAPI_KEY is not set. Add it to .env.local or your environment.' },
        { status: 500 }
      )
    }
    const data = await getIndianCities()
    return NextResponse.json(data)
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Error in /api/weather/india/cities:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch cities' }, { status: 500 })
  }
}

export const GET = withCors(handler)
