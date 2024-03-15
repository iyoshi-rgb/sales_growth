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
import { CircleUser,UserPlus  } from 'lucide-react';

import { Button } from '@/components/ui/button';

import MemberAddForm from './MemberAddForm'
import Link from "next/link";

  interface Member {
    id: number;
    person: string;
  }

  
  interface MembersProps {
    members: Member[] | null;
    org: string | undefined;
  }

  const Sample :  React.FC<MembersProps> = ({ members , org})=> {


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
            <Link href={`/list/${member.person}`}>aaaa</Link>
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
        <MemberAddForm org={org}/>
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
