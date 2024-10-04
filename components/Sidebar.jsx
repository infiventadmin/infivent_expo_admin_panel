"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  FaDashboard,
  FaUser,
  FaHome /* Import other icons as needed */,
} from "react-icons/fa"; // Import the desired icons

const Sidebar = ({ className, items, ...props }) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex space-x-2  lg:flex-col lg:space-x-0 lg:space-y-5",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted text-lg p-6 text-[color:black] hover:bg-transperent flex gap-[10px] "
              : " flex gap-[10px] p-6 text-lg hover:bg-transperent hover:text-black hover:underline",
            "justify-start"
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
