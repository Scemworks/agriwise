"use client";

import { Download, Eye, Lock, Shield, Trash2, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DataProtectionPage() {
  const { t } = useLanguage();

  const userRights = [
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Right to Access",
      description:
        "You have the right to request a copy of all personal data we hold about you.",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      title: "Right to Rectification",
      description:
        "You can request correction of inaccurate or incomplete personal information.",
    },
    {
      icon: <Trash2 className="w-6 h-6 text-red-600" />,
      title: "Right to Erasure",
      description:
        "You can request deletion of your personal data, subject to legal obligations.",
    },
    {
      icon: <Download className="w-6 h-6 text-purple-600" />,
      title: "Right to Data Portability",
      description:
        "You can request your data in a machine-readable format to transfer to another service.",
    },
    {
      icon: <Lock className="w-6 h-6 text-orange-600" />,
      title: "Right to Restrict Processing",
      description:
        "You can request that we limit how we use your personal information.",
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: "Right to Object",
      description:
        "You can object to processing of your data for specific purposes like marketing.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.dataProtection ?? "Data Protection & Your Rights"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding how we protect your data and your rights under
              Indian data protection laws
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: October 1, 2025
            </p>
          </div>

          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Our Commitment to Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                AgriWise is committed to protecting your personal information
                and respecting your privacy rights. We comply with the
                Information Technology Act, 2000, the IT (Reasonable Security
                Practices and Procedures and Sensitive Personal Data or
                Information) Rules, 2011, and international best practices
                including GDPR principles.
              </p>
              <p className="text-gray-700">
                This page outlines your data protection rights and how to
                exercise them.
              </p>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Data Protection Rights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userRights.map((right, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      {right.icon}
                      <CardTitle className="text-lg">{right.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{right.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Security Measures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your
                data:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Encryption:</strong> All data transmitted between
                    your device and our servers is encrypted using TLS 1.3
                  </span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Password Security:</strong> Passwords are hashed
                    using bcrypt with 12 rounds
                  </span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Access Controls:</strong> Strict role-based access
                    controls limit who can access your data
                  </span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Regular Audits:</strong> We conduct regular security
                    audits and vulnerability assessments
                  </span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Secure Infrastructure:</strong> Data is hosted on
                    secure, compliant cloud infrastructure
                  </span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    <strong>Backup & Recovery:</strong> Regular backups ensure
                    data can be recovered in case of incidents
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Retention Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We retain your data only as long as necessary:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-green-600 pl-4">
                  <p className="font-semibold text-gray-900">Active Accounts</p>
                  <p className="text-sm text-gray-600">
                    Data retained while your account is active and for
                    legitimate business purposes
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="font-semibold text-gray-900">Closed Accounts</p>
                  <p className="text-sm text-gray-600">
                    Most data deleted within 30 days of account closure, unless
                    required by law
                  </p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <p className="font-semibold text-gray-900">
                    Transaction Records
                  </p>
                  <p className="text-sm text-gray-600">
                    Retained for 7 years to comply with tax and accounting
                    regulations
                  </p>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="font-semibold text-gray-900">
                    Anonymized Analytics
                  </p>
                  <p className="text-sm text-gray-600">
                    Aggregated, non-identifiable data may be retained
                    indefinitely for research
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How to Exercise Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                To exercise any of your data protection rights, you can:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">Email Us</p>
                  <p className="text-sm text-gray-600">
                    Send your request to privacy@agriwise.com
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Account Settings
                  </p>
                  <p className="text-sm text-gray-600">
                    Manage some preferences directly in your account settings
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Response Time</p>
                  <p className="text-sm text-gray-600">
                    We will respond to your request within 30 days
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Please note: We may need to verify your identity before
                processing certain requests to protect your data from
                unauthorized access.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Breach Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                In the unlikely event of a data breach that affects your
                personal information, we will:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    Notify affected users within 72 hours of discovering the
                    breach
                  </span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>Inform relevant authorities as required by law</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    Provide details about the breach and steps we&apos;re taking
                    to address it
                  </span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>
                    Recommend actions you can take to protect yourself
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="py-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Questions About Data Protection?
              </h3>
              <p className="text-gray-700 mb-4">
                Our Data Protection Officer is here to help
              </p>
              <p className="text-gray-600">
                Email:{" "}
                <a
                  href="mailto:privacy@agriwise.com"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  privacy@agriwise.com
                </a>
                <br />
                Phone: +91 98765 43210
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
