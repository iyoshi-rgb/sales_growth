"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal,ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
 
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
        header: "結果",
      },
  {
    id: "actions",
    cell: ({ row }) => {
      const saleInfo = row.original

      const router = useRouter();
      const supabase = createClient();

      const [deleteId,setId] = useState<number | null>(null);
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const [editInfo, setEditInfo] = useState(null);

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
        console.log(saleInfo);
        //router.push('/list/${id}');
      }

      useEffect(() => {
        if(editInfo === null) return;

      },[editInfo])

      
 
      return (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(saleInfo)} className="hover: cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(saleInfo.id)} className="hover: cursor-pointer"><div className="text-red-500">Delete</div></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </>
      )
    },
  },
]
