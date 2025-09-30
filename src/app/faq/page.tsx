"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function FAQPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.faq ?? 'FAQ'}</h1>
            <p className="text-muted mt-2">Common questions and answers about AgriWise.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription className="text-muted">Quick answers to common queries.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">This page will include commonly asked questions to help users get started.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
