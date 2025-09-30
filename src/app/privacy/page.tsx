"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.privacyPolicy ?? 'Privacy Policy'}</h1>
            <p className="text-muted mt-2">How we collect and handle your data.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription className="text-muted">Data handling and privacy information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">This page will explain our privacy practices. Add detailed policy text here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
