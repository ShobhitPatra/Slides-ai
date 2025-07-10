"use client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const UserAvatar = ({ image }: { image: string | Blob | undefined }) => {
  return (
    <div className="flex justify-center items-center">
      <Avatar className="flex flex-col items-center">
        <AvatarImage
          className="h-8 w-8 rounded-full hover:scale-105 transition-all"
          src={image}
        />
      </Avatar>
      <LogOut
        onClick={() => signOut()}
        className="text-gray-300 hover:cursor-pointer hover:scale-105 transition-all"
        size={16}
      />
    </div>
  );
};
