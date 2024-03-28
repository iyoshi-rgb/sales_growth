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
        className="block px-2   hover:text-white"
        onClick={() => setDropDown(!dropDown)}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild className="relative group">
            <Button>
              <span style={{ fontWeight: "16px" }} className="font-normal">
                Member
              </span>
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Member</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>やめる</AlertDialogCancel>
              <AlertDialogAction>
                <Button variant="outline" className="bg-black text-white">
                  削除
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </li>
    </div>
  );
};

export default MemberDropDown;
