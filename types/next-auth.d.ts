import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      emailVerified: Date | null;
      isTwoFactorEnabled: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    emailVerified: Date | null;
    isTwoFactorEnabled: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    emailVerified: Date | null;
    isTwoFactorEnabled: boolean;
  }
}
