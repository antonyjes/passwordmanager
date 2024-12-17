"use server";

import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail as sendVerfEmail } from "@/lib/mail";

export const sendVerificationEmail = async (email: string, name: string) => {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    console.log("Verification token created");

    await sendVerfEmail(email, name, token);

    console.log("Verification email sent");
}