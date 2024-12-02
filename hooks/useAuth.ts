import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = (requireAuth: boolean) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session && requireAuth) {
      router.push("/auth/login");
    }

    if (session && !requireAuth) {
      router.push("/home");
    }
  }, [session, status, router, requireAuth]);

  return { session, status };
};
