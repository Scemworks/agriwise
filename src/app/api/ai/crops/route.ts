import { NextResponse } from "next/server";
import { cropRecommendationAI } from "@/lib/ai/crop-recommendation";
import { withCors } from "@/lib/cors";
import { withErrorHandling } from "@/lib/errors";
import { logAI } from "@/lib/logger";

async function handler(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const crops = cropRecommendationAI.getAvailableCrops();

    logAI("Retrieved available crops list", "CropAI", {
      totalCrops: crops.length,
    });

    return NextResponse.json({
      success: true,
      crops,
      count: crops.length,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to retrieve crops" },
      { status: 500 },
    );
  }
}

export const GET = withCors(withErrorHandling(handler));
