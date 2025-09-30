"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Heart } from 'lucide-react'

export default function CareersPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.careers ?? 'Careers'}</h1>
            <p className="text-muted mt-2">Join us to build tools for farmers and sustainable agriculture.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Heart className="w-5 h-5 mr-2 text-red-500"/> Opportunities</CardTitle>
              <CardDescription className="text-muted">Open roles and how to apply</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">We're a small, mission-driven team. Send resumes to careers@agriwise.com. Check back for open positions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
