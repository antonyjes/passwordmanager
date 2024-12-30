import prisma from "@/lib/prisma";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
            where: {
                userId
            }
        });

        return twoFactorConfirmation;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findFirst({
            where: {
                email
            }
        });

        return twoFactorToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findUnique({
            where: {
                token
            }
        });

        return twoFactorToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}