"use client";

import {
  Bell,
  Database,
  Eye,
  Lock,
  Share2,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();

  const sections = [
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Account Information",
          items: [
            "Full name",
            "Email address",
            "Phone number",
            "Password (encrypted)",
            "Profile photo (optional)",
          ],
        },
        {
          subtitle: "Farm Information",
          items: [
            "Farm location (state, city)",
            "Land size",
            "Crops grown",
            "Farming practices",
          ],
        },
        {
          subtitle: "Usage Data",
          items: [
            "Pages visited",
            "Features used",
            "Search queries",
            "Chat conversations",
            "Time spent on platform",
          ],
        },
        {
          subtitle: "Device Information",
          items: [
            "IP address",
            "Browser type and version",
            "Device type",
            "Operating system",
            "Screen resolution",
          ],
        },
        {
          subtitle: "Marketplace Data",
          items: [
            "Product listings",
            "Transaction history",
            "Reviews and ratings",
            "Seller/buyer communications",
          ],
        },
      ],
    },
    {
      icon: <Eye className="w-6 h-6 text-green-600" />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Provide Services",
          items: [
            "Personalized crop recommendations",
            "Weather forecasts for your location",
            "AI-powered farming advice",
            "Marketplace transactions",
          ],
        },
        {
          subtitle: "Improve Our Platform",
          items: [
            "Analyze usage patterns",
            "Develop new features",
            "Fix bugs and errors",
            "Optimize performance",
          ],
        },
        {
          subtitle: "Communications",
          items: [
            "Service updates and notifications",
            "Weather alerts",
            "Marketplace messages",
            "Support responses",
            "Newsletter (with consent)",
          ],
        },
        {
          subtitle: "Safety and Security",
          items: [
            "Prevent fraud",
            "Detect unauthorized access",
            "Comply with legal obligations",
            "Protect users' rights",
          ],
        },
      ],
    },
    {
      icon: <Share2 className="w-6 h-6 text-purple-600" />,
      title: "How We Share Your Information",
      content: [
        {
          subtitle: "We DO NOT Sell Your Data",
          items: [
            "We never sell personal information to third parties",
            "Your data is not a product",
          ],
        },
        {
          subtitle: "Service Providers",
          items: [
            "Cloud hosting providers",
            "Weather data providers",
            "Payment processors (for marketplace)",
            "Analytics services",
            "Email service providers",
          ],
        },
        {
          subtitle: "With Your Consent",
          items: [
            "Marketplace buyers/sellers (name, location, contact)",
            "Public reviews and ratings",
            "Shared content (if you choose to share)",
          ],
        },
        {
          subtitle: "Legal Requirements",
          items: [
            "Court orders or legal process",
            "Comply with laws and regulations",
            "Protect rights and safety",
            "Prevent fraud or illegal activity",
          ],
        },
      ],
    },
    {
      icon: <Lock className="w-6 h-6 text-orange-600" />,
      title: "Data Security",
      content: [
        {
          subtitle: "Technical Measures",
          items: [
            "256-bit SSL/TLS encryption",
            "Password hashing with bcrypt",
            "HTTPOnly secure cookies",
            "Regular security audits",
            "Firewall protection",
          ],
        },
        {
          subtitle: "Organizational Measures",
          items: [
            "Access controls and permissions",
            "Employee training on data protection",
            "Incident response procedures",
            "Regular backups",
            "Secure development practices",
          ],
        },
      ],
    },
    {
      icon: <Users className="w-6 h-6 text-teal-600" />,
      title: "Your Rights",
      content: [
        {
          subtitle: "Access and Control",
          items: [
            "View your personal data",
            "Download your data",
            "Update or correct information",
            "Delete your account",
            "Opt-out of marketing communications",
          ],
        },
        {
          subtitle: "Data Portability",
          items: [
            "Export your data in JSON format",
            "Transfer data to another service",
            "Receive structured data copy",
          ],
        },
      ],
    },
    {
      icon: <Trash2 className="w-6 h-6 text-red-600" />,
      title: "Data Retention",
      content: [
        {
          subtitle: "Active Accounts",
          items: [
            "Data retained while account is active",
            "You can request deletion anytime",
          ],
        },
        {
          subtitle: "After Account Deletion",
          items: [
            "Most data deleted within 30 days",
            "Transaction records: 7 years (tax law)",
            "Anonymized analytics: indefinitely",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.privacyPolicy ?? "Privacy Policy"}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your privacy matters to us. This policy explains what information
              we collect, how we use it, and your rights regarding your data.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Effective Date: October 1, 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                AgriWise (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
                committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our platform.
              </p>
              <p className="text-gray-700">
                By using AgriWise, you agree to the collection and use of
                information in accordance with this policy. If you do not agree
                with our policies and practices, please do not use our services.
              </p>
              <p className="text-gray-700">
                This policy complies with the Information Technology Act, 2000,
                the Information Technology (Reasonable Security Practices and
                Procedures and Sensitive Personal Data or Information) Rules,
                2011, and the General Data Protection Regulation (GDPR) for our
                European users.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-6 mb-8">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {section.icon}
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.content.map((subsection, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-1">
                        {subsection.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="text-green-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Children's Privacy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                AgriWise is intended for users who are 18 years of age or older.
                We do not knowingly collect personal information from children
                under 18. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us
                immediately at privacy@agriwise.in.
              </p>
            </CardContent>
          </Card>

          {/* Third-Party Links */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Third-Party Websites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our platform may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                sites. We encourage you to read the privacy policies of any
                third-party sites you visit.
              </p>
            </CardContent>
          </Card>

          {/* International Users */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Your information may be transferred to and processed in
                countries other than your country of residence. These countries
                may have data protection laws different from your country. We
                ensure appropriate safeguards are in place to protect your
                information in accordance with this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>
                    Posting the new policy on this page with an updated
                    &quot;Effective Date&quot;
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>
                    Sending an email notification for significant changes
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-1">•</span>
                  <span>In-app notification upon your next login</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
                Your continued use of AgriWise after any changes indicates your
                acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you have questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-gray-700">
                  <strong>Privacy Officer:</strong> AgriWise Technologies
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@agriwise.in
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +91-XXXX-XXXXXX
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> [Your Company Address]
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> Within 2 business days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
