"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { UserButton } from "@/components/user-button";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center mr-10">
          <Lock className="w-[90px] h-[38px]" />
          <h1 className="text-3xl font-bold">Password Manager</h1>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/home"
            className={cn(
              "text-sm font-bold transition-colors hover:text-primary",
              pathname === "/home"
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/accounts"
            className={cn(
              "text-sm font-bold transition-colors hover:text-primary",
              pathname === "/accounts"
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            Accounts
          </Link>
          <Link
            href="/profile"
            className={cn(
              "text-sm font-bold transition-colors hover:text-primary",
              pathname === "/profile"
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            Profile
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
