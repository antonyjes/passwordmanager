"use client";

import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const { session, status } = useAuth(true);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>      
      <h1>Home Page</h1>
      <p>Welcome {session?.user?.name}</p>
    </div>
  );
};

export default Home;
