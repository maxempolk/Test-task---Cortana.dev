'use server'

import { User } from "@/auth/types/user";
import { prisma } from "@/db";

export async function getUser(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}