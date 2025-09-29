import { NextResponse } from 'next/server'
import { withCors } from '@/lib/cors'
import { withErrorHandling } from '@/lib/errors'
import { validateRequest } from '@/lib/security'
import { cropRecommendationAI, SoilData, WeatherData, FarmData } from '@/lib/ai/crop-recommendation'
import { logAI, logError } from '@/lib/logger'
import { z } from 'zod'

// Validation schema for crop recommendation request
const CropRecommendationSchema = z.object({
  soilData: z.object({
    type: z.enum(['clay', 'sandy', 'loamy', 'silty', 'peaty', 'chalky']),
    ph: z.number().min(0).max(14),
    organicMatter: z.number().min(0).max(100),
    nitrogen: z.number().min(0),
    phosphorus: z.number().min(0),
    potassium: z.number().min(0),
    moisture: z.number().min(0).max(100),
  }),
  weatherData: z.object({
    temperature: z.number().min(-50).max(60),
    humidity: z.number().min(0).max(100),
    rainfall: z.number().min(0),
    sunlight: z.number().min(0).max(24),
    season: z.enum(['spring', 'summer', 'autumn', 'winter']),
  }),
  farmData: z.object({
    location: z.string().min(1).max(100),
    landSize: z.number().min(0.1).max(10000),
    elevation: z.number().min(0).max(10000),
    irrigation: z.boolean(),
    previousCrops: z.array(z.string()).optional(),
  }),
})

async function handler(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    // Validate request body
    const validation = await validateRequest(CropRecommendationSchema)(req)
    if (!validation.success) {
      return validation.error
    }

    const { soilData, weatherData, farmData } = validation.data

    logAI('Processing crop recommendation request', 'CropAI', {
      location: farmData.location,
      landSize: farmData.landSize,
      season: weatherData.season,
      soilType: soilData.type
    })

    // Get crop recommendations
    const recommendations = await cropRecommendationAI.getRecommendations(
      soilData as SoilData,
      weatherData as WeatherData,
      farmData as FarmData
    )

    logAI('Crop recommendations generated successfully', 'CropAI', {
      recommendationsCount: recommendations.length,
      topCrop: recommendations[0]?.crop
    })

    return NextResponse.json({
      success: true,
      recommendations,
      metadata: {
        totalCropsAnalyzed: cropRecommendationAI.getAvailableCrops().length,
        recommendedCrops: recommendations.length,
        generatedAt: new Date().toISOString(),
        location: farmData.location,
        season: weatherData.season
      }
    })

  } catch (error) {
    logError('Error in crop recommendation API', { error })
    return NextResponse.json(
      { error: 'Failed to generate crop recommendations' },
      { status: 500 }
    )
  }
}

export const POST = withCors(withErrorHandling(handler))

