"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Info } from 'lucide-react'

export default function HelpPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.helpCenter ?? 'Help Center'}</h1>
            <p className="text-muted mt-2">How can we assist you today?</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Info className="w-5 h-5 mr-2 text-blue-600"/> {t.helpCenter ?? 'Help Center'}</CardTitle>
              <CardDescription className="text-muted">FAQs, guides and support contacts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">Visit the FAQ or contact support for more help.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
