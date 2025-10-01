import { NextResponse } from "next/server";
import { withCors } from "@/lib/cors";
import prisma from "@/lib/db";
import { withErrorHandling } from "@/lib/errors";
import { logAPI } from "@/lib/logger";

async function handler(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const states = await prisma.state.findMany({
      select: {
        id: true,
        name: true,
        code: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    logAPI("Retrieved states list", "/api/location/states", {
      count: states.length,
    });

    return NextResponse.json({
      success: true,
      states,
      count: states.length,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to retrieve states" },
      { status: 500 },
    );
  }
}

export const GET = withCors(withErrorHandling(handler));
