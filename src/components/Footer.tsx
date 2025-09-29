'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Sprout, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Heart
} from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: t.aboutUs,
      links: [
        { name: t.ourMission, href: '/mission' },
        { name: t.contactUs, href: '/contact' },
        { name: t.careers, href: '/careers' },
        { name: t.blog, href: '/blog' },
        { name: t.news, href: '/news' },
        { name: t.press, href: '/press' }
      ]
    },
    {
      title: t.support,
      links: [
        { name: t.helpCenter, href: '/help' },
        { name: t.faq, href: '/faq' },
        { name: t.documentation, href: '/docs' },
        { name: t.api, href: '/api' },
        { name: t.developers, href: '/developers' },
        { name: t.partners, href: '/partners' }
      ]
    },
    {
      title: 'Products',
      links: [
        { name: t.cropRecommendations, href: '/recommendations' },
        { name: t.chatAssistant, href: '/chat' },
        { name: t.marketplace, href: '/marketplace' },
        { name: t.weatherUpdates, href: '/weather' },
        { name: t.carbonCredits, href: '/carbon-credits' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: t.termsOfService, href: '/terms' },
        { name: t.privacyPolicy, href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Data Protection', href: '/data-protection' },
        { name: 'Accessibility', href: '/accessibility' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/agriwise', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/agriwise', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/agriwise', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/agriwise', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/agriwise', color: 'hover:text-red-600' }
  ]

  return (
    <footer className="bg-surface text-surface-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
                <Sprout className="w-4 h-4 text-brand-foreground" />
              </div>
              <span className="text-lg font-semibold">AgriWise</span>
            </div>
            <p className="text-sm text-muted max-w-xs mb-4">{t.heroSubtitle}</p>
            <div className="space-y-2 text-sm text-muted">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@agriwise.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-3 text-sm text-foreground">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-muted">© {currentYear} AgriWise. {t.allRightsReserved}</div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted">{t.madeWith}</div>
              <Heart className="w-4 h-4 text-red-500" />
              <div className="text-sm text-muted">{t.forFarmers}</div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-muted hover:text-foreground">{t.termsOfService}</Link>
              <Link href="/privacy" className="text-sm text-muted hover:text-foreground">{t.privacyPolicy}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
