 'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Sprout, 
  MessageCircle, 
  ShoppingCart, 
  Cloud, 
  Leaf, 
  TrendingUp,
  Calendar,
  MapPin,
  Droplets,
  Sun,
  Wind
} from 'lucide-react'

export default function DashboardPage() {
  const { t } = useLanguage()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const quickActions = [
    {
      icon: <Sprout className="w-6 h-6" />,
      title: t.cropRecommendations,
      description: t.getAIPoweredSuggestions,
      link: "/recommendations",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: t.chatAssistant,
      description: t.askFarmingQuestions,
      link: "/chat",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: t.marketplace,
      description: t.sellOrBuyProduce,
      link: "/marketplace",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: t.weatherUpdates,
      description: t.checkWeatherForecast,
      link: "/weather",
      color: "text-cyan-600 bg-cyan-100"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: t.carbonCredits,
      description: "Manage carbon credits",
      link: "/carbon-credits",
      color: "text-emerald-600 bg-emerald-100"
    }
  ]

  const recentActivity = [
    {
      action: "Crop recommendation generated",
      time: "2 hours ago",
      icon: <Sprout className="w-4 h-4" />
    },
    {
      action: "New message in chat",
      time: "4 hours ago",
      icon: <MessageCircle className="w-4 h-4" />
    },
    {
      action: "Product listed in marketplace",
      time: "1 day ago",
      icon: <ShoppingCart className="w-4 h-4" />
    },
    {
      action: "Weather alert received",
      time: "2 days ago",
      icon: <Cloud className="w-4 h-4" />
    }
  ]

  // static fallbacks removed; real values come from API

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('/api/dashboard', { credentials: 'include' })
      .then(res => res.json())
      .then((json) => {
        if (!mounted) return
        if (json.error) {
          setError(json.error)
        } else {
          setData(json)
        }
      })
      .catch((err) => setError(err?.message || 'Failed to load dashboard'))
      .finally(() => { if (mounted) setLoading(false) })

    return () => { mounted = false }
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>

  const userName = data?.user?.name || 'Farmer'
  const farms = data?.farms || []
  const activities = data?.activities || []
  const weatherData = data?.latestWeather ? {
    temperature: data.latestWeather.temperature ? `${data.latestWeather.temperature}°C` : '—',
    humidity: data.latestWeather.humidity ? `${data.latestWeather.humidity}%` : '—',
    rainfall: data.latestWeather.rainfall ? `${data.latestWeather.rainfall}mm` : '—',
    windSpeed: data.latestWeather.windSpeed ? `${data.latestWeather.windSpeed} km/h` : '—',
    condition: data.latestWeather.condition || '—'
  } : {
    temperature: '—', humidity: '—', rainfall: '—', windSpeed: '—', condition: '—'
  }

  const carbonSummary = data?.carbonSummary || { _sum: { credits: null, value: null } }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.welcome}, {userName}
          </h1>
          <p className="text-muted">
            Here's what's happening on your farm today
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  {t.quickActions}
                </CardTitle>
                <CardDescription className="text-muted">
                  {t.quickActions}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.link}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                            {action.icon}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {action.title}
                          </h3>
                            <p className="text-sm text-muted">
                            {action.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  {t.recentActivity}
                </CardTitle>
                <CardDescription className="text-muted" >
                  {t.latestFarmingActivities}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(activities.length ? activities : recentActivity).map((activity: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center">
                        {activity.icon ?? <Sprout className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {typeof activity.time === 'string' ? activity.time : (activity.time ? new Date(activity.time).toLocaleString() : '')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Cloud className="w-5 h-5 mr-2 text-cyan-600" />
                  {t.currentWeather}
                </CardTitle>
                <CardDescription className="text-muted">
                  {t.currentWeather}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {weatherData.temperature}
                  </div>
                  <div className="text-sm text-muted">
                    {weatherData.condition}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-muted">{t.humidity}</span>
                    <span className="font-medium text-gray-500">{weatherData.humidity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-muted">{t.rainfall}</span>
                    <span className="font-medium text-gray-500">{weatherData.rainfall}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span className="text-muted">{t.windSpeed}</span>
                    <span className="font-medium text-gray-500">{weatherData.windSpeed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span className="text-muted">{t.uvIndex}</span>
                    <span className="font-medium text-gray-500">6</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <Link href="/weather">{t.viewFullForecast}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Farm Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  {t.farmDetailsTitle}
                </CardTitle>
                <CardDescription className="text-muted">
                  {t.farmDetailsSubtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted">{t.locationLabel}</span>
                    <span className="font-medium text-gray-500">Kerala, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{t.soilTypeLabel}</span>
                    <span className="font-medium text-gray-500">Loamy Soil</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{t.landSizeLabel}</span>
                    <span className="font-medium text-gray-500">5 acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{t.currentCropsLabel}</span>
                    <span className="font-medium text-gray-500">Rice, Coconut</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <Link href="/profile">{t.edit}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Carbon Credits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Leaf className="w-5 h-5 mr-2 text-emerald-600" />
                  {t.carbonCredits}
                </CardTitle>
                <CardDescription className="text-muted">
                  {t.environmentalImpact}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    1,250
                  </div>
                  <div className="text-sm text-muted">
                    {t.creditsGenerated}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">{t.thisMonth}</span>
                    <span className="font-medium text-emerald-600">+150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{t.totalValue}</span>
                    <span className="font-medium text-gray-500">₹12,500</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <Link href="/carbon-credits">{t.manageCreditsCTA}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
