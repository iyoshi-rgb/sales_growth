"use client";
import Link from "next/link";
import React, { useState } from "react";

const ListDropDown = ({ members }: any) => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  return (
    <div>
      <li
        className="block px-6 py-2 cursor-pointer hover:text-white"
        onClick={() => setDropDown(!dropDown)}
      >
        List
        {dropDown && (
          <div className="bg-gray-300 text-cyan-900 mt-1">
            <Link href={"/list"}>
              <div className="px-4 py-2 hover:text-black">全体</div>
            </Link>
            {members.map((member: any) => (
              <div key={member.id} className="px-4 py-2 hover:text-black">
                <Link href={`/list/${member.person}`}>{member.person}</Link>
              </div>
            ))}
          </div>
        )}
      </li>
    </div>
  );
};

export default ListDropDown;
