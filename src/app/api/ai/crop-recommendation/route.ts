import { NextResponse } from 'next/server'
import { withCors } from '../../../../lib/cors'
import { withErrorHandling } from '../../../../lib/errors'
import { validateRequest } from '../../../../lib/security'
import { cropRecommendationAI, SoilData, WeatherData, FarmData, CropData } from '../../../../lib/ai/crop-recommendation'
import { logAI, logError } from '../../../../lib/logger'
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
    // Narrow using property check to satisfy TypeScript's control flow analysis
    if ('error' in validation) {
      return validation.error
    }

    const { soilData, weatherData, farmData } = validation.data

    logAI('Processing crop recommendation request', 'CropAI', {
      location: farmData.location,
      landSize: farmData.landSize,
      season: weatherData.season,
      soilType: soilData.type
    })

    // Generate mock recommendations deterministically based on input ranges
    const allCrops = cropRecommendationAI.getAvailableCrops()

    const scoreCrop = (cropName: string) => {
      const crop = cropRecommendationAI.getCropDetails(cropName) as CropData | null
      if (!crop) return 0

      let s = 0
      // pH
      const ph = soilData.ph
      if (ph >= crop.phRange[0] && ph <= crop.phRange[1]) s += 2
      else s += Math.max(0, 1 - Math.abs((ph - (crop.phRange[0] + crop.phRange[1]) / 2)) / 2)

      // temperature
      const temp = weatherData.temperature
      if (temp >= crop.temperatureRange[0] && temp <= crop.temperatureRange[1]) s += 2
      else s += Math.max(0, 1 - Math.abs(temp - (crop.temperatureRange[0] + crop.temperatureRange[1]) / 2) / 10)

      // rainfall
      const rain = weatherData.rainfall
      const [rmin, rmax] = crop.rainfallRange
      if (rain >= rmin && rain <= rmax) s += 1.5
      else s += Math.max(0, Math.min(1, rain / (rmin || 1)))

      // sunlight
      const sun = weatherData.sunlight
      const [smin, smax] = crop.sunlightHours
      if (sun >= smin && sun <= smax) s += 1
      else s += Math.max(0, Math.min(1, sun / (smin || 1)))

      // season
      s += crop.plantingSeason.includes(weatherData.season) ? 1.5 : 0.5

      // irrigation requirement vs farm
      if (crop.waterNeeds === 'high' && farmData.irrigation) s += 1
      if (crop.waterNeeds === 'high' && !farmData.irrigation) s -= 0.5

      return s
    }

    const scored = allCrops.map((c) => ({ name: c, score: scoreCrop(c) }))
      .sort((a, b) => b.score - a.score)

    const recommendations = scored.slice(0, 5).map((s) => {
      const crop = cropRecommendationAI.getCropDetails(s.name)!
      const confidence = Math.max(0, Math.min(1, Math.round((s.score / 8) * 100) / 100))
      const reasons: string[] = []
      if (soilData.type && crop.soilTypes.includes(soilData.type)) reasons.push(`Compatible with ${soilData.type} soil`)
      if (soilData.ph >= crop.phRange[0] && soilData.ph <= crop.phRange[1]) reasons.push(`Soil pH ${soilData.ph} is optimal`)
      if (crop.plantingSeason.includes(weatherData.season)) reasons.push(`Suitable planting season: ${weatherData.season}`)

      return {
        crop: crop.name,
        variety: crop.varieties[0] || 'Local variety',
        confidence,
        reasons,
        plantingTime: (function(season){
          const map: Record<string,string> = { spring: 'March-May', summer: 'June-August', autumn: 'September-November', winter: 'December-February' }
          return map[season] || 'Check local calendar'
        })(weatherData.season),
        harvestTime: crop.harvestTime,
        expectedYield: `${Math.round((crop.yieldPerAcre[0]+crop.yieldPerAcre[1])/2 * farmData.landSize)} kg`,
        waterRequirements: crop.waterNeeds === 'high' ? 'High' : crop.waterNeeds === 'medium' ? 'Medium' : 'Low',
        fertilizerNeeds: crop.fertilizerNeeds || 'Medium',
        pestRisks: crop.pestRisks || [],
        marketPrice: crop.marketPrice || undefined,
        profitPotential: 'medium'
      }
    })

    logAI('Crop recommendations generated successfully', 'CropAI', {
      recommendationsCount: recommendations.length,
      topCrop: recommendations[0]?.crop
    })

    return NextResponse.json({
      success: true,
      recommendations,
      metadata: {
        totalCropsAnalyzed: allCrops.length,
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

