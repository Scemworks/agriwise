import { NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'
import { getGlobalForecast } from '@/lib/weather'

async function handler(req: Request) {
  try {
    if (!process.env.INDIANAPI_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: INDIANAPI_KEY is not set. Add it to .env.local or your environment.' },
        { status: 500 }
      )
    }
    const url = new URL(req.url)
    const location = url.searchParams.get('location')
    const days = url.searchParams.get('days')
    if (!location) return NextResponse.json({ error: 'location required' }, { status: 422 })

    const data = await getGlobalForecast(location, days ? Number(days) : undefined)
    return NextResponse.json(data)
  } catch (err: any) {
    console.error('Error in /api/weather/global/forecast:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch global forecast' }, { status: 500 })
  }
}

export const GET = withCors(handler)
