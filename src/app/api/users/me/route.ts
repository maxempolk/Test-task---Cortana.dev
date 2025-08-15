import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { verifyAccessToken } from "@/auth/tokens";
import { User } from "@/auth/types/user";

export async function PATCH(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user: User;
  try {
    user = await verifyAccessToken(accessToken.value);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}


