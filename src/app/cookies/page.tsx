"use client";

import { Cookie, Info, Settings, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookiesPage() {
  const { t } = useLanguage();

  const cookieTypes = [
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Essential Cookies",
      purpose: "Required for basic site functionality",
      examples: [
        "Authentication tokens",
        "Session management",
        "Security features",
      ],
      canDisable: false,
      duration: "Session or up to 30 days",
    },
    {
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      title: "Functional Cookies",
      purpose: "Enable enhanced functionality and personalization",
      examples: ["Language preferences", "Region selection", "User settings"],
      canDisable: true,
      duration: "Up to 1 year",
    },
    {
      icon: <Info className="w-6 h-6 text-purple-600" />,
      title: "Analytics Cookies",
      purpose: "Help us understand how users interact with our site",
      examples: ["Page views", "Feature usage", "Performance metrics"],
      canDisable: true,
      duration: "Up to 2 years",
    },
  ];

  const specificCookies = [
    {
      name: "auth_token",
      purpose: "Maintains user authentication session",
      type: "Essential",
      duration: "15 minutes",
    },
    {
      name: "refresh_token",
      purpose: "Enables automatic re-authentication",
      type: "Essential",
      duration: "30 days",
    },
    {
      name: "user_language",
      purpose: "Stores preferred language selection",
      type: "Functional",
      duration: "1 year",
    },
    {
      name: "user_region",
      purpose: "Remembers selected state/district",
      type: "Functional",
      duration: "1 year",
    },
    {
      name: "_ga",
      purpose: "Google Analytics - distinguishes users",
      type: "Analytics",
      duration: "2 years",
    },
    {
      name: "_gid",
      purpose: "Google Analytics - distinguishes users",
      type: "Analytics",
      duration: "24 hours",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Cookie className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.cookiePolicy ?? "Cookie Policy"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              How AgriWise uses cookies and similar technologies to improve your
              experience
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: October 1, 2025
            </p>
          </div>

          {/* What Are Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                Cookies are small text files that are stored on your device when
                you visit a website. They help websites remember information
                about your visit, making your experience more efficient and
                personalized.
              </p>
              <p className="text-gray-700">
                AgriWise uses cookies to provide essential functionality,
                remember your preferences, and understand how you use our
                platform. This helps us improve our services and provide you
                with a better experience.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              {cookieTypes.map((cookie, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {cookie.icon}
                        <CardTitle className="text-lg">
                          {cookie.title}
                        </CardTitle>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          cookie.canDisable
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {cookie.canDisable ? "Optional" : "Required"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm font-semibold text-gray-900">
                      Purpose:
                    </p>
                    <p className="text-sm text-gray-700">{cookie.purpose}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      Examples:
                    </p>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-center"
                        >
                          <span className="text-green-600 mr-2">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-600">
                      Duration: {cookie.duration}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Specific Cookies Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Specific Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="py-3 font-semibold text-gray-900">
                        Cookie Name
                      </th>
                      <th className="py-3 font-semibold text-gray-900">
                        Purpose
                      </th>
                      <th className="py-3 font-semibold text-gray-900">Type</th>
                      <th className="py-3 font-semibold text-gray-900">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specificCookies.map((cookie, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 font-mono text-xs text-gray-700">
                          {cookie.name}
                        </td>
                        <td className="py-3 text-gray-700">{cookie.purpose}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              cookie.type === "Essential"
                                ? "bg-red-100 text-red-700"
                                : cookie.type === "Functional"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {cookie.type}
                          </span>
                        </td>
                        <td className="py-3 text-gray-700">
                          {cookie.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">
                  Browser Settings
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  You can control and manage cookies through your browser
                  settings. Most browsers allow you to:
                </p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    View cookies stored on your device
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    Delete cookies individually or all at once
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    Block cookies from specific sites or all sites
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    Set preferences for third-party cookies
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">
                  Impact of Disabling Cookies
                </p>
                <p className="text-sm text-gray-700">
                  Please note that disabling essential cookies will affect the
                  functionality of AgriWise. You may not be able to log in, save
                  preferences, or use certain features. Functional and analytics
                  cookies can be disabled without affecting core functionality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Cookies */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                AgriWise may use third-party services that set their own
                cookies:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Google Analytics:</strong> Helps us understand how
                    users interact with our site
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Payment Processors:</strong> Secure payment
                    processing for marketplace transactions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>CDN Providers:</strong> Content delivery for faster
                    page loading
                  </span>
                </li>
              </ul>
              <p className="text-sm text-gray-700">
                These third parties have their own privacy policies governing
                their use of cookies.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="py-6">
              <p className="text-gray-700 text-center">
                If you have questions about our use of cookies, please contact
                us at{" "}
                <a
                  href="mailto:privacy@agriwise.com"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  privacy@agriwise.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
