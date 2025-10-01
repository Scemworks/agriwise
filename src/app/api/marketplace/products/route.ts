import { NextResponse } from "next/server";
import { withCors } from "@/lib/cors";
import prisma from "@/lib/db";

async function handler(req: Request) {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || undefined;
    const category = url.searchParams.get("category") || undefined;
    const take = Number(url.searchParams.get("take") || 24);

    const where: any = {};
    if (q)
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    if (category && category !== "all") where.category = { slug: category };

    const products = await prisma.product.findMany({
      where,
      include: {
        images: true,
        seller: { select: { id: true, name: true } },
        category: true,
        listings: true,
      },
      take,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  }

  // Other methods not allowed here
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export const GET = withCors(handler);
