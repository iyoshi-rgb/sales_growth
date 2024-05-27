"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Delete, Phone, BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

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
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditModal from "../../components/columns/EditModal";

export type Sales = {
  id: number;
  created_at: string;
  client: string;
  phone: string;
  person: string;
  status: string;
  accept: boolean;
  org: string;
};

export const columns: ColumnDef<Sales>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          日付
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "client",
    header: "会社名",
  },
  {
    accessorKey: "phone",
    header: "電話番号",
  },
  {
    accessorKey: "person",
    header: "担当者",
  },
  {
    accessorKey: "status",
    header: "状態",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const saleInfo = row.original;

      const router = useRouter();
      const supabase = createClient();

      const [deleteId, setDeleteId] = useState<number | null>(null);
      const [deleteListId, setDeleteListId] = useState<number | null>(null);

      const [users, setUsers] = useState<any>();
      const [auth, setAuth] = useState<string | null>();

      useEffect(() => {
        const getUser = async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          setAuth(user?.email);
        };

        getUser();
      }, []);

      useEffect(() => {
        if (!auth) return;
        const getMember = async () => {
          const supabase = createClient();
          let { data: members, error } = await supabase
            .from("members")
            .select("id,person")
            .eq("org", auth);
          if (error) {
            return error;
          }
          setUsers(members);
        };
        getMember();
      }, [auth]);

      const handleDelete = (id: number) => {
        setDeleteId(id);
      };

      useEffect(() => {
        const deleteDB = async () => {
          if (deleteId === null) return;
          const { error } = await supabase
            .from("sales")
            .delete()
            .eq("id", deleteId);

          if (error) {
            console.log(error);
          } else {
            console.log("success");
            setDeleteId(null);
            router.refresh();
          }
        };

        deleteDB();
      }, [deleteId]);

      const handleListDelete = (id: number) => {
        setDeleteListId(id);
      };

      useEffect(() => {
        const deleteListDB = async () => {
          if (deleteListId === null) return;

          console.log(deleteListId);

          const { data, error } = await supabase
            .from("sales")
            .update({ accept: false, list: null })
            .eq("id", deleteListId)
            .select();

          if (error) {
            console.log(error);
          } else {
            setDeleteListId(null);
            router.refresh();
          }
        };

        deleteListDB();
      }, [deleteListId]);

      return (
        <div>
          <div className="flex items-center">
            <div className="flex flex-wrap ml-4 style={{width: '200px'}}">
              <EditModal saleInfo={saleInfo} users={users} />

              <AlertDialog>
                <AlertDialogTrigger asChild className="relative group">
                  <Button>
                    <Delete className="text-red-400" />
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 text-xs text-red-400 px-2">
                      削除
                    </span>
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>削除しますか？</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                      <Button
                        variant="outline"
                        className="bg-black text-white"
                        onClick={() => handleDelete(saleInfo.id)}
                      >
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                onClick={() => navigator.clipboard.writeText(saleInfo.phone)}
                className="relative group"
              >
                <Phone />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100  px-2 text-xs">
                  Copy
                </span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild className="relative group">
                  <Button>
                    <BookX className="text-red-400" />
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 text-xs text-red-400 px-2">
                      リストから消す
                    </span>
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      リストから削除しますか？
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                      <Button
                        variant="outline"
                        className="bg-black text-white"
                        onClick={() => handleListDelete(saleInfo.id)}
                      >
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      );
    },
  },
];
