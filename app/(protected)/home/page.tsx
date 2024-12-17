"use client";

import { useAuth } from "@/hooks/useAuth";
import { sendVerificationEmail } from "@/actions/send-verification-email";

const Home = () => {
  const { session, status } = useAuth(true);

  if (status === "loading") return <div>Loading...</div>;

  const onVerify = async () => {
    await sendVerificationEmail(
      session?.user?.email || "",
      session?.user?.name || ""
    );
    
    console.log("Verification email sent");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Home Page</h1>
      <p>Welcome {session?.user?.name}</p>
      {session?.user?.emailVerified === null && (
        <div className="bg-blue-400 p-3 rounded-md flex gap-x-2 text-sm text-blue-900">
          <p>
            Verify your email address: {session?.user?.email}{" "}
            <span className="underline cursor-pointer" onClick={onVerify}>
              <a>Verify</a>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
