"use client";

import Link from "next/link";
import { PowerIcon } from "@heroicons/react/24/outline";
import NavLinks from "../nav-links";
import AcmeLogo from "../acme-logo";
import { useRouter } from "next/navigation";
import { Button } from "../button";

export default function SideNav() {
  const navigate = useRouter();

  const handleSignOut = async () => {
    navigate.push("/signin");
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

        <Button
          onClick={handleSignOut}
          variant="secondary"
          className="gap-2 !justify-start"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </div>
    </div>
  );
}
