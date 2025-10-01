import { NextResponse } from "next/server";
import { withCors } from "@/lib/cors";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/middleware/auth";

async function handler(req: Request) {
  const payload: any = await requireAuth(req);
  if (!payload)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = payload.sub;

  // Fetch user profile
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });

  // Farms owned by user
  const farms = await prisma.farm.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  // Recent activities
  const activities = await prisma.activity.findMany({
    where: { userId },
    orderBy: { time: "desc" },
    take: 10,
  });

  // Latest weather for first farm (if any)
  let latestWeather = null;
  if (farms.length > 0) {
    latestWeather = await prisma.weatherRecord.findFirst({
      where: { farmId: farms[0].id },
      orderBy: { recordedAt: "desc" },
    });
  }

  // Carbon credits summary for user
  const carbonAgg = await prisma.carbonCredit.aggregate({
    where: { ownerId: userId },
    _sum: { credits: true, value: true },
  });

  // Marketplace: recent products by user
  const products = await prisma.product.findMany({
    where: { sellerId: userId },
    include: { images: true, listings: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return NextResponse.json({
    user,
    farms,
    activities,
    latestWeather,
    carbonSummary: carbonAgg,
    products,
  });
}

export const GET = withCors(handler);
