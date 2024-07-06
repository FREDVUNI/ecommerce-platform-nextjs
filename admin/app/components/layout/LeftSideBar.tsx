"use client";

import { navLinks } from "@/app/lib/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const pathName = usePathname();
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-lg max-lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />
      <div className="flex flex-col gap-4">
        {navLinks &&
          navLinks.map((link, index) => (
            <Link




            
              href={link.url}
              key={index}
              className={`flex text-body-medium gap-4 ${
                pathName === link.url ? `text-blue-1` : ``
              }`}
            >
              {link.icon}
              <p>{link.label}</p>
            </Link>
          ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
