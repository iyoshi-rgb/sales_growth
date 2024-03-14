'use client'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
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
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { CircleUser,UserPlus  } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

  interface Member {
    id: number;
    person: string;
  }

  
  interface MembersProps {
    members: Member[] | null;
    org: string | undefined;
  }
  
  const formSchema = z.object({
    username: z.string().min(1),
  })
  
  const Sample :  React.FC<MembersProps> = ({ members , org})=> {

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
      },
    })

    const [addName, setAddName] = useState<z.infer<typeof formSchema> | null>(null);
    const router = useRouter();
    const supabase = createClient();

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
    <div className=''>
    <Card>
  <CardHeader>
    <CardTitle>Your team Member</CardTitle>
  </CardHeader>
  <CardContent>
  {members?.length  ? (
            members?.map((member) => (
              <div key={member.id} className='grid grid-cols-3 gap-4'>
                <div className='flex items-center justify-center mb-3 mx-5'>
            <CircleUser className='flex-shrink-0'/>
            <div className='flex flex-grow ml-4 '>
                <div>
                    {member.person}
                </div>
            </div>
            </div>
            </div>
            ))
          ) : (
            <p>メンバーを登録しましょう!!</p>
          )}
        </CardContent>
  <div className='text-center mb-2'>
  <Sheet>
      <SheetTrigger asChild>
      <Button variant='outline'>
        <UserPlus/><span className='pl-2 font-bold'>追加</span>
      </Button>
      </SheetTrigger>
      <SheetContent className='bg-white'>
        <SheetHeader>
          <SheetTitle>Add Member</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 bg-white">
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

        <SheetFooter>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>

</Card>
</div>
  )
}

export default Sample
