import React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import FullscreenButton from "@/components/FullscreenButton";

const Header = () => {
  return (
    <header className="text-gray-600 body-font border  px-10">
      <div className="container flex flex-wrap p-2 flex-col md:flex-row items-center justify-between">
        <Image
          src="/eventlogo.webp"
          width={60}
          height={60}
          alt="Reacctor World Expo"
        />
        {/* <Image src={"/RWE.png"} width={195} height={195} alt="Logo" /> */}

        <div className=" flex justify-center items-center gap-10">
          <FullscreenButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[52px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <FiLogOut />
                <Link href="/login">Log Out</Link>
                {/* <span>Log out</span> */}
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
