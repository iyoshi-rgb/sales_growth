"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal,ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
 

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    },
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

      const [deleteId,setId] = useState<number | null>(null);

      useEffect(() => {
        const deleteDB = async ()  => {
          if(deleteId === null) return;


          const supabase = createClient();
          const { error }  = await supabase.from('sales').delete().eq('id', deleteId);
          console.log(deleteId);
          if(error){
            console.log(error);
          }else{
            console.log('success');
            setId(null);
          }
        };

        deleteDB();

      },[deleteId])

      const handleEdit = () => {
        console.log('handleEdit');
      }

      const handleDelete = (id: number) => {
        setId(id);
      }

      
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(saleInfo.client)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit()}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(saleInfo.id)}><div className="text-red-500">Delete</div></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
