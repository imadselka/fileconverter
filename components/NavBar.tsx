"use client";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center w-full md:pl-8 md:pr-5 md:pt-2">
      <div>
        <Link href="/">FileConverter</Link>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
