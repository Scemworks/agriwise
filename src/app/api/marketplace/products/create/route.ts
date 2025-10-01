import { NextResponse } from "next/server";
import { withCors } from "@/lib/cors";
import prisma from "@/lib/db";
import { requireAuth } from "@/lib/middleware/auth";

async function handler(req: Request) {
  if (req.method !== "POST")
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });

  const payload = await requireAuth(req);
  if (!payload)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch (_e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    name,
    description,
    price,
    quantity,
    categoryId,
    images,
    auction,
    startingBid,
    buyNowPrice,
    endsAt,
    listing,
  } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid name" },
      { status: 400 },
    );
  }
  const numericPrice = price !== undefined ? Number(price) : undefined;
  if (
    numericPrice === undefined ||
    Number.isNaN(numericPrice) ||
    numericPrice <= 0
  ) {
    return NextResponse.json(
      { error: "Missing or invalid price" },
      { status: 400 },
    );
  }

  const numericQuantity = quantity ? Number(quantity) : 1;
  if (Number.isNaN(numericQuantity) || numericQuantity < 0) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  // Create product
  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      description: description || undefined,
      price: numericPrice,
      quantity: Math.floor(numericQuantity),
      categoryId: categoryId || undefined,
      sellerId: payload.sub,
      images:
        images && Array.isArray(images) && images.length > 0
          ? { create: images.map((url: string) => ({ url })) }
          : undefined,
    },
  });

  // Optionally create a listing (auction or sale)
  if (auction) {
    const sb = startingBid !== undefined ? Number(startingBid) : undefined;
    if (sb !== undefined && (Number.isNaN(sb) || sb <= 0)) {
      return NextResponse.json(
        { error: "Invalid startingBid" },
        { status: 400 },
      );
    }
    await prisma.listing.create({
      data: {
        type: "auction",
        startingBid: sb,
        buyNowPrice: buyNowPrice ? Number(buyNowPrice) : undefined,
        endsAt: endsAt ? new Date(endsAt) : undefined,
        productId: product.id,
      },
    });
  } else if (listing) {
    const bn = buyNowPrice !== undefined ? Number(buyNowPrice) : numericPrice;
    if (Number.isNaN(bn) || bn <= 0) {
      return NextResponse.json(
        { error: "Invalid buyNowPrice" },
        { status: 400 },
      );
    }
    await prisma.listing.create({
      data: {
        type: "sale",
        buyNowPrice: bn,
        productId: product.id,
      },
    });
  }

  return NextResponse.json({ ok: true, product });
}

export const POST = withCors(handler);
