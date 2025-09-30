"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.termsOfService ?? 'Terms of Service'}</h1>
            <p className="text-muted mt-2">Please read these terms carefully before using AgriWise.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Terms</CardTitle>
              <CardDescription className="text-muted">Legal terms and conditions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">This page contains the Terms of Service. Replace this with actual legal text before publishing.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
