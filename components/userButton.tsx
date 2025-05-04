'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { User2 } from "lucide-react";
  import { User } from "next-auth";
  import Image from "next/image";
  import { Button } from "./ui/button";
  import { signOut } from "next-auth/react";
import { signIn } from "@/auth";
import Link from "next/link";
  
  const UserButton = ({ user }: { user: User }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="border rounded-full overflow-hidden">
            {user ? (user.image ? (
              <Image
                src={user.image}
                alt={"user"}
                className="object-contain rounded-full"
                height={25}
                width={25}
              />
            ) : (
              <User2 className="h-4 w-4" />
            )):(<Link href={'/login'}  className="text-indigo-950 rounded-md px-4 py-1 ">Login</Link>)}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Setting</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            {/* <form
              action={() => {
                
                signOut();
              }}
            >
            </form> */}
              <Button type="submit" size={"sm"} onClick={()=>{
                signOut();
              }} variant={"ghost"}>Sign Out</Button>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default UserButton;