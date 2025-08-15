import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import config from "@/config/server";
import { TokenPayload } from "@/auth/types/token";
import { logout } from "@/auth/users";

export async function POST(request: NextRequest) {
  const refreshToken = await request.cookies.get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json({ error: "Access token is required" }, { status: 401 });
  }

  const decoded = jwt.verify(refreshToken.value, config.jwt.secret) as TokenPayload;

  try{
    await logout(decoded.jti);
  } catch{
    // TODO: add logger
  }

  const res = NextResponse.json({}, { status: 200 });

  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");

  return res;
}