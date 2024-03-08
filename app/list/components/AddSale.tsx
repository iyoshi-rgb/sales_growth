'use client'
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ModalContext } from './Modal'


const formSchema = z.object({
  date: z.date(), 
  client: z.string().min(2).max(50),
  phone: z.string().min(1).max(50),
  person: z.string(),
  status: z.string(),

})


const AddSale: React.FC =  () => {

  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    console.error('AddSale must be used within a ModalContext.Provider');
    return null;
  }
  
  const{ isOpen, setIsOpen} = modalContext;

  const today = new Date();
  const [submitData, setSubmitData] = useState<z.infer<typeof formSchema> | null>(null);
 

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: "",
      phone: "",
      person: "",
      date: today,
    },
  })
 
  function formatDate(date : Date) {
    const year = date.getFullYear();
    // getMonth()は0から始まるため、+1をする。月が一桁の場合には先頭に0を付ける。
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    // getDate()で日にちを取得し、日が一桁の場合には先頭に0を付ける。
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }
  
  useEffect(() => {
    if (!submitData) return;

    const insertDB  = async () =>  {
  
      const supabase = createClient();
      console.log(submitData)
      
      const { data, error } : any =  await supabase.from('sales')
      .insert([
        {created_at: formatDate(submitData.date),
         client : submitData.client,
        phone : submitData.phone,
        person : submitData.person,
        status : submitData.status, 
        },]).select()
  
    if(data){
      console.log(data);
    }
    if(error){
      console.log(error);
    }
    };
    insertDB();
    setSubmitData(null);
    setIsOpen(!isOpen);
  },[submitData])
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitData(values);
  }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex items-center gap-2'>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>日付</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="会社名" {...field} />
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
                  <FormControl>
                    <Input placeholder="電話番号" {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
              <SelectTrigger className="w-[180px]">
              <SelectValue  placeholder="担当者" />
              </SelectTrigger>
              </FormControl>
              <SelectContent>
                 <SelectItem value="池田">池田</SelectItem>
                  <SelectItem value="津田">津田</SelectItem>
                  <SelectItem value="小谷">小谷</SelectItem>
                  <SelectItem value="村瀬">村瀬</SelectItem>
              </SelectContent>
          </Select>
          </FormItem>
        )}
        />
        <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="結果" />
        
      </SelectTrigger>
      </FormControl>
      <SelectContent>
          <SelectItem value="未荷電">未荷電</SelectItem>
          <SelectItem value="再架電">再架電</SelectItem>
          <SelectItem value="アポ取得">アポ取得</SelectItem>
          <SelectItem value="不在">不在</SelectItem>
      </SelectContent>
    </Select>
    </FormItem>
              )}
              />
            <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      )
  }

      


export default AddSale;


