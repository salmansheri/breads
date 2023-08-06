import React from "react";
import Link from "next/link";
import {
  SignOutButton,
  SignedIn,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="topbar">
      <Link
        className="flex items-center gap-4  max-xs:hidden text-light-1 font-bold"
        href="/"
      >
        Breads
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden ">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="LogoutImage"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />

        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Header;
