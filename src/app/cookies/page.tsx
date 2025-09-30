"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function CookiesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.cookiePolicy ?? 'Cookie Policy'}</h1>
            <p className="text-muted mt-2">How we use cookies and similar technologies.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cookies</CardTitle>
              <CardDescription className="text-muted">Cookie usage and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">Explain cookie categories, purposes, and how users can manage preferences.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
