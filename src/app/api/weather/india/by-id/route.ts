import { NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'
import { getIndiaWeatherById } from '@/lib/weather'

async function handler(req: Request) {
  try {
    if (!process.env.INDIANAPI_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: INDIANAPI_KEY is not set. Add it to .env.local or your environment.' },
        { status: 500 }
      )
    }
    const url = new URL(req.url)
    const city_id = url.searchParams.get('city_id')
    if (!city_id) return NextResponse.json({ error: 'city_id required' }, { status: 422 })

    const data = await getIndiaWeatherById(city_id)
    return NextResponse.json(data)
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Error in /api/weather/india/by-id:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch weather by id' }, { status: 500 })
  }
}

export const GET = withCors(handler)
