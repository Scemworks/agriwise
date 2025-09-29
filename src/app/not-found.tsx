"use client"

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-surface text-surface-foreground">
      <main className="flex-grow container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="max-w-xl text-center bg-card p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4 text-foreground">{t.notFoundTitle}</h1>
          <p className="mb-6 text-muted">{t.notFoundMessage}</p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="px-5 py-2 bg-brand text-brand-foreground rounded-md hover:opacity-95">
              {t.goHome}
            </Link>
            <button onClick={() => window.history.back()} className="px-5 py-2 border border-gray-300 rounded-md text-muted">
              {t.back}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
