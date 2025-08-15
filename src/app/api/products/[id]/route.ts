import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: { name?: string; description?: string; price?: number; image_url?: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, description, price, image_url } = body;

  if (
    (name !== undefined && typeof name !== "string") ||
    (description !== undefined && typeof description !== "string") ||
    (price !== undefined && typeof price !== "number") ||
    (image_url !== undefined && image_url !== null && typeof image_url !== "string")
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(price !== undefined ? { price } : {}),
        ...(image_url !== undefined ? { image_url } : {}),
      },
      select: {
        id: true,
        image_url: true,
        name: true,
        description: true,
        price: true,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}