"use client";
import React from "react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "../ui/button";
import { Delete, X } from "lucide-react";
import MemberAddModal from "@/app/home/components/Member/MemberAddModal";

const MemberDropDown = ({ members, org }: any) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id: number, person: string) => {
    const { error } = await supabase.from("members").delete().eq("id", id);
    const { data } = await supabase
      .from("sales")
      .update({ accept: false })
      .eq("list", person);

    if (!error) {
      console.log("success");
      router.refresh();
    } else {
      console.log(error);
    }
  };

  return (
    <div>
      <li
        className="block px-6 py-2  hover:text-white"
        onClick={() => setDropDown(!dropDown)}
      >
        <span className="cursor-pointer">Member</span>
        {dropDown && (
          <div className="bg-gray-300 text-cyan-900 mt-1">
            {members.map((member: any) => (
              <div
                key={member.id}
                className="flex items-center justify-between px-4 py-2"
              >
                {member.person}
              </div>
            ))}
          </div>
        )}
      </li>
    </div>
  );
};

export default MemberDropDown;
