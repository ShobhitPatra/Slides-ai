"use client";
// import {
//   DropdownMenu,
//   DropdownMenuLabel,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { Avatar } from "./ui/avatar";
// import { LogOut } from "lucide-react";
// import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
// import { signOut } from "next-auth/react";
import { AvatarImage } from "@radix-ui/react-avatar";

export const UserAvatar = ({
  name,
  image,
}: {
  name: string | null | undefined;
  image: string | Blob | undefined;
}) => {
  return (
    // <Tooltip>
    //   <TooltipTrigger>
    //     <DropdownMenu>
    //       <DropdownMenuTrigger>
    //         <Avatar className="m-auto">
    //           <AvatarImage src={image} />
    //         </Avatar>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent className="bg-gray-800 hover:bg-gray-700 text-gray-300  hover:text-gray-200 ">
    //         <DropdownMenuLabel
    //           onClick={() => signOut()}
    //           className="flex justify-center items-center gap-2.5 hover:cursor-pointer"
    //         >
    //           SignOut{" "}
    //           <span>
    //             <LogOut size={12} />
    //           </span>
    //         </DropdownMenuLabel>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </TooltipTrigger>
    //   <TooltipContent>
    //     <span className="text-gray-300">{name}</span>
    //   </TooltipContent>
    // </Tooltip>
    <div>
      <AvatarImage src={image} />
      {name}
    </div>
  );
};
