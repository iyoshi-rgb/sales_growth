import React from "react";
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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
const Delete = () => {
  const handleDelete = async (id: number, person: string) => {
    console.log(id, person);
  };
  return (
    <div className="flex flex-grow">
      <AlertDialog>
        <AlertDialogTrigger asChild className="relative group">
          <Button>
            <X className="text-red-400" />
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
                onClick={() => handleDelete(1, "aaa")}
              >
                削除
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Delete;
