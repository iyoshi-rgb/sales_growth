"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal,ArrowUpDown, CalendarIcon, Calendar,Delete, Phone,FilePenLine   } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectTrigger } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
 
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

const formSchema = z.object({
  date: z.date(), 
  client: z.string().min(2).max(50),
  phone: z.string().min(1).max(50),
  person: z.string(),
  status: z.string(),

})

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

      const today = new Date();


      const router = useRouter();
      const supabase = createClient();

      const [deleteId,setId] = useState<number | null>(null);
      const [editInfo, setEditInfo] = useState<Sales | null>(null);
      const [updateDB,setUpdateDB] = useState<z.infer<typeof formSchema> | null>(null);

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

      useEffect(() => {
        if(editInfo === null) return;
        console.log(editInfo);

      },[editInfo])

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          client: editInfo?.client,
          phone: editInfo?.phone,
          person: editInfo?.person,
          date: today,
        },
      })

      const onSubmit = (values: z.infer<typeof formSchema>) => {
        setUpdateDB(values);
        console.log(updateDB);
      };

      useEffect(() => {
        if(!updateDB)return;

        const ChangeData = async () => {
          const { data, error } = await supabase.from('sales')
          .update({ 
          'created_at': updateDB.date,
          'client': updateDB.client,
          'phone': updateDB.phone,
          'person': updateDB.person,
          'status': updateDB.status })
          .eq('id', editInfo?.id)
          .select()
          if(error){
          console.log(error)
          }
        }
        ChangeData();

      },[updateDB])
  
      
 
      return (
        <div className="w-auto">
        <Sheet>
        <SheetTrigger asChild>
        <Button onClick={() => handleEdit(saleInfo)}><FilePenLine/></Button>
        </SheetTrigger>
        <SheetContent className='bg-white'>
          <SheetHeader>
            <SheetTitle>Edit</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4 bg-white">
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <FormControl>
                <Input placeholder='' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='' value={editInfo?.person} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder='' value={editInfo?.status} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
         </div>
  
          <SheetFooter>
            <SheetClose asChild>
              <Button variant='outline'>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Button onClick={() => handleDelete(saleInfo.id)}><Delete className="text-red-400"/></Button>
      <Button onClick={() => navigator.clipboard.writeText(saleInfo.phone)}><Phone/></Button>
        </div>
      )
    },
  },
]
