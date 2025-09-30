"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function NewsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.news ?? 'News'}</h1>
            <p className="text-muted mt-2">Updates and announcements from AgriWise.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Updates</CardTitle>
              <CardDescription className="text-muted">No updates available yet.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">This page will list important news and releases.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
