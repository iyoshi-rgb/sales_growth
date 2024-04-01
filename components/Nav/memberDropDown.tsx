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
import { UserX } from "lucide-react";
import MemberAddModal from "@/components/Nav/MemberAddModal";

const MemberDropDown = ({ members, org }: any) => {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id: number, person: string) => {
    const { error } = await supabase.from("members").delete().eq("id", id);
    const { data } = await supabase
      .from("sales")
      .update({ accept: false })
      .eq("list", person);

    if (!error) {
      router.refresh();
    } else {
      console.log(error);
    }
  };

  const [Modal, setModal] = useState<boolean>(false);
  const ModalClose = () => setModal(!Modal);

  return (
    <div>
      <li
        className="hover:text-white block px-6 py-2 cursor-pointer"
        onClick={() => setModal(!Modal)}
      >
        Member
      </li>
      {Modal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"
          onClick={ModalClose}
        >
          <div
            className="w-1/4 h-full bg-white overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold text-xl px-2 py-2">Member</p>
            {members.map((member: any) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-2 px-4"
              >
                <span className="pl-10">{member.person}</span>
                <AlertDialog>
                  <AlertDialogTrigger asChild className="relative group">
                    <Button>
                      <UserX className="text-red-400 mr-" />
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100  text-red-400 px-2 text-xs">
                        削除
                      </span>
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {member.person}を削除しますか？
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>
                        <Button
                          variant="outline"
                          className="bg-black text-white"
                          onClick={() => handleDelete(member.id, member.person)}
                        >
                          Delete
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            <p className="font-bold text-xl px-2 py-2">追加</p>
            <div>
              <MemberAddModal org={org} />
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default MemberDropDown;
