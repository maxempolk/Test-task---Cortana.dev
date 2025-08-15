// import { generateRefreshToken } from "@/auth/tokens";
import { PrismaClient } from "@/generated/prisma";
// import { createUser } from "@/auth/users";

export const prisma = new PrismaClient();

// const user = await createUser({
//   name: "Maxim",
//   email: "mpolyak7@gmail.com",
//   password: "123456789",
// });

// const refreshToken = await generateRefreshToken(user.id);
