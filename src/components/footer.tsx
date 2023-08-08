"use client";

import { sidebarLinks } from "@/constants";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Footer = () => {
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => (
          <Link
            href={link.route}
            key={link.label}
            className={cn(
              "bottombar_link",
              (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route
                ? "bg-primary-500"
                : "bg-transparent"
            )}
          >
            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
            <p className="text-subtle-medium  text-light-1 max-sm:hidden">
              {link.label.split(/\s+/)[0]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Footer;
