import { NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'
import { getIndiaWeather } from '@/lib/weather'

async function handler(req: Request) {
  try {
    // Quick server-side check for the required API key to give a clearer error
    if (!process.env.INDIANAPI_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: INDIANAPI_KEY is not set. Add it to .env.local or your environment.' },
        { status: 500 }
      )
    }
    const url = new URL(req.url)
    const city = url.searchParams.get('city')
    if (!city) return NextResponse.json({ error: 'city query param required' }, { status: 422 })

    const data = await getIndiaWeather(city)
    return NextResponse.json(data)
  } catch (err: any) {
    // If the upstream API error is the known 'list index out of range', return a helpful 422
    const remote = err?.remote ?? null
    const msg = err?.message ?? ''
    if (String(msg).includes('list index out of range') || (remote && JSON.stringify(remote).includes('list index out of range'))) {
      return NextResponse.json(
        { error: 'Ambiguous city query. Try a more specific city name or call /api/weather/india/cities to find the correct IMD station.' },
        { status: 422 }
      )
    }
    // log the error server-side for debugging
    // eslint-disable-next-line no-console
    console.error('Error in /api/weather/india:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch weather' }, { status: 500 })
  }
}

export const GET = withCors(handler)
