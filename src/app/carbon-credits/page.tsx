"use client";

import {
  Calculator,
  CheckCircle,
  DollarSign,
  Droplets,
  Info,
  Leaf,
  Sun,
  TreePine,
  TrendingUp,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

interface CarbonCredit {
  id: string;
  practice: string;
  credits: number;
  value: number;
  status: "active" | "pending" | "sold";
  date: string;
  description: string;
}

interface SustainablePractice {
  id: string;
  name: string;
  description: string;
  creditsPerAcre: number;
  implementation: string;
  benefits: string[];
  icon: React.ReactNode;
}

export default function CarbonCreditsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    "overview" | "calculate" | "sell" | "history"
  >("overview");
  const [landSize, setLandSize] = useState("");
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);

  const mockCredits: CarbonCredit[] = [
    {
      id: "1",
      practice: "No-Till Farming",
      credits: 150,
      value: 1500,
      status: "active",
      date: "2024-01-10",
      description: t.noTillFarming,
    },
    {
      id: "2",
      practice: "Cover Cropping",
      credits: 200,
      value: 2000,
      status: "sold",
      date: "2024-01-05",
      description: t.coverCropping,
    },
    {
      id: "3",
      practice: "Agroforestry",
      credits: 300,
      value: 3000,
      status: "pending",
      date: "2024-01-15",
      description: t.agroforestry,
    },
  ];

  const sustainablePractices: SustainablePractice[] = [
    {
      id: "1",
      name: t.noTillFarming,
      description: t.implementation,
      creditsPerAcre: 0.3,
      implementation: t.implementation,
      benefits: [t.benefits],
      icon: <TreePine className="w-6 h-6 text-green-600" />,
    },
    {
      id: "2",
      name: t.coverCropping,
      description: t.implementation,
      creditsPerAcre: 0.4,
      implementation: t.implementation,
      benefits: [t.benefits],
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
    },
    {
      id: "3",
      name: t.agroforestry,
      description: t.implementation,
      creditsPerAcre: 0.6,
      implementation: t.implementation,
      benefits: [t.benefits],
      icon: <TreePine className="w-6 h-6 text-green-600" />,
    },
    {
      id: "4",
      name: t.precisionIrrigation,
      description: t.implementation,
      creditsPerAcre: 0.2,
      implementation: t.implementation,
      benefits: [t.benefits],
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
    },
    {
      id: "5",
      name: t.renewableEnergy,
      description: t.implementation,
      creditsPerAcre: 0.5,
      implementation: t.implementation,
      benefits: [t.benefits],
      icon: <Sun className="w-6 h-6 text-yellow-600" />,
    },
    {
      id: "6",
      name: t.composting,
      description: t.implementation,
      creditsPerAcre: 0.1,
      implementation: t.implementation,
      benefits: [t.benefits],
      icon: <Leaf className="w-6 h-6 text-brown-600" />,
    },
  ];

  const totalCredits = mockCredits.reduce(
    (sum, credit) => sum + credit.credits,
    0,
  );
  const totalValue = mockCredits.reduce((sum, credit) => sum + credit.value, 0);
  const activeCredits = mockCredits
    .filter((credit) => credit.status === "active")
    .reduce((sum, credit) => sum + credit.credits, 0);

  const calculateCredits = () => {
    if (!landSize || selectedPractices.length === 0) return 0;
    const size = parseFloat(landSize);
    const totalCreditsPerAcre = selectedPractices.reduce((sum, practiceId) => {
      const practice = sustainablePractices.find((p) => p.id === practiceId);
      return sum + (practice?.creditsPerAcre || 0);
    }, 0);
    return Math.round(size * totalCreditsPerAcre);
  };

  const togglePractice = (practiceId: string) => {
    setSelectedPractices((prev) =>
      prev.includes(practiceId)
        ? prev.filter((id) => id !== practiceId)
        : [...prev, practiceId],
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">
                  {t.totalCredits}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCredits}
                </p>
              </div>
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">{t.totalValue}</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{totalValue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">
                  {t.activeCredits}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeCredits}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Credits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">
            {t.recentCarbonCredits}
          </CardTitle>
          <CardDescription className="text-muted">
            {t.recentActivities}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCredits.map((credit) => (
              <div
                key={credit.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {credit.practice}
                    </h4>
                    <p className="text-sm text-muted">{credit.description}</p>
                    <p className="text-xs text-muted">{credit.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {credit.credits} {t.creditsLabel}
                  </div>
                  <div className="text-sm text-muted">₹{credit.value}</div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      credit.status === "active"
                        ? "bg-green-100 text-green-800"
                        : credit.status === "sold"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {credit.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CalculateTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Calculator className="w-5 h-5 mr-2 text-green-600" />
            {t.calculateCredits}
          </CardTitle>
          <CardDescription className="text-muted">
            {t.calculateCredits}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="landSize" className="text-gray-700">
                {t.landSize}
              </Label>
              <Input
                id="landSize"
                type="number"
                className="border-green-500 text-gray-600"
                placeholder={t.landSize}
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-gray-700">{t.sustainablePractices}</Label>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {sustainablePractices.map((practice) => (
                  <div
                    key={practice.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPractices.includes(practice.id)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => togglePractice(practice.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">{practice.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {practice.name}
                        </h4>
                        <p className="text-sm text-muted mb-2">
                          {practice.description}
                        </p>
                        <div className="text-xs text-green-600 font-medium">
                          {practice.creditsPerAcre} {t.creditsLabel} per acre
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedPractices.includes(practice.id)}
                          onChange={() => togglePractice(practice.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {landSize && selectedPractices.length > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      {calculateCredits()} {t.creditsLabel}
                    </h3>
                    <p className="text-muted mb-4">
                      {t.creditValue}: ₹{calculateCredits() * 10}
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      {t.getStarted}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SellTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            {t.sellCredits}
          </CardTitle>
          <CardDescription className="text-muted">
            {t.sellCredits}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    {t.recentActivities}
                  </h4>
                  <p className="text-sm text-blue-800">{t.recentActivities}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-600">
                    Available Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {activeCredits}
                    </div>
                    <p className="text-muted mb-4">{t.creditsReadyToSell}</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      {t.listForSale}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-600">
                    Market Price
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      ₹10
                    </div>
                    <p className="text-muted mb-4">{t.marketPerCredit}</p>
                    <div className="text-sm text-muted">
                      <div className="flex justify-between">
                        <span>{t.totalValue}:</span>
                        <span>₹{activeCredits * 10}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">{t.recentSales}</h3>
              <div className="space-y-2">
                {mockCredits
                  .filter((credit) => credit.status === "sold")
                  .map((credit) => (
                    <div
                      key={credit.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {credit.practice}
                        </h4>
                        <p className="text-sm text-muted">{credit.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          ₹{credit.value}
                        </div>
                        <div className="text-sm text-muted">
                          {credit.credits} credits
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.carbonCreditProgram}
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Generate additional income through sustainable farming practices
              and contribute to environmental protection.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.overview}
            </button>
            <button
              onClick={() => setActiveTab("calculate")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "calculate"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.calculateCredits}
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "sell"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.sellCredits}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "calculate" && <CalculateTab />}
          {activeTab === "sell" && <SellTab />}

          {/* Benefits Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Why Participate in Carbon Credits?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Additional Income
                  </h3>
                  <p className="text-sm text-muted">
                    Earn money from sustainable practices you're already
                    implementing
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Leaf className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Environmental Impact
                  </h3>
                  <p className="text-sm text-muted">
                    Contribute to climate change mitigation and environmental
                    protection
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Verified Practices
                  </h3>
                  <p className="text-sm text-muted">
                    Get recognition for your sustainable farming methods
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
