"use client";

import {
  Briefcase,
  Code,
  Globe,
  GraduationCap,
  Heart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CareersPage() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Impact-Driven Work",
      description:
        "Make a real difference in the lives of millions of farmers across India",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "Growth Opportunities",
      description:
        "Learn and grow with cutting-edge AI and agricultural technology",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Collaborative Culture",
      description:
        "Work with a passionate, mission-driven team in a supportive environment",
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600" />,
      title: "Flexible Work",
      description: "Remote-friendly culture with flexible working hours",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Competitive Package",
      description:
        "Market-competitive salary, equity options, and comprehensive benefits",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      title: "Learning Budget",
      description:
        "Annual learning and development budget for courses and conferences",
    },
  ];

  const openings = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote / Thiruvananthapuram",
      type: "Full-time",
      description:
        "Build scalable backend and frontend systems for our AI-powered agricultural platform.",
      requirements: [
        "5+ years experience with Node.js and React",
        "Experience with PostgreSQL and cloud platforms",
        "Passion for social impact",
      ],
    },
    {
      title: "ML Engineer - Computer Vision",
      department: "AI/ML",
      location: "Remote / Bangalore",
      type: "Full-time",
      description:
        "Develop computer vision models for crop disease detection and yield prediction.",
      requirements: [
        "3+ years experience in ML/DL",
        "Experience with PyTorch/TensorFlow",
        "Agricultural domain knowledge is a plus",
      ],
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description:
        "Design intuitive, accessible interfaces for farmers with varying literacy levels.",
      requirements: [
        "3+ years product design experience",
        "Strong UI/UX portfolio",
        "Experience designing for mobile-first, low-bandwidth scenarios",
      ],
    },
    {
      title: "Agricultural Specialist",
      department: "Operations",
      location: "Field-based / Multiple locations",
      type: "Full-time",
      description:
        "Work directly with farming communities to understand needs and validate solutions.",
      requirements: [
        "Degree in Agriculture or related field",
        "5+ years farming or agronomy experience",
        "Fluency in Hindi and regional languages",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Briefcase className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.careers ?? "Careers at AgriWise"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us in building technology that empowers farmers and
              transforms Indian agriculture
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-12 bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardContent className="py-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Our Mission
              </h2>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                We&apos;re a small, mission-driven team working to democratize
                access to agricultural technology. Every line of code we write,
                every feature we build, has the potential to improve the
                livelihood of farming families across India.
              </p>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Why Join AgriWise?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      {benefit.icon}
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Open Positions
            </h2>
            <div className="space-y-6">
              {openings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                            {job.location}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 mb-2">
                        Key Requirements:
                      </p>
                      <ul className="space-y-1">
                        {job.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex items-start"
                          >
                            <span className="text-green-600 mr-2">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                How to Apply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    1
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Choose a Role
                  </p>
                  <p className="text-sm text-gray-600">
                    Find a position that matches your skills and interests
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    2
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Submit Application
                  </p>
                  <p className="text-sm text-gray-600">
                    Send your resume and portfolio to careers@agriwise.com
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    3
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Interview Process
                  </p>
                  <p className="text-sm text-gray-600">
                    2-3 rounds including technical and culture fit interviews
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    4
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Join the Team
                  </p>
                  <p className="text-sm text-gray-600">
                    Start making an impact on day one!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gray-50">
            <CardContent className="text-center py-8">
              <Code className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Don&apos;t See a Perfect Fit?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We&apos;re always interested in hearing from talented,
                passionate individuals. Send us your resume and tell us how
                you&apos;d like to contribute to our mission.
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() =>
                  (window.location.href =
                    "mailto:careers@agriwise.com?subject=Open Application")
                }
              >
                Send Open Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
