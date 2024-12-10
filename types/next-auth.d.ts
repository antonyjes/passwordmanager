import {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            emailVerified: Date | null;
            isTwoFactorEnabled: boolean;
        } & DefaultSession["user"];
    }
}