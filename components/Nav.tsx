import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";
import Image from "next/image";
import Logo from "@/app/logo.png";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

const Nav = async ({ org }: any) => {
  const supabase = createClient();

  const { data: member } = await supabase
    .from("members")
    .select("id, person")
    .eq("org", org);

  console.log(member);

  return (
    <div className="flex flex-col justify-between min-h-screen w-1/10 bg-gray-300 text-cyan-900">
      <div>
        <Link href="/home">
          <Image src={Logo} alt="" width={180} height={200} className="mt-3" />
        </Link>
        <nav className="mt-4">
          <ul className="flex flex-col space-y-2">
            <Link href="/home">
              <li className="hover:text-white block px-6 py-2">Home</li>
            </Link>

            <Link href="/list">
              <li className="hover:text-white block px-6 py-2">List</li>
            </Link>
          </ul>
        </nav>
      </div>

      <div className="px-2 mb-4">
        <AuthButton />
      </div>
    </div>
  );
};

export default Nav;
