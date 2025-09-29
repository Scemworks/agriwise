'use client'

import React from 'react'
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
  Users,
  Shield,
  Smartphone,
  Globe
} from 'lucide-react'

export default function Home() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-green-600" />,
      title: t.cropRecommendations,
      description: t.featureDescCropRecommendations,
      link: "/recommendations"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-600" />,
      title: t.chatAssistant,
      description: t.featureDescChatAssistant,
      link: "/chat"
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-purple-600" />,
      title: t.marketplace,
      description: t.featureDescMarketplace,
      link: "/marketplace"
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-600" />,
      title: t.weatherUpdates,
      description: t.featureDescWeather,
      link: "/weather"
    },
    {
      icon: <Leaf className="w-8 h-8 text-emerald-600" />,
      title: t.carbonCredits,
      description: t.featureDescCarbonCredits,
      link: "/carbon-credits"
    }
  ]

  const stats = [
    { number: "10K+", label: t.farmersConnected },
    { number: "50+", label: t.cropVarieties },
    { number: "₹2M+", label: t.creditsGenerated },
    { number: "95%", label: t.successRate }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/register">{t.getStarted}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <Link href="/login">{t.signIn}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.everythingYouNeed}
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              {t.featuresIntro}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {feature.icon}
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full text-green-600">
                    <Link href={feature.link}>{t.learnMore}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t.whyChooseAgriWise}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t.increasedYield}
                    </h3>
                    <p className="text-muted">
                      {t.benefitsYieldDesc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t.communitySupport}
                    </h3>
                    <p className="text-muted">
                      {t.benefitsCommunityDesc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t.sustainablePractices}
                    </h3>
                    <p className="text-gray-600">
                      {t.benefitsSustainabilityDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8">
              <div className="text-center">
                <Smartphone className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.mobileFirstDesign}
                </h3>
                <p className="text-muted mb-6">
                  Access all features on your mobile device with our 
                  responsive design optimized for farmers.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" />
                  <span>{t.mobileAvailability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t.readyToTransform}
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {t.joinThousands}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
              <Link href="/register">{t.startFreeTrial}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
              <Link href="/marketplace">{t.browseMarketplace}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
