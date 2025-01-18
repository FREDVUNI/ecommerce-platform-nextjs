"use client";

import { navLinks as defaultNavLinks } from "@/app/lib/constants";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";

const UserButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.UserButton), { ssr: false });
const Menu = dynamic(() => import("lucide-react").then(mod => mod.Menu), { ssr: false });

const TopBar = ({ navLinks = defaultNavLinks }) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathName = usePathname();
  const memoizedNavLinks = useMemo(() => navLinks, [navLinks]);

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-lg lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />
      <div className="flex gap-8 max-md:hidden">
        {memoizedNavLinks.map((link, index) => (
          <Link
            href={link.url}
            key={index}
            className={`flex gap-4 text-body-medium ${pathName === link.url ? `text-blue-1` : ``}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
          aria-expanded={dropdownMenu}
          aria-controls="dropdown-menu"
        />
        {dropdownMenu && (
          <div
            id="dropdown-menu"
            className="absolute top-10 right-6 flex-col gap-8 p-5 bg-white shadow-lg"
          >
            {memoizedNavLinks.map((link, index) => (
              <Link
                href={link.url}
                key={index}
                className={`flex items-center gap-2 py-4 ${pathName === link.url ? `text-blue-1` : ``}`}
              >
                {link.icon}
                <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
