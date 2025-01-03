import { getTwoFactorTokenByEmail } from "@/data/two-factor";
import crypt from "crypto";
import prisma from "@/lib/prisma";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypt.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 5);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return twoFactorToken;
};

export const generateTwoFactorConfirmation = async (userId: string) => {
  const expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const existingConfirmation = await prisma.twoFactorConfirmation.findUnique({
    where: {
      userId,
    },
  });

  if (existingConfirmation) {
    await prisma.twoFactorConfirmation.delete({
      where: {
        id: existingConfirmation.id,
      },
    });
  }

  return await prisma.twoFactorConfirmation.create({
    data: {
      userId,
      expires,
    },
  });
};
