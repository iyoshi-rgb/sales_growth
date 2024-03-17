"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, CircleUser, UserPlus, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";

import MemberAddForm from "./Member/MemberAddForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface Member {
  id: number;
  person: string;
}

interface MembersProps {
  members: Member[] | null;
  org: string | undefined;
}

const Sample: React.FC<MembersProps> = ({ members, org }) => {
  const [deleteId, setDeleteId] = useState<number | null>();
  const router = useRouter();

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  useEffect(() => {
    const deleteDB = async () => {
      if (deleteId === null) return;
      const supabase = createClient();
      const { error } = await supabase
        .from("members")
        .delete()
        .eq("id", deleteId);

      if (!error) {
        console.log("success");
        setDeleteId(null);
        router.push("/home");
        router.refresh();
      }
    };
    deleteDB();
  }, [deleteId]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Your team Member</CardTitle>
        </CardHeader>
        <CardContent>
          {members?.length ? (
            <div className="grid grid-cols-2 gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-center mb-3 mx-5"
                >
                  <CircleUser className="flex-shrink-0" />
                  <div className="flex flex-grow ml-4">
                    <div>{member.person}</div>
                  </div>
                  <div className="flex flex-grow relative group">
                    <Link href={`/list/${member.person}`}>
                      <Button>
                        <Book />
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 bg-white text-xs  px-2">
                          {member.person}のリスト
                        </span>
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-grow">
                    <AlertDialog>
                      <AlertDialogTrigger asChild className="relative group">
                        <Button>
                          <UserX className="text-red-400" />
                          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 bg-white  text-red-400 text-xs  px-2">
                            削除
                          </span>
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>削除しますか？</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>やめる</AlertDialogCancel>
                          <AlertDialogAction>
                            <Button
                              variant="outline"
                              className="bg-black text-white"
                              onClick={() => handleDelete(member.id)}
                            >
                              削除
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>メンバーを登録しましょう!!</p>
          )}
        </CardContent>
        <div className="text-center mb-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <UserPlus />
                <span className="pl-2 font-bold">追加</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Add Member</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4 bg-white">
                <MemberAddForm org={org} />
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </Card>
    </div>
  );
};

export default Sample;
