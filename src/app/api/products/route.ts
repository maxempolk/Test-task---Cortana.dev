import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body: { name?: string; description?: string; price?: number; image_url?: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, description, price, image_url } = body;

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof price !== "number" ||
    (image_url !== undefined && image_url !== null && typeof image_url !== "string")
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const created = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image_url: image_url ?? null,
      },
      select: {
        id: true,
        image_url: true,
        name: true,
        description: true,
        price: true,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}