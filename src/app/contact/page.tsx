"use client";

import {
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "support@agriwise.com",
      action: "mailto:support@agriwise.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Phone Support",
      description: "Talk to our team during business hours",
      contact: "+91 98765 43210",
      action: "tel:+919876543210",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available in app",
      action: "/chat",
    },
    {
      icon: <Headphones className="w-6 h-6 text-orange-600" />,
      title: "WhatsApp",
      description: "Connect with us on WhatsApp",
      contact: "+91 98765 43210",
      action: "https://wa.me/919876543210",
    },
  ];

  const departments = [
    {
      name: "General Support",
      email: "support@agriwise.com",
      description:
        "Questions about using AgriWise, account issues, technical problems",
    },
    {
      name: "Sales & Partnerships",
      email: "partners@agriwise.com",
      description:
        "Partnership inquiries, bulk licensing, institutional collaborations",
    },
    {
      name: "Press & Media",
      email: "press@agriwise.com",
      description: "Media inquiries, press releases, interview requests",
    },
    {
      name: "Careers",
      email: "careers@agriwise.com",
      description: "Job applications, internship opportunities",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Headphones className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.contactUs ?? "Contact Us"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re here to help! Reach out with questions, feedback, or
              partnership inquiries.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-gray-50 rounded-full">
                      {method.icon}
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => (window.location.href = method.action)}
                  >
                    {method.contact}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What can we help you with?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Information & Departments */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      AgriWise Technologies
                    </p>
                    <p className="text-sm text-gray-600">
                      Innovation Hub, Technopark
                    </p>
                    <p className="text-sm text-gray-600">
                      Thiruvananthapuram, Kerala 695581
                    </p>
                    <p className="text-sm text-gray-600">India</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Mon-Fri: 9:00 AM - 6:00 PM IST</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Departments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div
                        key={index}
                        className="border-b last:border-0 pb-3 last:pb-0"
                      >
                        <p className="font-semibold text-gray-900 text-sm">
                          {dept.name}
                        </p>
                        <p className="text-xs text-gray-600 mb-1">
                          {dept.description}
                        </p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-xs text-green-600 hover:text-green-700"
                        >
                          {dept.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Link */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Have a Question?
              </h3>
              <p className="text-gray-600 mb-4">
                Check our FAQ section for quick answers to common questions
              </p>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/faq")}
              >
                Visit FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
