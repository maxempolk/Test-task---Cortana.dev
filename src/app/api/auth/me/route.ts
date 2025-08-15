import { NextRequest, NextResponse } from "next/server";
import { User } from "@/auth/types/user";
import { verifyAccessToken } from "@/auth/tokens";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let user: User;
  try {
    user = await verifyAccessToken(accessToken.value);
  } catch{
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(user);
}