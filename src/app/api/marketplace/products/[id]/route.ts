import { NextResponse } from "next/server";
import { withCors } from "@/lib/cors";
import prisma from "@/lib/db";

async function handler(req: Request) {
  // derive id from path
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const id = parts[parts.length - 1];
  if (req.method === "GET") {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        seller: { select: { id: true, name: true } },
        category: true,
        listings: {
          include: {
            bids: { include: { bidder: { select: { id: true, name: true } } } },
          },
        },
      },
    });
    if (!product)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product });
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export const GET = withCors(handler);
