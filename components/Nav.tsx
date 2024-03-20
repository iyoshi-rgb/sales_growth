import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import AuthButton from "./AuthButton";
import Image from "next/image";

const Nav = () => {
  return (
    <div className="border-b border-b-gray-400 ">
      <div className=" flex items-center justify-start mb-3 mx-5 pt-2">
        <Link href={"/home"}>
          <div className="text-xl font-semibold px-6 ">Sales Growth</div>
        </Link>
        <nav className="flex justify-between flex-grow ml-4">
          <ul className="flex space-x-4">
            <Link href={"/home"}>
              <li>
                <Button className="text-gray-600 hover:text-black">Home</Button>
              </li>
            </Link>
            <Link href={"/list"}>
              <li>
                <Button className="text-gray-600 hover:text-black">List</Button>
              </li>
            </Link>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Nav;
