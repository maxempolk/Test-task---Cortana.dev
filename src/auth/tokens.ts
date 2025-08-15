import { prisma } from "@/db";
import jwt from "jsonwebtoken";
import config from "@/config/server";
import { type TokenPayload } from "./types/token";
import ms from "ms";
import { User } from "./types/user";

const deleteExpiredTokens = async () => {
  const result = await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  return result.count;
}

const generateAccessToken = async (userId: string) => {
  const accessToken = jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
  
  return accessToken;
};

const removeRefreshTokens = async (jti: string) => {
  await prisma.refreshToken.delete({
    where: {
      jti,
    },
  });

  return true;
};

const generateRefreshToken = async (userId: string) => {
  const jti = crypto.randomUUID();
  const refreshToken = jwt.sign({ userId, jti }, config.jwt.secret, {
    expiresIn: config.jwt.expiresInRefreshToken,
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expiresAt: new Date(Date.now() + ms(config.jwt.expiresInRefreshToken)),
      jti,
      userId,
    },
  });

  return refreshToken;
};

const verifyRefreshToken = async (refreshToken: string) => {
  const decoded = jwt.verify(refreshToken, config.jwt.secret) as TokenPayload;

  const token = await prisma.refreshToken.findUnique({ where: { jti: decoded.jti } });

  if (!token) {
    throw new Error("Invalid refresh token");
  }

  return decoded;
};

const verifyAccessToken = async (accessToken: string) => {
  const decoded = jwt.verify(accessToken, config.jwt.secret) as TokenPayload;

  const user: User | null = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export { generateAccessToken, generateRefreshToken, verifyRefreshToken, removeRefreshTokens, deleteExpiredTokens, verifyAccessToken };