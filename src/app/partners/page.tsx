"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function PartnersPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.partners ?? 'Partners'}</h1>
            <p className="text-muted mt-2">Partner programs and collaboration opportunities.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Partner with Us</CardTitle>
              <CardDescription className="text-muted">Information for NGOs, distributors and institutions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">If you'd like to partner with AgriWise, please reach out to partners@agriwise.com.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
