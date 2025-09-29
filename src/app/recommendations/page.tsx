'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Sprout, 
  MapPin, 
  Droplets, 
  Sun, 
  Wind,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'

export default function RecommendationsPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    landSize: '',
    season: '',
    waterAvailability: '',
    temperature: '',
    rainfall: '',
    phLevel: '',
    organicMatter: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: '',
    elevation: '',
    sunlight: ''
  })

  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const soilTypes = [
    { value: 'clay', label: 'Clay Soil' },
    { value: 'sandy', label: 'Sandy Soil' },
    { value: 'loamy', label: 'Loamy Soil' },
    { value: 'silty', label: 'Silt Soil' },
    { value: 'peaty', label: 'Peaty Soil' },
    { value: 'chalky', label: 'Chalky Soil' }
  ]

  const seasons = [
    { value: 'spring', label: 'Spring (March-May)' },
    { value: 'summer', label: 'Summer (June-August)' },
    { value: 'autumn', label: 'Autumn (September-November)' },
    { value: 'winter', label: 'Winter (December-February)' }
  ]

  const waterAvailability = [
    { value: 'high', label: 'High (Irrigation available)' },
    { value: 'medium', label: 'Medium (Limited irrigation)' },
    { value: 'low', label: 'Low (Rain-fed only)' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      // Prepare data for AI API
      const requestData = {
        soilData: {
          type: formData.soilType,
          ph: parseFloat(formData.phLevel) || 6.5,
          organicMatter: parseFloat(formData.organicMatter) || 2.0,
          nitrogen: parseFloat(formData.nitrogen) || 50,
          phosphorus: parseFloat(formData.phosphorus) || 25,
          potassium: parseFloat(formData.potassium) || 100,
          moisture: parseFloat(formData.moisture) || 60
        },
        weatherData: {
          temperature: parseFloat(formData.temperature) || 25,
          humidity: 70, // Default value
          rainfall: parseFloat(formData.rainfall) || 1000,
          sunlight: parseFloat(formData.sunlight) || 8,
          season: formData.season
        },
        farmData: {
          location: formData.location,
          landSize: parseFloat(formData.landSize) || 1,
          elevation: parseFloat(formData.elevation) || 100,
          irrigation: formData.waterAvailability === 'high',
          previousCrops: []
        }
      }

      const response = await fetch('/api/ai/crop-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        throw new Error('Failed to get recommendations')
      }

      const data = await response.json()
      
      if (data.success && data.recommendations) {
        // Transform AI response to match UI format
        const transformedRecommendations = data.recommendations.map((rec: any) => ({
          name: rec.crop,
          variety: rec.variety,
          suitability: Math.round(rec.confidence * 100),
          advantages: rec.reasons,
          disadvantages: rec.pestRisks || [],
          expectedYield: rec.expectedYield,
          marketPrice: rec.marketPrice ? `₹${rec.marketPrice * 100} per kg` : 'Check local market',
          plantingTime: rec.plantingTime,
          harvestingTime: rec.harvestTime,
          waterRequirements: rec.waterRequirements,
          fertilizerNeeds: rec.fertilizerNeeds,
          profitPotential: rec.profitPotential
        }))
        
        setRecommendations(transformedRecommendations)
      } else {
        throw new Error('Invalid response from AI service')
      }
    } catch (error) {
      console.error('Error getting recommendations:', error)
      setError('Failed to get crop recommendations. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getSuitabilityColor = (suitability: number) => {
    if (suitability >= 90) return 'text-green-600 bg-green-100'
    if (suitability >= 80) return 'text-yellow-600 bg-yellow-100'
    if (suitability >= 70) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.cropRecommendations}
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Get AI-powered crop suggestions based on your soil conditions, 
              location, and weather patterns for optimal yield.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Sprout className="w-5 h-5 mr-2 text-green-600" />
                  {t.soilConditions}
                </CardTitle>
                  <CardDescription className='text-muted'>
                  Provide your farming details to get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location" className='text-gray-700'>{t.location}</Label>
                      <Input
                        id="location"
                        name="location"
                        className='border-green-500 text-gray-600'
                        placeholder="Enter your location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soilType" className='text-gray-700'>{t.soilType}</Label>
                      <select
                        id="soilType"
                        name="soilType"
                        value={formData.soilType}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="">Select soil type</option>
                        {soilTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="landSize" className='text-gray-700'>{t.landSize}</Label>
                      <Input
                        id="landSize"
                        name="landSize"
                        type="number"
                        className='border-green-500 text-gray-600'
                        placeholder="Acres"
                        value={formData.landSize}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="season" className='text-gray-700'>Season</Label>
                      <select
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="">Select season</option>
                        {seasons.map((season) => (
                          <option key={season.value} value={season.value}>
                            {season.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterAvailability" className='text-gray-700'>Water Availability</Label>
                    <select
                      id="waterAvailability"
                      name="waterAvailability"
                      value={formData.waterAvailability}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select water availability</option>
                      {waterAvailability.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature" className='text-gray-700'>Temperature (°C)</Label>
                      <Input
                        id="temperature"
                        name="temperature"
                        type="number"
                        className='border-green-500 text-gray-600'
                        placeholder="Average temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rainfall" className='text-gray-700'>Rainfall (mm)</Label>
                      <Input
                        id="rainfall"
                        name="rainfall"
                        type="number"
                        className='border-green-500 text-gray-600'
                        placeholder="Annual rainfall"
                        value={formData.rainfall}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phLevel" className='text-gray-700'>Soil pH Level</Label>
                    <Input
                      id="phLevel"
                      name="phLevel"
                      type="number"
                      step="0.1"
                      min="0"
                      max="14"
                      className='border-green-500 text-gray-600'
                      placeholder="6.5-7.5 (neutral)"
                      value={formData.phLevel}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="elevation" className='text-gray-700'>Elevation (meters)</Label>
                      <Input
                        id="elevation"
                        name="elevation"
                        type="number"
                        className='border-green-500 text-gray-600'
                        placeholder="100"
                        value={formData.elevation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organicMatter" className='text-gray-700'>Organic Matter (%)</Label>
                      <Input
                        id="organicMatter"
                        name="organicMatter"
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        className='border-green-500 text-gray-600'
                        placeholder="2.0"
                        value={formData.organicMatter}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sunlight" className='text-gray-700'>Sunlight Hours/Day</Label>
                      <Input
                        id="sunlight"
                        name="sunlight"
                        type="number"
                        min="0"
                        max="24"
                        className='border-green-500 text-gray-600'
                        placeholder="8"
                        value={formData.sunlight}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nitrogen" className='text-gray-700'>Nitrogen (ppm)</Label>
                      <Input
                        id="nitrogen"
                        name="nitrogen"
                        type="number"
                        className='border-green-500 text-gray-600'
                        placeholder="50"
                        value={formData.nitrogen}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phosphorus" className='text-gray-700'>Phosphorus (ppm)</Label>
                      <Input
                        id="phosphorus"
                        name="phosphorus"
                        type="number"
                        className='border-green-500 text-gray-600'
                        placeholder="25"
                        value={formData.phosphorus}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="potassium" className='text-gray-700'>Potassium (ppm)</Label>
                      <Input
                        id="potassium"
                        name="potassium"
                        type="number"
                        className='border-green-500 text-gray-600'
                        placeholder="100"
                        value={formData.potassium}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="moisture" className='text-gray-700'>Soil Moisture (%)</Label>
                    <Input
                      id="moisture"
                      name="moisture"
                      type="number"
                      min="0"
                      max="100"
                      className='border-green-500 text-gray-600'
                      placeholder="60"
                      value={formData.moisture}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Analyzing...' : t.getRecommendations}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {error && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="text-center py-4">
                    <p className="text-red-600">{error}</p>
                  </CardContent>
                </Card>
              )}

              {recommendations.length > 0 ? (
                <>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {t.suitableCrops}
                    </h2>
                    <p className="text-muted">
                      Based on your farming conditions
                    </p>
                  </div>

                  <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 max-h-[60vh] sm:max-h-[70vh] space-y-6">
                  {recommendations.map((crop, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-900">
                            {crop.name} {crop.variety && `(${crop.variety})`}
                          </CardTitle>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSuitabilityColor(crop.suitability)}`}>
                            {crop.suitability}% Match
                          </div>
                        </div>
                        <CardDescription className="text-muted">
                          Expected yield: {crop.expectedYield} | Market price: {crop.marketPrice}
                          {crop.profitPotential && (
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              crop.profitPotential === 'high' ? 'bg-green-100 text-green-800' :
                              crop.profitPotential === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {crop.profitPotential.toUpperCase()} PROFIT
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {t.advantages}
                            </h4>
                            <ul className="space-y-1">
                              {crop.advantages.map((advantage: string, idx: number) => (
                                <li key={idx} className="text-sm text-muted flex items-start">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {advantage}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                              <XCircle className="w-4 h-4 mr-1" />
                              {t.disadvantages}
                            </h4>
                            <ul className="space-y-1">
                              {crop.disadvantages.map((disadvantage: string, idx: number) => (
                                <li key={idx} className="text-sm text-muted flex items-start">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {disadvantage}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-blue-600 mb-2 flex items-center">
                              <Info className="w-4 h-4 mr-1" />
                              Growing Information
                            </h4>
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted">
                              <div>
                                <span className="font-medium">Planting:</span> {crop.plantingTime}
                              </div>
                              <div>
                                <span className="font-medium">Harvesting:</span> {crop.harvestingTime}
                              </div>
                              {crop.waterRequirements && (
                                <div>
                                  <span className="font-medium">Water:</span> {crop.waterRequirements}
                                </div>
                              )}
                              {crop.fertilizerNeeds && (
                                <div>
                                  <span className="font-medium">Fertilizer:</span> {crop.fertilizerNeeds}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Sprout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Get Your Crop Recommendations
                    </h3>
                    <p className="text-muted">
                      Fill out the form to receive personalized crop suggestions 
                      based on your farming conditions.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
