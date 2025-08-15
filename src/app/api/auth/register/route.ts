import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { generateAccessToken, generateRefreshToken } from "@/auth/tokens";
import { createUser } from "@/auth/users";
import ms from "ms";
import config from "@/config/server";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  try{
      const newUser = await createUser({ name, email, password });
      const refreshToken = await generateRefreshToken(newUser.id);
      const accessToken = await generateAccessToken(newUser.id);

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

      return res;

  } catch (error) {
    return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
  }
}