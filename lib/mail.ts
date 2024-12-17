import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY environment variable is not set");

}
const resend = new Resend(resendApiKey);

export const sendVerificationEmail = async (email: string, name: string, token: string) => {
  try {
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      html: `<p>Hi ${name},</p><p>Please verify your email address by clicking <a href="${verificationUrl}">here</a>.</p>`,
    });

    console.log("Email sent");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send verification email");
  }
};
