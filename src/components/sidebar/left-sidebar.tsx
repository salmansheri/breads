"use client";

import { sidebarLinks } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => (
          <Link
            href={link.route}
            key={link.label}
            className={cn(
              "leftsidebar_link",
              (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route
                ? "bg-primary-500"
                : "bg-transparent"
            )}
          >
            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
            <p className="text-light-1 max-lg:hidden">{link.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
