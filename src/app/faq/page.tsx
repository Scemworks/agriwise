"use client";

import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is AgriWise?",
          a: "AgriWise is an AI-powered agricultural platform that helps farmers in India with crop recommendations, weather updates, marketplace access, and sustainable farming practices. We combine cutting-edge technology with local agricultural expertise to improve yields and farmer livelihoods.",
        },
        {
          q: "Is AgriWise free to use?",
          a: "Yes! Basic features including crop recommendations, weather updates, and the AI chat assistant are completely free. Premium features like advanced analytics and priority marketplace listings are available through our paid plans.",
        },
        {
          q: "How do I create an account?",
          a: "Click the 'Register' button on the homepage. You'll need to provide your name, email or phone number, and some basic information about your farm location. Choose whether you're registering as a Farmer or Buyer.",
        },
        {
          q: "What languages is AgriWise available in?",
          a: "AgriWise is currently available in English, Hindi, Tamil, Telugu, Marathi, Punjabi, and Gujarati. We're continuously adding more regional languages to serve farmers across India.",
        },
      ],
    },
    {
      category: "Crop Recommendations",
      questions: [
        {
          q: "How does the AI crop recommendation work?",
          a: "Our AI analyzes multiple factors including your soil type, location, climate data, historical yields, and market prices to recommend the most suitable crops for your farm. The system is trained on data from thousands of farms across India.",
        },
        {
          q: "Can I trust the crop recommendations?",
          a: "Our recommendations are based on data and AI analysis, but should be used as guidance alongside your own experience and consultation with local agricultural experts. We achieve 85%+ accuracy in our recommendations.",
        },
        {
          q: "How often are crop recommendations updated?",
          a: "Recommendations are updated daily based on the latest weather data, market prices, and seasonal factors. You can request a new recommendation anytime your farming conditions change.",
        },
      ],
    },
    {
      category: "Marketplace",
      questions: [
        {
          q: "How does the AgriWise marketplace work?",
          a: "Farmers can list their produce directly on the marketplace, set their own prices, and connect with verified buyers. Buyers can browse listings, place orders, and arrange delivery. We facilitate the connection but don't handle the physical transaction.",
        },
        {
          q: "Are there fees for using the marketplace?",
          a: "Listing products is free. We charge a small commission (2-5%) only when a sale is completed. This helps us maintain the platform and ensure quality.",
        },
        {
          q: "How do I get paid for my products?",
          a: "Payments are processed through secure payment gateways. You can receive payments via bank transfer, UPI, or other digital payment methods. Funds are typically transferred within 2-3 business days after delivery confirmation.",
        },
        {
          q: "What if there's a dispute with a buyer?",
          a: "We have a dispute resolution process. Contact our support team at support@agriwise.com with details and evidence (photos, communication records). We'll mediate to reach a fair resolution.",
        },
      ],
    },
    {
      category: "Weather & Climate",
      questions: [
        {
          q: "How accurate are the weather forecasts?",
          a: "We use data from the India Meteorological Department (IMD) and other reliable sources. Our forecasts are 80-85% accurate for 7-day predictions and become more precise for shorter timeframes.",
        },
        {
          q: "Do you provide weather alerts?",
          a: "Yes! We send SMS and in-app notifications for severe weather events like heavy rainfall, hail storms, heat waves, and cyclones. You can customize alert preferences in your account settings.",
        },
        {
          q: "Can I get hyperlocal weather data?",
          a: "Yes, our weather data is specific to your district and city. For the most accurate local conditions, make sure your location is set correctly in your profile.",
        },
      ],
    },
    {
      category: "Technical Issues",
      questions: [
        {
          q: "The app is slow. What should I do?",
          a: "AgriWise is optimized for slow connections. Try enabling 'Low Bandwidth Mode' in settings. Clear your browser cache, or try accessing during off-peak hours. If issues persist, contact support.",
        },
        {
          q: "I forgot my password. How do I reset it?",
          a: "Click 'Forgot Password' on the login page. Enter your registered email or phone number, and you'll receive a password reset link via SMS or email within a few minutes.",
        },
        {
          q: "Can I use AgriWise without internet?",
          a: "Some features like viewing saved recommendations and previously downloaded content work offline. However, real-time features like weather updates and marketplace require an internet connection.",
        },
        {
          q: "Is my data secure?",
          a: "Yes! We use bank-level encryption (TLS 1.3) for all data transmission. Your personal information and financial data are stored securely and never shared without your permission. See our Privacy Policy for details.",
        },
      ],
    },
    {
      category: "Carbon Credits & Sustainability",
      questions: [
        {
          q: "What are carbon credits?",
          a: "Carbon credits are certificates representing the reduction of greenhouse gas emissions. Farmers using sustainable practices like reduced tillage, cover cropping, or organic farming can earn carbon credits and sell them for additional income.",
        },
        {
          q: "How do I qualify for carbon credits?",
          a: "You need to adopt verified sustainable farming practices and have your farm audited by our partner organizations. We guide you through the process and help with documentation.",
        },
        {
          q: "How much can I earn from carbon credits?",
          a: "Earnings vary based on farm size and practices, but typically range from ₹5,000 to ₹50,000 per hectare per year. Contact our carbon credit team for a personalized estimate.",
        },
      ],
    },
    {
      category: "Account & Billing",
      questions: [
        {
          q: "How do I upgrade to a premium plan?",
          a: "Go to Account Settings > Subscription and choose the plan that fits your needs. Payment can be made via credit/debit card, UPI, or net banking.",
        },
        {
          q: "Can I cancel my subscription?",
          a: "Yes, you can cancel anytime from Account Settings. You'll retain premium access until the end of your billing period. No refunds for partial months.",
        },
        {
          q: "How do I update my farm information?",
          a: "Go to Dashboard > Farm Settings. You can update your farm size, soil type, crops grown, and location. Keep this information current for the best recommendations.",
        },
        {
          q: "How do I delete my account?",
          a: "Go to Account Settings > Privacy > Delete Account. Note that this action is permanent and will delete all your data. Transaction records are retained for 7 years as required by law.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.faq ?? "Frequently Asked Questions"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about AgriWise
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <Card
                        key={faqIndex}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardHeader
                          className="cursor-pointer"
                          onClick={() =>
                            setOpenIndex(isOpen ? null : globalIndex)
                          }
                        >
                          <CardTitle className="flex items-center justify-between text-lg">
                            <span className="pr-4">{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        {isOpen && (
                          <CardContent>
                            <p className="text-gray-700 leading-relaxed">
                              {faq.a}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <Card className="mt-12 bg-green-50 border-green-200">
            <CardContent className="py-8 text-center">
              <HelpCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Still Have Questions?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our support team
                is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Contact Support
                </button>
                <button
                  onClick={() => (window.location.href = "/chat")}
                  className="px-6 py-3 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                >
                  Live Chat
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
