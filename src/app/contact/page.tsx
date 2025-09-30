"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t.contactUs ?? 'Contact Us'}</h1>
            <p className="text-muted mt-2">We're here to help — reach out with questions or partnership inquiries.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Mail className="w-5 h-5 mr-2 text-green-600"/> {t.contactUs ?? 'Contact'}</CardTitle>
              <CardDescription className="text-muted">General enquiries and support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted">
              <div className="flex items-center space-x-3"><Mail className="w-4 h-4"/><span>support@agriwise.com</span></div>
              <div className="flex items-center space-x-3"><Phone className="w-4 h-4"/><span>+91 98765 43210</span></div>
              <div className="flex items-center space-x-3"><MapPin className="w-4 h-4"/><span>Kerala, India</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
