import { NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'
import { withErrorHandling } from '@/lib/errors'
import { cropRecommendationAI } from '@/lib/ai/crop-recommendation'
import { logAI } from '@/lib/logger'

async function handler(req: Request, { params }: { params: { cropName: string } }) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const { cropName } = params
    const cropDetails = cropRecommendationAI.getCropDetails(cropName)

    if (!cropDetails) {
      return NextResponse.json(
        { error: 'Crop not found' },
        { status: 404 }
      )
    }

    logAI('Retrieved crop details', 'CropAI', {
      cropName: cropDetails.name
    })

    return NextResponse.json({
      success: true,
      crop: cropDetails
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve crop details' },
      { status: 500 }
    )
  }
}

export const GET = withCors(withErrorHandling(handler))

