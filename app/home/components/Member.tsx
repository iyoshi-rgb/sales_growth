"use client";
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
import { Book, CircleUser, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import MemberAddModal from "../../../components/Nav/MemberAddModal";

interface MembersProps {
  org: string | undefined;
}

const Sample: React.FC<MembersProps> = async ({ org }) => {
  const router = useRouter();
  const supabase = createClient();

  const { data: member } = await supabase
    .from("members")
    .select("id, person")
    .eq("org", org);

  const handleDelete = async (id: number, person: string) => {
    const { error } = await supabase.from("members").delete().eq("id", id);
    const { data } = await supabase
      .from("sales")
      .update({ accept: false })
      .eq("list", person);

    if (!error) {
      console.log("success");
      router.push("/home");
      router.refresh();
    }
  };

  return (
    <div>
      <Card className=" border-gray-400">
        <CardHeader>
          <CardTitle>Your team Member</CardTitle>
        </CardHeader>
        <CardContent>
          {member?.length ? (
            <div className="grid grid-cols-2 gap-4">
              {member.map((member) => (
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
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 text-xs  px-2">
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
                          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100  text-red-400 text-xs  px-2">
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
                              onClick={() =>
                                handleDelete(member.id, member.person)
                              }
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
          <MemberAddModal org={org} />
        </div>
      </Card>
    </div>
  );
};

export default Sample;
