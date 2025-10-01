"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AccessibilityPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {t.accessibility ?? "Accessibility"}
            </h1>
            <p className="text-muted mt-2">
              Accessibility features and how we support diverse users.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription className="text-muted">
                Information on accessibility and assistive features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">
                We strive to make AgriWise usable by everyone. Add detailed
                accessibility info here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
