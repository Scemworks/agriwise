"use client";

import { AlertCircle, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using AgriWise, you accept and agree to be bound by these Terms of Service and our Privacy Policy.",
        "If you do not agree to these terms, please do not use our services.",
        "We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.",
      ],
    },
    {
      title: "2. User Accounts",
      content: [
        "You must register an account to access certain features of AgriWise.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must be at least 18 years old to create an account.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are responsible for all activities that occur under your account.",
      ],
    },
    {
      title: "3. Use of Services",
      content: [
        "AgriWise provides agricultural recommendations, weather information, marketplace access, and other farming-related services.",
        "All recommendations are provided for informational purposes and should be used in conjunction with professional agricultural advice.",
        "We do not guarantee specific crop yields or outcomes from following our recommendations.",
        "You agree to use the services only for lawful purposes and in compliance with all applicable laws.",
      ],
    },
    {
      title: "4. Marketplace Terms",
      content: [
        "The AgriWise marketplace connects farmers with buyers for agricultural products.",
        "We act as a platform facilitator and are not a party to transactions between users.",
        "Users are responsible for the quality, legality, and delivery of products listed or purchased.",
        "We do not guarantee the quality, safety, or legality of items listed on the marketplace.",
        "Payment processing is handled through secure third-party payment processors.",
        "Disputes between buyers and sellers should be resolved directly between the parties.",
      ],
    },
    {
      title: "5. AI-Generated Content",
      content: [
        "Our AI-powered recommendations are based on available data and algorithms.",
        "AI recommendations should be used as guidance, not as definitive instructions.",
        "We are not liable for losses resulting from following AI-generated recommendations.",
        "Users should verify all recommendations with agricultural experts before implementation.",
      ],
    },
    {
      title: "6. User Content",
      content: [
        "You retain ownership of content you post on AgriWise.",
        "By posting content, you grant us a license to use, display, and distribute your content on the platform.",
        "You are responsible for the content you post and must not post illegal, harmful, or infringing content.",
        "We reserve the right to remove any content that violates these terms.",
      ],
    },
    {
      title: "7. Intellectual Property",
      content: [
        "AgriWise and all related trademarks, logos, and content are owned by AgriWise Technologies.",
        "You may not copy, modify, distribute, or reverse engineer any part of our services without permission.",
        "Our AI models, algorithms, and proprietary technology are protected by intellectual property laws.",
      ],
    },
    {
      title: "8. Limitation of Liability",
      content: [
        "AgriWise is provided 'as is' without warranties of any kind.",
        "We are not liable for any direct, indirect, incidental, or consequential damages arising from use of our services.",
        "We do not guarantee uninterrupted or error-free service.",
        "Our total liability shall not exceed the amount you paid for services in the past 12 months.",
      ],
    },
    {
      title: "9. Indemnification",
      content: [
        "You agree to indemnify and hold harmless AgriWise from any claims arising from your use of the services.",
        "This includes claims related to content you post, transactions you conduct, or violations of these terms.",
      ],
    },
    {
      title: "10. Termination",
      content: [
        "We may terminate or suspend your account at any time for violation of these terms.",
        "You may terminate your account at any time by contacting support.",
        "Upon termination, your right to use the services ceases immediately.",
        "Certain provisions of these terms survive termination, including intellectual property rights and limitation of liability.",
      ],
    },
    {
      title: "11. Governing Law",
      content: [
        "These terms are governed by the laws of India.",
        "Any disputes shall be subject to the exclusive jurisdiction of courts in Thiruvananthapuram, Kerala.",
        "This agreement complies with the Information Technology Act, 2000 and related regulations.",
      ],
    },
    {
      title: "12. Contact Information",
      content: [
        "For questions about these Terms of Service, contact us at:",
        "Email: legal@agriwise.com",
        "Address: AgriWise Technologies, Innovation Hub, Technopark, Thiruvananthapuram, Kerala 695581, India",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.termsOfService ?? "Terms of Service"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using AgriWise
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: October 1, 2025
            </p>
          </div>

          {/* Important Notice */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-900">
                <AlertCircle className="w-5 h-5 mr-2" />
                Important Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-900">
                By using AgriWise, you agree to these Terms of Service. If you
                do not agree, please discontinue use of the platform
                immediately. These terms constitute a legally binding agreement
                between you and AgriWise Technologies.
              </p>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 flex items-start"
                      >
                        <span className="text-green-600 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Acknowledgement */}
          <Card className="mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="w-5 h-5 mr-2" />
                Acknowledgement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                By continuing to use AgriWise, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of
                Service. If you have any questions, please contact us at
                legal@agriwise.com.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
