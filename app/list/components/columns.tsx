"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BookPlus, ArrowUpDown, Delete, Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import AddList from "./columns/AddList";
import EditModal from "./columns/EditModal";

export type Sales = {
  id: number;
  created_at: string;
  client: string;
  phone: string;
  person: string;
  status: string;
  accept: boolean;
  hot: boolean;
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

      const [deleteId, setId] = useState<number | null>(null);
      const [users, setUsers] = useState<any>();
      const [auth, setAuth] = useState<string | null>();
      const [isToggle, setIsToggle] = useState<boolean>(false);

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
        setId(id);
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
            setId(null);
            router.refresh();
          }
        };

        deleteDB();
      }, [deleteId]);

      const toggle = () => setIsToggle(!isToggle);

      return (
        <>
          <Button onClick={() => toggle()}>
            <Menu />
          </Button>

          {isToggle && (
            <>
              <EditModal saleInfo={saleInfo} users={users} />

              <AlertDialog>
                <AlertDialogTrigger asChild className="relative group">
                  <Button>
                    <Delete className="text-red-400" />
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 bg-white text-xs text-red-400 px-2">
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
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 bg-white text-xs  px-2">
                  Copy
                </span>
              </Button>
              {!saleInfo.accept && (
                <>
                  <Dialog>
                    <DialogTrigger asChild className="relative group">
                      <Button>
                        <BookPlus />
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full scale-0 group-hover:scale-100 bg-white text-xs  px-2">
                          リストに追加
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>誰のリストに追加しますか？</DialogTitle>
                      </DialogHeader>
                      <AddList id={saleInfo.id} users={users} />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </>
          )}
        </>
      );
    },
  },
];
