"use client";

import { useAuth } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";
  useAuth(false); // check if user is logged in

  const [error, setError] = useState<string>("");
  const [data, setData] = useState({ email: "", password: "" });

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        setError(response.error);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("An error occurred");
    }
  };

  return (
    <form onSubmit={loginUser} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-500 p-3 rounded">{error}</div>
      )}
      <input
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
