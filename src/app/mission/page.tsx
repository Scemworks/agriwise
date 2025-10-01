"use client";

import {
  Globe,
  Heart,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MissionPage() {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Farmer-First Approach",
      description:
        "Every decision we make puts farmers at the center. We build tools that truly solve their problems and respect their knowledge.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      title: "Innovation for Impact",
      description:
        "We leverage cutting-edge AI and technology not for its own sake, but to create measurable improvements in farming outcomes.",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Sustainability",
      description:
        "We promote practices that protect the environment, improve soil health, and ensure agriculture can thrive for generations.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Economic Empowerment",
      description:
        "We connect farmers directly to markets, provide fair pricing insights, and help them access carbon credit opportunities.",
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Inclusivity",
      description:
        "Our platform supports multiple languages and works in areas with limited connectivity, ensuring no farmer is left behind.",
    },
    {
      icon: <Target className="w-8 h-8 text-orange-600" />,
      title: "Data-Driven Decisions",
      description:
        "We empower farmers with actionable insights based on weather, soil, and market data to make informed choices.",
    },
  ];

  const goals = [
    {
      title: "Increase Crop Yields",
      description:
        "Help farmers achieve 20-30% higher yields through AI-powered crop recommendations and precision farming guidance.",
    },
    {
      title: "Reduce Input Costs",
      description:
        "Optimize fertilizer, water, and pesticide usage to reduce costs by 15-25% while maintaining or improving productivity.",
    },
    {
      title: "Improve Market Access",
      description:
        "Connect 100,000+ farmers directly to buyers, eliminating middlemen and ensuring fair prices for their produce.",
    },
    {
      title: "Climate Resilience",
      description:
        "Provide real-time weather alerts and climate-adaptive recommendations to protect farms from extreme weather events.",
    },
    {
      title: "Financial Inclusion",
      description:
        "Enable farmers to participate in carbon credit markets and access new revenue streams from sustainable practices.",
    },
    {
      title: "Knowledge Sharing",
      description:
        "Build a community where farmers can learn from each other, share best practices, and access expert agricultural advice.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Target className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {t.ourMission ?? "Our Mission"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To empower smallholder farmers across India with AI-driven
              insights, market access, and sustainable farming practices that
              increase yields, reduce costs, and improve livelihoods.
            </p>
          </div>

          {/* Vision Statement */}
          <Card className="mb-12 border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                A future where every farmer, regardless of farm size or
                location, has access to world-class agricultural technology,
                fair markets, and the knowledge needed to build a prosperous and
                sustainable farming business.
              </p>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      {value.icon}
                      <CardTitle className="text-lg">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Goals Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Our Goals for 2025-2026
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-700 rounded-full mr-3 text-sm font-bold">
                        {index + 1}
                      </span>
                      {goal.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why It Matters */}
          <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">
                Why This Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white/90 leading-relaxed">
                India has over 120 million farmers, with 86% operating on small
                farms of less than 2 hectares. These farmers face challenges
                including unpredictable weather, fluctuating market prices,
                limited access to credit, and a lack of timely agricultural
                information.
              </p>
              <p className="text-white/90 leading-relaxed">
                AgriWise bridges this gap by combining artificial intelligence,
                real-time data, and community-driven insights into a single,
                accessible platform. We believe that technology should serve
                those who need it most, and that every farmer deserves the tools
                to succeed in an increasingly complex agricultural landscape.
              </p>
              <p className="text-white/90 leading-relaxed font-semibold">
                Together, we&apos;re not just building a platform – we&apos;re
                building a more resilient, sustainable, and prosperous future
                for Indian agriculture.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
