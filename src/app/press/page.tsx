"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function PressPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.press ?? 'Press'}</h1>
            <p className="text-muted mt-2">Media resources and press contacts.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription className="text-muted">Press kit and contact information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">For press inquiries, contact press@agriwise.com.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
