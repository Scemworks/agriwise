"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function DataProtectionPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.dataProtection ?? 'Data Protection'}</h1>
            <p className="text-muted mt-2">Information on data rights and protection measures.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
              <CardDescription className="text-muted">How we secure and retain user data.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">Details about user rights, retention, and security practices.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
