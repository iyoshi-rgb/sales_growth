'use client'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

  const formSchema = z.object({
    username: z.string().min(1),
  })

const MemberAddForm = ({org} : any) => {

    const [addName, setAddName] = useState<z.infer<typeof formSchema> | null>(null);
    const router = useRouter();
    const supabase = createClient();

    console.log(org)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })

      useEffect(() => {
        if(!addName)return;
  
        const addUser = async () => {
          const { data, error } = await supabase.from('members')
          .insert([{ person: addName.username, org: org },])
          .select()
          if(data){
            router.push('/home')
            router.refresh();
          }else{
            console.log(error);
          }  
        }
        
        addUser();
  
      },[addName])
  
      const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAddName(values);
      };

  return (
    <div>
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default MemberAddForm
