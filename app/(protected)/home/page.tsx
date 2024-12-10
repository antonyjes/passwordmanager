"use client";

import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { session, status } = useAuth(true);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>      
      <h1>Home Page</h1>
      <p>Welcome {session?.user?.name}</p>
      {
        !session?.user?.emailVerified && (<div>
          <p>Verify your email</p>
          <p>{session?.user?.email}</p>
          <a>Verify</a>
        </div>)
      }
    </div>
  );
};

export default Home;
