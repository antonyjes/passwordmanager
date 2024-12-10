import { Resend } from "resend";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, name: string) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      html: `<p>Hi ${name},</p><p>Please verify your email address by clicking <a href="${verificationUrl}">here</a>.</p>`,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send verification email");
  }
};
