"use client"

import { ColumnDef } from "@tanstack/react-table"
import { BookPlus,ArrowUpDown,Delete, Phone,FilePenLine, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EditForm from "./columns/EditForm"
import AddList from "./columns/AddList"

 
export type Sales = {
  id: number
  created_at: string
    client: string
    phone: string
    person: string
    status: string
    accept: boolean
    hot: boolean
    org: string
}



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
            )
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
      const saleInfo = row.original


      const router = useRouter();
      const supabase = createClient();

      const [deleteId,setId] = useState<number | null>(null);
      const [editInfo, setEditInfo] = useState<Sales | null>(null);
      const [users,setUsers] = useState<any>();

      useEffect(() => {
        const getMember = async () => {
          const supabase = createClient();
          let { data: members, error } = await supabase.from('members').select('id,person')
          if(error){
            return error
          }
          setUsers(members)
        }
        getMember();
      }, []);

      const handleDelete = (id: number) => {
        setId(id);
      }

      useEffect(() => {
        const deleteDB = async ()  => {
          if(deleteId === null) return;
          const { error }  = await supabase.from('sales').delete().eq('id', deleteId);

          if(error){
            console.log(error);
          }else{
            console.log('success');
            setId(null);
            router.push('/list');
            router.refresh();
          }
        };

        deleteDB();

      },[deleteId])

      const handleEdit = (saleInfo: Sales) => {
        setEditInfo(saleInfo);
      }



    
      
 
      return (
        <>
        <Sheet>
        <SheetTrigger asChild>
        <Button onClick={() => handleEdit(saleInfo)}><FilePenLine/></Button>
        </SheetTrigger>
        <SheetContent className='bg-white'>
          <SheetHeader>
            <SheetTitle>Edit</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4 bg-white">
          {editInfo && <EditForm key={editInfo.id} editInfo={editInfo} users={users}/>}
         </div>
  
          <SheetFooter>
            <SheetClose asChild>
              <Button variant='outline'>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <AlertDialog >
      <AlertDialogTrigger asChild>
      <Button><Delete className="text-red-400"/></Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>削除しますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction><Button variant='outline' className="bg-black text-white" onClick={() => handleDelete(saleInfo.id)}>Continue</Button></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      <Button onClick={() => navigator.clipboard.writeText(saleInfo.phone)}><Phone/></Button>
      {! saleInfo.accept && 
      <>
      <Dialog>
        <DialogTrigger asChild><Button><BookPlus/></Button></DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>誰のリストに追加しますか？</DialogTitle>
          </DialogHeader>
          <AddList id={saleInfo.id} users={users}/>
        </DialogContent>
      </Dialog>
      </>
      
      }
        </>
      )
    },
  },
]
