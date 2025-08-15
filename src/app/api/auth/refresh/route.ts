import { NextRequest, NextResponse } from "next/server";
import { TokenPayload } from "@/auth/types/token";
import jwt from "jsonwebtoken";
import config from "@/config/server";
import { prisma } from "@/db";
import { generateAccessToken } from "@/auth/tokens";
import ms from "ms";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token is required" }, { status: 401 });
  }

  let decoded: TokenPayload;
  try {
    decoded = jwt.verify(refreshToken, config.jwt.secret) as TokenPayload;
  } catch {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const storedToken = await prisma.refreshToken.findUnique({
    where: { jti: decoded.jti },
  });

  if (!storedToken) {
    return NextResponse.json({ error: "Token revoked" }, { status: 401 });
  }

  if (storedToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "Refresh token expired" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });


  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const accessToken = await generateAccessToken(user.id);

  const res = NextResponse.json({}, { status: 200 });

  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ms(config.jwt.expiresIn),
  });

  return res;
}
