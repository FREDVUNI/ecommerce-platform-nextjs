"use client";

import { navLinks } from "@/app/lib/constants";
import { UserButton, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

const LeftSideBar = () => {
  const pathName = usePathname();
  const { openUserProfile } = useClerk();

  return (
    <div className="h-screen w-64 flex-col bg-white text-black shadow-lg fixed lg:relative hidden lg:block">
      {/* Logo Section */}
      <div className="flex items-center justify-center py-6 border-b border-gray-200">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={150} height={70} />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navLinks &&
          navLinks.map((link, index) => (
            <Link
              href={link.url}
              key={index}
              className={cn(
                "flex items-center gap-4 px-4 py-2 my-1 rounded transition-all duration-200",
                {
                  "bg-gray-200 text-black": pathName === link.url,
                  "text-gray-600 hover:bg-gray-100 hover:text-black":
                    pathName !== link.url,
                }
              )}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
      </nav>

      {/* Profile Section */}
      <div className="flex items-center gap-4 p-4 border-t border-gray-200">
        <UserButton />
        <button
          onClick={() => openUserProfile}
          className="font-medium text-left focus:outline-none"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
