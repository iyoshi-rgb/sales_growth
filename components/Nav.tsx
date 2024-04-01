import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/app/logo.png";
import { createClient } from "@/utils/supabase/client";
import MemberDropDown from "./Nav/memberDropDown";
import ListDropDown from "./Nav/ListDropDown";

const Nav = async ({ org }: any) => {
  const supabase = createClient();

  const { data: members } = await supabase
    .from("members")
    .select("id, person")
    .eq("org", org);

  return (
    <div className="flex flex-col justify-between min-h-screen w-1/10 bg-gray-300 text-cyan-900">
      <div>
        <div className="text-center mb-2"></div>
        <Link href="/home">
          <Image src={Logo} alt="" width={180} height={200} className="mt-3" />
        </Link>
        <nav className="mt-4">
          <ul className="flex flex-col space-y-2">
            <Link href="/home">
              <li className="hover:text-white block px-6 py-2">Home</li>
            </Link>

            <ListDropDown members={members} />
            <MemberDropDown members={members} org={org} />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
