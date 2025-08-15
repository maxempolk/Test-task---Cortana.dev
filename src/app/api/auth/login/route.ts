import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/auth/tokens";
import ms from "ms";
import config from "@/config/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const refreshToken = await generateRefreshToken(user.id);
  const accessToken = await generateAccessToken(user.id);

  const res = NextResponse.json({});

  res.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ms(config.jwt.expiresIn) / 1000, 
  });
  
  res.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ms(config.jwt.expiresInRefreshToken) / 1000,
  });

  return res;
}