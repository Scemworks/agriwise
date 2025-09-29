'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

function weatherCodeToCondition(code: number) {
  if (code === 0) return 'Clear'
  if (code >= 1 && code <= 3) return 'Partly Cloudy'
  if (code >= 45 && code <= 48) return 'Fog'
  if (code >= 51 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 86) return 'Snow'
  if (code >= 95) return 'Thunderstorm'
  return 'Unknown'
}

interface WeatherData {
  location: string
  temperature: number | null
  condition: string
  humidity: number | null
  windSpeed: number | null
  windDirection: string | null
  visibility: number | null
  uvIndex: number | null
  pressure: number | null
  feelsLike: number | null
  icon: string
  rainfall: number | null
  sunrise: string | null
  sunset: string | null
  moonrise: string | null
  moonset: string | null
}

interface ForecastDay {
  date: string
  high: number | null
  low: number | null
  condition: string
  icon: string
  precipitation: number | null
  windSpeed: number | null
  windDirection: string | null
  humidity: number | null
  chanceOfRain: number | null
  sunrise: string | null
  sunset: string | null
  moonrise: string | null
  moonset: string | null
  moonPhase: string | null
}

interface WeatherAlert {
  id: string
  type: 'warning' | 'info' | 'success'
  title: string
  description: string
  time: string
}

export default function WeatherPage() {
  const { t } = useLanguage()
  const [location, setLocation] = useState('Kerala, India')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cities, setCities] = useState<Record<string, string>>({})
  const [showCitySuggestions, setShowCitySuggestions] = useState(false)
  const [filteredCities, setFilteredCities] = useState<Array<{id: string, name: string}>>([])

  // Mock weather data
  const mockWeatherData: WeatherData = {
    location: 'Kerala, India',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 75,
    windSpeed: 12,
    windDirection: 'NE',
    visibility: 10,
    uvIndex: 6,
    pressure: 1013,
    feelsLike: 32,
    icon: 'partly-cloudy',
    rainfall: 0,
    sunrise: '06:30',
    sunset: '18:45',
    moonrise: '20:15',
    moonset: '08:30'
  }

  const mockForecast: ForecastDay[] = [
    {
      date: '2024-01-15',
      high: 32,
      low: 24,
      condition: 'Sunny',
      icon: 'sunny',
      precipitation: 0,
      windSpeed: 8,
      windDirection: 'NE',
      humidity: 65,
      chanceOfRain: 0,
      sunrise: '06:30',
      sunset: '18:45',
      moonrise: '20:15',
      moonset: '08:30',
      moonPhase: 'Waxing Gibbous'
    },
    {
      date: '2024-01-16',
      high: 30,
      low: 23,
      condition: 'Partly Cloudy',
      icon: 'partly-cloudy',
      precipitation: 20,
      windSpeed: 10,
      windDirection: 'E',
      humidity: 70,
      chanceOfRain: 20,
      sunrise: '06:31',
      sunset: '18:46',
      moonrise: '21:20',
      moonset: '09:35',
      moonPhase: 'Waxing Gibbous'
    },
    {
      date: '2024-01-17',
      high: 28,
      low: 22,
      condition: 'Rainy',
      icon: 'rainy',
      precipitation: 80,
      windSpeed: 15,
      windDirection: 'SE',
      humidity: 85,
      chanceOfRain: 80,
      sunrise: '06:32',
      sunset: '18:47',
      moonrise: '22:25',
      moonset: '10:40',
      moonPhase: 'Full Moon'
    },
    {
      date: '2024-01-18',
      high: 29,
      low: 21,
      condition: 'Cloudy',
      icon: 'cloudy',
      precipitation: 40,
      windSpeed: 12,
      windDirection: 'SW',
      humidity: 75,
      chanceOfRain: 40,
      sunrise: '06:33',
      sunset: '18:48',
      moonrise: '23:30',
      moonset: '11:45',
      moonPhase: 'Waning Gibbous'
    },
    {
      date: '2024-01-19',
      high: 31,
      low: 23,
      condition: 'Sunny',
      icon: 'sunny',
      precipitation: 5,
      windSpeed: 6,
      windDirection: 'NW',
      humidity: 60,
      chanceOfRain: 5,
      sunrise: '06:34',
      sunset: '18:49',
      moonrise: '00:35',
      moonset: '12:50',
      moonPhase: 'Waning Gibbous'
    }
  ]

  const mockAlerts: WeatherAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Heavy Rain Warning',
      description: 'Heavy rainfall expected in the next 24 hours. Take necessary precautions for your crops.',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'info',
      title: 'Optimal Planting Conditions',
      description: 'Current weather conditions are ideal for planting rice and vegetables.',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'success',
      title: 'Harvest Weather',
      description: 'Perfect weather for harvesting your current crops. Low humidity and clear skies.',
      time: '3 days ago'
    }
  ]

  const fetchForLocation = async (q: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Try Indian weather first, then fallback to global
      let res = await fetch(`/api/weather/india?city=${encodeURIComponent(q)}`)
      let json = await res.json()
      let isIndianWeather = true

      // If Indian weather fails, try global weather
      if (!res.ok || !json.city) {
        console.log('Indian weather failed, trying global weather...')
        res = await fetch(`/api/weather/global/weather?location=${encodeURIComponent(q)}&days=3`)
        json = await res.json()
        isIndianWeather = false
      }

      if (!res.ok) {
        setError(json.error || 'Failed to fetch weather from server')
        return
      }

      if (isIndianWeather) {
        // Handle Indian IMD weather response
      if (!json.city || !json.weather || !json.weather.current) {
          setError('Unexpected response from Indian weather provider')
        return
      }

      const cityName = json.city
      const current = json.weather.current
        const astronomical = json.weather.astronomical || {}

        // IMD current.temperature may be a number or an object with min/max
      let temperature: number | null = null
      if (typeof current.temperature === 'number') temperature = current.temperature
      else if (current.temperature?.max?.value != null) temperature = current.temperature.max.value
      else if (current.temperature?.min?.value != null) temperature = current.temperature.min.value

      // humidity: average morning/evening if provided as object
      let humidity: number | null = null
      if (typeof current.humidity === 'number') humidity = current.humidity
      else if (typeof current.humidity === 'object') {
        const vals = Object.values(current.humidity).filter((v: any) => typeof v === 'number') as number[]
        humidity = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null
      }

      const feelsLike = current.feels_like ?? current.feelsLike ?? null
      const windSpeed = current.wind_speed ?? current.windSpeed ?? null
        const windDirection = current.wind_direction ?? current.windDirection ?? null
      const condition = current.description ?? current.summary ?? ''

      setWeatherData({
        location: cityName,
        temperature,
        condition: condition || '—',
        humidity,
        windSpeed,
          windDirection,
        visibility: null,
        uvIndex: null,
        pressure: null,
        feelsLike,
          icon: '',
          rainfall: current.rainfall ?? null,
          sunrise: astronomical.sunrise ?? null,
          sunset: astronomical.sunset ?? null,
          moonrise: astronomical.moonrise ?? null,
          moonset: astronomical.moonset ?? null,
        })

        // Map IMD forecast array
      const imdForecast = Array.isArray(json.weather.forecast)
        ? json.weather.forecast.map((f: any) => ({
              date: parseImdDate(f.date),
              high: f.max_temp ?? f.max ?? null,
              low: f.min_temp ?? f.min ?? null,
              condition: f.description ?? f.summary ?? '',
              icon: '',
              precipitation: f.rainfall ?? null,
              windSpeed: f.wind_speed ?? null,
              windDirection: f.wind_direction ?? null,
              humidity: f.humidity ?? null,
              chanceOfRain: f.chance_of_rain ?? null,
              sunrise: f.sunrise ?? null,
              sunset: f.sunset ?? null,
              moonrise: f.moonrise ?? null,
              moonset: f.moonset ?? null,
              moonPhase: f.moon_phase ?? null,
            }))
          : []

        setForecast(imdForecast.slice(0, 5))
        setAlerts(json.weather.alerts || [])
      } else {
        // Handle global weather response
        if (!json.location || !json.current) {
          setError('Unexpected response from global weather provider')
          return
        }

        const current = json.current
        const forecast = json.forecast || []

        setWeatherData({
          location: json.location,
          temperature: current.temperature ?? null,
          condition: current.condition ?? '—',
          humidity: current.humidity ?? null,
          windSpeed: current.wind_speed ?? null,
          windDirection: current.wind_direction ?? null,
          visibility: null,
          uvIndex: current.uv_index ?? null,
          pressure: null,
          feelsLike: current.feels_like ?? null,
          icon: '',
          rainfall: null,
          sunrise: null,
          sunset: null,
          moonrise: null,
          moonset: null,
        })

        // Map global forecast array
        const globalForecast = forecast.map((f: any) => ({
          date: f.date ?? '',
          high: f.max_temp ?? null,
          low: f.min_temp ?? null,
          condition: f.condition ?? '',
          icon: '',
          precipitation: f.precipitation ?? null,
          windSpeed: f.wind_speed ?? null,
          windDirection: f.wind_direction ?? null,
          humidity: f.humidity ?? null,
          chanceOfRain: f.chance_of_rain ?? null,
          sunrise: f.sunrise ?? null,
          sunset: f.sunset ?? null,
          moonrise: f.moonrise ?? null,
          moonset: f.moonset ?? null,
          moonPhase: f.moon_phase ?? null,
        }))

        setForecast(globalForecast.slice(0, 5))
        setAlerts([])
      }
    } catch (e: any) {
      setError(e?.message || 'Network error')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to parse IMD date format
  const parseImdDate = (d: any): string => {
                  if (!d) return ''
                  // If already ISO-ish, Date will parse it
                  const iso = new Date(d)
                  if (!isNaN(iso.getTime())) return iso.toISOString()
                  // Try IMD format DD-MMM-YYYY -> convert to YYYY-MM-DD
                  const m = String(d).trim().match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/)
                  if (m) {
                    const day = m[1].padStart(2, '0')
                    const mon = m[2]
                    const year = m[3]
                    // Map short month to number
                    const months: Record<string, string> = {
                      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
                      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
                    }
                    const mm = months[mon] || '01'
                    return `${year}-${mm}-${day}`
                  }
                  // fallback to empty string to avoid Invalid Date
                  return ''
                }

  // Load Indian cities on component mount
  useEffect(() => {
    const loadCities = async () => {
      try {
        const res = await fetch('/api/weather/india/cities')
        if (res.ok) {
          const citiesData = await res.json()
          setCities(citiesData)
        }
      } catch (e) {
        console.error('Failed to load cities:', e)
      }
    }
    loadCities()
    fetchForLocation(location)
  }, [])

  // Filter cities based on search input
  useEffect(() => {
    if (location.length > 2) {
      const filtered = Object.entries(cities)
        .filter(([id, name]) => 
          name.toLowerCase().includes(location.toLowerCase())
        )
        .slice(0, 10)
        .map(([id, name]) => ({ id, name }))
      setFilteredCities(filtered)
      setShowCitySuggestions(filtered.length > 0)
    } else {
      setShowCitySuggestions(false)
    }
  }, [location, cities])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.city-search-container')) {
        setShowCitySuggestions(false)
      }
    }

    if (showCitySuggestions) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCitySuggestions])

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />
      case 'partly-cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />
      case 'cloudy':
  return <Cloud className="w-8 h-8 text-muted" />
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Eye className="w-5 h-5 text-blue-500" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50'
      case 'info':
        return 'border-blue-200 bg-blue-50'
      case 'success':
        return 'border-green-200 bg-green-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.weatherUpdates}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed about weather conditions to make better farming decisions
            </p>
          </div>

          {/* Location Search */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full">
              <div className="flex-1 relative w-full city-search-container">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Enter location (e.g., Chennai, Delhi, Mumbai)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setShowCitySuggestions(location.length > 2 && filteredCities.length > 0)}
                  className="pl-10 text-gray-700 w-full"
                />
                {showCitySuggestions && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <div
                        key={city.id}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        onClick={() => {
                          setLocation(city.name)
                          setShowCitySuggestions(false)
                          fetchForLocation(city.name)
                        }}
                      >
                        {city.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button 
                onClick={() => {
                  setShowCitySuggestions(false)
                  fetchForLocation(location)
                }}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              >
                {isLoading ? 'Loading...' : 'Search'}
              </Button>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-gray-500">
                Try Indian cities like Chennai, Delhi, Mumbai, Bangalore, or global locations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Weather */}
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <div className="text-center text-red-600">{error}</div>
              )}

              {weatherData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Cloud className="w-5 h-5 mr-2 text-cyan-600" />
                      {t.currentWeather}
                    </CardTitle>
                    <CardDescription>
                      {weatherData.location} • {new Date().toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="mb-4">
                          {getWeatherIcon(weatherData.icon)}
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          {weatherData.temperature}°C
                        </div>
                        <div className="text-lg text-gray-600 mb-4">
                          {weatherData.condition}
                        </div>
                        <div className="text-sm text-gray-500">
                          Feels like {weatherData.feelsLike}°C
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                          <div className="text-sm text-muted">Humidity</div>
                          <div className="text-lg font-semibold text-gray-900">{weatherData.humidity || '—'}%</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Wind className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                          <div className="text-sm text-muted">Wind Speed</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {weatherData.windSpeed || '—'} km/h
                            {weatherData.windDirection && (
                              <div className="text-xs text-gray-500">{weatherData.windDirection}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <CloudRain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <div className="text-sm text-muted">Rainfall</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {weatherData.rainfall !== null ? `${weatherData.rainfall}mm` : '—'}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                          <div className="text-sm text-muted">UV Index</div>
                          <div className="text-lg font-semibold text-gray-900">{weatherData.uvIndex || '—'}</div>
                        </div>
                      </div>
                      
                      {/* Astronomical Data */}
                      {(weatherData.sunrise || weatherData.sunset || weatherData.moonrise || weatherData.moonset) && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="text-sm font-semibold text-blue-800 mb-3">Astronomical Data</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            {weatherData.sunrise && (
                              <div>
                                <div className="text-xs text-blue-600">Sunrise</div>
                                <div className="text-sm font-medium text-blue-800">{weatherData.sunrise}</div>
                              </div>
                            )}
                            {weatherData.sunset && (
                              <div>
                                <div className="text-xs text-blue-600">Sunset</div>
                                <div className="text-sm font-medium text-blue-800">{weatherData.sunset}</div>
                              </div>
                            )}
                            {weatherData.moonrise && (
                              <div>
                                <div className="text-xs text-blue-600">Moonrise</div>
                                <div className="text-sm font-medium text-blue-800">{weatherData.moonrise}</div>
                              </div>
                            )}
                            {weatherData.moonset && (
                              <div>
                                <div className="text-xs text-blue-600">Moonset</div>
                                <div className="text-sm font-medium text-blue-800">{weatherData.moonset}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 5-Day Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    {t.forecast}
                  </CardTitle>
                  <CardDescription className="text-muted">
                    5-day weather forecast for your location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forecast.map((day, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-center sm:justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-medium text-gray-900 w-20">
                            {formatDate(day.date)}
                          </div>
                          <div className="flex items-center space-x-2">
                            {getWeatherIcon(day.icon)}
                            <span className="text-sm text-muted">{day.condition}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm mt-3 sm:mt-0">
                          <div className="flex items-center space-x-1">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-muted">
                              {day.precipitation !== null ? `${day.precipitation}%` : '—'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Wind className="w-4 h-4 text-gray-500" />
                            <span className="text-muted">
                              {day.windSpeed || '—'} km/h
                              {day.windDirection && ` ${day.windDirection}`}
                            </span>
                          </div>
                          {day.humidity !== null && (
                            <div className="flex items-center space-x-1">
                              <Droplets className="w-4 h-4 text-blue-400" />
                              <span className="text-muted">{day.humidity}%</span>
                            </div>
                          )}
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{day.high || '—'}°</div>
                            <div className="text-gray-500">{day.low || '—'}°</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                    Weather Alerts
                  </CardTitle>
                  <CardDescription className="text-muted">
                    Important weather information for farmers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                      >
                        <div className="flex items-start space-x-3">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">
                              {alert.title}
                            </h4>
                            <p className="text-xs text-muted mb-2">
                              {alert.description}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {alert.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Farming Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    Farming Recommendations
                  </CardTitle>
                  <CardDescription className="text-muted">
                    Based on current weather conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 text-sm mb-1">
                        Irrigation Schedule
                      </h4>
                      <p className="text-xs text-green-700">
                        Water your crops in the early morning or evening to reduce evaporation.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 text-sm mb-1">
                        Pest Control
                      </h4>
                      <p className="text-xs text-blue-700">
                        High humidity conditions may increase pest activity. Monitor your crops closely.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 text-sm mb-1">
                        Harvest Timing
                      </h4>
                      <p className="text-xs text-yellow-700">
                        Clear weather expected in 2 days - ideal for harvesting activities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                    Weather History
                  </CardTitle>
                  <CardDescription className="text-muted">
                    Past week's weather data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Average Temperature:</span>
                      <span className="font-medium text-gray-600">28°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Total Rainfall:</span>
                      <span className="font-medium text-gray-600">45mm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Sunny Days:</span>
                      <span className="font-medium text-gray-600">4 days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Rainy Days:</span>
                      <span className="font-medium text-gray-600">3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
