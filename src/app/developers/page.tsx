"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function DevelopersPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.developers ?? 'Developers'}</h1>
            <p className="text-muted mt-2">Resources for integrating with AgriWise.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription className="text-muted">Guides, SDKs and API keys.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">Developer documentation and example projects will be available here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
