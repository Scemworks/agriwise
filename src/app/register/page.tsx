"use client";

import { Droplets, Eye, EyeOff, MapPin, Sprout, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
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

export default function RegisterPage() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userRole, setUserRole] = useState<"FARMER" | "BUYER">("FARMER");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    // Location details
    state: "",
    city: "",
    pincode: "",
    address: "",
    // Farming details (only for farmers)
    soilType: "",
    currentCrops: "",
    landSize: "",
    irrigation: false,
  });

  const [states, setStates] = useState<
    Array<{ id: string; name: string; code: string }>
  >([]);
  const [cities, setCities] = useState<
    Array<{
      id: string;
      name: string;
      pincode: string;
      latitude: number;
      longitude: number;
    }>
  >([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const soilTypes = [
    { value: "clay", label: "Clay Soil" },
    { value: "sandy", label: "Sandy Soil" },
    { value: "loamy", label: "Loamy Soil" },
    { value: "silty", label: "Silt Soil" },
    { value: "peaty", label: "Peaty Soil" },
    { value: "chalky", label: "Chalky Soil" },
  ];

  // Load states on component mount
  React.useEffect(() => {
    const loadStates = async () => {
      setIsLoadingStates(true);
      try {
        const res = await fetch("/api/location/states");
        if (res.ok) {
          const data = await res.json();
          setStates(data.states || []);
        }
      } catch (error) {
        console.error("Failed to load states:", error);
      } finally {
        setIsLoadingStates(false);
      }
    };
    loadStates();
  }, []);

  // Load cities when state changes
  React.useEffect(() => {
    if (formData.state) {
      const loadCities = async () => {
        setIsLoadingCities(true);
        try {
          const res = await fetch(
            `/api/location/cities?stateId=${formData.state}`,
          );
          if (res.ok) {
            const data = await res.json();
            setCities(data.cities || []);
          }
        } catch (error) {
          console.error("Failed to load cities:", error);
        } finally {
          setIsLoadingCities(false);
        }
      };
      loadCities();
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.fullName,
            phone: formData.phoneNumber,
            role: userRole,
            // Location details
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
            address: formData.address,
            // Farming details (only for farmers)
            soilType: userRole === "FARMER" ? formData.soilType : undefined,
            currentCrops:
              userRole === "FARMER" ? formData.currentCrops : undefined,
            landSize:
              userRole === "FARMER"
                ? parseFloat(formData.landSize) || 0
                : undefined,
            irrigation: userRole === "FARMER" ? formData.irrigation : undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Registration failed");
          return;
        }
        // Server sets cookies on success. Redirect to dashboard or welcome.
        window.location.href = "/dashboard";
      } catch (err) {
        console.error(err);
        alert("Network error");
      }
    })();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AgriWise</h1>
            <p className="text-muted mt-2">Create your account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                {t.register}
              </CardTitle>
              <CardDescription className="text-center text-muted">
                Join AgriWise - Connect farmers and buyers for smart agriculture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Role Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    Account Type
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setUserRole("FARMER")}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        userRole === "FARMER"
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      <Sprout className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-semibold">Farmer</div>
                      <div className="text-xs mt-1 text-muted">
                        Sell products & manage farm
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserRole("BUYER")}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        userRole === "BUYER"
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      <User className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-semibold">Buyer</div>
                      <div className="text-xs mt-1 text-muted">
                        Purchase agricultural products
                      </div>
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-600">
                        {t.fullName}
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="border-green-500 text-gray-600"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-600">
                        {t.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="border-green-500 text-gray-600"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-gray-600">
                      {t.phoneNumber}
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className="border-green-500 text-gray-600"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    Location Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-600">
                        State
                      </Label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                        disabled={isLoadingStates}
                      >
                        <option value="">
                          {isLoadingStates
                            ? "Loading states..."
                            : "Select state"}
                        </option>
                        {states.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-600">
                        City
                      </Label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                        disabled={!formData.state || isLoadingCities}
                      >
                        <option value="">
                          {!formData.state
                            ? "Select state first"
                            : isLoadingCities
                              ? "Loading cities..."
                              : "Select city"}
                        </option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-gray-600">
                        Pincode
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        type="text"
                        className="border-green-500 text-gray-600"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-600">
                        Address (Optional)
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        className="border-green-500 text-gray-600"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-600">
                        {t.password}
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="border-green-500 text-gray-600"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-gray-600"
                      >
                        {t.confirmPassword}
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className="border-green-500 text-gray-600"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-600"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Farming Information - Only shown for Farmers */}
                {userRole === "FARMER" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Droplets className="w-5 h-5 mr-2 text-green-600" />
                      Farming Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="soilType" className="text-gray-600">
                          {t.soilType}
                        </Label>
                        <select
                          id="soilType"
                          name="soilType"
                          value={formData.soilType}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select soil type</option>
                          {soilTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="landSize" className="text-gray-600">
                          {t.landSize}
                        </Label>
                        <Input
                          id="landSize"
                          name="landSize"
                          type="number"
                          step="0.1"
                          min="0"
                          className="border-green-500 text-gray-600"
                          placeholder="Enter land size in acres"
                          value={formData.landSize}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentCrops" className="text-gray-600">
                        {t.currentCrops}
                      </Label>
                      <Input
                        id="currentCrops"
                        name="currentCrops"
                        type="text"
                        className="border-green-500 text-gray-600"
                        placeholder="Enter current crops (comma separated)"
                        value={formData.currentCrops}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        id="irrigation"
                        name="irrigation"
                        type="checkbox"
                        checked={formData.irrigation}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            irrigation: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <Label
                        htmlFor="irrigation"
                        className="text-sm text-gray-600"
                      >
                        I have irrigation facilities available
                      </Label>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-green-600 hover:text-green-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-green-600 hover:text-green-700"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t.register}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    {t.login}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
