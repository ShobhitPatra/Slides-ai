"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = ({ image }: { image: string | Blob | undefined }) => {
  return (
    <div className="flex justify-center items-center">
      <Avatar>
        <AvatarImage src={image} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <LogOut
        onClick={() => signOut()}
        className="text-gray-300 hover:cursor-pointer hover:scale-105 transition-all"
        size={16}
      />
    </div>
  );
};
