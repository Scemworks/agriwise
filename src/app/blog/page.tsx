"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function BlogPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.blog ?? 'Blog'}</h1>
            <p className="text-muted mt-2">Latest articles on farming, sustainability and product updates.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
              <CardDescription className="text-muted">No posts yet — this is a placeholder page.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">We'll publish articles and guides here soon.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
