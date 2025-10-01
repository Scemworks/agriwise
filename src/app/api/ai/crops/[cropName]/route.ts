import { NextResponse } from "next/server";
import { withCors } from "../../../../../lib/cors";
import { withErrorHandling } from "../../../../../lib/errors";
import { logAI } from "../../../../../lib/logger";

async function handler(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // Extract cropName from URL path: expect /api/ai/crops/:cropName
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    const cropName = parts[parts.length - 1];

    // Provide mock response based on crop name ranges (simple deterministic mock)
    // Map some common crops to mock details
    const mockMap: Record<string, any> = {
      rice: {
        name: "Rice",
        phRange: [5.5, 7.0],
        waterNeeds: "high",
        plantingSeason: ["spring", "summer"],
      },
      wheat: {
        name: "Wheat",
        phRange: [6.0, 7.5],
        waterNeeds: "medium",
        plantingSeason: ["autumn", "winter"],
      },
      maize: {
        name: "Maize",
        phRange: [5.8, 7.0],
        waterNeeds: "medium",
        plantingSeason: ["spring", "summer"],
      },
      tomato: {
        name: "Tomato",
        phRange: [6.0, 6.8],
        waterNeeds: "medium",
        plantingSeason: ["spring", "summer"],
      },
    };

    const key = cropName.toLowerCase();
    const cropDetails = mockMap[key] || {
      name: cropName,
      phRange: [5.5, 7.5],
      waterNeeds: "medium",
      plantingSeason: ["spring"],
    };

    logAI("Retrieved crop details (mock)", "CropAI", {
      cropName: cropDetails.name,
    });

    return NextResponse.json({ success: true, crop: cropDetails });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to retrieve crop details" },
      { status: 500 },
    );
  }
}

export const GET = withCors(withErrorHandling(handler));
