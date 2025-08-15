import { NextRequest, NextResponse } from "next/server";
import { isOnlyNoAuthPaths, publicPaths } from "./config";

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const isOnlyNoAuthPath = isOnlyNoAuthPaths.includes(request.nextUrl.pathname);
  
  if (token && isOnlyNoAuthPath) {
    const loginedUrl = new URL("/auth/logined", request.url);
    return NextResponse.redirect(loginedUrl);
  }

  return null;
}