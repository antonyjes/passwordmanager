"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const UserButton = () => {
  const { session, status } = useAuth(true);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <span
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="cursor-pointer"
        >
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
