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
                id: existingToken.id
            }
        })
    }

    const twoFactorToken = await prisma.twoFactorToken.create({
        data: {
            email,
            expires,
            token
        }
    });

    return twoFactorToken;
}