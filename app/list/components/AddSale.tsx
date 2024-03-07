'use client'
import React, { useState } from 'react'
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

const formSchema = z.object({
  client: z.string().min(2).max(50),
  phone: z.string().min(1).max(50),
  person: z.string(),

})


const AddSale = () => {
  const today = new Date();
  
  const [date,setDate] = useState<any>(today)
 

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: "",
      phone: "",
      person: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('提出')
    console.log(values)
  }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className='flex items-center gap-2'>
        <Popover>
        <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>日付選択</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
      </Popover>
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
                <FormControl>
              <Select >
              <SelectTrigger className="w-[180px]">
              <SelectValue  placeholder="担当者" />
              </SelectTrigger>
              <SelectContent>
              <SelectGroup >
                 <SelectItem value="池田">池田</SelectItem>
                  <SelectItem value="津田">津田</SelectItem>
                  <SelectItem value="小谷">小谷</SelectItem>
                  <SelectItem value="村瀬">村瀬</SelectItem>
              </SelectGroup>
              
              </SelectContent>
          </Select>
          </FormControl>
          </FormItem>
        )}
        />
    <Select name='status'>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="結果" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="未荷電">未荷電</SelectItem>
          <SelectItem value="再架電">再架電</SelectItem>
          <SelectItem value="アポ取得">アポ取得</SelectItem>
          <SelectItem value="不在">不在</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      )
  }

      


export default AddSale;


