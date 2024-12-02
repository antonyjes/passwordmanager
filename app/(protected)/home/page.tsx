"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";

const Home = () => {
  const { session, status } = useAuth(true);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome {session?.user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
        Logout
      </button>
    </div>
  );
};

export default Home;
