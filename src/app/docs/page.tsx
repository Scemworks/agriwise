"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function DocsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.documentation ?? 'Documentation'}</h1>
            <p className="text-muted mt-2">API docs and developer guidance.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Docs</CardTitle>
              <CardDescription className="text-muted">Developer resources and API documentation.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">This section will link to detailed API docs and integration guides.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
