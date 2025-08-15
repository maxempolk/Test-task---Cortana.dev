import { prisma } from "@/db";
import { createUserDTO } from "./dto/user/createUser";
import bcrypt from "bcrypt";
import { removeRefreshTokens } from "./tokens";

const createUser = async (user: createUserDTO) => {
  const newUser = await prisma.user.create({ data: {
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return newUser;
};

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

const logout = async (jti: string) => {
  await removeRefreshTokens(jti);
};

export { createUser, getUserByEmail, logout };