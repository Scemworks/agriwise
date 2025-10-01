import { logger } from "../logger";

// Types for crop recommendation
export interface SoilData {
  type: "clay" | "sandy" | "loamy" | "silty" | "peaty" | "chalky";
  ph: number;
  organicMatter: number; // percentage
  nitrogen: number; // ppm
  phosphorus: number; // ppm
  potassium: number; // ppm
  moisture: number; // percentage
}

export interface WeatherData {
  temperature: number; // Celsius
  humidity: number; // percentage
  rainfall: number; // mm
  sunlight: number; // hours per day
  season: "spring" | "summer" | "autumn" | "winter";
}

export interface FarmData {
  location: string;
  landSize: number; // acres
  elevation: number; // meters above sea level
  irrigation: boolean;
  previousCrops?: string[];
}

export interface CropRecommendation {
  crop: string;
  variety: string;
  confidence: number; // 0-1
  reasons: string[];
  plantingTime: string;
  harvestTime: string;
  expectedYield: string;
  waterRequirements: string;
  fertilizerNeeds: string;
  pestRisks: string[];
  marketPrice?: number;
  profitPotential: "low" | "medium" | "high";
}

export interface CropData {
  name: string;
  varieties: string[];
  soilTypes: string[];
  phRange: [number, number];
  temperatureRange: [number, number];
  rainfallRange: [number, number];
  sunlightHours: [number, number];
  plantingSeason: string[];
  harvestTime: string;
  waterNeeds: "low" | "medium" | "high";
  fertilizerNeeds: "low" | "medium" | "high";
  pestRisks: string[];
  marketPrice: number;
  yieldPerAcre: [number, number]; // min-max
}

// Crop database
const CROP_DATABASE: CropData[] = [
  {
    name: "Rice",
    varieties: ["Basmati", "Jasmine", "Arborio", "Brown Rice"],
    soilTypes: ["clay", "loamy"],
    phRange: [5.5, 7.0],
    temperatureRange: [20, 35],
    rainfallRange: [1000, 2500],
    sunlightHours: [6, 8],
    plantingSeason: ["spring", "summer"],
    harvestTime: "4-6 months",
    waterNeeds: "high",
    fertilizerNeeds: "high",
    pestRisks: ["rice blast", "brown spot", "bacterial blight"],
    marketPrice: 0.5,
    yieldPerAcre: [2000, 4000],
  },
  {
    name: "Wheat",
    varieties: ["Durum", "Hard Red", "Soft White", "Spring Wheat"],
    soilTypes: ["loamy", "silty"],
    phRange: [6.0, 7.5],
    temperatureRange: [15, 25],
    rainfallRange: [500, 800],
    sunlightHours: [6, 8],
    plantingSeason: ["autumn", "winter"],
    harvestTime: "3-4 months",
    waterNeeds: "medium",
    fertilizerNeeds: "medium",
    pestRisks: ["rust", "smut", "aphids"],
    marketPrice: 0.3,
    yieldPerAcre: [1500, 3000],
  },
  {
    name: "Maize",
    varieties: ["Sweet Corn", "Field Corn", "Popcorn", "Flint Corn"],
    soilTypes: ["loamy", "sandy"],
    phRange: [5.8, 7.0],
    temperatureRange: [18, 30],
    rainfallRange: [600, 1000],
    sunlightHours: [8, 10],
    plantingSeason: ["spring", "summer"],
    harvestTime: "3-4 months",
    waterNeeds: "medium",
    fertilizerNeeds: "high",
    pestRisks: ["corn borer", "armyworm", "rust"],
    marketPrice: 0.4,
    yieldPerAcre: [3000, 6000],
  },
  {
    name: "Tomato",
    varieties: ["Cherry", "Roma", "Beefsteak", "Heirloom"],
    soilTypes: ["loamy", "sandy"],
    phRange: [6.0, 6.8],
    temperatureRange: [18, 28],
    rainfallRange: [400, 800],
    sunlightHours: [6, 8],
    plantingSeason: ["spring", "summer"],
    harvestTime: "2-3 months",
    waterNeeds: "medium",
    fertilizerNeeds: "medium",
    pestRisks: ["blight", "aphids", "whitefly"],
    marketPrice: 1.5,
    yieldPerAcre: [10000, 20000],
  },
  {
    name: "Potato",
    varieties: ["Russet", "Red", "Yukon Gold", "Fingerling"],
    soilTypes: ["loamy", "sandy"],
    phRange: [4.8, 6.5],
    temperatureRange: [15, 25],
    rainfallRange: [500, 700],
    sunlightHours: [6, 8],
    plantingSeason: ["spring"],
    harvestTime: "3-4 months",
    waterNeeds: "medium",
    fertilizerNeeds: "medium",
    pestRisks: ["late blight", "potato beetle", "wireworm"],
    marketPrice: 0.8,
    yieldPerAcre: [15000, 25000],
  },
  {
    name: "Sugarcane",
    varieties: ["Co 86032", "Co 8371", "Co 0238", "Co 86032"],
    soilTypes: ["clay", "loamy"],
    phRange: [6.0, 7.5],
    temperatureRange: [20, 35],
    rainfallRange: [1000, 1500],
    sunlightHours: [8, 10],
    plantingSeason: ["spring", "summer"],
    harvestTime: "12-18 months",
    waterNeeds: "high",
    fertilizerNeeds: "high",
    pestRisks: ["red rot", "smut", "borer"],
    marketPrice: 0.2,
    yieldPerAcre: [40000, 60000],
  },
  {
    name: "Cotton",
    varieties: ["BT Cotton", "Desi Cotton", "American Cotton"],
    soilTypes: ["clay", "loamy"],
    phRange: [5.8, 8.0],
    temperatureRange: [20, 35],
    rainfallRange: [500, 1000],
    sunlightHours: [8, 10],
    plantingSeason: ["spring", "summer"],
    harvestTime: "5-6 months",
    waterNeeds: "medium",
    fertilizerNeeds: "high",
    pestRisks: ["bollworm", "whitefly", "aphids"],
    marketPrice: 2.0,
    yieldPerAcre: [800, 1200],
  },
  {
    name: "Soybean",
    varieties: ["Roundup Ready", "Non-GMO", "High Protein"],
    soilTypes: ["loamy", "silty"],
    phRange: [6.0, 7.0],
    temperatureRange: [20, 30],
    rainfallRange: [600, 1000],
    sunlightHours: [8, 10],
    plantingSeason: ["spring", "summer"],
    harvestTime: "3-4 months",
    waterNeeds: "medium",
    fertilizerNeeds: "medium",
    pestRisks: ["aphids", "caterpillars", "rust"],
    marketPrice: 0.6,
    yieldPerAcre: [2000, 3500],
  },
];

// AI-powered crop recommendation algorithm
export class CropRecommendationAI {
  private cropDatabase: CropData[];

  constructor() {
    this.cropDatabase = CROP_DATABASE;
  }

  // Main recommendation function
  async getRecommendations(
    soilData: SoilData,
    weatherData: WeatherData,
    farmData: FarmData,
  ): Promise<CropRecommendation[]> {
    try {
      logger.ai("Starting crop recommendation analysis", "CropAI", {
        location: farmData.location,
        landSize: farmData.landSize,
        season: weatherData.season,
      });

      const recommendations: CropRecommendation[] = [];

      for (const crop of this.cropDatabase) {
        const score = this.calculateCropScore(
          crop,
          soilData,
          weatherData,
          farmData,
        );

        if (score > 0.3) {
          // Only recommend crops with >30% compatibility
          const recommendation = this.createRecommendation(
            crop,
            score,
            soilData,
            weatherData,
            farmData,
          );
          recommendations.push(recommendation);
        }
      }

      // Sort by confidence score
      recommendations.sort((a, b) => b.confidence - a.confidence);

      // Return top 5 recommendations
      const topRecommendations = recommendations.slice(0, 5);

      logger.ai("Crop recommendations generated", "CropAI", {
        totalCrops: this.cropDatabase.length,
        recommendedCrops: topRecommendations.length,
        topCrop: topRecommendations[0]?.crop,
      });

      return topRecommendations;
    } catch (error) {
      logger.error("Error generating crop recommendations", { error });
      throw error;
    }
  }

  // Calculate compatibility score for a crop
  private calculateCropScore(
    crop: CropData,
    soilData: SoilData,
    weatherData: WeatherData,
    farmData: FarmData,
  ): number {
    let score = 0;
    let factors = 0;

    // Soil type compatibility (20% weight)
    if (crop.soilTypes.includes(soilData.type)) {
      score += 0.2;
    }
    factors += 0.2;

    // pH compatibility (15% weight)
    const phScore = this.calculatePhScore(crop.phRange, soilData.ph);
    score += phScore * 0.15;
    factors += 0.15;

    // Temperature compatibility (20% weight)
    const tempScore = this.calculateTemperatureScore(
      crop.temperatureRange,
      weatherData.temperature,
    );
    score += tempScore * 0.2;
    factors += 0.2;

    // Rainfall compatibility (15% weight)
    const rainfallScore = this.calculateRainfallScore(
      crop.rainfallRange,
      weatherData.rainfall,
    );
    score += rainfallScore * 0.15;
    factors += 0.15;

    // Sunlight compatibility (10% weight)
    const sunlightScore = this.calculateSunlightScore(
      crop.sunlightHours,
      weatherData.sunlight,
    );
    score += sunlightScore * 0.1;
    factors += 0.1;

    // Season compatibility (10% weight)
    const seasonScore = crop.plantingSeason.includes(weatherData.season)
      ? 1
      : 0.3;
    score += seasonScore * 0.1;
    factors += 0.1;

    // Farm size compatibility (5% weight)
    const sizeScore = this.calculateSizeScore(crop, farmData.landSize);
    score += sizeScore * 0.05;
    factors += 0.05;

    // Irrigation compatibility (5% weight)
    const irrigationScore = this.calculateIrrigationScore(
      crop.waterNeeds,
      farmData.irrigation,
    );
    score += irrigationScore * 0.05;
    factors += 0.05;

    return factors > 0 ? score / factors : 0;
  }

  // Helper functions for scoring
  private calculatePhScore(phRange: [number, number], soilPh: number): number {
    const [min, max] = phRange;
    if (soilPh >= min && soilPh <= max) return 1;
    if (soilPh < min) return Math.max(0, 1 - (min - soilPh) / 2);
    if (soilPh > max) return Math.max(0, 1 - (soilPh - max) / 2);
    return 0;
  }

  private calculateTemperatureScore(
    tempRange: [number, number],
    currentTemp: number,
  ): number {
    const [min, max] = tempRange;
    if (currentTemp >= min && currentTemp <= max) return 1;
    if (currentTemp < min) return Math.max(0, 1 - (min - currentTemp) / 10);
    if (currentTemp > max) return Math.max(0, 1 - (currentTemp - max) / 10);
    return 0;
  }

  private calculateRainfallScore(
    rainfallRange: [number, number],
    currentRainfall: number,
  ): number {
    const [min, max] = rainfallRange;
    if (currentRainfall >= min && currentRainfall <= max) return 1;
    if (currentRainfall < min) return Math.max(0, currentRainfall / min);
    if (currentRainfall > max) return Math.max(0, max / currentRainfall);
    return 0;
  }

  private calculateSunlightScore(
    sunlightRange: [number, number],
    currentSunlight: number,
  ): number {
    const [min, max] = sunlightRange;
    if (currentSunlight >= min && currentSunlight <= max) return 1;
    if (currentSunlight < min) return Math.max(0, currentSunlight / min);
    if (currentSunlight > max) return Math.max(0, max / currentSunlight);
    return 0;
  }

  private calculateSizeScore(crop: CropData, landSize: number): number {
    // Most crops work well on any size, but some are better for smaller farms
    if (landSize < 1) {
      return ["Tomato", "Potato"].includes(crop.name) ? 1 : 0.7;
    }
    if (landSize > 100) {
      return ["Rice", "Sugarcane", "Cotton"].includes(crop.name) ? 1 : 0.8;
    }
    return 1;
  }

  private calculateIrrigationScore(
    waterNeeds: string,
    hasIrrigation: boolean,
  ): number {
    if (waterNeeds === "low") return 1;
    if (waterNeeds === "medium") return hasIrrigation ? 1 : 0.7;
    if (waterNeeds === "high") return hasIrrigation ? 1 : 0.3;
    return 0.5;
  }

  // Create detailed recommendation
  private createRecommendation(
    crop: CropData,
    score: number,
    soilData: SoilData,
    weatherData: WeatherData,
    farmData: FarmData,
  ): CropRecommendation {
    const reasons = this.generateReasons(crop, soilData, weatherData, farmData);
    const profitPotential = this.calculateProfitPotential(
      crop,
      farmData.landSize,
    );

    return {
      crop: crop.name,
      variety: crop.varieties[0], // Recommend first variety
      confidence: Math.round(score * 100) / 100,
      reasons,
      plantingTime: this.getPlantingTime(crop, weatherData.season),
      harvestTime: crop.harvestTime,
      expectedYield: this.calculateExpectedYield(crop, farmData.landSize),
      waterRequirements: this.getWaterRequirements(crop.waterNeeds),
      fertilizerNeeds: this.getFertilizerNeeds(crop.fertilizerNeeds),
      pestRisks: crop.pestRisks,
      marketPrice: crop.marketPrice,
      profitPotential,
    };
  }

  // Generate reasons for recommendation
  private generateReasons(
    crop: CropData,
    soilData: SoilData,
    weatherData: WeatherData,
    farmData: FarmData,
  ): string[] {
    const reasons: string[] = [];

    if (crop.soilTypes.includes(soilData.type)) {
      reasons.push(`Compatible with ${soilData.type} soil type`);
    }

    if (crop.phRange[0] <= soilData.ph && soilData.ph <= crop.phRange[1]) {
      reasons.push(
        `Soil pH (${soilData.ph}) is within optimal range (${crop.phRange[0]}-${crop.phRange[1]})`,
      );
    }

    if (
      crop.temperatureRange[0] <= weatherData.temperature &&
      weatherData.temperature <= crop.temperatureRange[1]
    ) {
      reasons.push(
        `Current temperature (${weatherData.temperature}°C) is ideal for growth`,
      );
    }

    if (crop.plantingSeason.includes(weatherData.season)) {
      reasons.push(`Perfect planting season (${weatherData.season})`);
    }

    if (crop.waterNeeds === "low" && !farmData.irrigation) {
      reasons.push("Low water requirements suitable for rain-fed farming");
    }

    if (crop.waterNeeds === "high" && farmData.irrigation) {
      reasons.push("High water requirements can be met with irrigation system");
    }

    return reasons;
  }

  // Calculate profit potential
  private calculateProfitPotential(
    crop: CropData,
    landSize: number,
  ): "low" | "medium" | "high" {
    const expectedRevenue =
      ((crop.yieldPerAcre[0] + crop.yieldPerAcre[1]) / 2) *
      crop.marketPrice *
      landSize;

    if (expectedRevenue > 10000) return "high";
    if (expectedRevenue > 5000) return "medium";
    return "low";
  }

  // Helper methods
  private getPlantingTime(_crop: CropData, season: string): string {
    const seasonMap: Record<string, string> = {
      spring: "March-May",
      summer: "June-August",
      autumn: "September-November",
      winter: "December-February",
    };
    return seasonMap[season] || "Check local planting calendar";
  }

  private calculateExpectedYield(crop: CropData, landSize: number): string {
    const minYield = crop.yieldPerAcre[0] * landSize;
    const maxYield = crop.yieldPerAcre[1] * landSize;
    return `${Math.round(minYield)}-${Math.round(maxYield)} kg`;
  }

  private getWaterRequirements(waterNeeds: string): string {
    const requirements: Record<string, string> = {
      low: "500-700mm annually",
      medium: "700-1000mm annually",
      high: "1000-1500mm annually",
    };
    return requirements[waterNeeds] || "Variable";
  }

  private getFertilizerNeeds(fertilizerNeeds: string): string {
    const needs: Record<string, string> = {
      low: "Minimal fertilizer required",
      medium: "Moderate fertilizer application needed",
      high: "High fertilizer requirements",
    };
    return needs[fertilizerNeeds] || "Check soil test recommendations";
  }

  // Get all available crops
  getAvailableCrops(): string[] {
    return this.cropDatabase.map((crop) => crop.name);
  }

  // Get crop details
  getCropDetails(cropName: string): CropData | null {
    return (
      this.cropDatabase.find(
        (crop) => crop.name.toLowerCase() === cropName.toLowerCase(),
      ) || null
    );
  }
}

// Export singleton instance
export const cropRecommendationAI = new CropRecommendationAI();
