"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Sprout } from 'lucide-react'

export default function MissionPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">{t.ourMission ?? 'Our Mission'}</h1>
            <p className="text-muted mt-3">We aim to empower farmers with AI and marketplace tools to increase yields and livelihoods.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Sprout className="w-5 h-5 mr-2 text-green-600"/> {t.aboutUs ?? 'About Us'}</CardTitle>
              <CardDescription className="text-muted">A brief overview of AgriWise's mission and values.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">AgriWise builds modern tools for smallholder farmers — combining crop insights, weather, marketplace and sustainability programs to increase resilience and income.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
